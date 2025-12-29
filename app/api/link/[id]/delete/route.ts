import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db, links } from "@/lib/db";

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;

  const { id } = params;

  try {
    await db.delete(links).where(eq(links.id, id));
    return NextResponse.json(
      {
        message: "Link deleted",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: true,
      message: "Something went wrong, try again later",
    });
  }
}
