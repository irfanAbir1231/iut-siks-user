import Link from "next/link";

const events = [
  {
    title: "Ramadan Seminar",
    date: "2024-04-10",
    description:
      "Join us for a seminar on the significance of Ramadan and how to make the most of it.",
  },
  {
    title: "Charity Drive",
    date: "2024-05-01",
    description:
      "Participate in our annual charity drive to support local communities in need.",
  },
  {
    title: "Quran Recitation Competition",
    date: "2024-06-15",
    description: "Showcase your recitation skills and win exciting prizes.",
  },
  {
    title: "Eid Gathering",
    date: "2024-07-01",
    description:
      "Celebrate Eid with fellow students and enjoy food, games, and more.",
  },
];

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-green-50 px-4 py-12 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-10 text-center">
        Upcoming Events
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {events.map((event, idx) => (
          <div
            key={idx}
            className="bg-white border border-green-300 rounded-2xl shadow-md p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-semibold text-green-700 mb-2">
                {event.title}
              </h2>
              <p className="text-sm text-green-600 mb-4">
                {new Date(event.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-green-800 mb-6">{event.description}</p>
            </div>
            <Link
              href="/events/register"
              className="inline-block mt-auto px-6 py-2 rounded-lg bg-green-500 text-white font-medium shadow hover:bg-green-600 transition-colors duration-150 text-center focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Register
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
