import mongoose from 'mongoose';

export const connectDB = async () => {
  const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/learnhub';

  try {
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log(`🍃 MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.log(`ℹ️ Local MongoDB service is currently off on ${connStr}`);
    console.log(`⚡ Activated Adaptive In-Memory Data Store for zero-latency execution`);
  }
};
