"use client";
import { useEffect, useRef, useState } from "react";
import Skeleton from "../components/Skeleton";

// --- Types ---
interface DailyData {
  hadith: string;
  name: string;
  verse: {
    surah: string;
    number: string | number;
    text: string;
    arabic: string;
  };
}

const staticReminders = [
  {
    icon: "📖",
    text: "Read Surah Mulk before sleeping",
    sub: "Protection from the grave",
  },
  {
    icon: "🕌",
    text: "Pray all Salat in congregation",
    sub: "27x more reward",
  },
  {
    icon: "📘",
    text: "Read Surah Kahf on Friday",
    sub: "Light between two Fridays",
  },
  {
    icon: "🤲",
    text: "Morning & Evening Adhkar",
    sub: "Fortress of the Muslim",
  },
];

const defaultDailyData: DailyData = {
  hadith:
    'The Messenger of Allah (ﷺ) said, "Whoever travels a path in search of knowledge, Allah will make easy for him a path to Paradise."\n\n- Riyad as-Salihin 1381',
  name: "Al-Aleem (The All-Knowing)",
  verse: {
    surah: "Surah Az-Zumar",
    number: 9,
    text: "...Say, 'Are those who know equal to those who do not know?' Only they will remember [who are] people of understanding.",
    arabic:
      "قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ ۗ إِنَّمَا يَتَذَكَّرُ أُولُو الْأَلْبَابِ",
  },
};

export default function RemindersPage() {
  const [revealed, setRevealed] = useState<{ [key: number]: boolean }>({});
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [dailyData, setDailyData] = useState<DailyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDailyReminder() {
      setLoading(true);
      try {
        const response = await fetch("/api/islamic-daily");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();

        const transformedData: DailyData = {
          hadith: data.hadith,
          name: data.nameOfAllah,
          verse: {
            surah: data.quran.surah_name,
            number: data.quran.verse_number,
            text: data.quran.translation,
            arabic: data.quran.text_arabic,
          },
        };

        setDailyData(transformedData);
      } catch (error) {
        console.error(
          "Failed to fetch daily reminder, showing default:",
          error,
        );
        setDailyData(defaultDailyData);
      } finally {
        setLoading(false);
      }
    }

    fetchDailyReminder();
  }, []);

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
      { threshold: 0.1 },
    );
    cardsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-200/30 dark:bg-emerald-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight font-poppins bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
            Daily Reminders
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
            Nourish your soul with the words of Allah and His Messenger
          </p>
          <div className="w-16 h-1.5 bg-emerald-500 mx-auto rounded-full opacity-80" />
        </header>

        {/* Main Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mb-12">
          {/* Verse Card (Spans 8 cols on large screens) */}
          <div className="lg:col-span-8 relative group">
            <div className="h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-800 shadow-xl rounded-3xl p-8 md:p-10 transition-all hover:shadow-2xl hover:border-emerald-500/30">
              {loading ? (
                <div className="space-y-6">
                  <Skeleton className="h-8 w-1/3" />
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-6 w-2/3" />
                </div>
              ) : dailyData ? (
                <div className="flex flex-col justify-between h-full space-y-8">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-sm font-bold uppercase tracking-wider">
                      Daily Verse
                    </span>
                  </div>

                  <div className="space-y-6">
                    <p
                      dir="rtl"
                      className="text-3xl md:text-5xl leading-[1.6] md:leading-[1.5] font-bold text-slate-800 dark:text-slate-100 font-serif"
                    >
                      {dailyData.verse.arabic}
                    </p>
                    {/* FIXED: Used &quot; entity code instead of " */}
                    <blockquote className="text-lg md:text-xl text-slate-600 dark:text-slate-300 italic border-l-4 border-emerald-500 pl-4">
                      &quot;{dailyData.verse.text}&quot;
                    </blockquote>
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                        {dailyData.verse.surah}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Verse {dailyData.verse.number}
                      </p>
                    </div>
                    <span className="text-4xl opacity-20">📖</span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Name of Allah Card (Spans 4 cols) */}
          <div className="lg:col-span-4">
            <div className="h-full bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-xl rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10" />

              {loading ? (
                <Skeleton className="bg-white/20 h-full w-full" />
              ) : dailyData ? (
                <>
                  <div>
                    <p className="text-emerald-100 text-sm font-bold uppercase tracking-wider mb-2">
                      Name of Allah
                    </p>
                    <h3 className="text-3xl font-bold mb-4 drop-shadow-md">
                      {dailyData.name.split("(")[0]}
                    </h3>
                  </div>
                  <div className="flex-grow flex items-center justify-center py-6">
                    <p className="text-center text-lg font-medium text-emerald-50 leading-relaxed">
                      {dailyData.name.includes("(")
                        ? `(${dailyData.name.split("(")[1]}`
                        : ""}
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <span className="text-4xl opacity-50">✨</span>
                  </div>
                </>
              ) : null}
            </div>
          </div>

          {/* Hadith Card (Spans full width) */}
          <div className="lg:col-span-12">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-800 shadow-xl rounded-3xl p-8 md:p-10">
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ) : dailyData ? (
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="hidden md:flex flex-col items-center justify-center w-24 h-24 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex-shrink-0 text-indigo-600 dark:text-indigo-400">
                    <span className="text-4xl">📜</span>
                  </div>
                  <div className="space-y-4 flex-grow">
                    <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-bold uppercase tracking-wider">
                      Daily Hadith
                    </span>
                    <p className="text-lg md:text-xl text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
                      {dailyData.hadith}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Static Reminders Section */}
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-slate-800 dark:text-slate-100">
            Daily Habits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {staticReminders.map((reminder, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                data-idx={idx}
                className={`
                  flex flex-col items-center text-center p-8 rounded-3xl
                  bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/30 dark:border-slate-700
                  shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-700
                  ${revealed[idx] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
                `}
              >
                <div className="w-16 h-16 mb-4 flex items-center justify-center bg-gradient-to-tr from-emerald-100 to-teal-50 dark:from-emerald-900/50 dark:to-teal-900/50 rounded-2xl text-3xl shadow-sm">
                  {reminder.icon}
                </div>
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-2">
                  {reminder.text}
                </h3>
                {reminder.sub && (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {reminder.sub}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
