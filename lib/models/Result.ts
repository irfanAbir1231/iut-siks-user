import mongoose, { Document, Model } from 'mongoose';

export interface ResultDocument extends Document {
  userId: string;
  name: string;
  score: number;
  timeTaken: number;
  answers: number[];
  quizId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const ResultSchema = new mongoose.Schema<ResultDocument>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  score: { type: Number, required: true },
  timeTaken: { type: Number, required: true },
  answers: { type: [Number], required: true },
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  createdAt: { type: Date, default: Date.now },
});

// Removed unique index to allow multiple results per user per quiz
// ResultSchema.index({ userId: 1, quizId: 1 }, { unique: true });

const Result: Model<ResultDocument> = mongoose.models.Result || mongoose.model<ResultDocument>('Result', ResultSchema);

export default Result; 