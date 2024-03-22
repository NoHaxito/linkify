import { CreateLinkForm } from "@/components/forms/create-link";
import { validateRequest } from "@/lib/auth";
import { generateRandomString } from "@/lib/utils";

export default async function Home() {
  const { session, user } = await validateRequest();
  const randomSlug = generateRandomString();
  return (
    <div className="container relative">
      <div className="flex h-[calc(100vh-4rem)] w-full flex-1 flex-col items-center justify-center">
        <div className="flex h-full w-full max-w-md flex-col items-center justify-center gap-y-3">
          <h1 className="text-3xl font-bold">Linkify</h1>
          <p className="text-center text-sm text-muted-foreground">
            Free, unlimited url shortener.
          </p>
          <div className="max-h-96 w-full pb-10">
            <CreateLinkForm randomSlug={randomSlug} session={session} />
          </div>
        </div>
      </div>
    </div>
  );
}
