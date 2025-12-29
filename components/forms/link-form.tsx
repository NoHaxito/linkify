"use client";

import { addDay, format } from "@formkit/tempo";
import { zodResolver } from "@hookform/resolvers/zod";

import { CalendarIcon, Gem, Info, Loader2, PartyPopper } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createLink } from "@/lib/api";
import type { Session } from "@/lib/auth";
import { cn, slugify } from "@/lib/utils";
import type { LinkFormData } from "@/lib/validations";
import { linkSchema } from "@/lib/validations";
import { useFeaturesDialog } from "@/store/features-dialog";

export function LinkForm({
  randomSlug,
  session,
  closeDialogButton,
  callback,
}: {
  randomSlug: string;
  session: Session | undefined;
  loggedIn?: boolean;
  closeDialogButton?: React.ReactNode;
  callback?: () => void;
}) {
  const router = useRouter();
  const [advancedOptions, setAdvancedOptions] = useState({
    showExpireDate: true,
    passwordProtected: false,
  });
  const defaultExpireDate = addDay(new Date(), session ? 30 : 7);
  const form = useForm<LinkFormData>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      url: "",
      slug: randomSlug,
      expires_at: defaultExpireDate,
      password: undefined,
      allowUnauthenticated: true,
    },
    mode: "all",
  });
  async function onSubmit(values: LinkFormData) {
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

    try {
      const data = await createLink({
        ...values,
        password: values.password || undefined,
        expires_at: values.expires_at?.toISOString(),
      });

      toast.success("Your link has been created", {
        description: data.link,
        icon: <PartyPopper className="h-4 w-4" />,
      });

      if (callback) {
        callback();
      }
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Failed to create link", {
          description: error.message,
        });
      } else {
        toast.error("Failed to create link", {
          description: "Something went wrong, please try again.",
        });
      }
    }
  }
  const setFeaturesDialog = useFeaturesDialog((state) => state.setOpen);
  useEffect(() => {
    const { showExpireDate, passwordProtected } = advancedOptions;
    if (showExpireDate) {
      form.setValue("expires_at", defaultExpireDate);
    } else {
      form.setValue("expires_at", undefined);
    }
    if (!passwordProtected) {
      form.setValue("password", undefined);
    }
  }, [advancedOptions, defaultExpireDate, form]);
  return (
    <Form {...form}>
      <form
        className="grid w-full gap-y-3 overflow-hidden pb-2"
        onSubmit={form.handleSubmit(onSubmit)}
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
                <span className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center justify-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          className="size-6"
                          size="icon"
                          type="button"
                          variant="ghost"
                        >
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="z-50 mr-2 md:mr-0">
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
        <Accordion collapsible type="single">
          <AccordionItem className="border-none" value="item-1">
            <AccordionTrigger className="space-x-2 rounded-lg py-0">
              <span className="font-medium text-foreground text-sm leading-6">
                Advanced Options
              </span>
            </AccordionTrigger>
            <AccordionContent className="space-y-2 first:pt-5">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="custom-expires-date">Expire Date</Label>
                    <p className="text-muted-foreground text-xs">
                      Set an expiration date for your link.
                    </p>
                  </div>
                  <Switch
                    checked={advancedOptions.showExpireDate}
                    id="custom-expires-date"
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
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                                variant={"outline"}
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
                            align="start"
                            className="w-auto space-y-1 p-0"
                          >
                            <Calendar
                              disabled={(date: Date) =>
                                date < new Date() ||
                                (!session && date > addDay(new Date(), 7))
                              }
                              initialFocus
                              mode="single"
                              onSelect={field.onChange}
                              selected={field.value}
                            />
                            <Input
                              className="mt-2"
                              onChange={(selectedTime) => {
                                const currentTime = field.value;
                                if (currentTime) {
                                  const [hours, minutes] =
                                    selectedTime.target.value
                                      .split(":")
                                      .map((val) => Number.parseInt(val, 10));
                                  currentTime.setHours(
                                    hours ?? 0,
                                    minutes ?? 0,
                                    0
                                  );
                                  field.onChange(currentTime);
                                }
                              }}
                              // take locale date time string in format that the input expects (24hr time)
                              type="time"
                              // take hours and minutes and update our Date object then change date object to our new value
                              value={field.value?.toLocaleTimeString([], {
                                hourCycle: "h23",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
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
                    <p className="text-muted-foreground text-xs">
                      Establish a password to protect your link from other
                      users.
                    </p>
                  </div>
                  <Switch
                    checked={advancedOptions.passwordProtected}
                    id="password-protected"
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
                            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                            type="password"
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
        <div className="flex flex-col gap-1">
          <Button
            className="w-full"
            disabled={form.formState.isSubmitting}
            type="submit"
          >
            {form.formState.isSubmitting && (
              <Loader2 className="size-4 animate-spin" />
            )}
            Create Link
          </Button>
          {closeDialogButton}
        </div>
        {!session && (
          <Button
            className="w-full"
            onClick={() => setFeaturesDialog(true)}
            type="button"
            variant="link"
          >
            <Gem className="size-4" />
            Unlock all features
          </Button>
        )}
      </form>
    </Form>
  );
}
