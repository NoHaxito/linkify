import { addDay } from "@formkit/tempo";
import { db } from "@/lib/prisma";
import { validateRequest } from "@/lib/auth";
import { NextResponse } from "next/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { generateRandomString } from "@/lib/utils";

export async function POST(request: Request) {
  const { session } = await validateRequest();
  const { url, slug } = (await request.json()) as { url: string; slug: string };
  const id = generateRandomString();
  const expires_at = addDay(new Date(), !session ? 7 : 30);
  try {
    await db.link.create({
      data: {
        id,
        url,
        slug,
        expires_at,
        user_id: session?.userId ?? null,
      },
    });
    return NextResponse.json({
      link: `${process.env.NEXT_PUBLIC_APP_URL}/l/${slug}`,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json({ message: "Slug is taken" });
    }
  }
}
