import { NextResponse } from "next/server";
import { getIp } from "@/lib/get-request-ip";

export async function GET(req: Request) {
  const request_ip = getIp(req);

  if (!request_ip || request_ip === "127.0.0.1") {
    return NextResponse.json(
      { country: null, countryCode: null },
      { status: 400 }
    );
  }

  const { network, location } = (await fetch(
    `https://ip.guide/${request_ip}`
  ).then((res) => res.json())) as IPGuideResponse;

  if (!network.autonomous_system.country) {
    return NextResponse.json(
      { country: null, countryCode: null },
      { status: 400 }
    );
  }

  return NextResponse.json({
    country: location.country,
    countryCode: network.autonomous_system.country,
  });
}

interface IPGuideResponse {
  ip: string;
  network: {
    cidr: string;
    hosts: { start: string; end: string };
    autonomous_system: {
      asn: number;
      name: string;
      organization: string;
      country: string;
      rir: string;
    };
  };
  location: {
    city: string;
    country: string;
    timezone: string;
    latitude: number;
    longitude: number;
  };
}
