"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SignInButton,
  SignUpButton,
  useUser,
  SignOutButton,
} from "@clerk/nextjs";
import Image from 'next/image';

export default function Navbar() {
  const { isSignedIn, user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
    { name: "Blog", href: "/blogs" },
    { name: "Prayer Times", href: "/prayer-times" },
    { name: "Daily Reminders", href: "/reminders" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!profileDropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [profileDropdownOpen]);

  // Dark mode toggle
  useEffect(() => {
    if (typeof window !== "undefined") {
      const theme = localStorage.theme;
      if (
        theme === "dark" ||
        (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.classList.add("dark");
        setIsDark(true);
      } else {
        document.documentElement.classList.remove("dark");
        setIsDark(false);
      }
    }
  }, []);

  const toggleDarkMode = () => {
    if (typeof window !== "undefined") {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.theme = "light";
        setIsDark(false);
      } else {
        document.documentElement.classList.add("dark");
        localStorage.theme = "dark";
        setIsDark(true);
      }
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50 dark:border-gray-800/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Image
                  src="/iut-siks-logo.jpg"
                  alt="IUT SIKS Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover shadow-lg"
                />
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-bold text-xl tracking-tight transition-colors ${
                    isScrolled ? "text-gray-800" : "text-white"
                  } group-hover:text-emerald-600`}
                >
                  IUT SIKS
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 relative group ${
                  isActive(link.href)
                    ? isScrolled
                      ? "text-emerald-600 bg-emerald-50"
                      : "text-emerald-100 bg-white/20"
                    : isScrolled
                    ? "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                    : "text-white/90 hover:text-white hover:bg-white/20"
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full" />
                )}
              </Link>
            ))}

            {/* Auth Buttons/Profile */}
            <div className="flex items-center ml-6 space-x-3">
              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className={`ml-2 p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                  isScrolled
                    ? "bg-gray-100 dark:bg-gray-800"
                    : "bg-white/20 dark:bg-gray-800/60"
                } text-gray-700 dark:text-gray-200`}
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M12 5a7 7 0 100 14 7 7 0 000-14z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                    />
                  </svg>
                )}
              </button>
              {isSignedIn ? (
                <div className="relative" ref={menuRef}>
                  <button
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isScrolled
                        ? "text-gray-700 hover:bg-gray-100"
                        : "text-white hover:bg-white/20"
                    }`}
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white font-semibold text-sm">
                      {user?.firstName?.[0] || user?.username?.[0] || "U"}
                    </div>
                    <span className="hidden sm:block">
                      {user?.firstName || user?.username || "User"}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        profileDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {user?.firstName || user?.username}
                        </p>
                        <p className="text-xs text-gray-500">
                          {user?.emailAddresses[0]?.emailAddress}
                        </p>
                      </div>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <div className="flex items-center space-x-2">
                          <span>👤</span>
                          <span>My Profile</span>
                        </div>
                      </Link>
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <SignOutButton redirectUrl={pathname}>
                          <button
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            <div className="flex items-center space-x-2">
                              <span>🚪</span>
                              <span>Sign Out</span>
                            </div>
                          </button>
                        </SignOutButton>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <SignInButton>
                    <button
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isScrolled
                          ? "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                          : "text-white hover:bg-white/20"
                      }`}
                    >
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
                      Get Started
                    </button>
                  </SignUpButton>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-xl transition-all duration-200 ${
                isScrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/20"
              }`}
            >
              <svg
                className={`h-6 w-6 transition-transform duration-200 ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex items-start justify-end">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          {/* Menu panel */}
          <div className="relative w-80 max-w-full h-full bg-gradient-to-br from-white/80 to-emerald-50 dark:from-gray-900/90 dark:to-gray-800/90 shadow-2xl rounded-l-2xl backdrop-blur-xl p-0 animate-in slide-in-from-right-20 duration-300 flex flex-col">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* Brand */}
            <div className="flex items-center gap-3 px-6 pt-6 pb-4">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg">
                <Image
                  src="/iut-siks-logo.jpg"
                  alt="IUT SIKS Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-gray-800 dark:text-white">
                  IUT SIKS
                </span>
              </div>
            </div>
            {/* Nav links */}
            <div className="flex-1 flex flex-col gap-2 px-4 mt-2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                    isActive(link.href)
                      ? "bg-gradient-to-r from-emerald-500 to-teal-400 text-white shadow border border-emerald-200 dark:border-emerald-700"
                      : "text-gray-800 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-gray-800 hover:text-emerald-700 dark:hover:text-emerald-400"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            {/* Divider */}
            <div className="my-4 border-t border-gray-200 dark:border-gray-700 mx-4" />
            {/* User actions */}
            <div className="px-4 pb-8 flex flex-col gap-2">
              {isSignedIn ? (
                <>
                  <div className="px-2 py-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {user?.firstName || user?.username}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.emailAddresses[0]?.emailAddress}
                    </p>
                  </div>
                  <Link
                    href="/profile"
                    className="block px-4 py-3 rounded-xl text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-gray-800 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  <SignOutButton redirectUrl={pathname}>
                    <button
                      className="w-full text-left px-4 py-3 rounded-xl text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Out
                    </button>
                  </SignOutButton>
                </>
              ) : (
                <>
                  <SignInButton>
                    <button className="w-full px-4 py-3 rounded-xl text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-gray-800 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors border border-gray-200 dark:border-gray-700">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="w-full px-4 py-3 rounded-xl text-base font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md hover:shadow-lg transition-all duration-200">
                      Get Started
                    </button>
                  </SignUpButton>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
