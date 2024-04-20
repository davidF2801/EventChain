import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './api/routes';
import { connectToDatabase } from './services/databaseService';

// Initialize dotenv to use .env file variables
dotenv.config();

console.log("Connecting to MongoDB URI:", process.env.DB_CONN_STRING);

// Connect to MongoDB
connectToDatabase();

const app = express();

// Configure CORS to allow requests from your frontend
app.use(cors({
  origin: 'http://localhost:3000'  // Adjust if your frontend is served on a different port
}));

// Middleware for parsing JSON bodies
app.use(express.json());

// Registering the routes
app.use('/', router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
