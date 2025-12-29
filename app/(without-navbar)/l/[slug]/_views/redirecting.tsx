import type { Link, LinkAnalyticsVisit, LinkSettings } from "@prisma/client";

import { Loader2 } from "lucide-react";
import { redirect as nextRedirect } from "next/navigation";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/prisma";

export interface LinkProps extends Link {
  analytics: { link_id: string; visits: LinkAnalyticsVisit[] } | null;
  settings: LinkSettings | null;
}
async function saveAnalytics(link: LinkProps, saveAnalytics?: boolean) {
  if (saveAnalytics) {
    const countryInfo: Country = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/get-request-info`,
      {
        credentials: "same-origin",
      }
    ).then((res) => res.json());
    if (!(countryInfo.country && countryInfo.countryCode)) {
      return;
    }
    if (link?.analytics) {
      await db.linkAnalytics.update({
        where: {
          link_id: link!.id,
        },
        data: {
          visits: {
            create: {
              country: `${countryInfo.country} (${countryInfo.countryCode})`,
            },
          },
        },
        include: {
          link: {
            include: {
              settings: true,
              analytics: {
                include: {
                  visits: true,
                },
              },
            },
          },
        },
      });
    } else {
      await db.linkAnalytics.create({
        data: {
          link_id: link!.id,
          visits: {
            create: {
              country: `${countryInfo.country} (${countryInfo.countryCode})`,
            },
          },
        },
        include: {
          link: {
            include: {
              settings: true,
              analytics: true,
            },
          },
        },
      });
    }
  }
}
export async function RedirectingView({ link }: { link: LinkProps }) {
  await saveAnalytics(link, true);
  nextRedirect(link.url);
  return (
    <Card className="w-[95%] max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Loader2 className="size-8 animate-spin" />
          Redirecting to link
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export interface Country {
  country: string;
  countryCode: string;
}
