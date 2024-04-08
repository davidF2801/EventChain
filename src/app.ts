import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import router from './api/routes';

// Initialize dotenv to use .env file variables
// dotenv.config();

// Connect to MongoDB
// connectDB();

const app = express();

// Middleware
app.use(express.json());

//Routes
app.use('/', router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in Port ${PORT}`));

