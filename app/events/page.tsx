"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// --- 1. SIKS DAY 1447 SCHEDULE ---
const siksDaySchedule = [
  {
    time: "2:30 PM - 2:35 PM",
    title: "Opening Ceremony & Qur'an Recitation",
    type: "Ceremony",
  },
  {
    time: "2:35 PM - 2:40 PM",
    title: "Speech by IUT SIKS President",
    type: "Speech",
  },
  {
    time: "2:40 PM - 2:50 PM",
    title: "Speech by Dr. Golam Sarowar",
    role: "Moderator, IUT SIKS",
    type: "Speech",
  },
  {
    time: "2:50 PM - 3:50 PM",
    title: "Speech by Mufti Abdur Rahman Ibn Yusuf Mangera",
    type: "Keynote",
    highlight: true,
  },
  {
    time: "3:50 PM - 4:15 PM",
    title: "Asr Prayer Break",
    type: "Break",
  },
  {
    time: "4:15 PM - 4:30 PM",
    title: "QUIZ",
    type: "Activity",
    highlight: true,
  },
  {
    time: "4:30 PM - 5:05 PM",
    title: "Speech by Sabir Salman Al Musawi",
    type: "Keynote",
  },
  {
    time: "5:05 PM - 5:15 PM",
    title: "Prize Giving & Closing Ceremony",
    type: "Ceremony",
  },
];

// --- 2. Regular Activities ---
const regularActivities = [
  {
    title: "Weekly Study Circles",
    schedule: "Weekly",
    description:
      "Gatherings to encourage seeking Islamic knowledge and brotherhood. Block Halaqas arranged Department-wise.",
    icon: "📖",
  },
  {
    title: "Bangla Halaqa",
    schedule: "Tuesdays, After Maghrib",
    description:
      "In-depth Islamic discussions conducted in Bangla at the IUT Mosque.",
    icon: "🕌",
  },
  {
    title: "English Halaqa",
    schedule: "Thursdays, After Maghrib",
    description:
      "Discussions and lectures conducted in English for international and local students.",
    icon: "🌍",
  },
];

// --- 3. Community Service ---
const communityService = [
  {
    title: "Ramadan Food Distribution",
    description:
      "Annual initiative providing food packs to the needy during the blessed month of Ramadan.",
    image:
      "https://res.cloudinary.com/dah92ac5b/image/upload/v1763484690/82aee49d-45d6-4885-a178-aa711960e2a6.png",
  },
  {
    title: "Winter Cloth Distribution",
    description:
      "Distributing warm clothes and blankets to vulnerable communities during harsh winters.",
    image:
      "https://res.cloudinary.com/dah92ac5b/image/upload/v1763484633/6d9b8969-66e0-4060-9ca6-204a2f48cd86.png",
  },
];

// --- 4. Major & Special Events (UPDATED WITH MULTIPLE IMAGES) ---
const majorEvents = [
  {
    title: "SIKS Day",
    type: "Annual Gathering",
    description:
      "A grand gathering of IUT SIKS members, alumni, and guests to celebrate brotherhood and achievements.",
    // Add your multiple image paths here
    images: [
      "https://res.cloudinary.com/dah92ac5b/image/upload/v1763483824/488643263_1084428723713019_3079657229627892769_n_zlyczi.jpg",
      "https://res.cloudinary.com/dah92ac5b/image/upload/v1763483824/488886923_1084428667046358_890829202263037275_n_qncmxo.jpg",
      "https://res.cloudinary.com/dah92ac5b/image/upload/v1763483823/488658764_1084428570379701_8641257185763965912_n_uys7vc.jpg",
      "https://res.cloudinary.com/dah92ac5b/image/upload/v1763483822/488418395_1084428727046352_1089365489557630880_n_j0jrju.jpg",
      "https://res.cloudinary.com/dah92ac5b/image/upload/v1763483822/488598770_1084428717046353_6723784059682066805_n_voc0lb.jpg",
      "https://res.cloudinary.com/dah92ac5b/image/upload/v1763483670/484827612_1067468828742342_3548561353533067130_n_bo35qn.jpg",
      "https://res.cloudinary.com/dah92ac5b/image/upload/v1763483669/483964585_1067468982075660_7008218858608980426_n_wvwqgq.jpg",
      "https://res.cloudinary.com/dah92ac5b/image/upload/v1763483670/484858546_1067468882075670_5970877494790293031_n_h7ioqk.jpg",
      "https://res.cloudinary.com/dah92ac5b/image/upload/v1763483669/484188731_1067468645409027_4303669690209181709_n_koyjjw.jpg",
      "https://res.cloudinary.com/dah92ac5b/image/upload/v1763483668/483524099_1067468845409007_3233896152979738096_n_sc4ste.jpg",
      "https://res.cloudinary.com/dah92ac5b/image/upload/v1763483668/483524099_1067468845409007_3233896152979738096_n_sc4ste.jpg",
      "https://res.cloudinary.com/dah92ac5b/image/upload/v1763483668/483525841_1067468862075672_6844785778637608693_n_ha9t7h.jpg",
    ],
  },
  {
    title: "Seerah Fest",
    type: "Annual Seerah Event",
    description:
      "A blessed annual gathering dedicated to learning and reflecting upon the Seerah of our beloved Prophet ﷺ. Features inspirational speeches and community engagement.",
    images: [
      "https://res.cloudinary.com/dah92ac5b/image/upload/v1763483040/503563354_1132938862195338_6664611731588385766_n_uultht.jpg",
      "https://res.cloudinary.com/dah92ac5b/image/upload/v1763483040/503897757_1132945988861292_7569565627304738978_n_cqwp4v.jpg",
      "https://res.cloudinary.com/dah92ac5b/image/upload/v1763483038/503478961_1132938695528688_5782825963744455047_n_u2xcsu.jpg",
      "https://res.cloudinary.com/dah92ac5b/image/upload/v1763483037/502584992_1132939215528636_2976416315418774868_n_rnftwb.jpg",
      "https://res.cloudinary.com/dah92ac5b/image/upload/v1763483037/503086301_1132939575528600_1099035877984773993_n_zvyrz0.jpg",
      "https://res.cloudinary.com/dah92ac5b/image/upload/v1763483037/503430100_1132939278861963_822450018174500711_n_fflxi6.jpg",
      "https://res.cloudinary.com/dah92ac5b/image/upload/v1763483035/502720917_1132939652195259_6569797847348000765_n_y7uode.jpg",
      "https://res.cloudinary.com/dah92ac5b/image/upload/v1763483034/502657910_1132939435528614_7445923176066634903_n_zmzb7q.jpg",
      "https://res.cloudinary.com/dah92ac5b/image/upload/v1763483034/502668367_1132939535528604_3884442262881006256_n_v7yjmx.jpg",
      "https://res.cloudinary.com/dah92ac5b/image/upload/v1763483033/502621618_1132939838861907_263666772580135588_n_ilytda.jpg",
      "https://res.cloudinary.com/dah92ac5b/image/upload/v1763483033/503090124_1132939612195263_2018236026699768958_n_hbdk11.jpg",
      "https://res.cloudinary.com/dah92ac5b/image/upload/v1763483034/502616311_1132945935527964_2137856068274863331_n_uotdwf.jpg",
      "https://res.cloudinary.com/dah92ac5b/image/upload/v1763483032/502598903_1132939742195250_3909773213456526271_n_qzhnke.jpg",
      "https://res.cloudinary.com/dah92ac5b/image/upload/v1763482731/2bf5c31d-2cbb-43d6-b1fe-2b0460819041.png",
    ],
  },
  {
    title: "Seminars & Webinars",
    type: "Special Activity",
    description:
      "Educational sessions with guest speakers on topics like 'Belief in God' and contemporary Islamic issues.",
    images: [
      "https://res.cloudinary.com/dah92ac5b/image/upload/v1763483670/484517290_1067469065408985_2923591950792732135_n_qyzzdr.jpg",
    ],
  },
];

// --- Sub-Component: Image Slideshow ---
const ImageSlideshow = ({ images, alt }: { images: string[]; alt: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={images[currentIndex]}
            alt={`${alt} - Image ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority={currentIndex === 0} // Prioritize first image
          />
        </motion.div>
      </AnimatePresence>

      {/* Optional: Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-4 right-4 z-20 flex gap-1.5">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                idx === currentIndex ? "bg-emerald-400" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-gray-900 dark:to-emerald-950">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 dark:text-gray-100 mb-6 font-poppins tracking-tight">
            Our Activities <span className="text-emerald-600">& Events</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Fostering spiritual growth and excellence at IUT.
            <br />
            <span className="text-emerald-600 font-semibold italic">
              &quot;Let there be a group among you who call others to
              goodness...&quot; (3:104)
            </span>
          </p>
        </motion.div>

        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      </section>

      {/* 1. SIKS DAY 1447 SCHEDULE SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-block py-1 px-4 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 text-sm font-bold mb-4 tracking-wide"
          >
            UPCOMING EVENT
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-2 font-serif">
            SIKS DAY 1447
          </h2>
          <p className="text-2xl text-emerald-600 dark:text-emerald-400 font-medium">
            November 19
          </p>
          <div className="mt-6 h-1.5 w-32 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-full mx-auto" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700"
        >
          {/* Schedule Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
            <h3 className="text-3xl font-bold text-white tracking-wide">
              Event Time Schedule
            </h3>
          </div>

          {/* Timeline Items */}
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {siksDaySchedule.map((item, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-1 md:grid-cols-4 p-6 md:p-8 transition-colors ${
                  item.highlight
                    ? "bg-emerald-50/60 dark:bg-emerald-900/20 hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
                    : "hover:bg-gray-50 dark:hover:bg-gray-700/30"
                }`}
              >
                {/* Time Column */}
                <div className="md:col-span-1 flex items-center mb-2 md:mb-0">
                  <div className="inline-flex items-center justify-center px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-emerald-700 dark:text-emerald-300 font-mono text-sm font-bold">
                    {item.time}
                  </div>
                </div>

                {/* Content Column */}
                <div className="md:col-span-3 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        item.type === "Keynote"
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
                          : item.type === "Break"
                            ? "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                            : item.type === "Activity"
                              ? "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300"
                              : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                      }`}
                    >
                      {item.type}
                    </span>
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {item.title}
                  </h4>
                  {item.role && (
                    <p className="text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                      {item.role}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 2. REGULAR ACTIVITIES */}
      <section className="py-20 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Regular Activities
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Consistency is key. Join our weekly circles to maintain your
              spiritual momentum.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {regularActivities.map((activity, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:border-emerald-500/50 transition-colors group"
              >
                <div className="text-4xl mb-6 bg-emerald-100 dark:bg-emerald-900/30 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {activity.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {activity.title}
                </h3>
                <p className="text-emerald-600 dark:text-emerald-400 font-medium text-sm mb-4 uppercase tracking-wider">
                  {activity.schedule}
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {activity.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MAJOR EVENTS & SPECIAL ACTIVITIES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Major Events
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Grand gatherings and special knowledge sessions throughout the
              year.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {majorEvents.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl aspect-[16/9] shadow-xl bg-gray-100 dark:bg-gray-800"
            >
              {/* Replaced Static Image with Slideshow Component */}
              <ImageSlideshow images={event.images} alt={event.title} />

              {/* Text Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 z-10">
                <span className="inline-block px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full mb-3 w-fit shadow-sm">
                  {event.type}
                </span>
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-sm">
                  {event.title}
                </h3>
                <p className="text-gray-200 text-sm md:text-base line-clamp-3 drop-shadow-sm">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. COMMUNITY SERVICE */}
      <section className="py-20 bg-emerald-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Community Service Initiatives
            </h2>
            <p className="text-emerald-100 max-w-2xl mx-auto text-lg">
              Serving humanity is a core part of our faith. Through initiatives
              like
              <span className="font-bold text-white">
                {" "}
                &quot;IUTian Helping Hands&quot;
              </span>
              , we strive to support those in need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {communityService.map((service, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row gap-6 items-center bg-emerald-800/50 rounded-2xl p-6 border border-emerald-700 hover:bg-emerald-800 transition-colors"
              >
                <div className="relative w-full md:w-48 h-48 flex-shrink-0 overflow-hidden rounded-xl bg-emerald-900">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-emerald-200">
                    {service.title}
                  </h3>
                  <p className="text-emerald-50 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 text-center bg-gradient-to-b from-white to-emerald-50 dark:from-gray-900 dark:to-black">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Ready to Participate?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
          Join the events, attend our halaqas, or volunteer for our charity
          drives. There is a place for everyone at IUT SIKS.
        </p>
        <Link
          href="https://web.facebook.com/iutsiks"
          className="inline-flex items-center px-8 py-4 rounded-full bg-emerald-600 text-white font-bold text-lg shadow-lg hover:bg-emerald-700 hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-1"
        >
          Join Our Community
        </Link>
      </section>
    </main>
  );
}
