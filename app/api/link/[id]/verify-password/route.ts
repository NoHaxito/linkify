import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { db, linkSettings, links } from "@/lib/db";

export async function POST(
  request: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id: slug } = await ctx.params;
  const { password } = (await request.json()) as { password: string };

  const linkResult = await db
    .select({
      id: links.id,
      slug: links.slug,
      password: linkSettings.password,
    })
    .from(links)
    .leftJoin(linkSettings, eq(links.id, linkSettings.linkId))
    .where(eq(links.slug, slug))
    .limit(1);

  if (linkResult.length === 0) {
    return NextResponse.json(
      { error: true, message: "Link not found" },
      { status: 404 }
    );
  }

  const link = linkResult[0];

  if (!link.password) {
    return NextResponse.json(
      { error: true, message: "Link is not password protected" },
      { status: 400 }
    );
  }

  if (link.password !== password) {
    return NextResponse.json(
      { error: true, message: "Incorrect password" },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(`link_verified_${slug}`, "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });

  return NextResponse.json({ success: true });
}
