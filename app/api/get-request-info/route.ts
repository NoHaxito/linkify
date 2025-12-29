import { NextResponse } from "next/server";
import type { Country } from "@/app/(without-navbar)/l/[slug]/_views/redirecting";
import { getIp } from "@/lib/get-request-ip";

export async function GET(req: Request) {
  const request_ip = getIp(req);
  const { country, countryCode }: Country = await fetch(
    `http://ip-api.com/json/${request_ip}`
  ).then((res) => res.json());
  return NextResponse.json({ country, countryCode });
}
