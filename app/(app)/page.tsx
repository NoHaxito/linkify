import { LinkForm } from "@/components/forms/link-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { validateRequest } from "@/lib/auth-helpers";
import { generateRandomString } from "@/lib/utils";

export default async function Home() {
  const { session } = await validateRequest();
  const randomSlug = generateRandomString();
  return (
    <div className="container relative mx-auto px-4">
      <div className="flex min-h-[calc(100vh-4rem)] w-full flex-1 flex-col items-center justify-center py-8 md:py-12">
        <div className="flex w-full max-w-2xl flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-3 text-center">
            <h1 className="bg-linear-to-r from-foreground to-foreground/70 bg-clip-text font-bold text-4xl text-transparent tracking-tight md:text-5xl">
              Linkify
            </h1>
            <p className="text-base text-muted-foreground md:text-lg">
              Free, unlimited url shortener. Make your links mini mighty.
            </p>
          </div>
          <Card className="w-full border-2 shadow-lg">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl">Create your short link</CardTitle>
              <CardDescription>
                Enter a URL and customize your link with advanced options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LinkForm
                randomSlug={randomSlug}
                session={session ?? undefined}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
