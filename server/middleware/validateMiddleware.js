// Email regex pattern
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Phone regex pattern (accepts numbers, spaces, +, -, parentheses)
const PHONE_REGEX = /^[\+\d\s\(\)\-]{7,20}$/;

export const validateRegister = (req, res, next) => {
  let { name, email, phone, password, confirmPassword } = req.body;

  if (name) name = name.trim();
  if (email) email = email.trim();
  if (phone) phone = phone.trim();

  const errors = {};

  if (!name || name.length === 0) {
    errors.name = 'Full name is required.';
  }

  if (!email || email.length === 0) {
    errors.email = 'Email address is required.';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (phone && phone.length > 0 && !PHONE_REGEX.test(phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (!password || password.length === 0) {
    errors.password = 'Password is required.';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  }

  if (confirmPassword !== undefined && password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  if (Object.keys(errors).length > 0) {
    // Return first error message in 'error' field for single alert fallback + detailed 'fieldErrors'
    const firstErrorMessage = Object.values(errors)[0];
    return res.status(400).json({
      success: false,
      error: firstErrorMessage,
      fieldErrors: errors,
    });
  }

  req.body.name = name;
  req.body.email = email;
  req.body.phone = phone;

  next();
};

export const validateLogin = (req, res, next) => {
  let { email, password } = req.body;

  if (email) email = email.trim();

  const errors = {};

  if (!email || email.length === 0) {
    errors.email = 'Email address is required.';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!password || password.length === 0) {
    errors.password = 'Password is required.';
  }

  if (Object.keys(errors).length > 0) {
    const firstErrorMessage = Object.values(errors)[0];
    return res.status(400).json({
      success: false,
      error: firstErrorMessage,
      fieldErrors: errors,
    });
  }

  req.body.email = email;
  next();
};
