"use client";
import { Loader2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
import { useMediaQuery } from "@/hooks/use-media-query";

export function LinkDeleteDialog({
  children,
  slug,
  id,
}: {
  children: React.ReactNode;
  slug: string;
  id: string;
}) {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  async function handleDelete() {
    setLoading(true);
    try {
      await deleteLink(id);
      toast.success("Link deleted successfully");
      router.refresh();
      setOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Failed to delete link", {
          description: error.message,
        });
      } else {
        toast.error("Failed to delete link");
      }
    } finally {
      setLoading(false);
    }
  }
  if (isDesktop) {
    return (
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Delete link</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this (<strong>{slug}</strong>)
              link? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex-col sm:flex-col">
            <div className="flex items-center justify-end gap-1">
              <DialogClose asChild>
                <Button disabled={loading} size="sm" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                disabled={loading}
                onClick={handleDelete}
                size="sm"
                variant="destructive"
              >
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Trash className="size-4" />
                )}
                Delete
              </Button>
            </div>
            {loading && (
              <div className="flex items-center gap-1 pt-2 text-muted-foreground text-sm">
                <Loader2 className="size-4 animate-spin" />
                Deleting link, please wait and don&apos;t close this dialog.
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer onOpenChange={setOpen} open={open}>
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
          <Button
            disabled={loading}
            onClick={handleDelete}
            size="sm"
            variant="destructive"
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Trash className="size-4" />
            )}
            Delete
          </Button>
          <DrawerClose asChild>
            <Button disabled={loading} size="sm" variant="outline">
              Cancel
            </Button>
          </DrawerClose>
          {loading && (
            <div className="flex items-center gap-1 pt-2 text-muted-foreground text-sm">
              <Loader2 className="size-4 min-w-4 animate-spin" />
              Deleting link, please wait and don&apos;t close this dialog.
            </div>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
