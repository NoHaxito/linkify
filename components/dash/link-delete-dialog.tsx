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
import {
  BarChart3,
  CalendarClock,
  Cloud,
  Globe,
  Key,
  Trash,
} from "lucide-react";
import Link from "next/link";

export function LinkDeleteDialog({
  children,
  slug,
  id,
}: {
  children: React.ReactNode;
  slug: string;
  id: string;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Delete link</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this (<strong>{slug}</strong>)
              link? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <div>
            <DialogFooter>
              <DialogClose asChild>
                <Button size="sm" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button variant="destructive" size="sm">
                <Trash className="size-4" />
                Delete
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Delete link</DrawerTitle>
          <DrawerDescription>
            Are you sure you want to delete this (<strong>{slug}</strong>) link?
            This action cannot be undone.
          </DrawerDescription>
        </DrawerHeader>

        <DrawerFooter>
          <Button variant="destructive" size="sm">
            <Trash className="size-4" />
            Delete
          </Button>
          <DrawerClose asChild>
            <Button size="sm" variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
