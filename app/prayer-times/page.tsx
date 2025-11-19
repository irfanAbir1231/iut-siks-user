"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "../components/Skeleton";

interface PrayerTimes {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  jummah: string;
}

const prayerIcons: { [key: string]: string } = {
  fajr: "🌅",
  dhuhr: "☀️",
  asr: "🌇",
  maghrib: "🌆",
  isha: "🌙",
  jummah: "🕌",
};

const prayerArabicNames: { [key: string]: string } = {
  fajr: "الفجر",
  dhuhr: "الظهر",
  asr: "العصر",
  maghrib: "المغرب",
  isha: "العشاء",
  jummah: "الجمعة",
};

// Helper function to parse time like "04:50 AM" into a Date object for today
const parsePrayerTime = (timeStr: string): Date => {
  const now = new Date();
  const [time, modifier] = timeStr.split(" ");
  const timeParts = time.split(":").map(Number);
  let hours = timeParts[0];
  const minutes = timeParts[1];

  if (modifier === "PM" && hours < 12) {
    hours += 12;
  }
  if (modifier === "AM" && hours === 12) {
    // Midnight case
    hours = 0;
  }

  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    0,
    0,
  );
};

export default function PrayerTimesPage() {
  const [prayerTimes] = useState<PrayerTimes>({
    fajr: "05:50 AM",
    dhuhr: "1:20 PM",
    asr: "4:00 PM",
    maghrib: "5:20 PM",
    isha: "7:45 PM",
    jummah: "1:30 PM",
  });
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [nextPrayer, setNextPrayer] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);

    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      );
      setCurrentDate(
        now.toLocaleDateString([], {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      );

      // Determine next prayer
      const isFriday = now.getDay() === 5;
      const todayPrayers = isFriday
        ? { ...prayerTimes, dhuhr: prayerTimes.jummah, jummah: undefined }
        : { ...prayerTimes, jummah: undefined };

      const sortedPrayers = Object.entries(todayPrayers)
        .filter(([, time]) => !!time)
        .map(([name, time]) => ({ name, date: parsePrayerTime(time!) }))
        .sort((a, b) => a.date.getTime() - b.date.getTime());

      let next = sortedPrayers.find((p) => p.date > now);

      if (!next) {
        next = sortedPrayers[0]; // If all prayers for today passed, next is Fajr tomorrow
      }
      setNextPrayer(next?.name ?? null);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [prayerTimes]);

  const isFriday = new Date().getDay() === 5;
  const prayerSchedule = isFriday
    ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (({ dhuhr, ...rest }) => ({ ...rest, jummah: prayerTimes.jummah }))(
        prayerTimes,
      )
    : // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (({ jummah, ...rest }) => rest)(prayerTimes);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="prayer-times-page"
        className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-gray-900 dark:to-emerald-950 px-4 py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4 font-poppins">
            Prayer Times
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full mb-4" />
          {loading ? (
            <Skeleton className="h-16 w-1/2 mx-auto mt-2" />
          ) : (
            <div className="text-gray-600 dark:text-gray-300">
              <p className="text-2xl font-semibold">{currentTime}</p>
              <p className="text-md">{currentDate}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl mx-auto mt-14">
          {loading
            ? Array.from({ length: 5 }).map((_, idx) => (
                <Skeleton key={idx} className="h-32 w-full" />
              ))
            : Object.entries(prayerSchedule).map(([key, time]) => {
                const isNext = nextPrayer === key;
                return time ? (
                  <motion.div
                    key={key}
                    className={`relative overflow-hidden rounded-2xl p-6 flex flex-col justify-between items-center text-center transition-all duration-300 transform-gpu ${
                      isNext
                        ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-2xl scale-105"
                        : "bg-white/70 dark:bg-gray-800/60 border border-white/40 dark:border-gray-700/50 shadow-lg backdrop-blur-md"
                    }`}
                    whileHover={{ scale: isNext ? 1.05 : 1.03 }}
                  >
                    <div className="flex justify-between w-full items-start">
                      <div className="text-left">
                        <h2
                          className={`text-2xl font-bold capitalize ${isNext ? "text-white" : "text-emerald-700 dark:text-emerald-400"}`}
                        >
                          {key}
                        </h2>
                        <p
                          className={`text-lg ${isNext ? "text-emerald-100" : "text-gray-500 dark:text-gray-400"}`}
                        >
                          {prayerArabicNames[key]}
                        </p>
                      </div>
                      <span className="text-3xl">{prayerIcons[key]}</span>
                    </div>
                    <p
                      className={`text-4xl font-mono font-bold mt-4 ${isNext ? "text-white" : "text-gray-800 dark:text-gray-100"}`}
                    >
                      {time}
                    </p>
                    {isNext && (
                      <div className="absolute top-2 right-2 text-xs uppercase font-bold bg-white/30 text-white px-2 py-1 rounded-full">
                        Next
                      </div>
                    )}
                  </motion.div>
                ) : null;
              })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
