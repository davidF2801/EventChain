import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserModel from '../models/userModel';
import EventModel from '../models/eventModel';
dotenv.config();

const dbConnString = process.env.DB_CONN_STRING!;
const dbName = process.env.DB_NAME;

// Establish connection to the database
const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbConnString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: dbName,
    });
    console.log(`Successfully connected to database: ${dbName}`);
  } catch (error) {
    console.error("Failed to connect to the database!", error);
    process.exit(1);
  }
};

export const collections = {
  events: EventModel,  // These are not collections but Mongoose models
  users: UserModel
};

export { connectToDatabase };
