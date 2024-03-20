import { Button } from "@/components/ui/button";
import { Home, Link2, LogOut } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 items-start md:grid md:grid-cols-[auto_minmax(0,1fr)] md:gap-6">
      <aside className="fixed left-0 top-[4rem] w-64 h-[calc(100vh-4rem)] shrink-0 -translate-x-[200%] border-r bg-background data-[open=true]:translate-x-0 md:sticky md:-ml-4 md:block md:translate-x-0 md:duration-300 dark:border-neutral-800 dark:bg-neutral-950 z-30 transition-[width,transform] transform duration-[1700ms] antialiased ease-in flex flex-col">
        <nav className="[scrollbar-gutter:stable] overflow-hidden overflow-y-auto h-full first:py-1.5 pr-2 px-3 overflow-x-hidden flex flex-1 flex-col gap-y-6 ">
          <ul className="flex flex-col gap-y-1">
            <li className="list-none">
              <Link
                data-state={"active"}
                className="transition-colors duration-300 max-h-[2.5rem] min-h-[2.5rem] px-3 data-[state=active]:text-foreground data-[state=active]:bg-secondary hover:bg-secondary rounded-lg text-muted-foreground hover:text-foreground group truncate w-full flex items-center text-sm outline-none ring-inset focus-visible:ring-2 focus-visible:rounded-lg py-2.5 gap-x-3"
                href="/dash"
              >
                <span>
                  <Home className="size-4 -ml-0.5 flex-none flex items-center justify-center" />
                </span>
                <div className="flex w-full items-center justify-between transition-opacity duration-[800ms]">
                  Dashboard
                  {/* {label ? <div>{label}</div> : null} */}
                </div>
              </Link>
            </li>
            <li className="list-none">
              <Link
                className="transition-colors duration-300 max-h-[2.5rem] min-h-[2.5rem] px-3 data-[state=active]:text-foreground data-[state=active]:bg-secondary hover:bg-secondary rounded-lg text-muted-foreground hover:text-foreground group truncate w-full flex items-center text-sm outline-none ring-inset focus-visible:ring-2 focus-visible:rounded-lg py-2.5 gap-x-3"
                href="/dash/links"
              >
                <span>
                  <Link2 className="size-4 -ml-0.5 flex-none flex items-center justify-center" />
                </span>
                <div className="flex w-full items-center justify-between transition-opacity duration-[800ms]">
                  Links
                  {/* {label ? <div>{label}</div> : null} */}
                </div>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="sticky flex items-center justify-between gap-x-2 bottom-2 px-3 w-full">
          <Button size="sm" className="justify-start flex-1" variant="ghost">
            <img
              src="https://api.dicebear.com/5.x/initials/svg?seed=Linkify"
              className="size-8 rounded-full"
            />
            NoHaxito
          </Button>
          <Button size="icon" className="size-9" variant="ghost">
            <LogOut />
          </Button>
        </div>
      </aside>
      {children}
    </div>
  );
}
