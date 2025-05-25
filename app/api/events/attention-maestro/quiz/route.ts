import { NextResponse } from "next/server";
import Quiz from "@/lib/models/Quiz";
import mongoose from "@/lib/mongoose";

export async function GET() {
  await mongoose.connect(process.env.MONGODB_URI!);
  // Get all quizzes from the database
  const quizzes = await Quiz.find();
  if (!quizzes || quizzes.length === 0) {
    return NextResponse.json([]);
  }
  return NextResponse.json(quizzes);
}

/**
 * @param {import('next/server').NextRequest} req
 */
export async function POST(req: Request) {
  await mongoose.connect(process.env.MONGODB_URI!);
  const data = await req.json();
  // Create new quiz
  const quiz = await Quiz.create({ 
    title: data.title, 
    questions: data.questions 
  });
  return NextResponse.json({ success: true, quiz });
}