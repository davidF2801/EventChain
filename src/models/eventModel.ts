import mongoose, { Document, Schema } from 'mongoose';

// Interface to describe the properties that an Event Document has
interface IEvent extends Document {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  image: string; // Base64 encoded image
  // Add other properties as needed
}

// Schema to define the structure of the document in MongoDB
const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  image: { type: String, required: false }, // Optional field for Base64 encoded image
  // Define other fields as needed
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Creating the model from the schema
const EventModel = mongoose.model<IEvent>('Event', EventSchema);

export default EventModel;
