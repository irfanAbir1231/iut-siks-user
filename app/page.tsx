"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [offset, setOffset] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      // Only parallax while hero is in view
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        setOffset(window.scrollY * 0.3); // adjust parallax strength here
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-blue-50 to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative w-full flex flex-col items-center justify-center text-center py-16 md:py-24 px-2 sm:px-0 bg-gradient-to-br from-green-200/60 via-blue-200/40 to-transparent dark:from-green-900/40 dark:via-blue-900/30 dark:to-transparent overflow-hidden"
        style={{ minHeight: 400 }}
      >
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/hero-bg.jpg"
            alt="IUT-SIKS"
            fill
            className="object-cover opacity-20 pointer-events-none select-none"
            style={{ transform: `translateY(${offset}px) scale(1.08)` }}
            priority
          />
        </div>
        <div className="absolute inset-0 w-full h-full bg-white/10 dark:bg-gray-900/20 backdrop-blur-sm z-10" />
        <div className="relative z-20 flex flex-col items-center animate-fade-in-up w-full">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold text-green-800 dark:text-white drop-shadow mb-3 md:mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-blue-500 to-green-400 animate-gradient-move break-words">
            Welcome to{" "}
            <span className="text-green-600 dark:text-green-400">IUT-SIKS</span>
          </h1>
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-green-700 dark:text-gray-200 max-w-md sm:max-w-2xl mx-auto mb-6 animate-fade-in">
            Society of Islamic Knowledge Seekers at Islamic University of
            Technology
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center w-full gap-3 sm:gap-4 mt-4 sm:mt-6 animate-fade-in">
            <Link
              href="/auth/register"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition backdrop-blur-md bg-opacity-80 animate-fade-in text-center"
            >
              Join Us
            </Link>
            <Link
              href="/events"
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white/80 dark:bg-gray-800/80 text-green-700 dark:text-green-300 font-semibold shadow hover:bg-green-100 dark:hover:bg-green-900 transition backdrop-blur-md animate-fade-in text-center"
            >
              Upcoming Events
            </Link>
          </div>
        </div>
      </section>

      {/* Navigation Grid */}
      <main className="flex-1 flex flex-col items-center justify-center py-16 px-0 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl px-2 sm:px-4">
          <Link
            href="/events"
            className="group relative p-5 sm:p-8 rounded-2xl bg-white/30 dark:bg-gray-800/30 shadow-xl border border-green-100 dark:border-green-900 hover:scale-105 hover:shadow-2xl transition-all overflow-hidden backdrop-blur-lg animate-fade-in-up w-full"
          >
            <div className="flex flex-col items-center">
              <span className="text-4xl sm:text-5xl mb-3 sm:mb-4">📅</span>
              <span className="text-lg sm:text-2xl font-bold text-green-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition text-center">
                View Events
              </span>
              <span className="mt-2 text-gray-500 dark:text-gray-400 text-xs sm:text-sm text-center">
                See all upcoming and past events
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-green-100/30 to-blue-100/10 dark:from-green-900/20 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition" />
          </Link>
          <Link
            href="/blogs"
            className="group relative p-5 sm:p-8 rounded-2xl bg-white/30 dark:bg-gray-800/30 shadow-xl border border-blue-100 dark:border-blue-900 hover:scale-105 hover:shadow-2xl transition-all overflow-hidden backdrop-blur-lg animate-fade-in-up w-full"
          >
            <div className="flex flex-col items-center">
              <span className="text-4xl sm:text-5xl mb-3 sm:mb-4">📝</span>
              <span className="text-lg sm:text-2xl font-bold text-green-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition text-center">
                Read Blogs
              </span>
              <span className="mt-2 text-gray-500 dark:text-gray-400 text-xs sm:text-sm text-center">
                Insights, reflections, and articles
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 to-green-100/10 dark:from-blue-900/20 dark:to-green-900/10 opacity-0 group-hover:opacity-100 transition" />
          </Link>
          <Link
            href="/prayer-times"
            className="group relative p-5 sm:p-8 rounded-2xl bg-white/30 dark:bg-gray-800/30 shadow-xl border border-yellow-100 dark:border-yellow-900 hover:scale-105 hover:shadow-2xl transition-all overflow-hidden backdrop-blur-lg animate-fade-in-up w-full"
          >
            <div className="flex flex-col items-center">
              <span className="text-4xl sm:text-5xl mb-3 sm:mb-4">🕌</span>
              <span className="text-lg sm:text-2xl font-bold text-green-800 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition text-center">
                Prayer Times
              </span>
              <span className="mt-2 text-gray-500 dark:text-gray-400 text-xs sm:text-sm text-center">
                Stay updated with daily prayer times
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-100/30 to-green-100/10 dark:from-yellow-900/20 dark:to-green-900/10 opacity-0 group-hover:opacity-100 transition" />
          </Link>
          <Link
            href="/daily-reminders"
            className="group relative p-5 sm:p-8 rounded-2xl bg-white/30 dark:bg-gray-800/30 shadow-xl border border-purple-100 dark:border-purple-900 hover:scale-105 hover:shadow-2xl transition-all overflow-hidden backdrop-blur-lg animate-fade-in-up w-full"
          >
            <div className="flex flex-col items-center">
              <span className="text-4xl sm:text-5xl mb-3 sm:mb-4">🕋</span>
              <span className="text-lg sm:text-2xl font-bold text-green-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition text-center">
                Daily Reminders
              </span>
              <span className="mt-2 text-gray-500 dark:text-gray-400 text-xs sm:text-sm text-center">
                Get your daily dose of inspiration
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-100/30 to-blue-100/10 dark:from-purple-900/20 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-gray-500 dark:text-gray-400 text-sm bg-white/70 dark:bg-gray-900/70 backdrop-blur">
        &copy; {new Date().getFullYear()} IUT-SIKS. All rights reserved.
      </footer>
    </div>
  );
}
