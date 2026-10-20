import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CaseStudyShell } from "@/components/CaseStudyShell";
import { DEFAULT_THEME, SHOW_THEME_TOGGLE } from "@/lib/site";
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
    // suppressHydrationWarning: the inline script below may change data-theme on
    // <html> before React hydrates it.
    <html
      lang="en"
      data-theme={DEFAULT_THEME}
      // Next 16 stops overriding the global scroll-behavior: smooth on route changes
      // unless told to; with this, a new page opens at the top instantly instead of
      // visibly scrolling up. Smooth scrolling is kept for in-page jumps.
      data-scroll-behavior="smooth"
      className={`dark ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      {SHOW_THEME_TOGGLE ? (
        <head>
          {/* Applies a saved choice before first paint, so a returning visitor
           * never sees a flash of the default theme. */}
          <script
            dangerouslySetInnerHTML={{
              __html: `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`,
            }}
          />
        </head>
      ) : null}
      <body className="min-h-full bg-background text-ink">
        <CaseStudyShell>{children}</CaseStudyShell>
      </body>
    </html>
  );
}
