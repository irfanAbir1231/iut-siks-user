const prayerTimes = [
  { name: "Fajr", time: "5:00 AM" },
  { name: "Dhuhr", time: "1:15 PM" },
  { name: "Asr", time: "4:45 PM" },
  { name: "Maghrib", time: "6:30 PM" },
  { name: "Isha", time: "8:00 PM" },
];

export default function PrayerTimesPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-10">
        Today&apos;s Prayer Times
      </h1>
      <div className="w-full max-w-md">
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-2xl shadow-md border border-green-300">
            <thead>
              <tr className="bg-green-200">
                <th className="py-3 px-4 text-left text-green-900 font-semibold rounded-tl-2xl">
                  Prayer
                </th>
                <th className="py-3 px-4 text-left text-green-900 font-semibold rounded-tr-2xl">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {prayerTimes.map((prayer, idx) => (
                <tr
                  key={prayer.name}
                  className={idx % 2 === 0 ? "bg-green-100" : "bg-white"}
                >
                  <td className="py-3 px-4 text-green-800 font-medium border-b border-green-200">
                    {prayer.name}
                  </td>
                  <td className="py-3 px-4 text-green-700 border-b border-green-200">
                    {prayer.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
