import mongoose, { Document, Model } from 'mongoose';

export interface QuizTimerDocument extends Document {
  startDate: Date; // Only the date part is relevant
  startTimer: string; // Time in HH:mm:ss format
  duration: number; // in seconds
}

const QuizTimerSchema = new mongoose.Schema<QuizTimerDocument>({
  startDate: { type: Date, required: true, default: () => new Date(new Date().toDateString()) },
  startTimer: { type: String, required: true }, // e.g., '14:30:00'
  duration: { type: Number, required: true },
});

const QuizTimer: Model<QuizTimerDocument> = mongoose.models.QuizTimer || mongoose.model<QuizTimerDocument>('QuizTimer', QuizTimerSchema);

export default QuizTimer; 