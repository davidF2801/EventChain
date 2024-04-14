// Initialize Connection
import { Schema, model, connect } from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await connect("mongodb+srv://eventChainTest:eventChain@eventchain.7hnonqr.mongodb.net/"|| "mongodb://localhost:27017/eventChainDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
