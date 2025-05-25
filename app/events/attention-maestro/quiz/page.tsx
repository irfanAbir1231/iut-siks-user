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
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

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
    if (submitted) return;
    if (timeLeft === 0) handleSubmit();
    const timer = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

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
        timeTaken: 600 - timeLeft,
        answers,
      }),
    });
    setTimeout(() => router.push("/events/attention-maestro/results"), 1500);
  }

  if (loading) {
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

  return (
    <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4 py-12">
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 max-w-2xl w-full p-8 mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">Attention Maestro Quiz</h1>
        <div className="text-gray-500 text-sm mb-6 text-center">You have 10 minutes. Answer all questions and submit!</div>
        <div className="flex justify-center mb-6">
          <span className="inline-block px-4 py-2 rounded-lg bg-blue-100 text-blue-700 font-semibold shadow">Time Left: {Math.floor(timeLeft/60)}:{(timeLeft%60).toString().padStart(2, '0')}</span>
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