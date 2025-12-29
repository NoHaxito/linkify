import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { validateRequest } from "@/lib/auth-helpers";
import { db, linkSettings, links } from "@/lib/db";
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
  const id = generateRandomString();
  try {
    const existingLink = await db
      .select()
      .from(links)
      .where(eq(links.slug, slug))
      .limit(1);

    if (existingLink.length > 0) {
      return NextResponse.json({
        error: true,
        message: "Slug is already taken",
      });
    }

    await db.transaction(async (tx) => {
      await tx.insert(links).values({
        id,
        url,
        slug,
        expiresAt: expires_at ? new Date(expires_at) : null,
        userId: session?.user?.id ?? null,
      });

      await tx.insert(linkSettings).values({
        linkId: id,
        password: password || null,
        allowUnauthenticated,
      });
    });

    return NextResponse.json({
      link: `${process.env.NEXT_PUBLIC_APP_URL}/l/${slug}`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      error: true,
      message: "Something went wrong, try again later",
    });
  }
}
