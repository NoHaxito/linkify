"use client";

import type { User } from "lucia";
import { Home, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/dashboard",
    title: "Home",
    label: null,
    icon: Home,
  },
  {
    href: "/dashboard/settings",
    title: "Settings",
    label: null,
    icon: Settings,
  },
];

export function SubNavbar({ user }: { user: User }) {
  const pathname = usePathname();
  return (
    <nav className="sticky top-[3.5rem] flex items-center gap-3 overflow-auto border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex items-center gap-3">
        {links.map((link) => {
          const Icon = link.icon;
          const active = link.href === pathname;
          return (
            <Link
              className="flex items-center gap-2 border-transparent border-b-2 px-3 py-2.5 text-muted-foreground text-sm hover:text-primary data-[active=true]:border-foreground data-[active=true]:text-primary"
              data-active={active}
              href={link.href}
              key={link.href + link.title}
            >
              <Icon className="size-4" />
              {link.title}
            </Link>
          );
        })}
        <div className="sticky right-0 ml-auto">
          <Image
            alt={`${user.username} avatar image`}
            className="min-h-7 min-w-7 rounded-full"
            height={28}
            src={user.avatar_url}
            width={28}
          />
        </div>
      </div>
    </nav>
  );
}
