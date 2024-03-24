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
import { cn, slugify } from "@/lib/utils";
import { useEffect, useState } from "react";
import { CalendarIcon, Gem, Info, Loader2, PartyPopper } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFeaturesDialog } from "@/store/features-dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { addDay, format } from "@formkit/tempo";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
// import { useAuth } from "@/store/auth";

export const createLinkSchema = z.object({
  url: z.string().url().min(1),
  slug: z.string().min(1),
  expires_at: z.date().optional(),
  password: z.string().optional(),
  allowUnauthenticated: z.boolean().optional(),
});

export type CreateLinkSchema = z.infer<typeof createLinkSchema>;

export function LinkForm({
  randomSlug,
  session,
}: {
  randomSlug: string;
  session: Session | null;
}) {
  const [link, setLink] = useState<{
    success: boolean;
    link: string | null;
  }>({
    success: false,
    link: null,
  });
  const [advancedOptions, setAdvancedOptions] = useState({
    showExpireDate: true,
    passwordProtected: false,
  });
  const defaultExpireDate = addDay(new Date(), !session ? 7 : 30);
  const form = useForm<z.infer<typeof createLinkSchema>>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      url: "",
      slug: randomSlug,
      expires_at: defaultExpireDate,
      password: undefined,
      allowUnauthenticated: true,
    },
    mode: "all",
  });
  async function onSubmit(values: z.infer<typeof createLinkSchema>) {
    setLink({ success: false, link: null });
    if (
      advancedOptions.passwordProtected &&
      (!values.password || values.password.length === 0)
    ) {
      toast.error("Password is required", {
        description:
          "You enabled password protection but did not provide a password.",
      });
      return;
    }
    console.log(values);

    const res = await fetch("/api/link/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((res) => res.json());
    if (res.error) {
      toast.error("Failed to create link", {
        description: res.message,
      });
      return;
    } else {
      toast("Your link has been created", {
        description: res.link,
        icon: <PartyPopper className="h-4 w-4" />,
      });
    }
  }
  const setFeaturesDialog = useFeaturesDialog((state) => state.setOpen);
  useEffect(() => {
    const { showExpireDate, passwordProtected } = advancedOptions;
    if (!showExpireDate) {
      form.setValue("expires_at", undefined);
    } else {
      form.setValue("expires_at", defaultExpireDate);
    }
    if (!passwordProtected) {
      form.setValue("password", undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advancedOptions]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full gap-y-3 pb-2"
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
              <div className="relative">
                <FormControl>
                  <Input placeholder="my-slug" {...field} />
                </FormControl>
                <span className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-6"
                        >
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="mr-2 md:mr-0">
                        This could not be modified.
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </span>
              </div>
              <FormDescription>
                Your Linkify URL will be: <br />
                {process.env.NEXT_PUBLIC_APP_URL}/l/{slugify(field.value)}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="space-x-2 rounded-lg py-0">
              <span className="text-sm font-medium leading-6 text-foreground">
                Advanced Options
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-2 first:pt-5">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="custom-expires-date">Expire Date</Label>
                    <FormDescription className="text-xs">
                      Set an expiration date for your link.
                    </FormDescription>
                  </div>
                  <Switch
                    id="custom-expires-date"
                    checked={advancedOptions.showExpireDate}
                    onCheckedChange={(v) => {
                      if (!session) {
                        setFeaturesDialog(true);
                        return;
                      }
                      setAdvancedOptions({
                        ...advancedOptions,
                        showExpireDate: v,
                      });
                      // setCustomExpireDate(v);
                    }}
                  />
                </div>
                {advancedOptions.showExpireDate && (
                  <FormField
                    control={form.control}
                    name="expires_at"
                    render={({ field }) => (
                      <FormItem>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "D MMMM YYYY, HH:mm A")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto space-y-1 p-0"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date: Date) =>
                                date < new Date() ||
                                (!session && date > addDay(new Date(), 7))
                              }
                              initialFocus
                            />
                            <Input
                              type="time"
                              className="mt-2"
                              // take locale date time string in format that the input expects (24hr time)
                              value={field.value?.toLocaleTimeString([], {
                                hourCycle: "h23",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                              // take hours and minutes and update our Date object then change date object to our new value
                              onChange={(selectedTime) => {
                                const currentTime = field.value;
                                currentTime?.setHours(
                                  parseInt(
                                    selectedTime.target.value.split(":")[0],
                                  ),
                                  parseInt(
                                    selectedTime.target.value.split(":")[1],
                                  ),
                                  0,
                                );
                                field.onChange(currentTime);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="password-protected">
                      Password Protected
                    </Label>
                    <FormDescription className="text-xs">
                      Establish a password to protect your link from other
                      users.
                    </FormDescription>
                  </div>
                  <Switch
                    id="password-protected"
                    checked={advancedOptions.passwordProtected}
                    onCheckedChange={(v) => {
                      if (!session) {
                        setFeaturesDialog(true);
                        return;
                      }
                      // setPasswordProtected(v);
                      setAdvancedOptions({
                        ...advancedOptions,
                        passwordProtected: v,
                      });
                    }}
                  />
                </div>
                {advancedOptions.passwordProtected && (
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              <FormField
                control={form.control}
                name="allowUnauthenticated"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg">
                    <div className="space-y-0.5">
                      <FormLabel className="">
                        Allow unauthenticated users
                      </FormLabel>
                      <FormDescription className="text-xs">
                        Users will be able to access your link without an
                        account.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(e) => {
                          if (!session) {
                            setFeaturesDialog(true);
                            return;
                          }
                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

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

        {!session && (
          <Button
            type="button"
            onClick={() => setFeaturesDialog(true)}
            variant="link"
            className="w-full"
          >
            <Gem className="size-4" />
            Unlock all features
          </Button>
        )}
      </form>
    </Form>
  );
}
