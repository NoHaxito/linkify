import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { FeaturesDialog } from "@/components/features-dialog";
import { Toaster } from "@/components/ui/sonner";
// import { AuthProvider } from "@/components/auth-provider";
// import { validateRequest } from "@/lib/auth";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Linkify",
  description: "Make your links mini mighty",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const auth = await validateRequest();
  // console.log(auth);
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <AuthProvider {...auth}> */}
          <div className="relative flex min-h-screen flex-col bg-background">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
          <FeaturesDialog />
          <Toaster />
          {/* </AuthProvider> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
