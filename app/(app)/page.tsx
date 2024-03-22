import { CreateLinkForm } from "@/components/forms/create-link";
import { validateRequest } from "@/lib/auth";
import { generateRandomString } from "@/lib/utils";

export default async function Home() {
  const { session, user } = await validateRequest();
  const randomSlug = generateRandomString();
  return (
    <div className="container relative">
      <div className="flex flex-col h-[calc(100vh-4rem)] w-full flex-1 items-center justify-center">
        <div className="flex flex-col gap-y-3 w-full h-full max-w-md items-center justify-center">
          <h1 className="font-bold text-3xl">Linkify</h1>
          <p className="text-center text-muted-foreground text-sm">
            Free, unlimited url shortener.
          </p>
          <div className="max-h-96 pb-10">
            <CreateLinkForm randomSlug={randomSlug} session={session} />
          </div>
        </div>
      </div>
    </div>
  );
}
