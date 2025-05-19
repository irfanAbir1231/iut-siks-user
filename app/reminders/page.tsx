"use client";
import { useEffect, useRef, useState } from "react";

const reminders = [
  {
    icon: "📖",
    text: "Read Surah Mulk before sleeping",
    color: "bg-green-100 border-green-300",
  },
  {
    icon: "🕌",
    text: "Pray all Salat in congregation",
    color: "bg-green-50 border-green-200",
  },
  {
    icon: "📘",
    text: "Read Surah Kahf on Friday",
    color: "bg-green-100 border-green-300",
  },
  {
    icon: "🤲",
    text: "Make morning and evening adhkar",
    color: "bg-green-50 border-green-200",
  },
];

export default function RemindersPage() {
  const [revealed, setRevealed] = useState<{ [key: number]: boolean }>({});
  const cardsRef = useRef<(HTMLLIElement | null)[]>([]);

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

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-gray-900 dark:to-emerald-950 px-4 py-20">
      <h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6 font-poppins">
        Daily Islamic Reminders
      </h1>
      <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full mb-14" />
      <ul className="w-full max-w-xl flex flex-col gap-8">
        {reminders.map((reminder, idx) => (
          <li
            key={idx}
            ref={(el) => {
              cardsRef.current[idx] = el;
            }}
            data-idx={idx}
            className={`flex items-center gap-4 p-8 rounded-2xl border shadow-lg backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-white/40 dark:border-gray-800/40 transition-all duration-700 hover:scale-105 hover:shadow-2xl ${
              revealed[idx]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-3xl md:text-4xl text-emerald-700 dark:text-emerald-400">
              {reminder.icon}
            </span>
            <span className="text-lg md:text-xl font-medium text-gray-900 dark:text-gray-100">
              {reminder.text}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
