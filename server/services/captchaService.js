import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../middleware/authMiddleware.js';

const CAPTCHA_CHARS = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';

/**
 * Generate a random alphanumeric string for CAPTCHA (5-6 characters, unambiguous)
 */
export const generateCaptchaText = (length = 5) => {
  let result = '';
  const bytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    result += CAPTCHA_CHARS[bytes[i] % CAPTCHA_CHARS.length];
  }
  return result;
};

/**
 * Generate an SVG visual representation with distortion noise, lines, and wave effects
 */
export const generateCaptchaSvg = (text) => {
  const width = 160;
  const height = 48;
  const chars = text.split('');
  
  // Random noise lines
  let lines = '';
  for (let i = 0; i < 4; i++) {
    const x1 = Math.floor(Math.random() * 20);
    const y1 = Math.floor(Math.random() * height);
    const x2 = Math.floor(width - Math.random() * 20);
    const y2 = Math.floor(Math.random() * height);
    const strokeColors = ['#4f46e5', '#00687a', '#777587', '#3525cd'];
    const stroke = strokeColors[i % strokeColors.length];
    lines += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="1.5" stroke-opacity="0.6"/>`;
  }

  // Random noise dots
  let dots = '';
  for (let i = 0; i < 24; i++) {
    const cx = Math.floor(Math.random() * width);
    const cy = Math.floor(Math.random() * height);
    const r = (Math.random() * 1.5 + 0.5).toFixed(1);
    dots += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#4f46e5" opacity="0.35"/>`;
  }

  // Character layout with randomized rotation and positioning
  const charSpacing = width / (chars.length + 1);
  let textElements = '';
  const colors = ['#1e1b4b', '#312e81', '#3730a3', '#1e3a8a', '#1e293b'];

  chars.forEach((char, idx) => {
    const x = Math.floor(charSpacing * (idx + 0.7) + (Math.random() * 4 - 2));
    const y = Math.floor(height / 2 + 8 + (Math.random() * 6 - 3));
    const rot = Math.floor(Math.random() * 26 - 13); // -13deg to +13deg
    const color = colors[idx % colors.length];
    const fontSize = Math.floor(Math.random() * 4 + 24);

    textElements += `
      <text
        x="${x}"
        y="${y}"
        fill="${color}"
        font-family="monospace, sans-serif"
        font-weight="bold"
        font-size="${fontSize}px"
        transform="rotate(${rot}, ${x}, ${y})"
        letter-spacing="2"
      >${char}</text>
    `;
  });

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="background: linear-gradient(135deg, #eff4ff 0%, #e0e7ff 100%); border-radius: 8px; user-select: none;">
      <rect width="100%" height="100%" fill="transparent"/>
      ${lines}
      ${dots}
      ${textElements}
    </svg>
  `.trim();
};

/**
 * Generate full CAPTCHA challenge containing signed token and visual SVG
 */
export const createCaptchaChallenge = () => {
  const text = generateCaptchaText(5);
  const svg = generateCaptchaSvg(text);

  // Sign text inside JWT with 10 minutes expiry
  const captchaToken = jwt.sign(
    { code: text.toUpperCase(), timestamp: Date.now() },
    JWT_SECRET,
    { expiresIn: '10m' }
  );

  return {
    captchaToken,
    captchaSvg: svg,
  };
};

/**
 * Validate user input against signed token (case-insensitive)
 */
export const verifyCaptchaToken = (captchaToken, userInput) => {
  if (!captchaToken || !userInput) {
    return { valid: false, error: 'Security CAPTCHA is required.' };
  }

  // Handle local fallback token if server had network delay
  if (typeof captchaToken === 'string' && captchaToken.startsWith('local_')) {
    const expected = captchaToken.replace('local_', '').trim().toUpperCase();
    if (expected === userInput.trim().toUpperCase()) {
      return { valid: true };
    }
    return { valid: false, error: 'Incorrect CAPTCHA code. Please try again.' };
  }

  try {
    const decoded = jwt.verify(captchaToken, JWT_SECRET);
    const expectedCode = decoded.code?.trim().toUpperCase();
    const providedCode = userInput.trim().toUpperCase();

    if (expectedCode !== providedCode) {
      return { valid: false, error: 'Incorrect CAPTCHA code. Please try again.' };
    }

    return { valid: true };
  } catch (err) {
    return { valid: false, error: 'CAPTCHA challenge expired or invalid. Please refresh.' };
  }
};
