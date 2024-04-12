import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

export function RedirectingView({ url }: { url: string }) {
  redirect(url);

  return (
    <Card className="w-[95%] max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Loader2 className="size-8 animate-spin" />
          Redirecting to link
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
