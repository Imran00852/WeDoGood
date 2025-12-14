import mongoose from "mongoose";
import { Report } from "../models/Report.js";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing");
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "NGO",
      autoIndex: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
    await Report.syncIndexes();
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};
