"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-gray-900 dark:to-emerald-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-6 font-poppins">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              IUT SIKS
            </span>
          </h1>
          <div className="w-32 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full mb-8" />
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The{" "}
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
              Society of Islamic Knowledge Seekers
            </span>{" "}
            is dedicated to fostering spiritual growth, academic excellence, and
            brotherhood among the students of Islamic University of Technology.
          </p>
        </motion.div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md p-8 rounded-2xl border border-emerald-100 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center text-3xl mb-6">
              🚀
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              To create an environment where students can learn about Islam in
              its purest form, free from misconceptions, while excelling in
              their technical education. We strive to build character rooted in
              Islamic values.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md p-8 rounded-2xl border border-emerald-100 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="w-14 h-14 bg-teal-100 dark:bg-teal-900/50 rounded-xl flex items-center justify-center text-3xl mb-6">
              👁️
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              To become a beacon of guidance and a model community within IUT
              that produces professionals who are not only skilled engineers and
              leaders but also sincere practicing Muslims serving the Ummah.
            </p>
          </motion.div>
        </div>

        {/* What We Do Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            What We Do
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Halqas",
                icon: "📚",
                desc: "Weekly knowledge sharing sessions",
              },
              {
                title: "Competitions",
                icon: "🏆",
                desc: "Seerah Fest, Quran recitation & quizzes",
              },
              {
                title: "Charity",
                icon: "🤝",
                desc: "Community service and helping the needy",
              },
              {
                title: "Dawah",
                icon: "📣",
                desc: "Spreading the beautiful message of Islam",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center border-t-4 border-emerald-500"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* History / Story Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-emerald-900 to-teal-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl overflow-hidden relative"
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-400/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6 text-emerald-300">
                Our Legacy
              </h2>
              <div className="space-y-4 text-emerald-50/90 leading-relaxed">
                <p>
                  Established over 14 years ago, IUT SIKS started as a small
                  group of students gathering in the mosque to remind each other
                  of Allah (SWT).
                </p>
                <p>
                  Today, it has grown into one of the most active and
                  influential societies on campus, organizing large-scale events
                  like the Annual Seerah Fest which attracts participation from
                  the entire student body.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
              {/* Placeholder for an image - using Logo for now */}
              <div className="w-48 h-48 bg-white/10 rounded-full backdrop-blur-sm flex items-center justify-center border-4 border-white/20">
                <Image
                  src="/iut-siks-logo.jpg"
                  alt="SIKS Legacy"
                  width={150}
                  height={150}
                  className="rounded-full"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
