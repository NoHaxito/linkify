"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

export function GoToDashboardButton() {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard")) return null;
  return (
    <Link
      className={cn(
        "rounded-xl!",
        buttonVariants({ size: "sm", variant: "secondary" })
      )}
      href="/dashboard"
    >
      Dashboard
    </Link>
  );
}
