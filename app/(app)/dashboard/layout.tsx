import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { validateRequest } from "@/lib/auth";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { buttonVariants } from "@/components/ui/button";
import { Home, Settings } from "lucide-react";

export default async function Layout({ children }: { children: ReactNode }) {
  const { session, user } = await validateRequest();
  if (!session || !user) {
    redirect("/auth/login");
  }
  return (
    <div className="grid flex-1">
      {/* <Sidebar user={user} /> */}
      <nav className="container mx-auto border-b">
        <ul className="flex items-center gap-3">
          <li className="flex items-center gap-2 border-b-2 border-foreground px-3 py-2 text-sm">
            <Home className="size-4" />
            Home
          </li>
          <li className="flex items-center gap-2 border-b-2 border-foreground px-3 py-2 text-sm">
            <Settings className="size-4" />
            Settings
          </li>
        </ul>
      </nav>
      <div className="container mx-auto flex-1">
        <main className="py-6">{children}</main>
      </div>
    </div>
  );
}
