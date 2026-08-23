import express from 'express';
import { getProgress, completeLesson } from '../controllers/progressController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/:courseId', requireAuth, getProgress);
router.post('/lesson-complete', requireAuth, completeLesson);

export default router;
