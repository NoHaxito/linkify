import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LinkCreateDialog } from "./link-create-dialog";

export function LinksEmptyState() {
  return (
    <div className="mt-4 flex h-[65vh] flex-1 items-center justify-center rounded-lg border border-dashed">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex flex-col items-center gap-2">
          <h3 className="font-bold text-2xl tracking-tight">No links yet</h3>
          <p className="max-w-sm text-muted-foreground text-sm">
            Get started by creating your first short link. Share it anywhere and
            track its performance.
          </p>
        </div>
        <LinkCreateDialog>
          <Button size="sm">
            <Plus className="size-4" />
            Create your first link
          </Button>
        </LinkCreateDialog>
      </div>
    </div>
  );
}
