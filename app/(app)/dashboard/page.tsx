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
      <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {links.map((link) => (
          <LinkCard key={link.id} {...link} />
        ))}
      </div>
    </>
  );
}
