import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const link = await db.link.findUnique({
    where: {
      slug: params.slug,
    },
  });
  if (!link) {
    return NextResponse.redirect(`${process.env.APP_URL}/404`, {
      status: 302,
    });
  }
  const { url } = link;
  return NextResponse.redirect(url, {
    status: 302,
  });
}
