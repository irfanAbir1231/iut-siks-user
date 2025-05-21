import mongoose, { Document, Model } from 'mongoose';

interface BlogDocument extends Document {
  title: string;
  author: string;
  date: Date;
  slug: string;
  content: string[];
}

const BlogSchema = new mongoose.Schema<BlogDocument>({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: [String],
    required: true,
  },
});

const Blog: Model<BlogDocument> = mongoose.models.Blog || mongoose.model<BlogDocument>('Blog', BlogSchema);

export default Blog;
