import mongoose from '../../../lib/mongoose';
import Comment from '../../../lib/models/Comment';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI || '';

async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
  }
}

export async function GET(request: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const blogId = searchParams.get('blogId');

  if (!blogId) {
    return NextResponse.json({ message: 'Blog ID is required' }, { status: 400 });
  }

  const comments = await Comment.find({ blogId });
  return NextResponse.json(comments);
}

export async function POST(request: Request) {
  await connectToDatabase();
  const body = await request.json();

  try {
    const result = await Comment.create(body);
    return NextResponse.json({ message: 'Comment created', id: result._id });
  } catch (error) {
    console.error('Error creating comment:', error);
    const errorMessage = (error as Error).message;
    return NextResponse.json({ message: 'Failed to create comment', error: errorMessage }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  await connectToDatabase();
  const body = await request.json();
  const { id, ...updateData } = body;

  if (!id) {
    return NextResponse.json({ message: 'Comment ID is required' }, { status: 400 });
  }

  try {
    const updatedComment = await Comment.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedComment) {
      return NextResponse.json({ message: 'Comment not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Comment updated', comment: updatedComment });
  } catch (error) {
    console.error('Error updating comment:', error);
    const errorMessage = (error as Error).message;
    return NextResponse.json({ message: 'Failed to update comment', error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'Comment ID is required' }, { status: 400 });
  }

  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return NextResponse.json({ message: 'Comment not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Comment deleted' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    const errorMessage = (error as Error).message;
    return NextResponse.json({ message: 'Failed to delete comment', error: errorMessage }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  await connectToDatabase();
  const body = await request.json();
  const { id, ...updateData } = body;

  if (!id) {
    return NextResponse.json({ message: 'Comment ID is required' }, { status: 400 });
  }

  try {
    const updatedComment = await Comment.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedComment) {
      return NextResponse.json({ message: 'Comment not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Comment partially updated', comment: updatedComment });
  } catch (error) {
    console.error('Error partially updating comment:', error);
    const errorMessage = (error as Error).message;
    return NextResponse.json({ message: 'Failed to partially update comment', error: errorMessage }, { status: 500 });
  }
}
