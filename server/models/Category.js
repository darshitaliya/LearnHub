import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => `cat_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: 'category',
    },
    courseCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;
