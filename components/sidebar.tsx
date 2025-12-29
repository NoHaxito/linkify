/* eslint-disable @next/next/no-img-element */
"use client";
import type { User } from "lucia";
import { Home, Link2, LogOut } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function Sidebar({ user }: { user: User | null }) {
  return (
    <aside className="fixed top-16 left-0 z-30 flex h-[calc(100vh-4rem)] min-w-56 flex-1 shrink-0 -translate-x-[200%] transform flex-col border-r bg-background antialiased transition-[width,transform] duration-800 ease-in data-[open=true]:translate-x-0 md:sticky md:-ml-4 md:block md:translate-x-0 md:duration-300 dark:border-neutral-800 dark:bg-neutral-950">
      <nav className="flex h-[90%] flex-1 flex-col gap-y-6 overflow-y-auto overflow-x-hidden px-3 py-1.5 [scrollbar-gutter:stable]">
        <ul className="flex flex-col gap-y-1">
          <SidebarItem
            active
            href="/dash"
            icon={
              <Home className="-ml-0.5 flex size-4 flex-none items-center justify-center" />
            }
            text="Dashboard"
          />
          <SidebarItem
            href="/dash/links"
            icon={
              <Link2 className="-ml-0.5 flex size-4 flex-none items-center justify-center" />
            }
            text="Links"
          />
        </ul>
      </nav>
      <div className="sticky bottom-0 mt-auto min-h-16 w-full flex-col items-center justify-center gap-y-1 truncate px-4 md:flex">
        <Separator />
        <div className="flex w-full items-center justify-between gap-1">
          <Button className="flex-1 justify-start" size="sm" variant="ghost">
            <img
              alt={`${user?.username} avatar image`}
              className="size-7 rounded-full"
              src={user?.avatar_url}
            />
            {user?.username}
          </Button>
          <Link
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "size-9"
            )}
            href="/api/auth/logout"
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
        className={cn(
          "group flex h-9 w-full items-center gap-x-3 truncate rounded-lg px-3 py-2.5 text-muted-foreground text-sm outline-hidden ring-inset transition-colors duration-300 hover:bg-secondary hover:text-foreground focus-visible:rounded-lg focus-visible:ring-2 data-[state=active]:bg-secondary data-[state=active]:text-foreground",
          className
        )}
        data-state={active ? "active" : undefined}
        href={href}
      >
        <span>{icon}</span>
        <div className="flex w-full items-center justify-between transition-opacity duration-800">
          {text}
          {/* {label ? <div>{label}</div> : null} */}
        </div>
      </Link>
    </li>
  );
}
