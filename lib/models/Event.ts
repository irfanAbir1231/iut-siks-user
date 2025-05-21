import mongoose, { Document, Model } from 'mongoose';

interface EventDocument extends Document {
  title: string;
  date: Date;
  description: string;
  route: string;
  available: boolean;
}

const EventSchema = new mongoose.Schema<EventDocument>({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

const Event: Model<EventDocument> = mongoose.models.Event || mongoose.model<EventDocument>('Event', EventSchema);

export default Event;