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

  const connStr = process.env.MONGODB_URI;

  // In cloud/serverless environment without a remote MONGODB_URI, skip localhost connection wait
  if (!connStr || connStr.includes('127.0.0.1') || connStr.includes('localhost')) {
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
      if (!connStr) {
        return null;
      }
    }
  }

  const targetUri = connStr || 'mongodb://127.0.0.1:27017/learnhub';

  if (!cachedPromise) {
    const opts = {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000,
    };

    cachedPromise = mongoose
      .connect(targetUri, opts)
      .then((conn) => {
        console.log(`🍃 MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
        lastFailureTime = 0;
        return conn;
      })
      .catch((err) => {
        cachedPromise = null;
        lastFailureTime = Date.now();
        console.log(`ℹ️ MongoDB note: ${err.message}. Adaptive Store active.`);
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
