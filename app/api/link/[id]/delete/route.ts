import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;

  const { id } = params;

  try {
    await db.link.delete({
      where: {
        id,
      },
    });
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
    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json({
        error: true,
        message: "Can't delete this link, please try again later",
      });
    }
    return NextResponse.json({
      error: true,
      message: "Something went wrong, try again later",
    });
  }
}
