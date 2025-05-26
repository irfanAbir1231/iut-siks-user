"use client";
import { useState, useEffect } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function QuizPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();
  interface Question {
    question: string;
    options: string[];
    answer: number;
  }
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState<number | null>(null); // null until loaded
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quizTimerLoading, setQuizTimerLoading] = useState(true);
  const [quizStartCountdown, setQuizStartCountdown] = useState<number | null>(null); // seconds until quiz starts
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizDuration, setQuizDuration] = useState<number | null>(null); // seconds for quiz duration
  const [timerData, setTimerData] = useState<{ startDate: string; startTimer: string; duration: number } | null>(null);

  useEffect(() => {
    fetch("/api/events/attention-maestro/quiz")
      .then((res) => res.json())
      .then((data: { questions: Question[] }[]) => {
        // Combine all questions from all quizzes
        const allQuestions = data.flatMap((quiz) => quiz.questions);
        setQuestions(allQuestions);
        setAnswers(Array(allQuestions.length).fill(null));
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("/api/events/attention-maestro/quiz-timer")
      .then((res) => res.json())
      .then((timer) => {
        if (!timer.startDate || !timer.startTimer || !timer.duration) {
          setTimeLeft(0);
          setQuizTimerLoading(false);
          return;
        }
        setTimerData({
          startDate: timer.startDate,
          startTimer: timer.startTimer,
          duration: timer.duration,
        });
        setQuizTimerLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!timerData) return;
    const datePart = typeof timerData.startDate === "string"
      ? timerData.startDate.slice(0, 10)
      : new Date(timerData.startDate).toISOString().slice(0, 10);
    const startDateTime = new Date(`${datePart}T${timerData.startTimer}`);
    const now = new Date();
    const secondsUntilStart = Math.floor((startDateTime.getTime() - now.getTime()) / 1000);
    if (secondsUntilStart > 0) {
      setQuizStartCountdown(secondsUntilStart);
      setQuizStarted(false);
      setTimeLeft(timerData.duration);
      setQuizDuration(timerData.duration);
    } else {
      // Quiz already started
      const elapsed = Math.floor((now.getTime() - startDateTime.getTime()) / 1000);
      const remaining = timerData.duration - elapsed;
      setQuizStartCountdown(0);
      setQuizStarted(true);
      setTimeLeft(remaining > 0 ? remaining : 0);
      setQuizDuration(timerData.duration);
    }
  }, [timerData]);

  // Countdown until quiz starts
  useEffect(() => {
    if (quizStartCountdown === null || quizStarted) return;
    if (quizStartCountdown <= 0) {
      setQuizStarted(true);
      setQuizStartCountdown(0);
      setTimeLeft(quizDuration);
      return;
    }
    const timer = setInterval(() => {
      setQuizStartCountdown((t) => (t !== null ? t - 1 : null));
    }, 1000);
    return () => clearInterval(timer);
  }, [quizStartCountdown, quizStarted, quizDuration]);

  // Quiz timer countdown
  useEffect(() => {
    if (!quizStarted || submitted || timeLeft === null) return;
    if (timeLeft === 0) handleSubmit();
    const timer = setInterval(() => {
      setTimeLeft((t) => (t !== null && t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [quizStarted, timeLeft, submitted]);

  function handleOption(qIdx: number, oIdx: number) {
    if (submitted) return;
    setAnswers((prev) => prev.map((a, i) => (i === qIdx ? oIdx : a)));
  }

  function handleSubmit() {
    if (submitted) return;
    setSubmitted(true);
    // Calculate score
    const score = answers.reduce((acc, a, i) => (a === questions[i]?.answer ? acc + 1 : acc), 0);
    // Send to API
    fetch("/api/events/attention-maestro/results", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user?.id,
        name: user?.username || user?.firstName || "Anonymous",
        score,
        timeTaken: timeLeft !== null ? (timeLeft >= 0 ? (600 - timeLeft) : 600) : 600,
        answers,
      }),
    });
    setTimeout(() => router.push("/events/attention-maestro/results"), 1500);
  }

  if (loading || quizTimerLoading || timeLeft === null) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
        <div className="text-blue-700 font-semibold">Loading quiz...</div>
      </main>
    );
  }

  if (!isSignedIn) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
        <SignInButton>
          <button className="px-6 py-3 rounded-lg bg-blue-100 text-blue-700 font-semibold shadow hover:bg-blue-200 transition-colors duration-150">
            Please log in to take the quiz
          </button>
        </SignInButton>
      </main>
    );
  }

  if (!quizStarted && quizStartCountdown !== null && quizStartCountdown > 0) {
    // Show countdown until quiz starts
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
        <div className="text-2xl font-bold text-blue-700 mb-4">Quiz will start soon!</div>
        <div className="text-lg text-gray-700">Time until quiz starts:</div>
        <div className="text-4xl font-mono text-emerald-700 mt-2">{Math.floor(quizStartCountdown / 60)}:{(quizStartCountdown % 60).toString().padStart(2, '0')}</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4 py-12">
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 max-w-2xl w-full p-8 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">Attention Maestro Quiz</h1>
        <div className="text-gray-500 text-sm mb-6 text-center">You have 10 minutes. Answer all questions and submit!</div>
        <div className="flex justify-center mb-6">
          <span className="inline-block px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-semibold shadow">Time Left: {Math.floor((timeLeft ?? 0)/60)}:{((timeLeft ?? 0)%60).toString().padStart(2, '0')}</span>
        </div>
        <form onSubmit={e => { e.preventDefault(); handleSubmit(); }} className="flex flex-col gap-8">
          {questions.map((q, idx) => (
            <div key={idx} className="mb-4">
              <div className="font-semibold text-lg text-emerald-700 mb-2">Q{idx+1}. {q.question}</div>
              <div className="grid grid-cols-2 gap-4">
                {q.options.map((opt: string, oIdx: number) => (
                  <button type="button" key={oIdx} onClick={() => handleOption(idx, oIdx)}
                    className={`px-4 py-2 rounded-lg border font-medium shadow transition-colors duration-150 ${answers[idx] === oIdx ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-emerald-100'}`}
                  >{opt}</button>
                ))}
              </div>
            </div>
          ))}
          <button type="submit" disabled={submitted} className="self-end px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors duration-150 mt-4">Submit Quiz</button>
        </form>
      </div>
    </main>
  );
} 