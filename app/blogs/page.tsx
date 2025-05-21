"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const blogs = [
  {
    title: "The Importance of Seeking Knowledge",
    excerpt:
      "Seeking knowledge is an obligation for every Muslim. In this post, we explore why learning is so highly valued in Islam and how it benefits both individuals and society as a whole.",
    author: "Abdullah Rahman",
    date: "2024-04-05",
    slug: "importance-of-seeking-knowledge",
    commentsCount: 5,
  },
  {
    title: "Balancing Faith and Studies",
    excerpt:
      "University life can be challenging, but maintaining your faith is possible. Here are practical tips for balancing your academic responsibilities with your spiritual growth.",
    author: "Fatima Noor",
    date: "2024-03-28",
    slug: "balancing-faith-and-studies",
    commentsCount: 3,
  },
  {
    title: "Ramadan on Campus: A Student's Guide",
    excerpt:
      "Ramadan is a special time, even for students. Discover how to make the most of Ramadan while managing classes, assignments, and campus life.",
    author: "Yusuf Karim",
    date: "2024-03-15",
    slug: "ramadan-on-campus",
    commentsCount: 8,
  },
  {
    title: "The Power of Daily Dhikr",
    excerpt:
      "Incorporating dhikr into your daily routine can transform your life. Learn simple ways to remember Allah throughout your busy day.",
    author: "Aisha Siddiqua",
    date: "2024-02-28",
    slug: "power-of-daily-dhikr",
    commentsCount: 2,
  },
];

export default function BlogHomePage() {
  const [parallax, setParallax] = useState<{
    [key: number]: { x: number; y: number };
  }>({});
  const [revealed, setRevealed] = useState<{ [key: number]: boolean }>({});
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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
    cardsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

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

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 dark:from-slate-900 dark:via-gray-900 dark:to-emerald-950 px-4 py-20 flex flex-col items-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center font-poppins">
        Latest Blogs from IUT-SIKS
      </h1>
      <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full mb-14" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
        {blogs.map((blog, idx) => (
          <div
            key={blog.slug}
            ref={(el) => {
              cardsRef.current[idx] = el;
            }}
            data-idx={idx}
            className={`relative group rounded-2xl bg-white/70 dark:bg-gray-900/70 border border-white/40 dark:border-gray-800/40 shadow-lg backdrop-blur-md p-8 flex flex-col justify-between transition-all duration-700 hover:scale-105 hover:shadow-2xl cursor-pointer ${
              revealed[idx]
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={
              parallax[idx]
                ? {
                    transform: `rotateY(${
                      parallax[idx].x
                    }deg) rotateX(${-parallax[idx].y}deg) scale(1.03)`,
                  }
                : undefined
            }
            onMouseMove={(e) => handleParallax(e, idx)}
            onMouseLeave={() => resetParallax(idx)}
          >
            <div>
              <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                {blog.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-200 mb-4 line-clamp-3">
                {blog.excerpt}
              </p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-8 gap-2">
                <span>{blog.author}</span>
                <span>•</span>
                <span>
                  {new Date(blog.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
            <Link
              href={`/blogs/${blog.slug}`}
              className="inline-block mt-auto px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold shadow hover:shadow-xl hover:scale-105 transition-all duration-200 text-center focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              Read More
            </Link>
            <p className="text-sm text-gray-500 mt-2">Comments: {blog.commentsCount || 0}</p>
            {/* Glass overlay on hover */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300 bg-gradient-to-br from-emerald-200/40 to-blue-200/40 dark:from-emerald-900/30 dark:to-blue-900/30 rounded-2xl" />
          </div>
        ))}
      </div>
    </main>
  );
}
