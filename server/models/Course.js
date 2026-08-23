import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    duration: { type: String, default: '15:00' },
    videoUrl: { type: String, default: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8' },
    isLocked: { type: Boolean, default: false },
    type: { type: String, enum: ['video', 'reading'], default: 'video' },
  },
  { _id: false }
);

const moduleSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    lessons: [lessonSchema],
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => `crs_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    },
    id: {
      type: String,
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: '' },
    description: { type: String, default: '' },
    category: { type: String, required: true, index: true },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    price: { type: Number, required: true, default: 0 },
    originalPrice: { type: Number, default: 0 },
    rating: { type: Number, default: 4.8 },
    reviewsCount: { type: Number, default: 0 },
    hours: { type: Number, default: 10 },
    lessonsCount: { type: Number, default: 10 },
    languages: [{ type: String }],
    techStack: [{ type: String }],
    instructorName: { type: String, default: 'Dr. Elena Rostova' },
    instructorRole: { type: String, default: 'Lead Educator' },
    instructorBio: { type: String, default: 'Dedicated educator specializing in modern software engineering.' },
    instructorAvatar: { type: String, default: '' },
    thumbnail: { type: String, default: '' },
    modules: [moduleSchema],
    includes: [{ type: String }],
    status: { type: String, enum: ['published', 'draft', 'pending'], default: 'published' },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    _id: false,
  }
);

// Allow custom string _id
courseSchema.add({
  _id: {
    type: String,
    default: () => `crs_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
  },
});

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
export default Course;
