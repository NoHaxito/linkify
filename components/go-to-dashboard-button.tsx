"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";

export function GoToDashboardButton() {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard")) return null;
  return (
    <Link
      href="/dashboard"
      className={cn(
        "!rounded-xl",
        buttonVariants({ size: "sm", variant: "secondary" }),
      )}
    >
      Dashboard
    </Link>
  );
}
