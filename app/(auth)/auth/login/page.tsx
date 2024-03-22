import GithubIcon from "@/components/icons/github";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="container relative">
      <div className="flex h-[100vh] w-full flex-1 flex-col items-center justify-center">
        <div className="flex h-full w-full max-w-xs flex-col items-center justify-center gap-y-3">
          <div>
            <h1 className="text-center text-3xl font-bold">Linkify</h1>
            <p className="text-center text-sm text-muted-foreground">
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
