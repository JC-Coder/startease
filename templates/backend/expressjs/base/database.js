export const ExpressJsMongodbMongooseConnectionTemplate = `
import mongoose from 'mongoose';
import { ENVIRONMENT } from './environment.js';

export const connectDb = async () => {
  try {
  
    const conn = await mongoose.connect(ENVIRONMENT.DB.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('MongoDB Connected: ' + conn.connection.host);
  } catch (error) {
    console.log('Error: ' + error.message);
    process.exit(1);
  }
};
`

export const ExpressJsMongoDbMongooseSampleSchema = `
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true })

export const UserModel = mongoose.model('User', userSchema);
`;
