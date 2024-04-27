import mongoose, { Document, Schema } from 'mongoose';

interface ITicket extends Document {
  eventName: string;
  user: string;
  forSale: boolean;
  ticketId: number;
  price: number;
  contractAddress: string;
}

const TicketSchema: Schema = new Schema({
  eventName: { type: String, required: true },
  user: { type: String, required: true },
  forSale: { type: Boolean, default: false },
  ticketId: { type: Number, required: true },
  price: { type: Number, required: true },
  contractAddress: { type: String, required: true }

}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

const TicketModel = mongoose.model<ITicket>('Ticket', TicketSchema);

export default TicketModel;
