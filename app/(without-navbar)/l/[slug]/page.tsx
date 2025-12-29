import { CircleAlert } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { validateRequest } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { PasswordForm } from "./_views/password-form";
import { RedirectingView } from "./_views/redirecting";

export default async function LinkRedirectPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;

  const { slug } = params;

  const link = await db.link.findUnique({
    where: {
      slug,
    },
    include: {
      settings: true,
      analytics: {
        include: {
          visits: true,
        },
      },
    },
  });
  if (!link) {
    return notFound();
  }
  const { session } = await validateRequest();
  const isAuthorized = link.settings?.allowUnauthenticated || session;
  const hasPassword = !!link.settings?.password;
  const cookieStore = await cookies();
  const isPasswordVerified =
    cookieStore.get(`link_verified_${slug}`)?.value === "true";

  let content: React.ReactNode;
  if (!isAuthorized) {
    content = (
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
          <Button asChild className="w-full">
            <Link href="/auth/login">Continue to login</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  } else if (hasPassword && !isPasswordVerified) {
    content = <PasswordForm slug={slug} />;
  } else {
    content = (
      <RedirectingView
        link={{
          ...link,
          analytics: link.analytics,
          settings: link.settings,
        }}
      />
    );
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3">
      {content}
    </div>
  );
}
