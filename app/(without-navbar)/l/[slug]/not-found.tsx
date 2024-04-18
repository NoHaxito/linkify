import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home, Sparkles } from "lucide-react";
import Link from "next/link";
export default function LinkNotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-[95%] max-w-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="size-8" />
            Losed in the space?
          </CardTitle>
          <CardDescription>
            This link doesn&apos;t exist or is no longer available.
          </CardDescription>
        </CardHeader>
        <CardFooter className="grid pb-0">
          <Link
            href="/"
            className={buttonVariants({
              variant: "secondary",
              size: "sm",
              className: "w-full",
            })}
          >
            <Home className="size-4" />
            Go home
          </Link>
          <Link
            href="/dashboard"
            className={buttonVariants({
              variant: "link",
              size: "sm",
              className: "w-full !text-muted-foreground hover:!text-primary",
            })}
          >
            or back to dashboard
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
