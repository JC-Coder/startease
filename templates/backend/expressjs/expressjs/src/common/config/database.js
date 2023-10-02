import mongoose from 'mongoose';
import { ENVIRONMENT } from './environment';

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(ENVIRONMENT.DB.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
