// app/layout.tsx
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import "@/styles/clock.css";

const lato = Lato({ weight: ["100","300","400"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ek Patla Giraffe | Chess Clock",
  description: "Chess Clock rebuilt with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={lato.className}>
      <body>{children}</body>
    </html>
  );
}
