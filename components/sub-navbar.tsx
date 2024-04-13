"use client";

import Link from "next/link";
import { Home, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { nullable } from "zod";
import { User } from "lucia";
import Image from "next/image";

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
    <nav className="container sticky top-[3.5rem] mx-auto flex items-center gap-3 overflow-auto border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {links.map((link) => {
        const Icon = link.icon;
        const active = link.href === pathname;
        return (
          <Link
            key={link.href + link.title}
            href={link.href}
            data-active={active}
            className="flex items-center gap-2 border-b-2 border-transparent px-3 py-2.5 text-sm text-muted-foreground hover:text-primary data-[active=true]:border-foreground data-[active=true]:text-primary"
          >
            <Icon className="size-4" />
            {link.title}
          </Link>
        );
      })}
      <div className="sticky right-0 ml-auto">
        <Image
          width={28}
          height={28}
          src={user.avatar_url}
          className="min-h-7 min-w-7 rounded-full"
          alt={`${user.username} avatar image`}
        />
      </div>
    </nav>
  );
}
