"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  SignInButton,
  SignUpButton,
  useUser,
  SignOutButton,
} from "@clerk/nextjs";

export default function Home() {
  const [offset, setOffset] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

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

  const heroImageStyle = isMobile
    ? {
        transform: `translateY(${offset * 0.7}px) scale(${
          1.08 + offset * 0.0007
        })`,
        opacity: `${1 - Math.min(offset / 400, 0.3)}`,
      }
    : { transform: `translateY(${offset}px) scale(1.08)` };
  const heroTextOpacity = isMobile ? 1 - Math.min(offset / 200, 0.3) : 1;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-blue-50 to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative w-full flex flex-col items-center justify-center text-center py-20 xs:py-24 sm:py-28 md:py-32 px-4 xs:px-6 sm:px-0 bg-gradient-to-br from-green-200/60 via-blue-200/40 to-transparent dark:from-green-900/40 dark:via-blue-900/30 dark:to-transparent overflow-hidden"
        style={{ minHeight: 400 }}
      >
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/hero-bg.jpg"
            alt="IUT-SIKS"
            fill
            className="object-cover opacity-20 pointer-events-none select-none"
            style={heroImageStyle}
            priority
          />
        </div>
        <div className="absolute inset-0 w-full h-full bg-white/10 dark:bg-gray-900/20 backdrop-blur-sm z-10" />
        <div
          className="relative z-20 flex flex-col items-center animate-fade-in-up w-full transition-opacity duration-300"
          style={{ opacity: heroTextOpacity }}
        >
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold text-green-800 dark:text-white drop-shadow mb-3 md:mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-blue-500 to-green-400 animate-gradient-move break-words leading-tight xs:leading-tight sm:leading-tight">
            Welcome to{" "}
            <span className="text-green-600 dark:text-green-400">IUT-SIKS</span>
          </h1>
          <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-green-700 dark:text-gray-200 max-w-xs xs:max-w-md sm:max-w-2xl mx-auto mb-6 animate-fade-in px-2 xs:px-0">
            Society of Islamic Knowledge Seekers at Islamic University of
            Technology
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center w-full gap-3 sm:gap-4 mt-6 sm:mt-8 animate-fade-in px-2 xs:px-0">
            <SignInButton>
              <button
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition backdrop-blur-md bg-opacity-90 animate-fade-in text-center text-base xs:text-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Join Us
              </button>
            </SignInButton>
            <Link
              href="/events"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/90 dark:bg-gray-800/90 text-green-700 dark:text-green-300 font-semibold shadow hover:bg-green-100 dark:hover:bg-green-900 transition backdrop-blur-md animate-fade-in text-center text-base xs:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Upcoming Events
            </Link>
          </div>
        </div>
        {/* Mobile scroll indicator at very bottom of hero section */}
        <div className="sm:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none">
          <div className="w-8 h-1 rounded-full bg-green-400/60 mb-1 animate-pulse" />
          <div className="w-4 h-1 rounded-full bg-green-400/30 animate-pulse" />
        </div>
      </section>

      {/* Navigation Grid */}
      <main className="flex-1 flex flex-col items-center justify-center py-10 xs:py-14 sm:py-16 px-0 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 xs:gap-6 sm:gap-8 w-full max-w-md xs:max-w-2xl sm:max-w-5xl px-2 xs:px-4">
          <Link
            href="/events"
            className="group relative p-5 xs:p-6 sm:p-8 rounded-2xl bg-white/60 dark:bg-gray-800/40 shadow-xl border border-green-100 dark:border-green-900 transition-all overflow-hidden backdrop-blur-lg animate-fade-in-up w-full min-h-[120px] xs:min-h-[140px]"
            style={{ willChange: "transform" }}
            onMouseMove={(e) => {
              const card = e.currentTarget;
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const moveX = (x - rect.width / 2) / 18;
              const moveY = (y - rect.height / 2) / 18;
              card.style.transform = `scale(1.03) translateY(${moveY}px) translateX(${moveX}px)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
            }}
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
            className="group relative p-5 xs:p-6 sm:p-8 rounded-2xl bg-white/60 dark:bg-gray-800/40 shadow-xl border border-blue-100 dark:border-blue-900 hover:scale-[1.03] hover:shadow-2xl transition-all overflow-hidden backdrop-blur-lg animate-fade-in-up w-full min-h-[120px] xs:min-h-[140px]"
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
            className="group relative p-5 xs:p-6 sm:p-8 rounded-2xl bg-white/60 dark:bg-gray-800/40 shadow-xl border border-yellow-100 dark:border-yellow-900 hover:scale-[1.03] hover:shadow-2xl transition-all overflow-hidden backdrop-blur-lg animate-fade-in-up w-full min-h-[120px] xs:min-h-[140px]"
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
            href="/reminders"
            className="group relative p-5 xs:p-6 sm:p-8 rounded-2xl bg-white/60 dark:bg-gray-800/40 shadow-xl border border-purple-100 dark:border-purple-900 hover:scale-[1.03] hover:shadow-2xl transition-all overflow-hidden backdrop-blur-lg animate-fade-in-up w-full min-h-[120px] xs:min-h-[140px]"
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
      <footer className="w-full py-6 xs:py-8 text-center text-gray-500 dark:text-gray-400 text-xs xs:text-sm bg-white/80 dark:bg-gray-900/80 backdrop-blur">
        &copy; {new Date().getFullYear()} IUT-SIKS. All rights reserved.
      </footer>
    </div>
  );
}
