import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <section className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Welcome to IUT-SIKS
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-10">
          Society of Islamic Knowledge Seekers at Islamic University of
          Technology
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl mx-auto">
          <Link
            href="/events"
            className="flex items-center justify-center py-6 px-4 rounded-xl bg-white shadow-md text-2xl font-semibold text-blue-700 border border-blue-200 hover:bg-blue-50 hover:scale-105 transition-all duration-150"
          >
            📅 View Events
          </Link>
          <Link
            href="/blogs"
            className="flex items-center justify-center py-6 px-4 rounded-xl bg-white shadow-md text-2xl font-semibold text-green-700 border border-green-200 hover:bg-green-50 hover:scale-105 transition-all duration-150"
          >
            📝 Read Blogs
          </Link>
          <Link
            href="/prayer-times"
            className="flex items-center justify-center py-6 px-4 rounded-xl bg-white shadow-md text-2xl font-semibold text-purple-700 border border-purple-200 hover:bg-purple-50 hover:scale-105 transition-all duration-150"
          >
            🕌 Prayer Times
          </Link>
          <Link
            href="/reminders"
            className="flex items-center justify-center py-6 px-4 rounded-xl bg-white shadow-md text-2xl font-semibold text-yellow-700 border border-yellow-200 hover:bg-yellow-50 hover:scale-105 transition-all duration-150"
          >
            🕋 Daily Reminders
          </Link>
        </div>
      </section>
    </main>
  );
}
