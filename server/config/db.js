import mongoose from 'mongoose';

let cachedConn = null;
let cachedPromise = null;
let lastFailureTime = 0;
const RETRY_COOLDOWN_MS = 15000;

export const connectDB = async () => {
  if (cachedConn && mongoose.connection.readyState === 1) {
    return cachedConn;
  }

  // If recently failed, skip waiting and immediately use fallback store
  if (Date.now() - lastFailureTime < RETRY_COOLDOWN_MS) {
    return null;
  }

  const connStr = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/learnhub';

  if (!cachedPromise) {
    const opts = {
      serverSelectionTimeoutMS: 5000,
    };

    cachedPromise = mongoose
      .connect(connStr, opts)
      .then((conn) => {
        console.log(`🍃 MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
        lastFailureTime = 0;
        return conn;
      })
      .catch((err) => {
        cachedPromise = null;
        lastFailureTime = Date.now();
        console.log(`ℹ️ MongoDB connection note: ${err.message}. Adaptive Store active.`);
        return null;
      });
  }

  try {
    cachedConn = await cachedPromise;
  } catch (err) {
    cachedPromise = null;
    cachedConn = null;
    lastFailureTime = Date.now();
  }

  return cachedConn;
};
