import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './api/routes';  // Ensure this path is correct and that the file exports the router properly
import { connectToDatabase } from './services/databaseService';

// Initialize dotenv to use .env file variables
dotenv.config();

// Logging the MongoDB connection string to verify environment variables are loaded
console.log("Connecting to MongoDB URI:", process.env.DB_CONN_STRING);

// Connect to MongoDB
connectToDatabase();

const app = express();

// Configure CORS to allow requests from the specified frontend
app.use(cors({
  origin: 'http://localhost:3000'  // Adjust if your frontend is served from another port or domain
}));

// Middleware for parsing JSON bodies
app.use(express.json());

// Registering the routes from the router file
app.use('/', router);

// Set the port to use, check if it matches the one used in frontend fetch requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);  // Confirm the port number in the console
});
