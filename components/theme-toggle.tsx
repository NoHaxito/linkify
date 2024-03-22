"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          left={<Sun className="h-4 w-4" />}
          onClick={() => setTheme("light")}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          left={<Moon className="h-4 w-4" />}
          onClick={() => setTheme("dark")}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          left={<Monitor className="h-4 w-4" />}
          onClick={() => setTheme("system")}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
