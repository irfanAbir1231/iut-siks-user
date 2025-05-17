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

export default function Navbar() {
  const { isSignedIn, user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuAnim, setMenuAnim] = useState<null | "in" | "out">(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

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

  return (
    <nav className="bg-green-900/80 backdrop-blur-lg border-b border-green-950 shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-green-100 hover:text-green-300 transition-colors"
            >
              <span className="text-2xl">🕌</span>
              <span>IUT-SIKS</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 ${
                  isActive(link.href)
                    ? "bg-green-200 text-green-900"
                    : "text-green-100 hover:bg-green-600 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Auth Buttons/Profile */}
            <div className="flex items-center ml-4 space-x-4">
              {isSignedIn ? (
                <div className="relative">
                  <button
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-green-100 hover:bg-green-600 hover:text-white"
                    onClick={() => setProfileDropdownOpen((v) => !v)}
                  >
                    <span>👤</span>
                    <span>{user?.username || user?.firstName || "User"}</span>
                  </button>
                  {profileDropdownOpen && (
                    <div className="absolute right-0 w-48 mt-2 py-2 bg-white dark:bg-green-900 rounded-lg shadow-xl border border-green-200 dark:border-green-800 z-50">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-green-900 dark:text-green-100 hover:bg-green-100 dark:hover:bg-green-800"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <SignOutButton>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          Logout
                        </button>
                      </SignOutButton>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <SignInButton>
                    <button className="text-green-100 hover:text-green-300 px-3 py-2 rounded-lg transition-colors">
                      Login
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors shadow-sm hover:shadow-md">
                      Register
                    </button>
                  </SignUpButton>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => {
                if (!isMenuOpen) {
                  setIsMenuOpen(true);
                  setMenuAnim("in");
                } else {
                  setIsMenuOpen(false);
                  setMenuAnim(null);
                }
              }}
              className="inline-flex items-center justify-center p-2 rounded-lg text-green-100 hover:bg-green-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {(isMenuOpen || menuAnim === "out") && (
        <div
          ref={menuRef}
          className={`md:hidden ${
            menuAnim === "in" ? "animate-scale-fade-in" : ""
          } ${menuAnim === "out" ? "animate-scale-fade-out" : ""}`}
          onAnimationEnd={() => {
            if (menuAnim === "out") {
              setIsMenuOpen(false);
              setMenuAnim(null);
            } else if (menuAnim === "in") {
              setMenuAnim(null);
            }
          }}
        >
          <div className="mx-2 mt-2 mb-3 rounded-2xl shadow-2xl px-3 pt-4 pb-4 space-y-2 bg-green-950/95 backdrop-blur-md border border-green-800">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 ${
                  isActive(link.href)
                    ? "bg-green-800/80 text-green-200"
                    : "text-white hover:bg-green-800/80 hover:text-green-300"
                }`}
                onClick={() => {
                  setIsMenuOpen(false);
                  setMenuAnim(null);
                }}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Auth Buttons */}
            {isSignedIn ? (
              <>
                <Link
                  href="/profile"
                  className="block px-4 py-3 rounded-xl text-base font-medium text-white hover:bg-green-800/80 hover:text-green-300"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setMenuAnim(null);
                  }}
                >
                  Profile
                </Link>
                <SignOutButton>
                  <button
                    className="block w-full text-left px-4 py-3 rounded-xl text-base font-medium text-red-400 hover:bg-red-900/30 hover:text-red-200"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setMenuAnim(null);
                    }}
                  >
                    Logout
                  </button>
                </SignOutButton>
              </>
            ) : (
              <div className="space-y-2 pt-2">
                <SignInButton>
                  <button className="block w-full text-center px-4 py-3 rounded-xl text-base font-medium bg-gradient-to-r from-green-600 to-green-500 text-white shadow hover:from-green-700 hover:to-green-600">
                    Login
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="block w-full text-center px-4 py-3 rounded-xl text-base font-bold bg-gradient-to-r from-green-400 to-green-600 text-white shadow hover:from-green-500 hover:to-green-700">
                    Register
                  </button>
                </SignUpButton>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
