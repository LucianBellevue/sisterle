import { NextResponse } from "next/server";
import {
  createSquareCheckout,
  validateCheckoutLines,
} from "@/lib/square/checkout";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { lines?: unknown };
    const validated = validateCheckoutLines(body.lines);
    if (!validated.ok) {
      return NextResponse.json(
        { error: validated.error.message, code: validated.error.code },
        { status: 400 },
      );
    }

    const result = await createSquareCheckout(validated.lines);
    if (!result.ok) {
      const status =
        result.error.code === "NOT_CONFIGURED"
          ? 503
          : result.error.code === "ITEM_UNAVAILABLE" ||
              result.error.code === "INSUFFICIENT_STOCK"
            ? 409
            : 400;
      return NextResponse.json(
        { error: result.error.message, code: result.error.code },
        { status },
      );
    }

    return NextResponse.json({
      checkoutUrl: result.data.checkoutUrl,
      orderId: result.data.orderId,
    });
  } catch (error) {
    console.error("[api/checkout]", error);
    return NextResponse.json(
      { error: "Checkout failed. Please try again." },
      { status: 500 },
    );
  }
}
