import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { FeaturesDialog } from "@/components/features-dialog";
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Linkify",
  description: "Make your links mini mighty",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col bg-background">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
          <FeaturesDialog />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
