import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { validateRequest } from "@/lib/auth-helpers";

export async function GET() {
  const { session } = await validateRequest();
  if (!session) {
    return redirect("/auth/login");
  }
  await auth.api.signOut({
    headers: await import("next/headers").then((m) => m.headers()),
  });
  return redirect("/auth/login");
}
