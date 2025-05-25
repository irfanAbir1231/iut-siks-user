import { NextResponse } from "next/server";
import Result from "@/lib/models/Result";
import Quiz from "@/lib/models/Quiz";
import mongoose from "@/lib/mongoose";

export async function GET(req: Request) {
  await mongoose.connect(process.env.MONGODB_URI!);
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const quiz = await Quiz.findOne();
  if (!quiz) return NextResponse.json([]);
  if (userId) {
    // Check if user already took the quiz
    const taken = await Result.exists({ userId, quizId: quiz._id });
    return NextResponse.json({ taken: !!taken });
  }
  // Return all results for this quiz sorted by score desc, then timeTaken asc
  const results = await Result.find({ quizId: quiz._id }).sort({ score: -1, timeTaken: 1 });
  return NextResponse.json(results);
}
/**
 * @param {import('next/server').NextRequest} req
 */
export async function POST(req: Request) {
  await mongoose.connect(process.env.MONGODB_URI!);
  try {
    const data = await req.json();
    const quiz = await Quiz.findOne();
    if (!quiz) return NextResponse.json({ success: false, error: 'Quiz not found' });
    const result = await Result.create({
      userId: data.userId,
      name: data.name,
      score: data.score,
      timeTaken: data.timeTaken,
      answers: data.answers,
      quizId: quiz._id,
    });
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error creating result:', error);
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
} 