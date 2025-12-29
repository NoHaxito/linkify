import { z } from "zod";

// Localhost IP used for test and development environments
const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
const LOCALHOST_IP = "127.0.0.1";

export function getIp(req: Request | Headers): string | null {
  if (IS_DEVELOPMENT) {
    return LOCALHOST_IP;
  }

  const headers = "headers" in req ? req.headers : req;

  const ipHeaders = ["x-client-ip", "x-forwarded-for", "cf-connecting-ip"];

  for (const key of ipHeaders) {
    const value = "get" in headers ? headers.get(key) : headers[key];
    if (typeof value === "string") {
      const ip = value.split(",")[0]?.trim();
      if (isValidIP(ip)) {
        return ip;
      }
    }
  }
  return null;
}

function isValidIP(ip: string): boolean {
  const ipv4 = z.string().ip("ipv4").safeParse(ip);

  if (ipv4.success) {
    return true;
  }

  const ipv6 = z.string().ip("ipv6").safeParse(ip);
  if (ipv6.success) {
    return true;
  }

  return false;
}
