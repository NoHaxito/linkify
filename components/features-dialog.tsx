"use client";
import { BarChart3, CalendarClock, Cloud, Globe, Key } from "lucide-react";
import Link from "next/link";
import type * as React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { useFeaturesDialog } from "@/store/features-dialog";

export function FeaturesDialog() {
  const open = useFeaturesDialog((state) => state.open);
  const setOpen = useFeaturesDialog((state) => state.setOpen);
  // const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) {
    return (
      <Dialog onOpenChange={setOpen} open={open}>
        {/* <DialogTrigger asChild>
          <Button variant="link" className="w-full">
            <Gem className="size-4" />
            Unlock all features
          </Button>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Unlock all features</DialogTitle>
            <DialogDescription>
              Create an account to get access to all features from the app.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-2">
            <FeaturesCard
              icon={<CalendarClock className="size-5" />}
              text="Custom Expiry"
            />
            <FeaturesCard
              icon={<Cloud className="size-5" />}
              text="API Access"
            />
            <FeaturesCard
              icon={<Globe className="size-5" />}
              text="Custom Domain"
            />
            <FeaturesCard
              disabled
              icon={<BarChart3 className="size-5" />}
              text="Analytics"
            />
            <FeaturesCard
              className="col-span-2"
              icon={<Key className="size-5" />}
              text="Password Protection"
            />
          </div>

          <div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="link">Continue without account</Button>
              </DialogClose>
              <Link
                className={cn(buttonVariants({ variant: "default" }))}
                href="/auth/login"
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
    <Drawer onOpenChange={setOpen} open={open}>
      {/* <DrawerTrigger asChild>
        <Button variant="link" className="w-full">
          <Gem className="size-4" />
          Unlock all features
        </Button>
      </DrawerTrigger> */}
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Unlock all features</DrawerTitle>
          <DrawerDescription>
            Create an account to get access to all features from the app.
          </DrawerDescription>
        </DrawerHeader>
        <div className="grid grid-cols-2 gap-1 p-4">
          <FeaturesCard
            icon={<CalendarClock className="size-5" />}
            text="Custom Expiry"
          />
          <FeaturesCard icon={<Cloud className="size-5" />} text="API Access" />
          <FeaturesCard
            icon={<Globe className="size-5" />}
            text="Custom Domain"
          />
          <FeaturesCard
            disabled
            icon={<BarChart3 className="size-5" />}
            text="Analytics"
          />
          <FeaturesCard
            className="col-span-2"
            icon={<Key className="size-5" />}
            text="Password Protection"
          />
        </div>
        <DrawerFooter className="pt-2">
          <Link
            className={cn(buttonVariants({ variant: "default" }))}
            href="/auth/login"
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

function FeaturesCard({
  icon,
  text,
  className,
  disabled = false,
}: {
  icon: React.ReactNode;
  text: string;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <div
      aria-disabled={disabled}
      className={cn(
        className,
        "flex flex-col items-center justify-center gap-y-2 rounded-lg bg-secondary/80 p-4 text-xs transition-colors hover:bg-secondary aria-disabled:pointer-events-none aria-disabled:opacity-50 sm:text-sm"
      )}
    >
      {icon}
      {text}
    </div>
  );
}
