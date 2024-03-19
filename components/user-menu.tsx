import type { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

export function UserMenu({ children }: { children: ReactNode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/api/auth/logout">Logout</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
