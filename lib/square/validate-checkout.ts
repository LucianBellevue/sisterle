import type { CheckoutLineInput } from "@/lib/square/types";

export type CheckoutValidationError = {
  code:
    | "NOT_CONFIGURED"
    | "EMPTY_CART"
    | "INVALID_LINE"
    | "ITEM_UNAVAILABLE"
    | "INSUFFICIENT_STOCK";
  message: string;
  variationId?: string;
};

export function validateCheckoutLines(
  lines: unknown,
):
  | { ok: true; lines: CheckoutLineInput[] }
  | { ok: false; error: CheckoutValidationError } {
  if (!Array.isArray(lines) || lines.length === 0) {
    return {
      ok: false,
      error: {
        code: "EMPTY_CART",
        message: "Your cart is empty.",
      },
    };
  }

  const normalized: CheckoutLineInput[] = [];
  const seen = new Set<string>();

  for (const line of lines) {
    if (
      !line ||
      typeof line !== "object" ||
      typeof (line as CheckoutLineInput).variationId !== "string" ||
      typeof (line as CheckoutLineInput).quantity !== "number"
    ) {
      return {
        ok: false,
        error: {
          code: "INVALID_LINE",
          message: "Cart lines must include variationId and quantity.",
        },
      };
    }

    const variationId = (line as CheckoutLineInput).variationId.trim();
    const quantity = (line as CheckoutLineInput).quantity;

    if (!variationId || !Number.isInteger(quantity) || quantity < 1) {
      return {
        ok: false,
        error: {
          code: "INVALID_LINE",
          message: "Each cart line needs a valid variation and quantity.",
          variationId,
        },
      };
    }

    if (seen.has(variationId)) {
      return {
        ok: false,
        error: {
          code: "INVALID_LINE",
          message: "Duplicate cart lines are not allowed.",
          variationId,
        },
      };
    }
    seen.add(variationId);
    normalized.push({ variationId, quantity });
  }

  return { ok: true, lines: normalized };
}
