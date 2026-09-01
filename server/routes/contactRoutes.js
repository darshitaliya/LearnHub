import express from 'express';
import { submitContactMessage } from '../controllers/contactController.js';

const router = express.Router();

// Public submission route
router.post('/', submitContactMessage);

export default router;
