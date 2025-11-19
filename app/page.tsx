"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
// import { SignInButton } from "@clerk/nextjs"; // MODIFIED: Commented out
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
// 1. Import the font
import { Aref_Ruqaa } from "next/font/google";

// 2. Configure the font
const arefRuqaa = Aref_Ruqaa({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

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

const slideshowImages = [
  "https://res.cloudinary.com/dah92ac5b/image/upload/v1763410753/2dk2RRM2dZ8gKjXsrozapsD83FxL3Xbyyi5LFttAhrXxr16mCe4arfLJHzsuAJV54Whe4KoiMCwtnYk8d4G4gZbgjk9L25sfV5GgGB2nTgHQQhjDe18zzj5G9pZFTC2KTRbncJ1HnQUFhX5CDxJ4sQABMBMxgFJtBUxGPodXWW_koggpf.jpg",
  "https://res.cloudinary.com/dah92ac5b/image/upload/v1763410758/581784665_1270846551737901_5486929788072267009_n_ycpwcl.jpg",
  "https://res.cloudinary.com/dah92ac5b/image/upload/v1763410761/530396118_1189458623210028_922093440475259661_n_jfyx6i.jpg",
  "https://res.cloudinary.com/dah92ac5b/image/upload/v1763410762/536309837_1195526659269891_4099679753974654091_n_inyvxi.jpg",
  "https://res.cloudinary.com/dah92ac5b/image/upload/v1763410762/503563354_1132938862195338_6664611731588385766_n_t9j0yx.jpg",
  "https://res.cloudinary.com/dah92ac5b/image/upload/v1763410764/581015731_1269672285188661_5684656119063013537_n_u15iol.jpg",
];

// Data for new sections
const prayerTimes = {
  fajr: "05:50 AM",
  dhuhr: "1:20 PM",
  asr: "4:00 PM",
  maghrib: "5:20 PM",
  isha: "7:45 PM",
  jummah: "1:30 PM",
};

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const navCardsRef = useRef<HTMLDivElement>(null);
  const featuresStatsRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  // --- START: Next Salat Time Logic ---
  const [nextPrayer, setNextPrayer] = useState<{
    name: string;
    time: string;
  } | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [isJamat, setIsJamat] = useState<boolean>(false);

  // --- START: Prayer Bar Visibility Logic ---
  const [isPrayerBarVisible, setIsPrayerBarVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        // Hide the bar after scrolling 80% of the hero section's height
        const heroHeight = heroRef.current.offsetHeight;
        setIsPrayerBarVisible(window.scrollY < heroHeight * 0.8);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // --- END: Prayer Bar Visibility Logic ---

  useEffect(() => {
    const parsePrayerTime = (timeStr: string): Date => {
      const now = new Date();
      const [time, modifier] = timeStr.split(" ");
      const [hoursStr, minutesStr] = time.split(":");
      let hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr, 10);

      if (modifier === "PM" && hours < 12) {
        hours += 12;
      }
      if (modifier === "AM" && hours === 12) {
        // Midnight case
        hours = 0;
      }
      now.setHours(hours, minutes, 0, 0);
      return now;
    };

    const interval = setInterval(() => {
      const now = new Date();
      const isFriday = now.getDay() === 5;

      const dailyPrayerTimes = {
        fajr: prayerTimes.fajr,
        ...(isFriday
          ? { jummah: prayerTimes.jummah }
          : { dhuhr: prayerTimes.dhuhr }),
        asr: prayerTimes.asr,
        maghrib: prayerTimes.maghrib,
        isha: prayerTimes.isha,
      };

      const prayerTimesData = Object.entries(dailyPrayerTimes).map(
        ([name, time]) => ({
          name: name.charAt(0).toUpperCase() + name.slice(1),
          time: parsePrayerTime(time),
        }),
      );

      let inJamat = false;
      let currentPrayerName = "";

      // Check for jamat time first (within 15 mins after prayer time)
      for (const prayer of prayerTimesData) {
        const diff = now.getTime() - prayer.time.getTime();
        if (diff > 0 && diff < 15 * 60 * 1000) {
          inJamat = true;
          currentPrayerName = prayer.name;
          break;
        }
      }

      if (inJamat) {
        setIsJamat(true);
        setNextPrayer({ name: currentPrayerName, time: "" });
        setTimeRemaining("");
      } else {
        setIsJamat(false);
        // Find the next prayer
        let nextPrayerData = prayerTimesData.find((p) => p.time > now);

        // If no prayer is left for today, next is Fajr tomorrow
        if (!nextPrayerData) {
          const tomorrowFajr = parsePrayerTime(prayerTimes.fajr);
          tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
          nextPrayerData = { name: "Fajr", time: tomorrowFajr };
        }

        if (nextPrayerData) {
          setNextPrayer({
            name: nextPrayerData.name,
            time: nextPrayerData.time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          });

          const diffSeconds = Math.floor(
            (nextPrayerData.time.getTime() - now.getTime()) / 1000,
          );
          const hours = Math.floor(diffSeconds / 3600);
          const minutes = Math.floor((diffSeconds % 3600) / 60);
          const seconds = diffSeconds % 60;

          setTimeRemaining(
            `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
              2,
              "0",
            )}:${String(seconds).padStart(2, "0")}`,
          );
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // --- END: Next Salat Time Logic ---

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === slideshowImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

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

  const upcomingPrayersMarquee = Object.entries(prayerTimes)
    .map(
      ([name, time]) =>
        `${name.charAt(0).toUpperCase() + name.slice(1)}: ${time}`,
    )
    .join("  •  ");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-gray-900 dark:to-emerald-950">
      {/* --- NEW HORIZONTAL PRAYER TIME BAR --- */}
      <AnimatePresence>
        {isPrayerBarVisible && (
          <motion.section
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="sticky top-16 z-40 bg-black/30 backdrop-blur-lg text-white shadow-lg"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-14">
                <div className="text-sm md:text-base">
                  <AnimatePresence mode="wait">
                    {isJamat ? (
                      <motion.div
                        key="jamat"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="font-semibold text-emerald-300 animate-pulse"
                      >
                        {nextPrayer?.name} Jamat Ongoing
                      </motion.div>
                    ) : (
                      <motion.div
                        key="countdown"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center space-x-2 md:space-x-4"
                      >
                        <span className="hidden md:inline">Next Jamaat:</span>
                        <span className="font-bold">{nextPrayer?.name}</span>
                        <span className="text-gray-300">
                          {nextPrayer?.time}
                        </span>
                        <span className="font-mono text-emerald-300 font-bold tracking-wider">
                          {timeRemaining}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="hidden md:block text-sm text-gray-300 font-mono">
                  {upcomingPrayersMarquee}
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-between overflow-hidden sm:py-32 py-20"
      >
        {/* Background Slideshow */}
        <AnimatePresence>
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <Image
              src={slideshowImages[currentImageIndex]}
              alt="Background"
              layout="fill"
              objectFit="cover"
              className="brightness-50" // Darken image for readability
              priority // Prioritize loading the hero image
            />
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>
        </AnimatePresence>

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
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-10 text-white drop-shadow-lg">
                {/* 3. Apply the font here */}
                <span className={`block ${arefRuqaa.className}`}>IUT SIKS</span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-normal text-gray-200 mt-2"></span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed drop-shadow-md">
                Fostering spiritual growth and academic excellence at{" "}
                <span className="font-medium text-emerald-300">
                  Islamic University of Technology
                </span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                {/* <SignInButton> */}
                <Link
                  href="https://web.facebook.com/iutsiks"
                  className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                >
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
                </Link>
                {/* </SignInButton> */}
                <Link
                  href="/events"
                  className="px-8 py-4 bg-white text-emerald-700 rounded-full font-semibold text-lg border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Explore Events
                </Link>
                <Link
                  href="/reminders"
                  className="px-8 py-4 bg-white text-emerald-700 rounded-full font-semibold text-lg border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Daily Reminders
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
                <div className="w-8 h-14 border-2 border-white rounded-full flex justify-center items-start">
                  <div className="w-1 h-4 bg-white rounded-full mt-2" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEW PRAYER TIME SECTION --- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-50/50 dark:bg-emerald-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4 font-poppins">
              IUT Mosque Jamaat Times
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 p-6 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl max-w-md mx-auto border border-gray-200 dark:border-gray-700 shadow-lg"
          >
            <AnimatePresence mode="wait">
              {isJamat ? (
                <motion.div
                  key="jamat"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <p className="text-2xl font-semibold text-emerald-700 dark:text-emerald-300 animate-pulse">
                    {nextPrayer?.name} Jamat Ongoing
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-md mt-1">
                    Join the congregation
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="countdown"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <p className="text-lg text-gray-700 dark:text-gray-200">
                    Next Prayer:{" "}
                    <span className="font-bold text-gray-900 dark:text-white">
                      {nextPrayer?.name}
                    </span>{" "}
                    at{" "}
                    <span className="font-bold text-gray-900 dark:text-white">
                      {nextPrayer?.time}
                    </span>
                  </p>
                  <p className="text-5xl font-mono font-bold text-emerald-600 dark:text-emerald-400 tracking-wider mt-2">
                    {timeRemaining}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {Object.entries(prayerTimes).map(([key, time]) => (
              <div
                key={key}
                className="text-center p-4 bg-white/70 dark:bg-gray-900/70 rounded-xl shadow-md border border-gray-200/50 dark:border-gray-800/50 transition-transform hover:scale-105"
              >
                <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 capitalize">
                  {key}
                </h3>
                <p className="text-md font-mono text-gray-700 dark:text-gray-200 mt-1">
                  {time}
                </p>
              </div>
            ))}
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
            aria-label="Scroll to next section"
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
