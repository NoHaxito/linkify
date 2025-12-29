import type { Metadata } from "next";
import { SignInWithGithub } from "@/components/sign-in-with-github";

export const metadata: Metadata = {
  title: "Auth - Linkify",
  description: "Make your links mini mighty",
};

export default async function Home() {
  return (
    <div className="container relative">
      <div className="flex h-screen w-full flex-1 flex-col items-center justify-center">
        <div className="flex h-full w-full max-w-xs flex-col items-center justify-center gap-y-3">
          <div>
            <h1 className="text-center font-bold text-3xl">Linkify</h1>
            <p className="text-center text-muted-foreground text-sm">
              Free, unlimited url shortener.
            </p>
          </div>
          <SignInWithGithub />
        </div>
      </div>
    </div>
  );
}
