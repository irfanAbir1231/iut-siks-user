import mongoose, { Document, Model } from 'mongoose';

interface CommentDocument extends Document {
  name: string;
  message: string;
  blogId: mongoose.Types.ObjectId;
  date: Date;
}

const CommentSchema = new mongoose.Schema<CommentDocument>({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Comment: Model<CommentDocument> = mongoose.models.Comment || mongoose.model<CommentDocument>('Comment', CommentSchema);

export default Comment;
