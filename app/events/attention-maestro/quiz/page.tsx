"use client";
import { useEffect, useState, useRef, useCallback } from "react";

// This line tells Next.js to render this page dynamically on the server for each request,
// instead of trying to create a static HTML file at build time. This solves the prerendering error.
export const dynamic = "force-dynamic";

interface Question {
  question: string;
  options: string[];
  answer: number;
}

interface Quiz {
  _id: string;
  title: string;
  questions: Question[];
  duration?: number;
}

export default function AttentionMaestroQuizPage() {
  // Mock user data from previous step
  const { isSignedIn, user } = {
    isSignedIn: true,
    user: {
      id: "user_mock_id_12345",
      fullName: "Mock User",
      username: "mockuser",
    },
  };

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [timer, setTimer] = useState<{
    startDate: string;
    startTimer: string;
    duration: number;
  } | null>(null);
  const [now, setNow] = useState<Date>(new Date());
  const [quizStarted, setQuizStarted] = useState(false);
  const [countdown, setCountdown] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [quizStart, setQuizStart] = useState<Date | null>(null);
  const [quizEnd, setQuizEnd] = useState<Date | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate quiz start and end times
  useEffect(() => {
    if (timer) {
      const dateObj = new Date(timer.startDate);
      const [h, m, s] = timer.startTimer.split(":").map(Number);
      const start = new Date(
        dateObj.getFullYear(),
        dateObj.getMonth(),
        dateObj.getDate(),
        h,
        m,
        s,
        0,
      );
      const end = new Date(start.getTime() + timer.duration * 1000);
      setQuizStart(start);
      setQuizEnd(end);
    }
  }, [timer]);

  // Submit quiz
  const handleSubmit = useCallback(async () => {
    if (submitting || !quiz || !user || result) return;
    setSubmitting(true);
    setError(null);
    try {
      const timeTaken =
        quizEnd && quizStart
          ? Math.min(
              Math.floor((now.getTime() - quizStart.getTime()) / 1000),
              timer?.duration || 0,
            )
          : 0;
      const res = await fetch("/api/events/attention-maestro/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          name: user.fullName || user.username || "User",
          score: answers.reduce(
            (acc: number, ans: number, idx: number) =>
              acc + (ans === quiz.questions[idx].answer ? 1 : 0),
            0,
          ),
          timeTaken,
          answers,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.result);
      } else {
        setError(data.error || "Failed to submit quiz");
      }
    } catch (e) {
      setError((e as Error).message || "Failed to submit quiz");
    } finally {
      setSubmitting(false);
    }
  }, [submitting, quiz, user, result, quizEnd, quizStart, now, timer, answers]);

  // Fetch quiz and timer
  useEffect(() => {
    fetch("/api/events/attention-maestro/quiz")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setQuiz(data[0]);
          setAnswers(Array(data[0].questions.length).fill(-1));
        }
      });
    fetch("/api/events/attention-maestro/quiz-timer")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setTimer(data);
      });
  }, []);

  // Timer logic
  useEffect(() => {
    if (!timer) return;
    const updateNow = () => setNow(new Date());
    intervalRef.current = setInterval(updateNow, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timer]);
  // Start quiz when time arrives
  useEffect(() => {
    if (!quizStart || !quizEnd) return;
    if (!quizStarted && now >= quizStart && now < quizEnd) {
      setQuizStarted(true);
      setCountdown(Math.floor((quizEnd.getTime() - now.getTime()) / 1000));
    } else if (quizStarted && now < quizEnd) {
      setCountdown(
        Math.max(0, Math.floor((quizEnd.getTime() - now.getTime()) / 1000)),
      );
    } else if (quizStarted && now >= quizEnd && !result) {
      handleSubmit();
    }
  }, [now, quizStarted, quizStart, quizEnd, result, handleSubmit]);

  // Handle answer change
  const handleOptionChange = (qIdx: number, optIdx: number) => {
    setAnswers((prev) => {
      const copy = [...prev];
      copy[qIdx] = optIdx;
      return copy;
    });
  };

  // UI
  if (!isSignedIn) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
        <button className="px-6 py-3 rounded-lg bg-blue-100 text-blue-700 font-semibold shadow hover:bg-blue-200 transition-colors duration-150">
          Please log in to take the quiz
        </button>
      </main>
    );
  }

  if (!quiz || !timer) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4 py-12">
        <div className="text-blue-700 font-semibold text-xl">
          Loading quiz...
        </div>
      </main>
    );
  }

  if (result) {
    return (
      <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4 py-12">
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 max-w-2xl w-full p-8 mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 mb-2 text-center">
            Quiz Submitted!
          </h1>
          <div className="text-gray-700 text-lg text-center mb-4">
            Thank you for participating.
          </div>
          <div className="text-center mt-6">
            <a
              href="/events/attention-maestro/results"
              className="inline-block px-6 py-3 rounded-lg bg-blue-100 text-blue-700 font-semibold shadow hover:bg-blue-200 transition-colors duration-150"
            >
              View Results
            </a>
          </div>
        </div>
      </main>
    );
  }

  if (!quizStarted && quizEnd && now >= quizEnd) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4 py-12">
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 max-w-xl w-full p-8 mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Quiz is over
          </h1>
          <div className="text-gray-500 text-lg mb-6">
            The quiz has ended. Please check the results page.
          </div>
          <div className="text-center mt-6">
            <a
              href="/events/attention-maestro/results"
              className="inline-block px-6 py-3 rounded-lg bg-blue-100 text-blue-700 font-semibold shadow hover:bg-blue-200 transition-colors duration-150"
            >
              View Results
            </a>
          </div>
        </div>
      </main>
    );
  }

  if (!quizStarted) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4 py-12">
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 max-w-xl w-full p-8 mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Attention Maestro Quiz
          </h1>
          <div className="text-gray-500 text-lg mb-6">
            The quiz will start soon.
          </div>
          <div className="text-2xl font-semibold text-blue-700 mb-2">
            Time Remaining to Start:
          </div>
          <div className="text-4xl font-mono text-emerald-600 mb-4">
            {quizStart && now < quizStart
              ? formatTime(
                  Math.floor((quizStart.getTime() - now.getTime()) / 1000),
                )
              : "00:00:00"}
          </div>
          {/* Debug output */}
          <div className="mt-6 text-left text-xs text-gray-500">
            <div>Now: {now.toString()}</div>
            <div>Quiz Start: {quizStart?.toString()}</div>
            <div>Quiz End: {quizEnd?.toString()}</div>
            <div>Timer Raw: {JSON.stringify(timer)}</div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4 py-12">
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 max-w-2xl w-full p-8 mb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-0">
            Attention Maestro Quiz
          </h1>
          <div className="flex flex-col items-center">
            <span className="text-gray-500 text-sm">Time Remaining</span>
            <span className="text-2xl font-mono text-emerald-600">
              {formatTime(countdown)}
            </span>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="space-y-8">
            {quiz.questions.map((q, qIdx) => (
              <div key={qIdx} className="mb-6">
                <div className="font-semibold text-lg text-gray-800 mb-2">
                  Q{qIdx + 1}. {q.question}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
                  {q.options.map((opt, optIdx) => (
                    <label
                      key={optIdx}
                      className={`flex items-center px-4 py-3 rounded-lg border cursor-pointer transition-colors duration-150 ${
                        answers[qIdx] === optIdx
                          ? "bg-blue-100 border-blue-400 text-blue-900"
                          : "bg-gray-50 border-gray-200 hover:bg-blue-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q${qIdx}`}
                        value={optIdx}
                        checked={answers[qIdx] === optIdx}
                        onChange={() => handleOptionChange(qIdx, optIdx)}
                        className="form-radio mr-3 accent-blue-600"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {error && (
            <div className="text-red-600 text-center mt-4">{error}</div>
          )}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="px-8 py-3 rounded-lg bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition-colors duration-150 disabled:opacity-60"
              disabled={submitting || !!result}
            >
              {submitting ? "Submitting..." : "Submit Quiz"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${h}:${m}:${s}`;
}
