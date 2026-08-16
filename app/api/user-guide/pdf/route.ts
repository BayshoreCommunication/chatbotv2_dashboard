import { createElement } from "react";
import { renderToBuffer } from "@react-pdf/renderer";
import { NextResponse } from "next/server";
import UserGuidePdfDocument from "@/components/userGuide/UserGuidePdfDocument";

// @react-pdf/renderer needs Node APIs (fontkit, etc.) — not available on the
// Edge runtime. Route handlers must stay .ts (no JSX), hence createElement.
export const runtime = "nodejs";

export async function GET() {
  const buffer = await renderToBuffer(createElement(UserGuidePdfDocument));

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="go-converto-user-guide.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
