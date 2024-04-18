import { LinkCard } from "@/components/dash/link-card";
import { LinkCreateDialog } from "@/components/dash/link-create-dialog";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderDescription,
  PageHeaderTitle,
} from "@/components/dash/page-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { BarChart3, Copy, Pencil, Plus, Trash } from "lucide-react";

export default async function Home() {
  const { session } = await validateRequest();
  const links = await db.link.findMany({
    where: {
      user_id: session?.userId,
    },
    include: {
      settings: true,
      analytics: {
        include: {
          visits: true,
        },
      },
    },
  });
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>Links</PageHeaderTitle>
        <PageHeaderDescription>
          Manage all your links form here.
        </PageHeaderDescription>
        <PageHeaderActions>
          <LinkCreateDialog>
            <Button size="sm">
              <Plus className="size-4" />
              New link
            </Button>
          </LinkCreateDialog>
        </PageHeaderActions>
      </PageHeader>
      {links.length === 0 ? (
        <div className="mt-4 flex h-[65vh] flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no links created
            </h3>
            <p className="text-sm text-muted-foreground">
              Create a new link to get started.
            </p>
            <LinkCreateDialog>
              <Button size="sm">
                <Plus className="size-4" />
                New link
              </Button>
            </LinkCreateDialog>
          </div>
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <LinkCard
              key={link.id}
              link={{
                ...link,
                analytics: link.analytics,
                settings: link.settings,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
