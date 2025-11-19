"use client";

import { motion } from "framer-motion";

const upcomingFeatures = [
  {
    title: "Salat Tracker",
    description:
      "A personal dashboard to track your daily five prayers. Monitor your consistency, log missed prayers (Qaza), and visualize your spiritual streak over time.",
    icon: "🤲",
    status: "In Development",
    color: "emerald",
  },
  {
    title: "Personal Islamic Reminder",
    description:
      "Set customized notifications for specific deeds. Whether it's reading Surah Mulk before sleep or Duha prayer in the morning, get nudged at the right time.",
    icon: "🔔",
    status: "Planned",
    color: "blue",
  },
  {
    title: "Islamic Blog & Insights",
    description:
      "A community-driven platform where students and alumni can share reflections, articles on Islamic history, and contemporary issues faced by youth.",
    icon: "✍️",
    status: "Coming Soon",
    color: "purple",
  },
  {
    title: "Live Islamic Events",
    description:
      "Real-time updates of halaqas, lectures, SIKS Book Club meetups, and other on-campus Islamic programs — never miss a gathering again.",
    icon: "📅",
    status: "In Progress",
    color: "emerald",
  },
  {
    title: "Halaqa Livestream",
    description:
      "Watch halaqas and lectures live when you can’t attend physically. Includes reminders, upcoming session info, and archived recordings.",
    icon: "🎥",
    status: "Planned",
    color: "indigo",
  },
  {
    title: "Community Hub",
    description:
      "A dedicated section for students to share reflections, discuss Islamic topics, form study circles, and build a stronger SIKS community.",
    icon: "🌙",
    status: "Concept",
    color: "violet",
  },
  {
    title: "Ask the Scholar",
    description:
      "An anonymous Q&A portal connecting students with qualified Shuyukh to get answers to fiqh queries and personal advice without hesitation.",
    icon: "❓",
    status: "Concept",
    color: "teal",
  },
];

export default function UpcomingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-gray-900 dark:to-emerald-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 text-sm font-bold mb-4 tracking-wide uppercase">
            Roadmap
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-6 font-poppins">
            Future of <span className="text-emerald-600">IUT SIKS</span> Website
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We are constantly building tools to aid your spiritual journey and
            academic life. Here is a glimpse of what we are cooking up next.
          </p>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {upcomingFeatures.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/50 dark:border-gray-700 hover:border-emerald-400 transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="text-4xl bg-gray-50 dark:bg-gray-700/50 w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                ${
                  feature.status === "In Development"
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                    : feature.status === "Coming Soon"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                }`}
              >
                {feature.status}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-20"
      >
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Have an idea for a feature? We&apos;d love to hear from you.
        </p>
        <a
          href="https://web.facebook.com/iutsiks"
          className="inline-flex items-center px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-400 font-semibold shadow-sm hover:bg-emerald-50 dark:hover:bg-gray-700 transition-colors"
        >
          Suggest a Feature
        </a>
      </motion.div>
    </main>
  );
}
