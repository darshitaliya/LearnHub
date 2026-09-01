import { createCaptchaChallenge, verifyCaptchaToken } from '../services/captchaService.js';

/**
 * GET /api/captcha/generate
 * Returns a new SVG CAPTCHA challenge + signed JWT token
 */
export const getNewCaptcha = async (req, res, next) => {
  try {
    const challenge = createCaptchaChallenge();
    return res.status(200).json({
      success: true,
      captchaToken: challenge.captchaToken,
      captchaSvg: challenge.captchaSvg,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/captcha/verify
 * Validates a CAPTCHA token and user input
 */
export const validateCaptcha = async (req, res, next) => {
  try {
    const captchaToken = req.body.captchaToken || req.body.token;
    const captchaInput = req.body.captchaInput || req.body.input;
    const result = verifyCaptchaToken(captchaToken, captchaInput);

    if (!result.valid) {
      return res.status(400).json({
        success: false,
        error: result.error,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'CAPTCHA validated successfully',
    });
  } catch (err) {
    next(err);
  }
};
