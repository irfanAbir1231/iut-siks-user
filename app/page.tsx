"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
// import { SignInButton } from "@clerk/nextjs"; // MODIFIED: Commented out
import Image from "next/image";

// Add a simple count-up hook for stats
function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [target, duration]);
  return count;
}

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const navCardsRef = useRef<HTMLDivElement>(null);
  const featuresStatsRef = useRef<HTMLDivElement>(null);

  // Parallax state for nav cards
  const [parallax, setParallax] = useState<{
    [key: number]: { x: number; y: number };
  }>({});
  const handleParallax = (e: React.MouseEvent, idx: number) => {
    const card = e.currentTarget as HTMLDivElement;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setParallax((prev) => ({ ...prev, [idx]: { x, y } }));
  };
  const resetParallax = (idx: number) => {
    setParallax((prev) => ({ ...prev, [idx]: { x: 0, y: 0 } }));
  };

  // Stats data and animated counts
  const stats = [
    { number: 500, label: "Members", suffix: "+" },
    { number: 20, label: "Events", suffix: "+" },
    { number: 100, label: "Articles", suffix: "+" },
    { number: 14, label: "Years", suffix: "+" },
  ];
  const count0 = useCountUp(stats[0].number, 1200);
  const count1 = useCountUp(stats[1].number, 1400);
  const count2 = useCountUp(stats[2].number, 1600);
  const count3 = useCountUp(stats[3].number, 1800);
  const counts = [count0, count1, count2, count3];

  useEffect(() => {
    // Trigger initial animation
    setTimeout(() => setIsVisible(true), 100);

    // Set up intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" },
    );

    // Observe cards
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".card-item");
      cards.forEach((card) => observer.observe(card));
    }

    return () => observer.disconnect();
  }, []);

  const navigationCards = [
    {
      title: "Events",
      href: "/events",
      icon: "📅",
      description: "Discover upcoming events and community gatherings",
      color: "emerald",
      gradient: "from-emerald-500 to-teal-600",
      delay: "0ms",
    },
    // {
    //   title: "Blog",
    //   href: "/blogs",
    //   icon: "📝",
    //   description: "Read insights, reflections, and knowledge articles",
    //   color: "blue",
    //   gradient: "from-blue-500 to-indigo-600",
    //   delay: "100ms",
    // },
    {
      title: "Prayer Times",
      href: "/prayer-times",
      icon: "🕌",
      description: "Stay updated with accurate daily prayer times",
      color: "amber",
      gradient: "from-amber-500 to-orange-600",
      delay: "200ms",
    },
    {
      title: "Daily Reminders",
      href: "/reminders",
      icon: "💫",
      description: "Get inspired with daily spiritual reminders",
      color: "purple",
      gradient: "from-purple-500 to-violet-600",
      delay: "300ms",
    },
  ];

  const features = [
    {
      icon: "🎯",
      title: "Purpose-Driven",
      description: "Guided by Islamic values and principles",
    },
    {
      icon: "🤝",
      title: "Community",
      description: "",
    },
    {
      icon: "📚",
      title: "Knowledge",
      description: "Continuous learning and spiritual growth",
    },
    {
      icon: "🌟",
      title: "Excellence",
      description: "Striving for the highest standards",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-gray-900 dark:to-emerald-950">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden sm:py-32 py-20">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-300/20 dark:bg-emerald-800/20 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-40 right-10 w-96 h-96 bg-blue-300/20 dark:bg-blue-900/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-100/30 to-blue-100/30 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-full blur-3xl" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center pt-10 sm:pt-16">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div
              className={`transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              {/* Main Heading */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-10">
                <span className="block text-gradient font-poppins">
                  IUT SIKS
                </span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-600 mt-2"></span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                Fostering spiritual growth and academic excellence at{" "}
                <span className="font-semibold text-emerald-700">
                  Islamic University of Technology
                </span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                {/* <SignInButton> */}
                <button className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2">
                  <span>Join Our Community</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {/* </SignInButton> */}
                <Link
                  href="/events"
                  className="px-8 py-4 bg-white text-emerald-700 rounded-full font-semibold text-lg border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Explore Events
                </Link>
              </div>
              <div style={{ height: "80px" }} />
              <button
                aria-label="Scroll to next section"
                onClick={() =>
                  navCardsRef.current?.scrollIntoView({ behavior: "smooth" })
                }
                className="flex justify-center animate-bounce focus:outline-none mx-auto"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <div className="w-8 h-14 border-2 border-emerald-400 rounded-full flex justify-center items-start">
                  <div className="w-1 h-4 bg-emerald-400 rounded-full mt-2" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Cards Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" ref={navCardsRef}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4 font-poppins">
              Explore Our Platform
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full" />
          </div>

          <div
            ref={cardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 gap-10"
          >
            {navigationCards.map((card, index) => (
              <Link
                key={card.title}
                href={card.href}
                className={`card-item scroll-reveal group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-500 card-hover-effect`}
                style={{
                  animationDelay: card.delay,
                  transform: parallax[index]
                    ? `rotateY(${parallax[index].x}deg) rotateX(${-parallax[
                        index
                      ].y}deg) scale(1.03)`
                    : undefined,
                  willChange: "transform",
                }}
                onMouseMove={(e) => handleParallax(e, index)}
                onMouseLeave={() => resetParallax(index)}
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${card.gradient})`,
                  }}
                />
                <div className="relative p-10">
                  <div className="flex items-start space-x-6">
                    <div
                      className={`flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-r ${card.gradient} flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {card.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                        {card.description}
                      </p>
                      <div className="flex items-center text-emerald-600 dark:text-emerald-400 font-medium group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                        <span>Learn More</span>
                        <svg
                          className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Hover gradient overlay */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-50 transition-opacity duration-500 bg-gradient-to-r ${card.gradient}`}
                />
              </Link>
            ))}
          </div>
          <button
            aria-label="Scroll to features and stats"
            onClick={() =>
              featuresStatsRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex justify-center animate-bounce focus:outline-none mx-auto mt-12 mb-0"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <svg
              className="w-10 h-10 text-emerald-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* Move the stats and features grid into a new section below, with ref */}
      <section ref={featuresStatsRef} className="py-20 px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="py-10 bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-900 dark:to-emerald-800 rounded-3xl mb-16">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Growing Together
              </h2>
              <p className="text-emerald-100 text-lg">
                Building a stronger community every day
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center group">
                  <div className="text-4xl sm:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                    {counts[index]}
                    {stat.suffix}
                  </div>
                  <div className="text-emerald-100 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-24 px-2">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`p-10 rounded-2xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border border-white/40 dark:border-gray-800/40 text-center shadow-lg transition-all duration-700 hover:bg-white/90 dark:hover:bg-gray-800/90 hover:scale-105`}
              style={{ transitionDelay: `${(index + 4) * 100}ms` }}
            >
              <div
                className="text-4xl mb-4 animate-float"
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-base text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
                  <Image
                    src="/iut-siks-logo.jpg"
                    alt="IUT SIKS Logo"
                    width={500}
                    height={300}
                    className="custom-class"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold">IUT SIKS</h3>
                  <p className="text-gray-400 text-sm"></p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering minds, nurturing souls, and building a community
                rooted in Islamic values and academic excellence.
              </p>
              <div className="flex space-x-4">
                {/* Social Media Icons */}
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
                >
                  <span className="text-sm">📘</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
                >
                  <span className="text-sm">📧</span>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
                >
                  <span className="text-sm">📱</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navigationCards.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-emerald-400 transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>Islamic University of Technology</p>
                <p>Board Bazar, Gazipur-1704</p>
                <p>Dhaka, Bangladesh</p>
                <p className="text-emerald-400">info@iut-siks.org</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} IUT-SIKS. All rights reserved.
              Built with ❤️ for our community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
