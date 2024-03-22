import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { validateRequest } from "@/lib/auth";

export default async function Layout({ children }: { children: ReactNode }) {
  const { session, user } = await validateRequest();
  if (!session || !user) {
    redirect("/auth/login");
  }
  return (
    <div className="container mx-auto flex-1 items-start md:grid md:grid-cols-[auto_minmax(0,1fr)] md:gap-6">
      <Sidebar user={user} />
      <main className="p-4">{children}</main>
    </div>
  );
}
