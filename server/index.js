import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { seedInitialData } from './utils/seed.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Database
connectDB().then(() => {
  seedInitialData();
});

// Global Middleware
app.use(cors());
app.use(express.json());

// Database connection middleware for Serverless
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    // Proceed with fallback if MongoDB unavailable
  }
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/admin', adminRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'LearnHub Backend operational' });
});

// 404 Route Handler for undefined endpoints
app.use((req, res, next) => {
  res.status(404).json({ success: false, error: `Route ${req.originalUrl} not found` });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

import { fileURLToPath } from 'url';

const isDirectRun = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];

if (isDirectRun && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 LearnHub Production Server running on http://localhost:${PORT}`);
    console.log(`📡 Endpoints active for Authentication, MongoDB Persistence, Courses, Orders & Admin.`);
  });
}

export default app;
