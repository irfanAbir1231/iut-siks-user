const reminders = [
  {
    icon: "📖",
    text: "Read Surah Mulk before sleeping",
    color: "bg-green-100 border-green-300",
  },
  {
    icon: "🕌",
    text: "Pray all Salat in congregation",
    color: "bg-green-50 border-green-200",
  },
  {
    icon: "📘",
    text: "Read Surah Kahf on Friday",
    color: "bg-green-100 border-green-300",
  },
  {
    icon: "🤲",
    text: "Make morning and evening adhkar",
    color: "bg-green-50 border-green-200",
  },
];

export default function RemindersPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4 py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-10">
        Daily Islamic Reminders
      </h1>
      <ul className="w-full max-w-xl flex flex-col gap-6">
        {reminders.map((reminder, idx) => (
          <li
            key={idx}
            className={`flex items-center gap-4 p-6 rounded-xl border shadow-sm ${reminder.color}`}
          >
            <span className="text-3xl md:text-4xl text-green-700">
              {reminder.icon}
            </span>
            <span className="text-lg md:text-xl font-medium text-green-900">
              {reminder.text}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
