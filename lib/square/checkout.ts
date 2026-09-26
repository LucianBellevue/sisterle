import "server-only";

import { randomUUID } from "crypto";
import {
  getSiteUrl,
  getSquareClient,
  getSquareLocationId,
  isSquareConfigured,
} from "@/lib/square/client";
import { getProductsByVariationIds } from "@/lib/square/catalog";
import {
  validateCheckoutLines,
  type CheckoutValidationError,
} from "@/lib/square/validate-checkout";
import type { CheckoutLineInput } from "@/lib/square/types";

export type { CheckoutValidationError };
export { validateCheckoutLines };

export type CheckoutSuccess = {
  checkoutUrl: string;
  orderId?: string;
};

export async function createSquareCheckout(
  lines: CheckoutLineInput[],
): Promise<
  | { ok: true; data: CheckoutSuccess }
  | { ok: false; error: CheckoutValidationError }
> {
  if (!isSquareConfigured()) {
    return {
      ok: false,
      error: {
        code: "NOT_CONFIGURED",
        message: "Checkout is temporarily unavailable.",
      },
    };
  }

  const products = await getProductsByVariationIds(
    lines.map((line) => line.variationId),
  );

  for (const line of lines) {
    const product = products.get(line.variationId);
    if (!product || !product.purchasable || product.channel !== "sisterle") {
      return {
        ok: false,
        error: {
          code: "ITEM_UNAVAILABLE",
          message: product
            ? `"${product.name}" is no longer available for purchase on Sisterle.`
            : "One or more items are no longer available.",
          variationId: line.variationId,
        },
      };
    }

    const maxQty = product.trackInventory
      ? Math.max(0, product.quantity)
      : 1;
    const allowedQty = Math.min(maxQty, 1);

    if (line.quantity > allowedQty) {
      return {
        ok: false,
        error: {
          code: "INSUFFICIENT_STOCK",
          message:
            allowedQty < 1
              ? `"${product.name}" is sold out.`
              : `"${product.name}" only has ${allowedQty} available.`,
          variationId: line.variationId,
        },
      };
    }
  }

  const locationId = getSquareLocationId();
  const client = getSquareClient();
  const siteUrl = getSiteUrl();

  const response = await client.checkout.paymentLinks.create({
    idempotencyKey: randomUUID(),
    order: {
      locationId,
      lineItems: lines.map((line) => ({
        catalogObjectId: line.variationId,
        quantity: String(line.quantity),
      })),
    },
    checkoutOptions: {
      askForShippingAddress: true,
      redirectUrl: `${siteUrl}/checkout/success`,
      merchantSupportEmail:
        process.env.SQUARE_SUPPORT_EMAIL?.trim() || "sales@sisterle.com",
    },
  });

  const checkoutUrl = response.paymentLink?.url;
  if (!checkoutUrl) {
    throw new Error("Square did not return a checkout URL.");
  }

  return {
    ok: true,
    data: {
      checkoutUrl,
      orderId:
        response.paymentLink?.orderId ??
        response.relatedResources?.orders?.[0]?.id,
    },
  };
}
