import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TelemetryTracker from "@/components/TelemetryTracker";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ensureSeedData } from "@/lib/prisma";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ABC Technologies | Enterprise Custom Software & AI Engineering Studio",
  description: "ABC Technologies is a premier custom software engineering and digital transformation studio specializing in enterprise web applications, AI & LLM integration, and cloud-native DevOps.",
  keywords: ["ABC Technologies", "Custom Software Engineering", "AI Integration", "Cloud DevOps", "Next.js Development", "Enterprise Software Studio"],
  openGraph: {
    title: "ABC Technologies | Custom Software & AI Studio",
    description: "Architecting modern, resilient, and intelligent digital solutions for startups and enterprises.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Ensure database is seeded with default articles & admin user on app initialization
  await ensureSeedData();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col selection:bg-blue-500 selection:text-white">
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem>
          <TelemetryTracker />
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
