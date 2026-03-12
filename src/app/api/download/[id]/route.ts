import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/data/products";
import { verifyDownloadToken } from "@/lib/download-token";
import { getStripe } from "@/lib/stripe";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: productId } = await params;
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const sessionId = searchParams.get("session_id");

  const product = getProductById(productId);
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  // Verify access: either via signed token or via Stripe session ID
  let authorized = false;

  if (token) {
    const payload = verifyDownloadToken(token);
    if (payload && payload.productId === productId) {
      authorized = true;
    }
  }

  if (!authorized && sessionId) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      if (
        session.payment_status === "paid" &&
        session.metadata?.productId === productId
      ) {
        authorized = true;
      }
    } catch {
      // Invalid session ID
    }
  }

  if (!authorized) {
    return NextResponse.json(
      { error: "Unauthorized. Invalid or expired download link." },
      { status: 403 }
    );
  }

  // Serve the PDF file
  const pdfPath = path.join(process.cwd(), "private", "pdfs", product.pdfFile);

  if (!fs.existsSync(pdfPath)) {
    return NextResponse.json(
      { error: "File not found" },
      { status: 404 }
    );
  }

  const fileBuffer = fs.readFileSync(pdfPath);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${product.pdfFile}"`,
      "Cache-Control": "no-store",
    },
  });
}
