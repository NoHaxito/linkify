import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { CircleAlert, Loader2, Shield } from "lucide-react";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RedirectingView } from "./_views/redirecting";

export default async function LinkRedirectPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const link = await db.link.findUnique({
    where: {
      slug,
    },
    include: {
      settings: true,
    },
  });
  if (!link) return notFound();
  const { session } = await validateRequest();
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3">
      {!link.settings[0].allowUnauthenticated && !session ? (
        <>
          <Card className="w-[95%] max-w-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <CircleAlert className="size-8" />
                Unauthorized user
              </CardTitle>
              <CardDescription>
                You must be logged in to access this link
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full">Continue to login</Button>
            </CardFooter>
          </Card>
        </>
      ) : link.settings[0].password ? (
        <>
          <Card className="w-[95%] max-w-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Shield className="size-8 fill-current" />
                Link Protection
              </CardTitle>
              <CardDescription>
                This link is protected with password, enter the link password to
                access this.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Input type="password" required />
            </CardContent>
            <CardFooter>
              <Button className="w-full">Continue</Button>
            </CardFooter>
          </Card>
        </>
      ) : (
        <RedirectingView url={link.url} />
      )}
    </div>
  );
}
