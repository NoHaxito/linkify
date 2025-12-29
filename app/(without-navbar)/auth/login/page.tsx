import type { Metadata } from "next";
import Link from "next/link";
import GithubIcon from "@/components/icons/github";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Auth - Linkify",
  description: "Make your links mini mighty",
};

export default async function Home() {
  return (
    <div className="container relative">
      <div className="flex h-[100vh] w-full flex-1 flex-col items-center justify-center">
        <div className="flex h-full w-full max-w-xs flex-col items-center justify-center gap-y-3">
          <div>
            <h1 className="text-center font-bold text-3xl">Linkify</h1>
            <p className="text-center text-muted-foreground text-sm">
              Free, unlimited url shortener.
            </p>
          </div>
          <Link
            className={cn("w-full", buttonVariants({ variant: "default" }))}
            href="/api/auth/github/"
          >
            <GithubIcon className="size-4" />
            Sign in with GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}
