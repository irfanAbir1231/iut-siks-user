import mongoose from '../../../lib/mongoose';
import Event from '../../../lib/models/Event';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI || '';

async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri);
  }
}

export async function GET() {
  await connectToDatabase();
  const events = await Event.find();
  return NextResponse.json(events);
}

export async function POST(request: Request) {
  await connectToDatabase();
  const body = await request.json();

  try {
    const newEvent = await Event.create(body);
    return NextResponse.json({ message: 'Event created', event: newEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ message: 'Failed to create event', error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  await connectToDatabase();
  const body = await request.json();
  const { id, ...updateData } = body;

  if (!id) {
    return NextResponse.json({ message: 'Event ID is required' }, { status: 400 });
  }

  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedEvent) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Event updated', event: updatedEvent });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json({ message: 'Failed to update event', error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'Event ID is required' }, { status: 400 });
  }

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Event deleted' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ message: 'Failed to delete event', error: (error as Error).message }, { status: 500 });
  }
}