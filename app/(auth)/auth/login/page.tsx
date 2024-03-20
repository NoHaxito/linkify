import GithubIcon from "@/components/icons/github";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="container relative">
      <div className="flex flex-col h-[100vh] w-full flex-1 items-center justify-center">
        <div className="flex flex-col gap-y-3 w-full h-full max-w-xs items-center justify-center">
          <div>
            <h1 className="text-center font-bold text-3xl">Linkify</h1>
            <p className="text-center text-muted-foreground text-sm">
              Free, unlimited url shortener.
            </p>
          </div>
          <Link
            href="/api/auth/github/"
            className={cn("w-full", buttonVariants({ variant: "default" }))}
          >
            <GithubIcon className="size-4" />
            Sign in with GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}
