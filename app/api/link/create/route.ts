import { addDay } from "@formkit/tempo";
import { db } from "@/lib/prisma";
import { validateRequest } from "@/lib/auth";
import { NextResponse } from "next/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { generateRandomString } from "@/lib/utils";

export async function POST(request: Request) {
  const { session } = await validateRequest();
  const { url, slug, password, expires_at, allowUnauthenticated } =
    (await request.json()) as {
      url: string;
      slug: string;
      password?: string;
      expires_at?: string;
      allowUnauthenticated: boolean;
    };
  console.log(url, slug, password, expires_at, allowUnauthenticated);
  const id = generateRandomString();
  // const expires_at = addDay(new Date(), !session ? 7 : 30);
  try {
    await db.link.create({
      data: {
        id,
        url,
        slug,
        expires_at,
        user_id: session?.userId ?? null,
        settings: {
          create: {
            password: password ? password : null,
            allowUnauthenticated,
          },
        },
      },
      include: {
        settings: true,
      },
    });
    return NextResponse.json({
      link: `${process.env.NEXT_PUBLIC_APP_URL}/l/${slug}`,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json({
        error: true,
        message: "Slug is already taken",
      });
    }
    return NextResponse.json({
      error: true,
      message: "Something went wrong, try again later",
    });
  }
}
