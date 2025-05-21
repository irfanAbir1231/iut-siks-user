import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import '../lib/mongoose';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IUT-SIKS | Society of Islamic Knowledge Seekers",
  description:
    "Empowering minds, enriching souls through Islamic knowledge and community at Islamic University of Technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/20 dark:from-slate-900 dark:via-gray-900 dark:to-emerald-950 min-h-screen`}
        >
          <div className="relative">
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-100/20 to-blue-100/20 rounded-full blur-3xl animate-pulse" />
              <div
                className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-emerald-100/20 to-teal-100/20 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "2s" }}
              />
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-100/10 to-green-100/10 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "4s" }}
              />
            </div>

            <Navbar />
            <main className="relative z-10">{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
