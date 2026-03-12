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
  title: "HR Interview Guide — Подготви се за интервюто на мечтите си",
  description:
    "Практични PDF ръководства за всеки тип интервю, написани от HR професионалист с 10+ години опит. Техническо, поведенческо, case study и още.",
  keywords: [
    "интервю",
    "подготовка за интервю",
    "HR",
    "кариера",
    "CV",
    "работа",
    "преговори за заплата",
  ],
  openGraph: {
    title: "HR Interview Guide — Подготви се за интервюто на мечтите си",
    description:
      "Практични PDF ръководства за всеки тип интервю от HR професионалист с 10+ години опит.",
    type: "website",
    locale: "bg_BG",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
