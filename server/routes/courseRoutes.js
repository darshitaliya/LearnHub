import express from 'express';
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  clearAllCourses,
  enrollCourse,
} from '../controllers/courseController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/', requireAuth, requireRole('admin'), createCourse);
router.put('/:id', requireAuth, requireRole('admin'), updateCourse);
router.post('/:id/enroll', requireAuth, enrollCourse);
router.delete('/all/clear', requireAuth, requireRole('admin'), clearAllCourses);
router.delete('/:id', requireAuth, requireRole('admin'), deleteCourse);

export default router;
