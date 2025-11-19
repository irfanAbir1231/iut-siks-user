"use client";
import { useEffect, useState } from "react";
// import { useUser, SignInButton } from "@clerk/nextjs"; // MODIFIED: Commented out

export default function ResultsPage() {
  // MODIFIED: Mocked user to be always signed in
  const { isSignedIn } = { isSignedIn: true };
  // const { isSignedIn } = useUser(); // Original hook

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSignedIn) return;
    fetch("/api/events/attention-maestro/results")
      .then((res) => res.json())
      .then((data) => {
        setResults(data || []);
        setLoading(false);
      });
  }, [isSignedIn]);

  if (!isSignedIn) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
        {/* <SignInButton> */}
        <button className="px-6 py-3 rounded-lg bg-blue-100 text-blue-700 font-semibold shadow hover:bg-blue-200 transition-colors duration-150">
          Please log in to view results
        </button>
        {/* </SignInButton> */}
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4 py-12">
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 max-w-2xl w-full p-8 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">
          Quiz Results
        </h1>
        <div className="text-gray-500 text-sm mb-6 text-center">
          See how everyone performed in the Attention Maestro quiz!
        </div>
        {loading ? (
          <div className="text-center text-blue-700 font-semibold">
            Loading results...
          </div>
        ) : results.length === 0 ? (
          <div className="text-center text-gray-700">No results yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                    Time Taken (s)
                  </th>
                </tr>
              </thead>
              <tbody>
                {(
                  results as Array<{
                    score: number;
                    timeTaken: number;
                    userId: string;
                    name: string;
                  }>
                )
                  .sort(
                    (a, b) => b.score - a.score || a.timeTaken - b.timeTaken,
                  )
                  .map((r, idx) => (
                    <tr
                      key={r.userId}
                      className={idx % 2 === 0 ? "bg-white" : "bg-blue-50"}
                    >
                      <td className="px-6 py-4 font-bold text-emerald-700">
                        {idx + 1}
                      </td>
                      <td className="px-6 py-4 text-gray-900">{r.name}</td>
                      <td className="px-6 py-4 text-blue-700 font-semibold">
                        {r.score}
                      </td>
                      <td className="px-6 py-4 text-gray-700">{r.timeTaken}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
