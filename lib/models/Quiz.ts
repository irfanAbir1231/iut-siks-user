import mongoose, { Document, Model } from 'mongoose';

interface Question {
  question: string;
  options: string[];
  answer: number;
}

export interface QuizDocument extends Document {
  title: string;
  questions: Question[];
  createdAt: Date;
  startTime?: Date;
  duration?: number; // in seconds
}

const QuestionSchema = new mongoose.Schema<Question>({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  answer: {
    type: Number,
    required: true,
  },
});

const QuizSchema = new mongoose.Schema<QuizDocument>({
  title: {
    type: String,
    required: true,
  },
  questions: {
    type: [QuestionSchema],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  startTime: {
    type: Date,
    required: false,
  },
  duration: {
    type: Number, // in seconds
    required: false,
  },
});

const Quiz: Model<QuizDocument> = mongoose.models.Quiz || mongoose.model<QuizDocument>('Quiz', QuizSchema);

export default Quiz; 