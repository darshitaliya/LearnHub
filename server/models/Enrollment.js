import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => `enr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    },
    id: {
      type: String,
      default: () => `enr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    userEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    userPhone: {
      type: String,
      default: 'N/A',
    },
    profession: {
      type: String,
      default: 'Student',
    },
    goal: {
      type: String,
      default: 'Skill Upgrade & Professional Certification',
    },
    courseId: {
      type: String,
      required: true,
      index: true,
    },
    courseTitle: {
      type: String,
      default: 'Platform Course',
    },
    status: {
      type: String,
      enum: ['Active', 'Completed', 'Cancelled'],
      default: 'Active',
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

const Enrollment = mongoose.models.Enrollment || mongoose.model('Enrollment', enrollmentSchema);

export default Enrollment;
