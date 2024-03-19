"use client";

import type { Session } from "lucia";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FeaturesDialog } from "./features-dialog";
import { generateRandomString, slugify } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Loader2, PartyPopper } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
const createLinkSchema = z.object({
  url: z.string().url().min(1),
  slug: z.string().min(1),
});

export function MainCreateLink({ session }: { session: Session | null }) {
  const [link, setLink] = useState({
    success: false,
    link: null,
  });
  const form = useForm<z.infer<typeof createLinkSchema>>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      url: "",
      slug: "",
    },
    mode: "all",
  });
  async function onSubmit(values: z.infer<typeof createLinkSchema>) {
    setLink({ success: false, link: null });
    const res = await fetch("/api/link/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((res) => res.json());
    setLink({ success: true, link: res.link });
  }
  useEffect(() => {
    const randomSlug = generateRandomString();
    form.setValue("slug", randomSlug);
  }, []);
  return (
    <>
      {link.success && (
        <Alert>
          <PartyPopper className="h-4 w-4" />
          <AlertTitle>Your link is ready!</AlertTitle>
          <AlertDescription className="text-muted-foreground text-sm">
            <a
              className="hover:underline underline-offset-2"
              target="_blank"
              rel="noreferrer"
              href={link.link}
            >
              {link.link}
            </a>
          </AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full grid gap-y-3"
        >
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="my-slug" {...field} />
                </FormControl>
                <FormDescription>
                  Your Linkify URL will be: <br />
                  {process.env.NEXT_PUBLIC_APP_URL}/{slugify(field.value)}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="w-full"
          >
            {form.formState.isSubmitting && (
              <Loader2 className="size-4 animate-spin" />
            )}
            Create Link
          </Button>

          {!session && <FeaturesDialog />}
        </form>
      </Form>
    </>
  );
}
