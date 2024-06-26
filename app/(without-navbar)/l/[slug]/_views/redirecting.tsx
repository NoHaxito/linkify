import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/prisma";
import {
  Link,
  LinkAnalytics,
  LinkAnalyticsVisit,
  LinkSettings,
} from "@prisma/client";
import { User } from "lucia";
import { Loader2 } from "lucide-react";
import { headers } from "next/headers";
import { redirect as nextRedirect } from "next/navigation";

export interface LinkProps extends Link {
  analytics: { link_id: string; visits: LinkAnalyticsVisit[] } | null;
  settings: LinkSettings | null;
}
async function saveAnalytics(
  link: LinkProps,
  user: User | null,
  saveAnalytics?: boolean,
) {
  if (saveAnalytics) {
    const headers_raw = headers();
    const countryInfo: Country = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/get-request-info`,
      {
        credentials: "same-origin",
        headers: {
          "x-forwarded-for": headers_raw.get("x-forwarded-for") ?? "",
        },
      },
    ).then((res) => res.json());
    if (!countryInfo.country || !countryInfo.countryCode) {
      return;
    }
    if (!link?.analytics) {
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
    } else {
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
    }
  }
}
export async function RedirectingView({ link }: { link: LinkProps }) {
  const { user } = await validateRequest();
  await saveAnalytics(link, user, true);
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
