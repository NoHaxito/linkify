import { Country } from "@/app/(without-navbar)/l/[slug]/_views/redirecting";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const request_ip = req.headers.get("x-forwarded-for")?.split(",")[0];
  const { country, countryCode }: Country = await fetch(
    `http://ip-api.com/json/${request_ip}`,
  ).then((res) => res.json());
  return NextResponse.json({ country, countryCode });
}
