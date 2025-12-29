"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
import { useMediaQuery } from "@/hooks/use-media-query";
import { generateRandomString } from "@/lib/utils";

import { LinkForm } from "../forms/link-form";

export function LinkCreateDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) {
    return (
      <Dialog onOpenChange={setOpen} open={open}>
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
              callback={() => setOpen(false)} // this means the user is logged in (refactor later)
              closeDialogButton={
                <DialogClose asChild>
                  <Button size="sm" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
              }
              randomSlug={generateRandomString(6)}
              session={true}
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer onOpenChange={setOpen} open={open}>
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
            callback={() => setOpen(false)} // this means the user is logged in (refactor later)
            closeDialogButton={
              <DrawerClose asChild>
                <Button size="sm" variant="outline">
                  Cancel
                </Button>
              </DrawerClose>
            }
            randomSlug={generateRandomString(6)}
            session={true}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
