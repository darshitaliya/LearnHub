import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import User from '../models/User.js';
import Course from '../models/Course.js';
import Order from '../models/Order.js';
import Progress from '../models/Progress.js';
import Enrollment from '../models/Enrollment.js';
import Category from '../models/Category.js';
import mongoose from 'mongoose';
import Review from '../models/Review.js';

const LOCK_FILE_PATH = path.resolve(process.cwd(), 'data', 'seeded.lock');
const DB_FILE_PATH = path.resolve(process.cwd(), 'data', 'persistent_db.json');

export const seedInitialData = async () => {
  if (mongoose.connection.readyState !== 1) {
    return;
  }
  try {
    // Seed initial users so admin@learnhub.com is always available
    const userCount = await User.countDocuments().catch(() => 0);
    if (userCount === 0) {
      console.log('🌱 Seeding initial admin & instructor accounts into MongoDB...');
      const usersToSeed = [
        {
          _id: 'usr_admin',
          name: 'System Admin',
          email: 'admin@learnhub.com',
          phone: '+91 98765 43210',
          password: await bcrypt.hash('admin123', 10),
          role: 'admin',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCr9CHF12DMyqfTqDPJoBj_xC_FhZnCOV1I6J1SMhxGh9dcJ3yPsxD2HtzKxLTHnyTSpG0uX0MEYSV840HpNX-y1wjUL2W5uzc-jWwkVaS1whPOnE5SxNKOpXId2qBfE-9gu0NTJ6WC0LlVlX-xhbFqOzPgYtHkBVsyxV3NAvnoOITYBeL22R1XVab90baoCu1D0V5K4T5SuN-718WnFxyTEDsfdHu9ezm90n-qADcvPeqDMj_eqNdC',
          enrolledCourses: [],
        },
        {
          _id: 'usr_instructor',
          name: 'Dr. Elena Rostova',
          email: 'elena@learnhub.com',
          phone: '+91 98765 43211',
          password: await bcrypt.hash('instructor123', 10),
          role: 'instructor',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXsLFd9D54QvHC0YzVKgLxHnnpERLlfdgwtLORSSs-tNRp-QmFZO2N6hDlOwY4x1YQPu2xppRb0y7Znoil2TshKCTUkd0a-yYGk5Su4MWRVe3T_a9Ip01U3Ouw28n9nEcUzBOnvUSpbLqrQhL2mobnRZyxz1nmOj7wHnAyCbza00LARkU3ve07zwoM3KCRp_eschNgIu0MYW1mNjmkarjPPMHEd9LoEG2l2hK4csZx1DvTbpTJqdf4',
          enrolledCourses: [],
        },
        {
          _id: 'usr_student',
          name: 'Alex Morgan',
          email: 'alex@learnhub.com',
          phone: '+91 98765 43212',
          password: await bcrypt.hash('student123', 10),
          role: 'student',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCr9CHF12DMyqfTqDPJoBj_xC_FhZnCOV1I6J1SMhxGh9dcJ3yPsxD2HtzKxLTHnyTSpG0uX0MEYSV840HpNX-y1wjUL2W5uzc-jWwkVaS1whPOnE5SxNKOpXId2qBfE-9gu0NTJ6WC0LlVlX-xhbFqOzPgYtHkBVsyxV3NAvnoOITYBeL22R1XVab90baoCu1D0V5K4T5SuN-718WnFxyTEDsfdHu9ezm90n-qADcvPeqDMj_eqNdC',
          enrolledCourses: [],
        },
      ];

      await User.insertMany(usersToSeed).catch(() => {});
      console.log('✅ Demo users seeded successfully!');
    }

    // Seed Categories
    const catCount = await Category.countDocuments().catch(() => 0);
    if (catCount === 0) {
      console.log('🌱 Seeding initial categories into MongoDB...');
      const categoriesToSeed = [
        { name: 'Computer Science', slug: 'computer-science', description: 'Modern software engineering, backend architectures, full-stack systems, and cybersecurity.', icon: 'code' },
        { name: 'Data Science', slug: 'data-science', description: 'Machine learning algorithms, deep learning neural nets, LLMs, and big data analysis.', icon: 'query_stats' },
        { name: 'Design', slug: 'design', description: 'User experience design, Figma systems, interactive prototyping, and responsive styling.', icon: 'palette' },
        { name: 'Business', slug: 'business', description: 'Product management, agile development, tech entrepreneurship, and software economics.', icon: 'trending_up' },
      ];
      await Category.insertMany(categoriesToSeed).catch(() => {});
      console.log('✅ Categories seeded successfully!');
    }

    try { fs.writeFileSync(LOCK_FILE_PATH, 'seeded', 'utf-8'); } catch (e) {}
  } catch (err) {
    console.warn('⚠️ Seeding note:', err.message);
  }
};
