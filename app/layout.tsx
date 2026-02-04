import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Smart Translator",
  description:
    "AI-Powered Translation with Spell Check & Naturalness Optimization",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans bg-gradient-to-r from-[#DDEFFF] to-white min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
