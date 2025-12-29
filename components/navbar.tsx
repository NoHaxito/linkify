import { LucideLink } from "lucide-react";
import Link from "next/link";
import { validateRequest } from "@/lib/auth-helpers";
import { cn } from "@/lib/utils";
import { GoToDashboardButton } from "./go-to-dashboard-button";
import GithubIcon from "./icons/github";
import { ThemeToggle } from "./theme-toggle";
import { buttonVariants } from "./ui/button";

export async function Navbar() {
  const { session } = await validateRequest();
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4">
        <div className="mr-4">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <LucideLink className="size-5" />
            <span className="font-bold">Linkify</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {session ? (
            <GoToDashboardButton />
          ) : (
            <Link
              className={cn(
                buttonVariants({
                  variant: "linkHover2",
                  size: "sm",
                })
              )}
              href="/auth/login"
            >
              Sign In
            </Link>
          )}
          <nav className="flex items-center">
            <Link
              href="https://github.com/nohaxito/url-shortener"
              rel="noreferrer"
              target="_blank"
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
