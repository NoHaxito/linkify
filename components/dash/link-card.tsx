"use client";
import { format } from "@formkit/tempo";
import {
  BarChart3,
  Check,
  Copy,
  ExternalLink,
  Lock,
  Trash,
} from "lucide-react";
import NextLink from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import type { LinkProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { LinkAnalyticsDialog } from "./link-analytics-dialog";
import { LinkDeleteDialog } from "./link-delete-dialog";

export function LinkCard({ link }: { link: LinkProps }) {
  const { slug, createdAt, url, settings, analytics } = link;
  const { copied, copy } = useCopyToClipboard();
  const shortUrl = `${process.env.NEXT_PUBLIC_APP_URL}/l/${slug}`;
  const visitCount = analytics?.visits?.length ?? 0;
  const isPasswordProtected = !!settings?.password;

  const handleCopy = () => {
    copy(shortUrl);
  };

  return (
    <Card className="group transition-shadow hover:shadow-md">
      <CardHeader className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <CardTitle className="truncate font-semibold text-lg">
              {slug}
            </CardTitle>
            <CardDescription className="mt-1 break-all text-xs">
              {shortUrl}
            </CardDescription>
          </div>
          {isPasswordProtected && (
            <Lock className="mt-1 size-4 shrink-0 text-muted-foreground" />
          )}
        </div>
        <div className="flex items-center gap-4 text-muted-foreground text-xs">
          <span className="max-w-[200px] truncate" title={url}>
            {url}
          </span>
        </div>
      </CardHeader>
      <CardFooter className="flex items-center justify-between gap-2 p-4 pt-0">
        <div className="flex items-center gap-1">
          <Button
            className="size-8"
            onClick={handleCopy}
            size="icon"
            title="Copy link"
            variant="ghost"
          >
            {copied ? (
              <Check className="size-4 text-green-600" />
            ) : (
              <Copy className="size-4" />
            )}
          </Button>
          <LinkDeleteDialog id={link.id} slug={slug}>
            <Button
              className="size-8"
              size="icon"
              title="Delete link"
              variant="ghost"
            >
              <Trash className="size-4" />
            </Button>
          </LinkDeleteDialog>
          <Separator className="h-4" orientation="vertical" />
          <NextLink
            className={cn(
              "size-8",
              buttonVariants({
                variant: "ghost",
                size: "icon",
              })
            )}
            href={`/l/${slug}`}
            rel="noopener noreferrer"
            target="_blank"
            title="Open link"
          >
            <ExternalLink className="size-4" />
          </NextLink>
        </div>
        <div className="flex items-center gap-3">
          {visitCount > 0 && (
            <LinkAnalyticsDialog
              link={{
                ...link,
                analytics: link.analytics,
                settings: link.settings,
              }}
              slug={slug}
            >
              <Button className="h-8 gap-1.5 px-2" size="sm" variant="ghost">
                <BarChart3 className="size-3.5" />
                <span className="text-xs">{visitCount}</span>
              </Button>
            </LinkAnalyticsDialog>
          )}
          <Separator className="h-4" orientation="vertical" />
          <span className="whitespace-nowrap text-muted-foreground text-xs">
            {format(createdAt, "MMM D, YYYY")}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
