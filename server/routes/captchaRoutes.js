import express from 'express';
import { getNewCaptcha, validateCaptcha } from '../controllers/captchaController.js';

const router = express.Router();

router.get('/generate', getNewCaptcha);
router.post('/verify', validateCaptcha);

export default router;
