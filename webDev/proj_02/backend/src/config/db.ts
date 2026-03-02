import mongoose from "mongoose";
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// MONGOOSE DATABASE CONNECTIONS
export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/proj_02";
    
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("✅ MongoDB disconnected");
  } catch (error) {
    console.error("❌ MongoDB disconnection failed:", error);
  }
};

// MYSQL2 DATABASE CONNECTIONS
export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // change this
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // max concurrent connections
  queueLimit: 0,
});


export const testConnection = async () => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    console.log('✅ MySQL connected! Test query result:', (rows as any)[0].result);
  } catch (error) {
    console.error('❌ MySQL connection failed:', (error as Error).message);
  }
}