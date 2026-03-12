import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getProductById } from "@/data/products";
import { generateDownloadToken } from "@/lib/download-token";
import { sendDownloadEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Search Stripe for completed checkout sessions with this email
    const sessions = await getStripe().checkout.sessions.list({
      limit: 100,
      status: "complete",
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Filter sessions by customer email and collect purchased products
    const purchasedProducts: { productId: string; productTitle: string }[] = [];

    for (const session of sessions.data) {
      if (
        session.customer_details?.email?.toLowerCase() === email.toLowerCase() &&
        session.metadata?.productId
      ) {
        const product = getProductById(session.metadata.productId);
        if (product) {
          // Avoid duplicates
          if (!purchasedProducts.find((p) => p.productId === product.id)) {
            purchasedProducts.push({
              productId: product.id,
              productTitle: product.title,
            });
          }
        }
      }
    }

    if (purchasedProducts.length === 0) {
      return NextResponse.json(
        { error: "No purchases found for this email" },
        { status: 404 }
      );
    }

    // Send download email for each purchased product
    for (const { productId, productTitle } of purchasedProducts) {
      const token = generateDownloadToken(productId, email);
      const downloadUrl = `${baseUrl}/api/download/${productId}?token=${token}`;

      await sendDownloadEmail({
        to: email,
        productTitle,
        downloadUrl,
      });
    }

    return NextResponse.json({
      message: "Download links sent",
      count: purchasedProducts.length,
    });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
