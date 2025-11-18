"use client";
import { useEffect, useRef, useState } from "react";
import Skeleton from "../components/Skeleton";

const staticReminders = [
  {
    icon: "📖",
    text: "Read Surah Mulk before sleeping",
  },
  {
    icon: "🕌",
    text: "Pray all Salat in congregation",
  },
  {
    icon: "📘",
    text: "Read Surah Kahf on Friday",
  },
  {
    icon: "🤲",
    text: "Make morning and evening adhkar",
  },
];

// Updated interface to match the new, simplified data structure
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

// Updated default content to match the new structure
const defaultDailyData: DailyData = {
  hadith:
    'The Messenger of Allah (ﷺ) said, "Whoever travels a path in search of knowledge, Allah will make easy for him a path to Paradise."\n\n- Riyad as-Salihin 1381',
  name: "Al-Aleem (The All-Knowing)",
  verse: {
    surah: "Surah Az-Zumar",
    number: 9,
    text: "...Say, 'Are those who know equal to those who do not know?' Only they will remember [who are] people of understanding.",
    arabic:
      "قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ ۗ إِنَّمَا يَتَذَكَّرُ أُولُو الْأَلْبَابِ",
  },
};

export default function RemindersPage() {
  const [revealed, setRevealed] = useState<{ [key: number]: boolean }>({});
  const cardsRef = useRef<(HTMLLIElement | null)[]>([]);

  const [dailyData, setDailyData] = useState<DailyData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDailyReminder() {
      setLoading(true);
      try {
        // Fetch from the new, consolidated API endpoint
        const response = await fetch("/api/islamic-daily");
        if (!response.ok) {
          throw new Error("Failed to fetch from the daily API");
        }
        const data = await response.json();

        // Transform the fetched data to match our component's state structure
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
        // On error, set the daily data to our default fallback content
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
      { threshold: 0.2 },
    );
    cardsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-gray-900 dark:to-emerald-950 px-4 py-20">
      <h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6 font-poppins">
        Daily Islamic Reminders
      </h1>
      <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full mb-14" />

      {/* Daily Verse Section */}
      <section className="w-full max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
          Today&apos;s Verse
        </h2>
        <div className="bg-white/70 dark:bg-gray-900/70 border border-white/40 dark:border-gray-800/40 shadow-lg backdrop-blur-md rounded-2xl p-8">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-1/2 mx-auto" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          ) : (
            dailyData && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
                    {dailyData.verse.surah}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Verse {dailyData.verse.number}
                  </p>
                </div>
                <p
                  dir="rtl"
                  className="text-3xl text-right font-quranic text-gray-900 dark:text-gray-100 leading-relaxed"
                >
                  {dailyData.verse.arabic}
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-200 italic">
                  &quot;{dailyData.verse.text}&quot;
                </p>
                {/* Tafsir section is removed as it's not in the new API response */}
              </div>
            )
          )}
        </div>
      </section>

      {/* Hadith and Name of Allah Section */}
      {loading ? (
        <div className="w-full max-w-2xl mx-auto space-y-8 mb-16">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      ) : (
        dailyData && (
          <section className="w-full max-w-2xl mx-auto space-y-8 mb-16">
            <div className="bg-white/70 dark:bg-gray-900/70 border border-white/40 dark:border-gray-800/40 shadow-lg backdrop-blur-md rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-4">
                Today&apos;s Hadith
              </h3>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                {dailyData.hadith}
              </p>
            </div>
            <div className="bg-white/70 dark:bg-gray-900/70 border border-white/40 dark:border-gray-800/40 shadow-lg backdrop-blur-md rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                Name of Allah
              </h3>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                {dailyData.name}
              </p>
            </div>
          </section>
        )
      )}

      {/* Static Reminders List */}
      <ul className="w-full max-w-xl flex flex-col gap-8">
        {staticReminders.map((reminder, idx) => (
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
