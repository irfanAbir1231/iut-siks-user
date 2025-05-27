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

export default function PrayerTimesPage() {
  const [prayerTimes] = useState<PrayerTimes>({
    fajr: "04:50 AM",
    dhuhr: "1:20 PM",
    asr: "5:00 PM",
    maghrib: "6:40 PM",
    isha: "8:30 PM",
    jummah: "1:30 PM",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6 font-poppins">
          Today&apos;s Prayer Times
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full mb-14" />
        <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto">
          {loading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <Skeleton key={idx} className="h-20 w-full mb-2" />
              ))
            : Object.entries(prayerTimes).map(([key, time]) => (
                <div
                  key={key}
                  className="relative bg-white/70 dark:bg-gray-900/70 border border-white/40 dark:border-gray-800/40 shadow-lg backdrop-blur-md rounded-3xl p-4 flex justify-between items-center text-center transition-all duration-700 hover:scale-105 hover:shadow-2xl w-full h-20"
                >
                  <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 ml-4">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    <span className="text-xl text-gray-500 dark:text-gray-400 font-arabic block">
                      {key === "fajr" && "الفجر"}
                      {key === "dhuhr" && "الظهر"}
                      {key === "asr" && "العصر"}
                      {key === "maghrib" && "المغرب"}
                      {key === "isha" && "العشاء"}
                      {key === "jummah" && "الجمعة"}
                    </span>
                  </h2>
                  <p className="text-xl text-gray-700 dark:text-gray-200 mr-4">
                    {time}
                  </p>
                </div>
              ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
