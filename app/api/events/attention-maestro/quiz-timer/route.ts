// In app/api/events/attention-maestro/quiz-timer/route.ts
import QuizTimer from "@/lib/models/QuizTimer";
import mongoose from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await mongoose.connect(process.env.MONGODB_URI!);
  const timer = await QuizTimer.findOne().sort({ _id: -1 });
  if (!timer) return NextResponse.json({ error: "Timer not set" }, { status: 404 });
  return NextResponse.json({
    startDate: timer.startDate,
    startTimer: timer.startTimer,
    duration: timer.duration,
  });
}

export async function POST(req: Request) {
  await mongoose.connect(process.env.MONGODB_URI!);
  try {
    const { startDate, startTimer, duration } = await req.json();
    let timer = await QuizTimer.findOne();
    if (timer) {
      timer.startDate = startDate ? new Date(startDate) : new Date();
      timer.startTimer = startTimer;
      timer.duration = duration;
      await timer.save();
    } else {
      timer = await QuizTimer.create({
        startDate: startDate ? new Date(startDate) : undefined,
        startTimer,
        duration,
      });
    }
    return NextResponse.json({
      success: true,
      startDate: timer.startDate,
      startTimer: timer.startTimer,
      duration: timer.duration,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}