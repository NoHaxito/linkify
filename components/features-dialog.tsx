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
  Gem,
  Globe,
  Info,
  Key,
} from "lucide-react";
import Link from "next/link";
import { useFeaturesDialog } from "@/store/features-dialog";

export function FeaturesDialog() {
  const open = useFeaturesDialog((state) => state.open);
  const setOpen = useFeaturesDialog((state) => state.setOpen);
  // const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
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
              icon={<BarChart3 className="size-5" />}
              text="Analytics"
              disabled
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
        <div className="p-4 grid grid-cols-2 gap-1">
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
            icon={<BarChart3 className="size-5" />}
            text="Analytics"
            disabled
          />
          <FeaturesCard
            className="col-span-2"
            icon={<Key className="size-5" />}
            text="Password Protection"
          />
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
        "text-xs aria-disabled:opacity-50 aria-disabled:pointer-events-none sm:text-sm p-4 bg-secondary/80 transition-colors hover:bg-secondary flex flex-col gap-y-2 items-center justify-center rounded-lg"
      )}
    >
      {icon}
      {text}
    </div>
  );
}
