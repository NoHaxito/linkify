import { MainCreateLink } from "@/components/create-link";
import { validateRequest } from "@/lib/auth";

export default async function Home() {
  const { session, user } = await validateRequest();

  return (
    <div className="container relative">
      <div className="flex flex-col h-[calc(100vh-4rem)] w-full flex-1 items-center justify-center">
        <div className="flex flex-col gap-y-3 w-full h-full max-w-md items-center justify-center">
          <h1 className="font-bold text-3xl">Linkify</h1>
          <p className="text-center text-muted-foreground text-sm">
            Free, unlimited url shortener.
          </p>
          <MainCreateLink session={session} />
        </div>
      </div>
    </div>
  );
}
