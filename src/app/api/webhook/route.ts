import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getProductById } from "@/data/products";
import { generateDownloadToken } from "@/lib/download-token";
import { sendDownloadEmail } from "@/lib/email";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const productId = session.metadata?.productId;
    const email = session.customer_details?.email;

    if (productId && email) {
      const product = getProductById(productId);
      if (product) {
        try {
          const token = generateDownloadToken(productId, email);
          const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
          const downloadUrl = `${baseUrl}/api/download/${productId}?token=${token}`;

          await sendDownloadEmail({
            to: email,
            productTitle: product.title,
            downloadUrl,
          });
        } catch (error) {
          console.error("Failed to send download email:", error);
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
