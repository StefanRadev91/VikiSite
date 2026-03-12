import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getProductById } from "@/data/products";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json(
      { error: "Липсва session ID" },
      { status: 400 }
    );
  }

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Плащането не е завършено" },
        { status: 400 }
      );
    }

    const productId = session.metadata?.productId;
    if (!productId) {
      return NextResponse.json(
        { error: "Продуктът не е намерен" },
        { status: 404 }
      );
    }

    const product = getProductById(productId);
    if (!product) {
      return NextResponse.json(
        { error: "Продуктът не е намерен" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      productId: product.id,
      productTitle: product.title,
      email: session.customer_details?.email || "",
    });
  } catch {
    return NextResponse.json(
      { error: "Невалиден session ID" },
      { status: 400 }
    );
  }
}
