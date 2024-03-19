import { DrawerDialogDemo } from "@/components/create-link-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { validateRequest } from "@/lib/auth";

export default async function Home() {
  const { session, user } = await validateRequest();
  return (
    <div className="container relative">
      <div className="flex flex-col h-[calc(100vh-4rem)] w-full flex-1 items-center justify-center">
        <div className="flex flex-col gap-y-3 w-full h-full max-w-md items-center justify-center">
          <h1 className="font-bold text-3xl">URL Shortener</h1>
          <p className="text-center text-muted-foreground text-sm">
            Free, unlimited url shortener.
          </p>
          <div className="w-full grid gap-y-2">
            <Label>URL to short:</Label>
            <Input placeholder="https://example.com" />
          </div>
          <div className="w-full grid gap-y-2">
            <Label>Slug:</Label>
            <Input placeholder="pepito" />
            <span className="text-xs text-muted-foreground">
              Your shortened link will be: https://example.com/pepito
            </span>
          </div>
          <DrawerDialogDemo />
        </div>
      </div>
    </div>
  );
}
