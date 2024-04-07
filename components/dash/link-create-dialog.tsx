"use client";
import * as React from "react";

import { cn, generateRandomString } from "@/lib/utils";
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
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { LinkForm } from "../forms/link-form";

export function LinkCreateDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-h-[96%] overflow-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create link</DialogTitle>
            <DialogDescription>
              Create a new link to share with others.
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-full overflow-auto">
            <LinkForm
              session={true} // this means the user is logged in (refactor later)
              randomSlug={generateRandomString(6)}
              closeDialogButton={
                <DialogClose asChild>
                  <Button size="sm" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
              }
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="max-h-[96%]">
        <DrawerHeader className="text-left">
          <DrawerTitle>Create link</DrawerTitle>
          <DrawerDescription>
            Create a new link to share with others.
          </DrawerDescription>
        </DrawerHeader>
        <div className="overflow-auto px-4">
          <LinkForm
            session={true} // this means the user is logged in (refactor later)
            randomSlug={generateRandomString(6)}
            closeDialogButton={
              <DrawerClose asChild>
                <Button size="sm" variant="outline">
                  Cancel
                </Button>
              </DrawerClose>
            }
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
