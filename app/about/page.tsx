"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const galleryImages = [
  {
    src: "https://res.cloudinary.com/dah92ac5b/image/upload/v1763483824/488643263_1084428723713019_3079657229627892769_n_zlyczi.jpg",
    alt: "IUT SIKS Community Gathering",
    className: "row-span-2 col-span-2 aspect-square", // Main large image
  },
  {
    src: "https://res.cloudinary.com/dah92ac5b/image/upload/v1763483040/503563354_1132938862195338_6664611731588385766_n_uultht.jpg",
    alt: "Seerah Fest Event",
    className: "col-span-1 aspect-[4/5]", // Tall image
  },
  {
    src: "https://res.cloudinary.com/dah92ac5b/image/upload/v1763410753/2dk2RRM2dZ8gKjXsrozapsD83FxL3Xbyyi5LFttAhrXxr16mCe4arfLJHzsuAJV54Whe4KoiMCwtnYk8d4G4gZbgjk9L25sfV5GgGB2nTgHQQhjDe18zzj5G9pZFTC2KTRbncJ1HnQUFhX5CDxJ4sQABMBMxgFJtBUxGPodXWW_koggpf.jpg",
    alt: "IUT Mosque",
    className: "col-span-1 aspect-[4/5]", // Tall image
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-gray-900 dark:to-emerald-950 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 font-poppins">
            About <span className="text-emerald-600">IUT SIKS</span>
          </h1>
          <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full" />
        </motion.div>

        {/* Content Grid: Text Left, Gallery Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300 leading-relaxed">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Who We Are
              </h3>
              <p>
                The{" "}
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                  Society of Islamic Knowledge Seekers (SIKS)
                </span>{" "}
                is more than just a student club; it is a brotherhood dedicated
                to fostering spiritual growth and academic excellence at the
                Islamic University of Technology. For over 14 years, we have
                served as a sanctuary for students seeking to balance their
                rigorous engineering studies with their duties to their Creator.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">
                Our Mission
              </h3>
              <p>
                We strive to create an environment where students can learn
                about Islam in its purest form, free from misconceptions. Our
                goal is to produce professionals who are not only skilled
                engineers and leaders but also sincere practicing Muslims who
                serve the Ummah with integrity and compassion.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-8 mb-4">
                What We Do
              </h3>
              <p>
                From organizing the grand Annual Seerah Fest to conducting
                weekly Departmental Halaqas, our activities are diverse yet
                unified in purpose. We facilitate:
              </p>
              <ul className="list-none space-y-2 mt-4 pl-0">
                {[
                  "Weekly knowledge-sharing circles (Halaqas)",
                  "Community charity drives & winter clothing distribution",
                  "Quran recitation competitions & Islamic quizzes",
                  "Mentorship for new students joining the campus",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="text-emerald-500">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4">
              <div className="inline-block bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 p-6 rounded-xl">
                <p className="text-emerald-800 dark:text-emerald-200 italic font-medium text-lg">
                  &quot;And let there be [arising] from you a nation inviting to
                  [all that is] good, enjoining what is right and forbidding
                  what is wrong, and those will be the successful.&quot;
                </p>
                <p className="text-emerald-600 dark:text-emerald-400 text-sm mt-2 font-bold text-right">
                  — Surah Al-Imran [3:104]
                </p>
              </div>
            </div>
          </motion.div>

          {/* Gallery Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-4 sticky top-24"
          >
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className={`relative overflow-hidden rounded-2xl shadow-lg group ${img.className}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium">{img.alt}</p>
                </div>
              </div>
            ))}

            {/* Stat Overlay Box */}
            <div className="col-span-2 bg-gray-900 text-white p-6 rounded-2xl shadow-xl flex justify-around items-center mt-2">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">14+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">
                  Years
                </div>
              </div>
              <div className="w-px h-10 bg-gray-700" />
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">500+</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">
                  Members
                </div>
              </div>
              <div className="w-px h-10 bg-gray-700" />
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">∞</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">
                  Brotherhood
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
