import mongoose from '../../../lib/mongoose';
import Blog from '../../../lib/models/Blog';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI || '';

async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
  }
}

export async function GET() {
  await connectToDatabase();
  const blogs = await Blog.find({});
  return NextResponse.json(blogs);
}

export async function POST(request: Request) {
  await connectToDatabase();
  const body = await request.json();
  try {
    const result = await Blog.create(body);
    return NextResponse.json({ message: 'Blog created', id: result._id });
  } catch (error) {
    console.error('Error creating blog:', error);
    const errorMessage = (error as Error).message;
    return NextResponse.json({ message: 'Failed to create blog', error: errorMessage }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  await connectToDatabase();
  const body = await request.json();
  const { id, ...updateData } = body;
  const result = await Blog.findByIdAndUpdate(id, updateData, { new: true });
  return NextResponse.json({ message: 'Blog updated', updatedBlog: result });
}

export async function DELETE(request: Request) {
  await connectToDatabase();
  const { id } = await request.json();
  const result = await Blog.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Blog deleted', deletedBlog: result });
}