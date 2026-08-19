import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Barracks | Barbers & Shaves",
  description: "A sharper kind of ritual, with a shop floor that remembers.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/*
          THESIS: Barracks is a shop-floor ledger, not a generic admin dashboard.
          OWN-WORLD: mineral-black surfaces, warm paper type, brass and signal colors, quiet board-like controls.
          STORY: customers book a ritual; staff keep the floor moving; management reads the signal.
          FIRST VIEWPORT: a public chair-led landing page, then a persistent sidebar shell for the working day.
          FORM: shop-floor ledger / assigned operate direction #4 / seed 9b063d5b.
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
        */}
        {children}
      </body>
    </html>
  );
}
