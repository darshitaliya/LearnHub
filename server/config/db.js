import mongoose from 'mongoose';

let cachedConn = null;
let cachedPromise = null;

export const connectDB = async () => {
  if (cachedConn && mongoose.connection.readyState === 1) {
    return cachedConn;
  }

  const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/learnhub';

  if (!cachedPromise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
    };

    cachedPromise = mongoose.connect(connStr, opts).then((conn) => {
      console.log(`🍃 MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
      return conn;
    }).catch((err) => {
      cachedPromise = null;
      console.log(`ℹ️ MongoDB connection not established (${err.message}). Using Adaptive Store.`);
      return null;
    });
  }

  try {
    cachedConn = await cachedPromise;
  } catch (err) {
    cachedPromise = null;
    cachedConn = null;
  }

  return cachedConn;
};
