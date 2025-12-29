"use client";

import { Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
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
import { verifyPassword } from "@/lib/api";

export function PasswordForm({ slug }: { slug: string }) {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) {
      return;
    }

    setIsLoading(true);
    try {
      await verifyPassword(slug, password);
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Incorrect password");
      } else {
        toast.error("Something went wrong, please try again");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
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
      <form onSubmit={handleSubmit}>
        <CardContent className="grid gap-4">
          <Input
            disabled={isLoading}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            type="password"
            value={password}
          />
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading ? "Verifying..." : "Continue"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
