import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CaseStudyShell } from "@/components/CaseStudyShell";
import { themeBootScript } from "@/lib/theme";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "AJ Marksberry",
  description: "Product design portfolio",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="min-h-full bg-background text-ink">
        <CaseStudyShell>{children}</CaseStudyShell>
      </body>
    </html>
  );
}
