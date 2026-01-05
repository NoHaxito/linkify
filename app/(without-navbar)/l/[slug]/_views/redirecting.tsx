import { Loader2 } from "lucide-react";
import { headers } from "next/headers";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { db, linkAnalytics, linkAnalyticsVisits } from "@/lib/db";
import { getIp } from "@/lib/get-request-ip";
import type { LinkProps } from "@/lib/types";
import { Redirector } from "./redirector";

export interface Country {
  country: string;
  countryCode: string;
}

async function saveAnalytics(link: LinkProps, saveAnalytics?: boolean) {
  const headersList = await headers();

  const forwardedFor = getIp(headersList);

  if (saveAnalytics) {
    const countryInfo: Country = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/get-request-info`,
      {
        credentials: "same-origin",
        headers: {
          "X-Forwarded-For": forwardedFor as string,
        },
      }
    ).then((res) => res.json());
    if (!(countryInfo.country && countryInfo.countryCode)) {
      return;
    }
    if (link?.analytics) {
      await db.insert(linkAnalyticsVisits).values({
        analyticsId: link.analytics.linkId,
        linkId: link.id,
        country: `${countryInfo.country} (${countryInfo.countryCode})`,
      });
    } else {
      await db.transaction(async (tx) => {
        await tx.insert(linkAnalytics).values({
          linkId: link.id,
        });
        await tx.insert(linkAnalyticsVisits).values({
          analyticsId: link.id,
          linkId: link.id,
          country: `${countryInfo.country} (${countryInfo.countryCode})`,
        });
      });
    }
  }
}
export async function RedirectingView({ link }: { link: LinkProps }) {
  await saveAnalytics(link, false);

  return (
    <Card className="w-[95%] max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Loader2 className="size-8 animate-spin" />
          Redirecting to link
        </CardTitle>
      </CardHeader>
      <Redirector link={link} />
    </Card>
  );
}

export interface Country {
  country: string;
  countryCode: string;
}
