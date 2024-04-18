"use client";
import * as React from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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

import { CalendarFold, Globe, Loader2, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { LinkProps } from "@/app/(without-navbar)/l/[slug]/_views/redirecting";
import { format } from "@formkit/tempo";

export function LinkAnalyticsDialog({
  children,
  slug,
  id,
  link,
}: {
  children: React.ReactNode;
  slug: string;
  id: string;
  link: LinkProps;
}) {
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [analytics, setAnalytics] = React.useState<{
    perDay: { day: string; count: number }[];
    perCountry: { country: string; count: number }[];
  }>({
    perDay: [],
    perCountry: [],
  });
  React.useEffect(() => {
    if (!open) return;
    const dateCounts: Record<string, number> = {};
    const countryCounts: Record<string, number> = {};

    link?.analytics?.visits.forEach((item) => {
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
    });
    const formattedDateCounts = Object.keys(dateCounts).map((day) => {
      return { day: day, count: dateCounts[day] };
    });
    const formattedDateCountries = Object.keys(countryCounts).map((country) => {
      return { country: country, count: countryCounts[country] };
    });

    setAnalytics({
      perDay: formattedDateCounts,
      perCountry: formattedDateCountries,
    });

    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-h-[90%] overflow-auto pb-0 pt-0 sm:max-w-2xl">
          <DialogHeader className="sticky -top-0.5 z-10 bg-background py-6">
            <DialogTitle>Analytics</DialogTitle>
            <DialogDescription>
              Viewing analytics for link <strong>{slug}</strong>
            </DialogDescription>
          </DialogHeader>
          {loading ? (
            <Loader2 className="size-6 animate-spin" />
          ) : (
            <div className="overflow-auto">
              <Tabs variant="underline" defaultValue="day">
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
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analytics?.perDay}>
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip
                            cursor={{
                              fill: "hsl(var(--accent))",
                            }}
                            content={({ active, payload, label }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="overflow-hidden">
                                    <div className="rounded-lg border bg-popover p-2">
                                      <p className="text-md font-bold">
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
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={analytics?.perCountry}>
                          <XAxis dataKey="country" />
                          <YAxis />
                          <Tooltip
                            cursor={{
                              fill: "hsl(var(--accent))",
                            }}
                            content={({ active, payload, label }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="overflow-hidden">
                                    <div className="rounded-lg border bg-popover p-2">
                                      <p className="text-md font-bold">
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
              <h3 className="my-2 text-lg font-bold">All time data</h3>
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
                      <TableCell colSpan={3} className="h-16 text-center">
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
            <p className="text-sm text-muted-foreground">
              This analytics may not be accurate
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
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
            <Tabs variant="underline" defaultValue="day">
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
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analytics?.perDay}>
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip
                          cursor={{
                            fill: "hsl(var(--accent))",
                          }}
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="overflow-hidden">
                                  <div className="rounded-lg border bg-popover p-2">
                                    <p className="text-md font-bold">{label}</p>
                                    <span className="text-sm">
                                      {payload[0].value} visits
                                    </span>
                                  </div>
                                </div>
                              );
                            }
                            return null;
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
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analytics?.perCountry}>
                        <XAxis dataKey="country" />
                        <YAxis />
                        <Tooltip
                          cursor={{
                            fill: "hsl(var(--accent))",
                          }}
                          content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="overflow-hidden">
                                  <div className="rounded-lg border bg-popover p-2">
                                    <p className="text-md font-bold">{label}</p>
                                    <span className="text-sm">
                                      {payload[0].value} visits
                                    </span>
                                  </div>
                                </div>
                              );
                            }
                            return null;
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
            <h3 className="my-2 text-lg font-bold">All time data</h3>
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
                    <TableCell colSpan={3} className="h-16 text-center">
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
          <p className="text-sm text-muted-foreground">
            This analytics may not be accurate
          </p>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
