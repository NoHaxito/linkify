"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CalendarClock, Cloud, Gem, Info, Key } from "lucide-react";
import Link from "next/link";

export function FeaturesDialog() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="link" className="w-full">
            <Gem className="size-4" />
            Unlock all features
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Unlock all features</DialogTitle>
            <DialogDescription>
              Create an account to get access to all features from the app.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-2">
            <div className="text-sm p-4 bg-secondary/80 transition-colors hover:bg-secondary flex flex-col gap-y-2 items-center justify-center rounded-lg">
              <CalendarClock className="size-5" />
              Custom Expiry
            </div>
            <div className="p-4 text-sm bg-secondary/80 transition-colors text-center hover:bg-secondary flex flex-col gap-y-2 items-center justify-center rounded-lg">
              <Key className="size-5" />
              Password Protection
            </div>
            <div className="col-span-2 text-sm p-4 bg-secondary/80 transition-colors hover:bg-secondary flex flex-col gap-y-2 items-center justify-center rounded-lg">
              <Cloud className="size-5" />
              API Access
            </div>
          </div>

          <div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="link">Continue without account</Button>
              </DialogClose>
              <Link
                href="/auth/login"
                className={cn(buttonVariants({ variant: "default" }))}
              >
                Create Account
              </Link>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="link" className="w-full">
          <Gem className="size-4" />
          Unlock all features
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Unlock all features</DrawerTitle>
          <DrawerDescription>
            Create an account to get access to all features from the app.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 grid grid-cols-2 gap-2">
          <div className="text-sm p-4 bg-secondary/80 transition-colors hover:bg-secondary flex flex-col gap-y-2 items-center justify-center rounded-lg">
            <CalendarClock className="size-5" />
            Custom Expiry
          </div>
          <div className="p-4 text-sm bg-secondary/80 transition-colors text-center hover:bg-secondary flex flex-col gap-y-2 items-center justify-center rounded-lg">
            <Key className="size-5" />
            Password Protection
          </div>
          <div className="col-span-2 text-sm p-4 bg-secondary/80 transition-colors hover:bg-secondary flex flex-col gap-y-2 items-center justify-center rounded-lg">
            <Cloud className="size-5" />
            API Access
          </div>
        </div>
        <DrawerFooter className="pt-2">
          <Link
            href="/auth/login"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Create Account
          </Link>
          <DrawerClose asChild>
            <Button variant="link">Continue without account</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
