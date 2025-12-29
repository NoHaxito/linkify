import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth-helpers";
import { db, linkSettings, links } from "@/lib/db";
import { generateRandomString } from "@/lib/utils";
import { linkSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const { session } = await validateRequest();
    const body = await request.json();

    const validationResult = linkSchema.safeParse({
      ...body,
      expires_at: body.expires_at ? new Date(body.expires_at) : undefined,
    });

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: true,
          message: validationResult.error.errors[0]?.message || "Invalid input",
        },
        { status: 400 }
      );
    }

    const { url, slug, password, expires_at, allowUnauthenticated } =
      validationResult.data;

    const existingLink = await db
      .select()
      .from(links)
      .where(eq(links.slug, slug))
      .limit(1);

    if (existingLink.length > 0) {
      return NextResponse.json(
        {
          error: true,
          message: "Slug is already taken",
        },
        { status: 409 }
      );
    }

    const id = generateRandomString();

    await db.transaction(async (tx) => {
      await tx.insert(links).values({
        id,
        url,
        slug,
        expiresAt: expires_at ?? null,
        userId: session?.user?.id ?? null,
      });

      await tx.insert(linkSettings).values({
        linkId: id,
        password: password || null,
        allowUnauthenticated: allowUnauthenticated ?? true,
      });
    });

    return NextResponse.json({
      link: `${process.env.NEXT_PUBLIC_APP_URL}/l/${slug}`,
    });
  } catch (error) {
    console.error("Error creating link:", error);
    return NextResponse.json(
      {
        error: true,
        message: "Something went wrong, try again later",
      },
      { status: 500 }
    );
  }
}
