import { eq } from "drizzle-orm";
import { Plus } from "lucide-react";
import { LinkCard } from "@/components/dash/link-card";
import { LinkCreateDialog } from "@/components/dash/link-create-dialog";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderDescription,
  PageHeaderTitle,
} from "@/components/dash/page-header";
import { Button } from "@/components/ui/button";
import { validateRequest } from "@/lib/auth-helpers";
import {
  db,
  linkAnalytics,
  linkAnalyticsVisits,
  linkSettings,
  links,
} from "@/lib/db";

export default async function Home() {
  const { session } = await validateRequest();
  const userLinksData = await db
    .select({
      link: links,
      settings: linkSettings,
      analytics: linkAnalytics,
    })
    .from(links)
    .leftJoin(linkSettings, eq(links.id, linkSettings.linkId))
    .leftJoin(linkAnalytics, eq(links.id, linkAnalytics.linkId))
    .where(eq(links.userId, session?.user?.id ?? ""));

  const userLinks = await Promise.all(
    userLinksData.map(async (linkRow) => {
      const visits = linkRow.analytics
        ? await db
            .select()
            .from(linkAnalyticsVisits)
            .where(
              eq(linkAnalyticsVisits.analyticsId, linkRow.analytics.linkId)
            )
        : [];

      return {
        ...linkRow.link,
        settings: linkRow.settings,
        analytics: linkRow.analytics
          ? {
              ...linkRow.analytics,
              visits,
            }
          : null,
      };
    })
  );
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
      {userLinks.length === 0 ? (
        <div className="mt-4 flex h-[65vh] flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="font-bold text-2xl tracking-tight">
              You have no links created
            </h3>
            <p className="text-muted-foreground text-sm">
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
          {userLinks.map((link) => (
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
