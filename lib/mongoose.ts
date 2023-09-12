import chalk from 'chalk';
import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  // Check if Mongo URI is valid or not
  if (!process.env.MONGO_URI) {
    return console.log(
      chalk.red('Error: Mongo URI is either invalid or missing.')
    );
  }

  //   Check if MongoDB is already connected or not
  if (isConnected) {
    return console.log(chalk.green('Already connected to Mongo DB.'));
  }

  try {
    // Securing a connection with the MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    return console.log(chalk.green('MongoDB is connected securely.'));
  } catch (error: any) {
    throw new Error('There was an unexpected error in connecting to MongoDB.');
  }
};

export default connectDB;
