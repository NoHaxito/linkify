"use client";
import { format } from "@formkit/tempo";
import { CalendarFold, Globe, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { LinkProps } from "@/app/(without-navbar)/l/[slug]/_views/redirecting";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export function LinkAnalyticsDialog({
  children,
  slug,
  link,
}: {
  children: React.ReactNode;
  slug: string;
  link: LinkProps;
}) {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [analytics, setAnalytics] = useState<{
    perDay: { day: string; count: number }[];
    perCountry: { country: string; count: number }[];
  }>({
    perDay: [],
    perCountry: [],
  });
  useEffect(() => {
    if (!open) {
      return;
    }
    const dateCounts: Record<string, number> = {};
    const countryCounts: Record<string, number> = {};

    if (link?.analytics?.visits) {
      for (const item of link.analytics.visits) {
        // Extraer solo la fecha del objeto de fecha y hora
        const date = format(item.visited_at, "D/MM/YYYY");
        const country = item.country.split("(")[0].trim();
        // Incrementar el contador para esa fecha
        if (dateCounts[date]) {
          dateCounts[date]++;
        } else {
          dateCounts[date] = 1;
        }
        if (countryCounts[country]) {
          countryCounts[country]++;
        } else {
          countryCounts[country] = 1;
        }
      }
    }
    const formattedDateCounts = Object.keys(dateCounts).map((day) => {
      return { day, count: dateCounts[day] };
    });
    const formattedDateCountries = Object.keys(countryCounts).map((country) => {
      return { country, count: countryCounts[country] };
    });

    setAnalytics({
      perDay: formattedDateCounts,
      perCountry: formattedDateCountries,
    });

    setLoading(false);
  }, [open, link?.analytics?.visits.forEach, link?.analytics?.visits]);

  if (isDesktop) {
    return (
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-h-[90%] overflow-auto pt-0 pb-0 sm:max-w-2xl">
          <DialogHeader className="sticky -top-0.5 z-10 bg-background pt-6">
            <DialogTitle>Analytics</DialogTitle>
            <DialogDescription>
              Viewing analytics for link <strong>{slug}</strong>
            </DialogDescription>
          </DialogHeader>
          {loading ? (
            <Loader2 className="size-6 animate-spin" />
          ) : (
            <div className="overflow-auto">
              <Tabs defaultValue="day" variant="underline">
                <TabsList className="w-full justify-start rounded-none border-b">
                  <TabsTrigger
                    disabled={link.analytics?.visits.length === 0}
                    value="day"
                  >
                    <CalendarFold className="size-4" />
                    Per Day
                  </TabsTrigger>
                  <TabsTrigger
                    disabled={link.analytics?.visits.length === 0}
                    value="country"
                  >
                    <Globe className="size-4" />
                    Per Country
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="day">
                  <div className="mt-3 h-80">
                    {analytics.perDay.length === 0 ? (
                      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-muted">
                        No analytics found
                      </div>
                    ) : (
                      <ResponsiveContainer height="100%" width="100%">
                        <BarChart data={analytics?.perDay}>
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip
                            content={({ active, payload, label }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="overflow-hidden">
                                    <div className="rounded-lg border bg-popover p-2">
                                      <p className="font-bold text-md">
                                        {label}
                                      </p>
                                      <span className="text-sm">
                                        {payload[0].value} visits
                                      </span>
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            }}
                            cursor={{
                              fill: "hsl(var(--accent))",
                            }}
                          />
                          <Bar
                            dataKey="count"
                            style={
                              {
                                fill: "hsl(var(--foreground))",
                                opacity: 0.9,
                              } as React.CSSProperties
                            }
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="country">
                  <div className="mt-3 h-80">
                    {analytics.perCountry.length === 0 ? (
                      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-muted">
                        No analytics found
                      </div>
                    ) : (
                      <ResponsiveContainer height="100%" width="100%">
                        <BarChart data={analytics?.perCountry}>
                          <XAxis dataKey="country" />
                          <YAxis />
                          <Tooltip
                            content={({ active, payload, label }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="overflow-hidden">
                                    <div className="rounded-lg border bg-popover p-2">
                                      <p className="font-bold text-md">
                                        {label}
                                      </p>
                                      <span className="text-sm">
                                        {payload[0].value} visits
                                      </span>
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            }}
                            cursor={{
                              fill: "hsl(var(--accent))",
                            }}
                          />
                          <Bar
                            dataKey="count"
                            style={
                              {
                                fill: "hsl(var(--foreground))",
                                opacity: 0.9,
                              } as React.CSSProperties
                            }
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
              <h3 className="my-2 font-bold text-lg">All time data</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Country</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {link.analytics?.visits.length === 0 ? (
                    <TableRow>
                      <TableCell className="h-16 text-center" colSpan={3}>
                        No analytics found
                      </TableCell>
                    </TableRow>
                  ) : (
                    link.analytics?.visits.map((visit) => (
                      <TableRow key={visit.id}>
                        <TableCell>{visit.country}</TableCell>
                        <TableCell className="text-right">
                          {format(visit.visited_at, "D MMMM YYYY")}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
          <DialogFooter className="sticky bottom-0 bg-background py-2">
            <p className="text-muted-foreground text-sm">
              This analytics may not be accurate
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="max-h-[96%]">
        <DrawerHeader className="text-left">
          <DrawerTitle>Analytics</DrawerTitle>
          <DrawerDescription>
            Viewing link analytics for <strong>{slug}</strong>
          </DrawerDescription>
        </DrawerHeader>
        {loading ? (
          <div className="flex h-36 w-full items-center justify-center">
            <Loader2 className="size-6 animate-spin" />
          </div>
        ) : (
          <div className="overflow-auto px-3">
            <Tabs defaultValue="day" variant="underline">
              <TabsList>
                <TabsTrigger
                  disabled={link.analytics?.visits.length === 0}
                  value="day"
                >
                  <CalendarFold className="size-4" />
                  Per Day
                </TabsTrigger>
                <TabsTrigger
                  disabled={link.analytics?.visits.length === 0}
                  value="country"
                >
                  <Globe className="size-4" />
                  Per Country
                </TabsTrigger>
              </TabsList>
              <TabsContent value="day">
                <div className="mt-3 h-80">
                  {analytics.perDay.length === 0 ? (
                    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-muted">
                      No analytics found
                    </div>
                  ) : (
                    <ResponsiveContainer height="100%" width="100%">
                      <BarChart data={analytics?.perDay}>
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="overflow-hidden">
                                  <div className="rounded-lg border bg-popover p-2">
                                    <p className="font-bold text-md">{label}</p>
                                    <span className="text-sm">
                                      {payload[0].value} visits
                                    </span>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                          cursor={{
                            fill: "hsl(var(--accent))",
                          }}
                        />
                        <Bar
                          dataKey="count"
                          style={
                            {
                              fill: "hsl(var(--foreground))",
                              opacity: 0.9,
                            } as React.CSSProperties
                          }
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="country">
                <div className="mt-3 h-80">
                  {analytics.perCountry.length === 0 ? (
                    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-muted">
                      No analytics found
                    </div>
                  ) : (
                    <ResponsiveContainer height="100%" width="100%">
                      <BarChart data={analytics?.perCountry}>
                        <XAxis dataKey="country" />
                        <YAxis />
                        <Tooltip
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="overflow-hidden">
                                  <div className="rounded-lg border bg-popover p-2">
                                    <p className="font-bold text-md">{label}</p>
                                    <span className="text-sm">
                                      {payload[0].value} visits
                                    </span>
                                  </div>
                                </div>
                              );
                            }
                            return null;
                          }}
                          cursor={{
                            fill: "hsl(var(--accent))",
                          }}
                        />
                        <Bar
                          dataKey="count"
                          style={
                            {
                              fill: "hsl(var(--foreground))",
                              opacity: 0.9,
                            } as React.CSSProperties
                          }
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            <h3 className="my-2 font-bold text-lg">All time data</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Country</TableHead>
                  <TableHead className="text-right">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {link.analytics?.visits.length === 0 ? (
                  <TableRow>
                    <TableCell className="h-16 text-center" colSpan={3}>
                      No analytics found
                    </TableCell>
                  </TableRow>
                ) : (
                  link.analytics?.visits.map((visit) => (
                    <TableRow key={visit.id}>
                      <TableCell>{visit.country}</TableCell>
                      <TableCell className="text-right">
                        {format(visit.visited_at, "D MMMM YYYY")}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
        <DrawerFooter className="">
          <p className="text-muted-foreground text-sm">
            This analytics may not be accurate
          </p>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
