import "@repo/ui/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "../provider";
import AppbarClient from "./components/AppbarClient";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Paytm",
  description: "Simple wallet app with dummy bank server simulation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <AppbarClient />
          {children}
        </body>
      </Providers>
    </html>
  );
}
