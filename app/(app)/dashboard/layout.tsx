import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { SubNavbar } from "@/components/sub-navbar";
import { validateRequest } from "@/lib/auth-helpers";

export default async function Layout({ children }: { children: ReactNode }) {
  const { session, user } = await validateRequest();
  if (!(session && user)) {
    redirect("/auth/login");
  }
  return (
    <div className="grid flex-1">
      {/* <Sidebar user={user} /> */}
      <SubNavbar user={user} />
      <div className="container mx-auto flex-1 px-4">
        <main className="py-6">{children}</main>
      </div>
    </div>
  );
}
