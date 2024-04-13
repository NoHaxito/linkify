"use client";
import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
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
import { Loader2, Trash } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
  async function deleteLink() {
    setLoading(true);
    const res = await fetch(`/api/link/${id}/delete`, {
      method: "DELETE",
    }).then((res) => res.json());
    if (res.error) {
      toast.error("Failed to delete link", {
        description: res.message,
      });
      setLoading(false);
      return;
    } else {
      toast.success("Your link has been deleted", {
        description: res.link,
      });
      router.refresh();
      setOpen(false);
      setLoading(false);
    }
  }
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

          <DialogFooter className="flex-col sm:flex-col">
            <div className="flex items-center justify-end gap-1">
              <DialogClose asChild>
                <Button disabled={loading} size="sm" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={deleteLink}
                disabled={loading}
                variant="destructive"
                size="sm"
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
              <div className="flex items-center gap-1 pt-2 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin " />
                Deleting link, please wait and don&apos;t close this dialog.
              </div>
            )}
          </DialogFooter>
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
          <Button
            onClick={deleteLink}
            disabled={loading}
            variant="destructive"
            size="sm"
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
            <div className="flex items-center gap-1 pt-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 min-w-4 animate-spin " />
              Deleting link, please wait and don&apos;t close this dialog.
            </div>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
