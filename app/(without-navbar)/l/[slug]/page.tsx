import { eq } from "drizzle-orm";
import { CircleAlert } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { validateRequest } from "@/lib/auth-helpers";
import {
  db,
  linkAnalytics,
  linkAnalyticsVisits,
  linkSettings,
  links,
} from "@/lib/db";
import type { LinkProps } from "@/lib/types";
import { PasswordForm } from "./_views/password-form";
import { RedirectingView } from "./_views/redirecting";

export default async function LinkRedirectPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;

  const { slug } = params;

  const linkResult = await db
    .select({
      link: links,
      settings: linkSettings,
      analytics: linkAnalytics,
    })
    .from(links)
    .leftJoin(linkSettings, eq(links.id, linkSettings.linkId))
    .leftJoin(linkAnalytics, eq(links.id, linkAnalytics.linkId))
    .where(eq(links.slug, slug))
    .limit(1);

  if (linkResult.length === 0) {
    return notFound();
  }

  const linkData = linkResult[0];

  const visits = linkData.analytics
    ? await db
        .select()
        .from(linkAnalyticsVisits)
        .where(eq(linkAnalyticsVisits.analyticsId, linkData.analytics.linkId))
    : [];

  const link: LinkProps = {
    ...linkData.link,
    settings: linkData.settings,
    analytics: linkData.analytics
      ? {
          ...linkData.analytics,
          visits,
        }
      : null,
  };
  const { session } = await validateRequest();
  const isAuthorized = link.settings?.allowUnauthenticated || session;
  const hasPassword = !!link.settings?.password;
  const cookieStore = await cookies();
  const isPasswordVerified =
    cookieStore.get(`link_verified_${slug}`)?.value === "true";

  let content: React.ReactNode;
  if (!isAuthorized) {
    content = (
      <Card className="w-[95%] max-w-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <CircleAlert className="size-8" />
            Unauthorized user
          </CardTitle>
          <CardDescription>
            You must be logged in to access this link
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/auth/login">Continue to login</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  } else if (hasPassword && !isPasswordVerified) {
    content = <PasswordForm slug={slug} />;
  } else {
    content = (
      <RedirectingView
        link={{
          ...link,
          analytics: link.analytics,
          settings: link.settings,
        }}
      />
    );
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3">
      {content}
    </div>
  );
}
