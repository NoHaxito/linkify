"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { LinkProps } from "@/lib/types";

export function Redirector({ link }: { link: LinkProps }) {
  const router = useRouter();
  useEffect(() => {
    router.push(link.url);
  }, [link, router]);
  return null;
}
