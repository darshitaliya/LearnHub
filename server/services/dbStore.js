import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import User from '../models/User.js';
import Course from '../models/Course.js';
import Order from '../models/Order.js';
import Progress from '../models/Progress.js';
import Enrollment from '../models/Enrollment.js';
import Category from '../models/Category.js';
import Review from '../models/Review.js';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POSSIBLE_DB_PATHS = [
  path.resolve(process.cwd(), 'data', 'persistent_db.json'),
  path.resolve(process.cwd(), 'server', 'data', 'persistent_db.json'),
  path.resolve(__dirname, '..', '..', 'data', 'persistent_db.json'),
  path.resolve(__dirname, '..', 'data', 'persistent_db.json'),
  '/tmp/persistent_db.json',
];

export function saveStateToFile() {
  for (const p of POSSIBLE_DB_PATHS) {
    try {
      const dir = path.dirname(p);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(p, JSON.stringify(memoryStore, null, 2), 'utf-8');
      break;
    } catch (err) {
      // In serverless read-only filesystem, continue with next writable path (e.g. /tmp)
    }
  }
}

export function loadStateFromFile() {
  for (const p of POSSIBLE_DB_PATHS) {
    try {
      if (fs.existsSync(p)) {
        const fileData = fs.readFileSync(p, 'utf-8');
        if (fileData.trim()) {
          const parsed = JSON.parse(fileData);
          if (parsed && typeof parsed === 'object') {
            if (Array.isArray(parsed.users) && parsed.users.length > 0) memoryStore.users = parsed.users;
            if (Array.isArray(parsed.courses) && parsed.courses.length > 0) memoryStore.courses = parsed.courses;
            if (Array.isArray(parsed.orders)) memoryStore.orders = parsed.orders;
            if (Array.isArray(parsed.enrollments)) memoryStore.enrollments = parsed.enrollments;
            if (parsed.progress) memoryStore.progress = parsed.progress;
            return true;
          }
        }
      }
    } catch (err) {
      // Continue checking next path
    }
  }
  return false;
}

export const memoryStore = {
  users: [
    {
      _id: 'usr_admin',
      id: 'usr_admin',
      name: 'System Admin',
      email: 'admin@learnhub.com',
      phone: '+91 98765 43210',
      password: bcrypt.hashSync('admin123', 10),
      role: 'admin',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCr9CHF12DMyqfTqDPJoBj_xC_FhZnCOV1I6J1SMhxGh9dcJ3yPsxD2HtzKxLTHnyTSpG0uX0MEYSV840HpNX-y1wjUL2W5uzc-jWwkVaS1whPOnE5SxNKOpXId2qBfE-9gu0NTJ6WC0LlVlX-xhbFqOzPgYtHkBVsyxV3NAvnoOITYBeL22R1XVab90baoCu1D0V5K4T5SuN-718WnFxyTEDsfdHu9ezm90n-qADcvPeqDMj_eqNdC',
      enrolledCourses: [],
      wishlist: [],
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'usr_instructor',
      id: 'usr_instructor',
      name: 'Dr. Elena Rostova',
      email: 'elena@learnhub.com',
      phone: '+91 98765 43211',
      password: bcrypt.hashSync('instructor123', 10),
      role: 'instructor',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXsLFd9D54QvHC0YzVKgLxHnnpERLlfdgwtLORSSs-tNRp-QmFZO2N6hDlOwY4x1YQPu2xppRb0y7Znoil2TshKCTUkd0a-yYGk5Su4MWRVe3T_a9Ip01U3Ouw28n9nEcUzBOnvUSpbLqrQhL2mobnRZyxz1nmOj7wHnAyCbza00LARkU3ve07zwoM3KCRp_eschNgIu0MYW1mNjmkarjPPMHEd9LoEG2l2hK4csZx1DvTbpTJqdf4',
      enrolledCourses: [],
      wishlist: [],
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'usr_alex',
      id: 'usr_alex',
      name: 'Alex Morgan',
      email: 'alex@learnhub.com',
      phone: '+91 98765 43212',
      password: bcrypt.hashSync('student123', 10),
      role: 'student',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCr9CHF12DMyqfTqDPJoBj_xC_FhZnCOV1I6J1SMhxGh9dcJ3yPsxD2HtzKxLTHnyTSpG0uX0MEYSV840HpNX-y1wjUL2W5uzc-jWwkVaS1whPOnE5SxNKOpXId2qBfE-9gu0NTJ6WC0LlVlX-xhbFqOzPgYtHkBVsyxV3NAvnoOITYBeL22R1XVab90baoCu1D0V5K4T5SuN-718WnFxyTEDsfdHu9ezm90n-qADcvPeqDMj_eqNdC',
      enrolledCourses: [],
      wishlist: [],
      createdAt: new Date().toISOString(),
    },
  ],
  courses: [],
  orders: [],
  progress: {},
  enrollments: [],
};

// Initialize file persistence from disk if available
if (!loadStateFromFile()) {
  saveStateToFile();
}

const isMongoConnected = () => mongoose.connection.readyState === 1;

export const dbStore = {
  // USER OPERATIONS
  async findUserByEmail(email) {
    if (!email) return null;
    const query = email.toLowerCase().trim();
    if (isMongoConnected()) {
      return await User.findOne({ email: query });
    }
    return memoryStore.users.find((u) => u.email?.toLowerCase() === query) || null;
  },

  async findUserByPhone(phone) {
    if (!phone) return null;
    const query = phone.trim();
    if (isMongoConnected()) {
      return await User.findOne({ phone: query });
    }
    return memoryStore.users.find((u) => u.phone === query) || null;
  },

  async findUserById(id) {
    if (!id) return null;
    if (isMongoConnected()) {
      try {
        return await User.findById(id);
      } catch (err) {
        return await User.findOne({ id });
      }
    }
    return memoryStore.users.find((u) => u.id === id || u._id === id) || null;
  },

  async createUser(userData) {
    const newUser = {
      id: `usr_${Date.now()}`,
      name: userData.name,
      email: userData.email.toLowerCase().trim(),
      phone: userData.phone || '',
      password: userData.password,
      role: userData.role || 'student',
      avatar: userData.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCr9CHF12DMyqfTqDPJoBj_xC_FhZnCOV1I6J1SMhxGh9dcJ3yPsxD2HtzKxLTHnyTSpG0uX0MEYSV840HpNX-y1wjUL2W5uzc-jWwkVaS1whPOnE5SxNKOpXId2qBfE-9gu0NTJ6WC0LlVlX-xhbFqOzPgYtHkBVsyxV3NAvnoOITYBeL22R1XVab90baoCu1D0V5K4T5SuN-718WnFxyTEDsfdHu9ezm90n-qADcvPeqDMj_eqNdC',
      enrolledCourses: [],
      wishlist: [],
      createdAt: new Date().toISOString(),
    };

    if (isMongoConnected()) {
      const created = await User.create(newUser);
      saveStateToFile();
      return created;
    }

    newUser._id = newUser.id;
    memoryStore.users.push(newUser);
    saveStateToFile();
    return newUser;
  },

  async getAllUsers() {
    if (isMongoConnected()) {
      return await User.find({}).select('-password');
    }
    return memoryStore.users.map(({ password, ...rest }) => rest);
  },

  async updateUser(userId, updateData) {
    let result = null;
    if (isMongoConnected()) {
      try {
        result = await User.findByIdAndUpdate(userId, updateData, { new: true });
      } catch (err) {
        result = await User.findOneAndUpdate({ id: userId }, updateData, { new: true });
      }
    } else {
      const idx = memoryStore.users.findIndex((u) => u.id === userId || u._id === userId);
      if (idx !== -1) {
        memoryStore.users[idx] = { ...memoryStore.users[idx], ...updateData };
        const { password, ...rest } = memoryStore.users[idx];
        result = rest;
      }
    }
    saveStateToFile();
    return result;
  },

  async deleteUser(userId) {
    let result = null;
    if (isMongoConnected()) {
      try {
        result = await User.findByIdAndDelete(userId);
      } catch (err) {
        result = await User.findOneAndDelete({ id: userId });
      }
    } else {
      const idx = memoryStore.users.findIndex((u) => u.id === userId || u._id === userId);
      if (idx !== -1) {
        result = memoryStore.users.splice(idx, 1)[0];
      }
    }
    saveStateToFile();
    return result;
  },

  // COURSE OPERATIONS
  async getAllCourses(filters = {}) {
    let coursesList = [];
    if (isMongoConnected()) {
      coursesList = await Course.find({});
    } else {
      coursesList = [...memoryStore.courses];
    }

    if (filters.category && filters.category !== 'All') {
      coursesList = coursesList.filter((c) => c.category?.toLowerCase() === filters.category.toLowerCase());
    }

    if (filters.level && filters.level !== 'All') {
      coursesList = coursesList.filter((c) => c.level?.toLowerCase() === filters.level.toLowerCase());
    }

    if (filters.search) {
      const query = filters.search.toLowerCase().trim();
      coursesList = coursesList.filter(
        (c) =>
          c.title?.toLowerCase().includes(query) ||
          c.description?.toLowerCase().includes(query) ||
          c.techStack?.some((t) => t.toLowerCase().includes(query))
      );
    }

    if (filters.sort === 'rating') {
      coursesList.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return coursesList;
  },

  async getCourses(filters = {}) {
    return this.getAllCourses(filters);
  },

  async getCourseById(id) {
    if (isMongoConnected()) {
      try {
        return await Course.findById(id);
      } catch (err) {
        return await Course.findOne({ id });
      }
    }
    return memoryStore.courses.find((c) => c.id === id || c._id === id) || null;
  },

  async createCourse(courseData) {
    const courseId = courseData.id || `crs_${Date.now()}`;
    const newCourse = {
      _id: courseId,
      id: courseId,
      title: courseData.title,
      subtitle: courseData.subtitle || 'Comprehensive Course',
      description: courseData.description || 'Master modern concepts with real-world projects.',
      category: courseData.category || 'Computer Science',
      level: courseData.level || 'Intermediate',
      price: courseData.price || 0,
      originalPrice: courseData.originalPrice || 0,
      rating: courseData.rating || 5.0,
      reviewsCount: courseData.reviewsCount || 1,
      hours: courseData.hours || 12,
      lessonsCount: courseData.lessonsCount || (courseData.modules ? courseData.modules.reduce((acc, m) => acc + (m.lessons ? m.lessons.length : 0), 0) : 5),
      languages: courseData.languages || ['English'],
      techStack: courseData.techStack || ['Software Engineering'],
      instructorName: courseData.instructorName || 'Dr. Elena Rostova',
      instructorRole: courseData.instructorRole || 'Lead Educator',
      instructorBio: courseData.instructorBio || 'Expert industry educator building modern educational content.',
      instructorAvatar: courseData.instructorAvatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCr9CHF12DMyqfTqDPJoBj_xC_FhZnCOV1I6J1SMhxGh9dcJ3yPsxD2HtzKxLTHnyTSpG0uX0MEYSV840HpNX-y1wjUL2W5uzc-jWwkVaS1whPOnE5SxNKOpXId2qBfE-9gu0NTJ6WC0LlVlX-xhbFqOzPgYtHkBVsyxV3NAvnoOITYBeL22R1XVab90baoCu1D0V5K4T5SuN-718WnFxyTEDsfdHu9ezm90n-qADcvPeqDMj_eqNdC',
      thumbnail: courseData.thumbnail || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      status: courseData.status || 'published',
      featured: courseData.featured !== undefined ? courseData.featured : true,
      modules: courseData.modules || [],
      includes: courseData.includes || ['Full video lessons', 'Certificate of completion', 'Lifetime access'],
      createdAt: new Date().toISOString(),
    };

    if (isMongoConnected()) {
      const created = await Course.create(newCourse);
      saveStateToFile();
      return created;
    }

    newCourse._id = newCourse.id;
    memoryStore.courses.unshift(newCourse);
    saveStateToFile();
    return newCourse;
  },

  async deleteCourse(id) {
    if (isMongoConnected()) {
      try {
        await Course.findByIdAndDelete(id);
      } catch (err) {
        await Course.findOneAndDelete({ id });
      }
    } else {
      const idx = memoryStore.courses.findIndex((c) => c.id === id || c._id === id);
      if (idx !== -1) {
        memoryStore.courses.splice(idx, 1);
      }
    }
    saveStateToFile();
    return true;
  },

  async deleteAllCourses() {
    if (isMongoConnected()) {
      await Course.deleteMany({});
    }
    memoryStore.courses = [];
    saveStateToFile();
    return true;
  },

  // ORDER OPERATIONS
  async createOrder(orderData) {
    const newOrder = {
      id: `ord_${Date.now()}`,
      userId: orderData.userId,
      userName: orderData.userName || 'Student User',
      items: orderData.items || [],
      totalAmount: orderData.totalAmount || 0,
      paymentStatus: 'completed',
      paymentMethod: orderData.paymentMethod || 'Free Checkout',
      createdAt: new Date().toISOString(),
    };

    if (isMongoConnected()) {
      await Order.create(newOrder);
    } else {
      newOrder._id = newOrder.id;
      memoryStore.orders.unshift(newOrder);
    }

    // Auto-enroll user in course items
    if (orderData.userId && orderData.items) {
      const courseIdsToEnroll = orderData.items.map((i) => i.courseId);
      if (isMongoConnected()) {
        await User.findByIdAndUpdate(orderData.userId, {
          $addToSet: { enrolledCourses: { $each: courseIdsToEnroll } },
        });
      } else {
        const usr = memoryStore.users.find((u) => u.id === orderData.userId || u._id === orderData.userId);
        if (usr) {
          usr.enrolledCourses = Array.from(new Set([...(usr.enrolledCourses || []), ...courseIdsToEnroll]));
        }
      }
    }

    return newOrder;
  },

  async getOrdersByUser(userId) {
    if (isMongoConnected()) {
      return await Order.find({ userId });
    }
    return memoryStore.orders.filter((o) => o.userId === userId);
  },

  async getAllOrders() {
    if (isMongoConnected()) {
      return await Order.find({});
    }
    return memoryStore.orders;
  },

  // PROGRESS OPERATIONS
  async getProgress(userId, courseId) {
    const key = `${userId}_${courseId}`;
    if (isMongoConnected()) {
      let prog = await Progress.findOne({ userId, courseId });
      if (!prog) {
        prog = await Progress.create({ userId, courseId, completedLessons: [], percentage: 0, certificateEarned: false });
      }
      return prog;
    }

    if (!memoryStore.progress[key]) {
      memoryStore.progress[key] = {
        userId,
        courseId,
        completedLessons: [],
        percentage: 0,
        certificateEarned: false,
      };
    }
    return memoryStore.progress[key];
  },

  async saveProgress(userId, courseId, updateData) {
    const key = `${userId}_${courseId}`;
    if (isMongoConnected()) {
      return await Progress.findOneAndUpdate(
        { userId, courseId },
        { ...updateData, updatedAt: new Date() },
        { new: true, upsert: true }
      );
    }

    memoryStore.progress[key] = {
      ...(memoryStore.progress[key] || { userId, courseId }),
      ...updateData,
    };
    return memoryStore.progress[key];
  },

  // STATS
  async getStats() {
    let totalUsers = 0;
    let totalCourses = 0;
    let totalOrders = 0;
    let totalEnrollments = 0;

    if (isMongoConnected()) {
      totalUsers = await User.countDocuments();
      totalCourses = await Course.countDocuments();
      totalOrders = await Order.countDocuments();
      totalEnrollments = await Enrollment.countDocuments();
    } else {
      totalUsers = memoryStore.users.length;
      totalCourses = memoryStore.courses.length;
      totalOrders = memoryStore.orders.length;
      totalEnrollments = (memoryStore.enrollments || []).length;
    }

    return { totalUsers, totalCourses, totalOrders, totalEnrollments, totalRevenue: 0 };
  },

  // ENROLLMENT OPERATIONS
  async createEnrollment(data) {
    const enrId = `enr_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    const newEnrollment = {
      _id: enrId,
      id: enrId,
      userId: data.userId,
      userName: data.userName || data.name || 'Student User',
      userEmail: data.userEmail || data.email || 'student@example.com',
      userPhone: data.userPhone || data.phone || 'N/A',
      profession: data.profession || 'Student',
      goal: data.goal || 'Skill Upgrade',
      courseId: data.courseId,
      courseTitle: data.courseTitle || 'Platform Course',
      createdAt: new Date().toISOString(),
      status: 'Active',
    };

    if (isMongoConnected()) {
      try {
        const created = await Enrollment.create(newEnrollment);
        return created;
      } catch (err) {
        console.error('Error creating enrollment in Mongo:', err);
      }
    }

    if (!memoryStore.enrollments) memoryStore.enrollments = [];
    memoryStore.enrollments.unshift(newEnrollment);
    saveStateToFile();
    return newEnrollment;
  },

  async getAllEnrollments() {
    if (isMongoConnected()) {
      try {
        const list = await Enrollment.find({}).sort({ createdAt: -1 });
        return list;
      } catch (err) {
        console.error('Error fetching enrollments from Mongo:', err);
      }
    }
    if (!memoryStore.enrollments) memoryStore.enrollments = [];
    return memoryStore.enrollments;
  },

  async deleteEnrollment(id) {
    if (isMongoConnected()) {
      try {
        const deleted = await Enrollment.findOneAndDelete({ $or: [{ _id: id }, { id }] });
        return deleted;
      } catch (err) {
        console.error('Error deleting enrollment from Mongo:', err);
      }
    }
    if (!memoryStore.enrollments) memoryStore.enrollments = [];
    const idx = memoryStore.enrollments.findIndex((e) => e.id === id || e._id === id);
    if (idx !== -1) {
      const removed = memoryStore.enrollments.splice(idx, 1)[0];
      saveStateToFile();
      return removed;
    }
    return null;
  },
};
