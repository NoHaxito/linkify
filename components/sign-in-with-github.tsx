"use client";

import { authClient } from "@/lib/auth-client";
import GithubIcon from "./icons/github";
import { Button } from "./ui/button";

export function SignInWithGithub() {
  return (
    <Button
      className="w-full"
      onClick={() => authClient.signIn.social({ provider: "github" })}
    >
      <GithubIcon className="size-4" />
      Sign in with GitHub
    </Button>
  );
}
