import express from 'express';
import {
  getAdminStats,
  getAllUsers,
  createUser,
  updateUser,
  updateUserRole,
  deleteUser,
  getAllOrders,
  getEnrollments,
  deleteEnrollment,
} from '../controllers/adminController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(requireAuth);
router.use(requireRole('admin'));

router.get('/stats', getAdminStats);
router.get('/users', getAllUsers);
router.post('/users', createUser);
router.put('/users/:userId', updateUser);
router.put('/users/:userId/role', updateUserRole);
router.delete('/users/:userId', deleteUser);
router.get('/orders', getAllOrders);
router.get('/enrollments', getEnrollments);
router.delete('/enrollments/:id', deleteEnrollment);

export default router;
