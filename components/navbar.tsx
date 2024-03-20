import { cn } from "@/lib/utils";
import GithubIcon from "./icons/github";
import { buttonVariants } from "./ui/button";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";
import { LucideLink } from "lucide-react";
import { validateRequest } from "@/lib/auth";
import { GoToDashboardButton } from "./go-to-dashboard-button";

export async function Navbar() {
  const { session, user } = await validateRequest();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <LucideLink className="size-5" />
            <span className="hidden font-bold sm:inline-block">Linkify</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {!session ? (
            <Link
              href="/auth/login"
              className={cn(
                buttonVariants({
                  variant: "linkHover2",
                  size: "sm",
                })
              )}
            >
              Sign In
            </Link>
          ) : (
            <GoToDashboardButton />
          )}
          <nav className="flex items-center">
            <Link
              href="https://github.com/nohaxito/url-shortener"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    size: "icon",
                  })
                )}
              >
                <GithubIcon className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
