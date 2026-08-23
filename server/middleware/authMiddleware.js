import jwt from 'jsonwebtoken';

export const JWT_SECRET = process.env.JWT_SECRET || 'learnhub_super_secret_jwt_key_2026';

export const requireAuth = (req, res, next) => {
  let token = null;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.cookies && req.cookies.learnhub_token) {
    token = req.cookies.learnhub_token;
  } else if (req.headers.cookie) {
    const match = req.headers.cookie.match(/(?:^|;\s*)learnhub_token=([^;]+)/);
    if (match && match[1]) {
      token = decodeURIComponent(match[1]);
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Unauthorized: Missing or invalid authentication session' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Unauthorized: Session expired or invalid' });
  }
};

export const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user || (req.user.role !== role && req.user.role !== 'admin')) {
      return res.status(403).json({ success: false, error: `Forbidden: Requires ${role} privileges` });
    }
    next();
  };
};
