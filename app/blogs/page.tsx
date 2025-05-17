import Link from "next/link";

const blogs = [
  {
    title: "The Importance of Seeking Knowledge",
    excerpt:
      "Seeking knowledge is an obligation for every Muslim. In this post, we explore why learning is so highly valued in Islam and how it benefits both individuals and society as a whole.",
    author: "Abdullah Rahman",
    date: "2024-04-05",
    slug: "importance-of-seeking-knowledge",
  },
  {
    title: "Balancing Faith and Studies",
    excerpt:
      "University life can be challenging, but maintaining your faith is possible. Here are practical tips for balancing your academic responsibilities with your spiritual growth.",
    author: "Fatima Noor",
    date: "2024-03-28",
    slug: "balancing-faith-and-studies",
  },
  {
    title: "Ramadan on Campus: A Student's Guide",
    excerpt:
      "Ramadan is a special time, even for students. Discover how to make the most of Ramadan while managing classes, assignments, and campus life.",
    author: "Yusuf Karim",
    date: "2024-03-15",
    slug: "ramadan-on-campus",
  },
  {
    title: "The Power of Daily Dhikr",
    excerpt:
      "Incorporating dhikr into your daily routine can transform your life. Learn simple ways to remember Allah throughout your busy day.",
    author: "Aisha Siddiqua",
    date: "2024-02-28",
    slug: "power-of-daily-dhikr",
  },
];

export default function BlogHomePage() {
  return (
    <main className="min-h-screen bg-green-50 px-4 py-12 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-10 text-center">
        Latest Blogs from IUT-SIKS
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {blogs.map((blog) => (
          <div
            key={blog.slug}
            className="bg-white border border-green-300 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-150 p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-semibold text-green-700 mb-2">
                {blog.title}
              </h2>
              <p className="text-green-800 mb-4 line-clamp-3">{blog.excerpt}</p>
              <div className="flex items-center text-sm text-green-600 mb-6 gap-2">
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
              className="inline-block mt-auto px-6 py-2 rounded-lg bg-green-500 text-white font-medium shadow hover:bg-green-600 transition-colors duration-150 text-center focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
