import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import "../lib/mongoose";

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
      <html lang="en" className="scroll-smooth">
        <body className="antialiased min-h-screen bg-white dark:bg-black">
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
