"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "@formkit/tempo";
import { Link } from "@prisma/client";

import {
  BarChart3,
  Check,
  Copy,
  ExternalLink,
  Pencil,
  Trash,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { toast } from "sonner";
import NextLink from "next/link";
import { cn } from "@/lib/utils";
import { LinkDeleteDialog } from "./link-delete-dialog";
import { LinkAnalyticsDialog } from "./link-analytics-dialog";
import { LinkProps } from "@/app/(without-navbar)/l/[slug]/_views/redirecting";

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
          disabled={copied}
          onClick={handleCopy}
          variant="ghost"
          className="size-6"
          size="icon"
        >
          {copied ? (
            <Check className="size-3.5" />
          ) : (
            <Copy className="size-3.5" />
          )}
        </Button>
        <Button variant="ghost" className="size-6" size="icon">
          <Pencil className="size-3.5" />
        </Button>
        <LinkDeleteDialog slug={slug} id={link.id}>
          <Button variant="ghost" className="size-6" size="icon">
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
            }),
          )}
          target="_blank"
          rel="noopener noreferrer"
          href={`/l/${slug}`}
        >
          <ExternalLink className="size-3.5" />
        </NextLink>
        <div className="ml-auto flex items-center gap-3">
          <LinkAnalyticsDialog
            link={{
              ...link,
              analytics: link.analytics,
              settings: link.settings,
            }}
            id={link.id}
            slug={slug}
          >
            <Button
              variant="link"
              size="xs"
              className="h-8 p-0 sm:after:content-['Analytics']"
            >
              <BarChart3 className="size-4" />
            </Button>
          </LinkAnalyticsDialog>
          <Separator className="h-4" orientation="vertical" />
          <span className="text-xs text-muted-foreground">
            {format(created_at, "D MMMM YYYY")}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
