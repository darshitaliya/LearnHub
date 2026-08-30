import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => `prg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    },
    key: { type: String, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    courseId: { type: String, required: true, index: true },
    completedLessons: [{ type: String }],
    percentage: { type: Number, default: 0 },
    lastWatchedLesson: { type: String, default: '' },
    quizCompleted: { type: Boolean, default: false },
    quizScore: { type: Number, default: 0 },
    quizPassed: { type: Boolean, default: false },
    quizSubmittedAt: { type: Date, default: null },
    certificateEarned: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Progress = mongoose.models.Progress || mongoose.model('Progress', progressSchema);
export default Progress;

