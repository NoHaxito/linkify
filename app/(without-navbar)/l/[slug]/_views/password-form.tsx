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

export function PasswordForm({ slug }: { slug: string }) {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password) {
      toast.error("Password is required");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`/api/link/${slug}/verify-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.error) {
        toast.error(data.message || "Incorrect password");
        return;
      }

      if (data.success) {
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong, please try again");
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
