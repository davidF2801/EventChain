import mongoose, { Document, Schema } from 'mongoose';

// Interface to describe the properties that an Event Document has
interface IEvent extends Document {
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  type: String;
  image: string; // Base64 encoded image
  uid: number;  // Here we use number to represent double values
}

// Schema to define the structure of the document in MongoDB
const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  type: { type: String, required: false },
  image: { type: String, required: false }, // Optional field for Base64 encoded image
  uid: { type: Number, required: true } // Define uid as a number (double)
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Creating the model from the schema
const EventModel = mongoose.model<IEvent>('Event', EventSchema);

export default EventModel;
