import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["400", "700"],
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
      className={`${inter.variable} ${merriweather.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-ink">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement;var f=localStorage.getItem("portfolio-font-version");if(f==="serif"){d.classList.add("font-version-serif");}var t=localStorage.getItem("portfolio-theme");if(t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches)){d.classList.add("dark");d.style.colorScheme="dark";}else{d.style.colorScheme="light";}}catch(e){}})();`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
