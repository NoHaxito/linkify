"use client";
import { format } from "@formkit/tempo";
import {
  BarChart3,
  Check,
  Copy,
  ExternalLink,
  Pencil,
  Trash,
} from "lucide-react";
import NextLink from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import type { LinkProps } from "@/app/(without-navbar)/l/[slug]/_views/redirecting";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { LinkAnalyticsDialog } from "./link-analytics-dialog";
import { LinkDeleteDialog } from "./link-delete-dialog";

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

export function LinkCard({ link }: { link: LinkProps }) {
  const { slug, created_at } = link;
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    copyToClipboard(`${process.env.NEXT_PUBLIC_APP_URL}/l/${slug}`);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <Card>
      <CardHeader className="space-y-0 p-3">
        <CardTitle className="text-lg">{slug}</CardTitle>
        <CardDescription className="text-xs">
          {process.env.NEXT_PUBLIC_APP_URL}/l/{slug}
        </CardDescription>
      </CardHeader>
      <CardFooter className="p-3">
        <Button
          className="size-6"
          disabled={copied}
          onClick={handleCopy}
          size="icon"
          variant="ghost"
        >
          {copied ? (
            <Check className="size-3.5" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </Button>
        <Button className="size-6" size="icon" variant="ghost">
          <Pencil className="size-3.5" />
        </Button>
        <LinkDeleteDialog id={link.id} slug={slug}>
          <Button className="size-6" size="icon" variant="ghost">
            <Trash className="size-3.5" />
          </Button>
        </LinkDeleteDialog>
        <Separator className="h-4" orientation="vertical" />
        <NextLink
          className={cn(
            "size-6",
            buttonVariants({
              variant: "ghost",
              size: "icon",
              className: "h-6 w-6",
            })
          )}
          href={`/l/${slug}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <ExternalLink className="size-3.5" />
        </NextLink>
        <div className="ml-auto flex items-center gap-3">
          <LinkAnalyticsDialog
            id={link.id}
            link={{
              ...link,
              analytics: link.analytics,
              settings: link.settings,
            }}
            slug={slug}
          >
            <Button
              className="h-8 p-0 sm:after:content-['Analytics']"
              size="xs"
              variant="link"
            >
              <BarChart3 className="size-4" />
            </Button>
          </LinkAnalyticsDialog>
          <Separator className="h-4" orientation="vertical" />
          <span className="text-muted-foreground text-xs">
            {format(created_at, "D MMMM YYYY")}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
