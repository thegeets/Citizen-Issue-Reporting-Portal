import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
   const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`[MongoDB] Database connected successfully: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB Error] Connection failed: ${error.message}`);
    console.log(`[MongoDB Info] Make sure your local MongoDB service is running (e.g. 'mongod' or MongoDB Compass) or update MONGODB_URI in server/.env.`);
  }
};
