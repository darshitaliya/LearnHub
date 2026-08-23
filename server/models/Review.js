import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => `rev_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    },
    courseId: {
      type: String,
      required: true,
      index: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userAvatar: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export default Review;
