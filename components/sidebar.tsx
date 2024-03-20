/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { User } from "lucia";
import { Home, Link2, LogOut } from "lucide-react";

export function Sidebar({ user }: { user: User | null }) {
  return (
    <aside className="fixed left-0 top-[4rem] flex-1 min-w-[14rem] h-[calc(100vh-4rem)] shrink-0 -translate-x-[200%] border-r bg-background data-[open=true]:translate-x-0 md:sticky md:-ml-4 md:block md:translate-x-0 md:duration-300 dark:border-neutral-800 dark:bg-neutral-950 z-30 transition-[width,transform] transform duration-800 antialiased ease-in flex flex-col">
      <nav className="h-[90%] flex-1 [scrollbar-gutter:stable] overflow-y-auto px-3 py-1.5 overflow-x-hidden flex flex-col gap-y-6">
        <ul className="flex flex-col gap-y-1">
          <SidebarItem
            href="/dash"
            text="Dashboard"
            icon={
              <Home className="size-4 -ml-0.5 flex-none flex items-center justify-center" />
            }
            active
          />
          <SidebarItem
            href="/dash/links"
            text="Links"
            icon={
              <Link2 className="size-4 -ml-0.5 flex-none flex items-center justify-center" />
            }
          />
        </ul>
      </nav>
      <div className="md:flex gap-y-1 flex-col truncate w-full items-center justify-center min-h-[4rem] mt-auto sticky bottom-0 px-4">
        <Separator />
        <div className="w-full flex items-center justify-between gap-1">
          <Button size="sm" className="justify-start flex-1" variant="ghost">
            <img
              src={user?.avatar_url}
              className="size-7 rounded-full"
              alt={`${user?.username} avatar image`}
            />
            {user?.username}
          </Button>
          <Link
            href="/api/auth/logout"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "size-9"
            )}
          >
            <LogOut className="size-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}

function SidebarItem({
  href,
  text,
  icon,
  active,
  label,
  className,
}: {
  href: string;
  text: string;
  icon: React.ReactNode;
  active?: boolean;
  label?: React.ReactNode;
  className?: string;
}) {
  return (
    <li className="list-none">
      <Link
        data-state={active ? "active" : undefined}
        className={cn(
          "transition-colors duration-300 h-9 px-3 data-[state=active]:text-foreground data-[state=active]:bg-secondary hover:bg-secondary rounded-lg text-muted-foreground hover:text-foreground group truncate w-full flex items-center text-sm outline-none ring-inset focus-visible:ring-2 focus-visible:rounded-lg py-2.5 gap-x-3",
          className
        )}
        href={href}
      >
        <span>{icon}</span>
        <div className="flex w-full items-center justify-between transition-opacity duration-[800ms]">
          {text}
          {/* {label ? <div>{label}</div> : null} */}
        </div>
      </Link>
    </li>
  );
}
