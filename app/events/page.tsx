import Link from "next/link";
// again updated
const events = [
  {
    title: "Seerah Quiz",
    date: "2025-05-25",
    description: "Test your knowledge about the life of Prophet Muhammad (PBUH) in this engaging quiz.",
    route: "seerah-quiz",
    available: true,
  },
  {
    title: "Halal Design & Calligraphy Competition",
    date: "2025-05-25",
    description: "Showcase your creativity in designing and calligraphy with an Islamic theme.",
    route: "halal-design-calligraphy",
    available: true,
  },
  {
    title: "Islamic Ideathon",
    date: "2025-05-25",
    description: "Brainstorm and present innovative ideas to solve challenges faced by the Muslim community.",
    route: "case-competition",
    available: true,
  },
  {
    title: "Attention Maestro",
    date: "2025-05-25",
    description: "Participate in a fun and interactive event to test your focus and attention skills.",
    route: "attention-maestro",
    available: false,
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
            {event.available && (
              <Link
                href={`/events/register/${event.route}`}
                className="inline-block mt-auto px-6 py-2 rounded-lg bg-green-500 text-white font-medium shadow hover:bg-green-600 transition-colors duration-150 text-center focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Register
              </Link>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
