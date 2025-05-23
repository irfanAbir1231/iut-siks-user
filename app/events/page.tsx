"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const events = [
  {
    title: "Seerah Quiz",
    date: "2025-05-28",
    description:
      "Test your knowledge about the life of Prophet Muhammad (PBUH) in this engaging quiz.",
    route: "seerah-quiz",
    available: true,
  },
  {
    title: "Poster design competition",
    date: "2025-05-26",
    description:
      "Showcase your creativity in designing and calligraphy with an Islamic theme.",
    route: "poster-design-competition",
    available: true,
  },
  {
    title: "Case Competition",
    date: "2025-05-28",
    description:
      "Brainstorm and present innovative ideas to solve challenges faced by the Muslim community.",
    route: "case-competition",
    available: true,
  },
  {
    title: "Attention Maestro",
    date: "2025-05-28",
    description:
      "Participate in a fun and interactive event to test your focus and attention skills.",
    route: "attention-maestro",
    available: false,
  },
  {
    title: "Archery Competition",
    date: "2025-05-28",
    description:
      "Participate in a fun and interactive event to test your focus and attention skills.",
    route: "attention-maestro",
    available: false,
  },
];

export default function EventsPage() {
  const [parallax, setParallax] = useState<{
    [key: number]: { x: number; y: number };
  }>({});
  const [revealed, setRevealed] = useState<{ [key: number]: boolean }>({});
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            setRevealed((prev) => ({ ...prev, [idx]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );
    cardsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

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

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-gray-900 dark:to-emerald-950 px-4 py-20 flex flex-col items-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center font-poppins">
        Upcoming Events
      </h1>
      <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full mb-14" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
        {events.map((event, idx) => (
          <div
            key={idx}
            ref={(el) => {
              cardsRef.current[idx] = el;
            }}
            data-idx={idx}
            className={`relative group rounded-2xl bg-white/70 dark:bg-gray-900/70 border border-white/40 dark:border-gray-800/40 shadow-lg backdrop-blur-md p-8 flex flex-col justify-between transition-all duration-700 hover:scale-105 hover:shadow-2xl cursor-pointer ${
              revealed[idx]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={
              parallax[idx]
                ? {
                    transform: `rotateY(${
                      parallax[idx].x
                    }deg) rotateX(${-parallax[idx].y}deg) scale(1.03)`,
                  }
                : undefined
            }
            onMouseMove={(e) => handleParallax(e, idx)}
            onMouseLeave={() => resetParallax(idx)}
          >
            <div>
              <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                {event.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {new Date(event.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-gray-700 dark:text-gray-200 mb-8 min-h-[64px]">
                {event.description}
              </p>
            </div>
            {event.available && (
              <Link
                href={`/events/register/${event.route}`}
                className="inline-block mt-auto px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold shadow hover:shadow-xl hover:scale-105 transition-all duration-200 text-center focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                Register
              </Link>
            )}
            {!event.available && (
              <span className="inline-block mt-auto px-8 py-3 rounded-xl bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-300 font-semibold shadow text-center cursor-not-allowed select-none">
                Registration Closed
              </span>
            )}
            {/* Glass overlay on hover */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300 bg-gradient-to-br from-emerald-200/40 to-blue-200/40 dark:from-emerald-900/30 dark:to-blue-900/30 rounded-2xl" />
          </div>
        ))}
      </div>
    </main>
  );
}
