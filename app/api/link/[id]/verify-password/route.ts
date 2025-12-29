import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function POST(
  request: Request,
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  const { password } = (await request.json()) as { password: string };

  const link = await db.link.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      settings: true,
    },
  });

  if (!link) {
    return NextResponse.json(
      { error: true, message: "Link not found" },
      { status: 404 }
    );
  }

  if (!link.settings?.password) {
    return NextResponse.json(
      { error: true, message: "Link is not password protected" },
      { status: 400 }
    );
  }

  if (link.settings.password !== password) {
    return NextResponse.json(
      { error: true, message: "Incorrect password" },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(`link_verified_${params.slug}`, "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  });

  return NextResponse.json({ success: true });
}
