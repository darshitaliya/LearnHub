import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  duration: { type: String, default: '15:00' },
  videoUrl: { type: String, default: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  isLocked: { type: Boolean, default: false },
  type: { type: String, enum: ['video', 'reading'], default: 'video' },
});

const moduleSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  lessons: [lessonSchema],
});

const courseSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
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
    instructorRole: { type: String, default: 'Former AI Research Lead, TechCorp' },
    instructorBio: { type: String, default: 'Passionate about bridging theoretical research and scalable software engineering.' },
    instructorAvatar: { type: String, default: '' },
    thumbnail: { type: String, default: '' },
    modules: [moduleSchema],
    includes: [{ type: String }],
    status: { type: String, enum: ['published', 'draft', 'pending'], default: 'published' },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
export default Course;
