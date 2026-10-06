import type { Metadata } from "next";
import LexiSmooth from "@/components/LexiSmooth";
import "./globals.css";

export const metadata: Metadata = {
  title: "LEXI LABS — FLEEN 1.0 | Foundational Model",
  description:
    "FLEEN 1.0 is the foundational model from LEXI LABS. Read the research, observe the model working, and inspect the system it runs on.",
  metadataBase: new URL("https://lexilabs.example"),
  openGraph: {
    title: "LEXI LABS — FLEEN 1.0",
    description:
      "A foundational model from LEXI LABS. Thesis, demonstration, architecture, evidence, infrastructure.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="lexi-grain min-h-full flex flex-col bg-[#0f110d] text-[#ede8db]">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-[#e8490f] focus:text-white focus:px-3 focus:py-2 lexi-micro"
        >
          Skip to content
        </a>
        {children}
        <LexiSmooth />
      </body>
    </html>
  );
}
