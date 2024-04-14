import express from 'express';
import dotenv from 'dotenv';
import router from './api/routes';
import { connectToDatabase } from './services/databaseService';
// Initialize dotenv to use .env file variables
dotenv.config();
console.log("Connecting to MongoDB URI:", process.env.DB_CONN_STRING);
//Connect to MongoDB
connectToDatabase();
//connectDB();

const app = express();

// Middleware
app.use(express.json());

//Routes
app.use('/', router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in Port ${PORT}`));

