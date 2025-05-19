"use client";
import { useEffect, useRef, useState } from "react";

const prayerTimes = [
  { name: "Fajr", time: "5:00 AM" },
  { name: "Dhuhr", time: "1:15 PM" },
  { name: "Asr", time: "4:45 PM" },
  { name: "Maghrib", time: "6:30 PM" },
  { name: "Isha", time: "8:00 PM" },
];

export default function PrayerTimesPage() {
  const [revealed, setRevealed] = useState<{ [key: number]: boolean }>({});
  const rowsRef = useRef<(HTMLTableRowElement | null)[]>([]);

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
    rowsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-gray-900 dark:to-emerald-950 px-4 py-20">
      <h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6 font-poppins">
        Today&apos;s Prayer Times
      </h1>
      <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full mb-14" />
      <div className="w-full max-w-md">
        <div className="overflow-x-auto">
          <table className="w-full bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-lg border border-white/40 dark:border-gray-800/40 backdrop-blur-md">
            <thead>
              <tr className="bg-emerald-100 dark:bg-emerald-900">
                <th className="py-3 px-4 text-left text-emerald-900 dark:text-emerald-200 font-semibold rounded-tl-2xl">
                  Prayer
                </th>
                <th className="py-3 px-4 text-left text-emerald-900 dark:text-emerald-200 font-semibold rounded-tr-2xl">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {prayerTimes.map((prayer, idx) => (
                <tr
                  key={prayer.name}
                  ref={(el) => {
                    rowsRef.current[idx] = el;
                  }}
                  data-idx={idx}
                  className={`transition-all duration-700 ${
                    revealed[idx]
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  } ${
                    idx % 2 === 0
                      ? "bg-emerald-50 dark:bg-gray-800"
                      : "bg-white/60 dark:bg-gray-900/60"
                  }`}
                >
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-100 font-medium border-b border-emerald-100 dark:border-gray-800">
                    {prayer.name}
                  </td>
                  <td className="py-3 px-4 text-emerald-700 dark:text-emerald-300 border-b border-emerald-100 dark:border-gray-800">
                    {prayer.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
