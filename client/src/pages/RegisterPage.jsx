import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import CaptchaField from '../components/CaptchaField';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [captchaData, setCaptchaData] = useState({ captchaToken: '', captchaInput: '' });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { user, register, logout } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateFrontend = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+\d\s\(\)\-]{7,20}$/;

    if (!formData.name.trim()) {
      errors.name = 'First name and last name are required.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    if (formData.phone.trim() && !phoneRegex.test(formData.phone.trim())) {
      errors.phone = 'Please enter a valid phone number.';
    }

    if (!formData.password) {
      errors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    if (!captchaData.captchaInput?.trim()) {
      errors.captcha = 'Please enter the CAPTCHA verification code.';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    const clientErrors = validateFrontend();
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      setError(Object.values(clientErrors)[0]);
      return;
    }

    setLoading(true);
    try {
      await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
        captchaToken: captchaData.captchaToken,
        captchaInput: captchaData.captchaInput,
        autoLogin: false,
      });
      navigate('/login', {
        state: {
          message: 'Account registered successfully! Please enter the CAPTCHA code to log in.',
          email: formData.email.trim(),
          password: formData.password,
        },
      });
    } catch (err) {
      const serverErr =
        err.response?.data?.error ||
        (err.code === 'ERR_NETWORK' || !err.response
          ? 'Cannot connect to server. Please ensure backend is running.'
          : 'Registration failed.');
      setError(serverErr);
      if (err.response?.data?.fieldErrors) {
        setFieldErrors(err.response.data.fieldErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body-base min-vh-100 w-100 d-flex">
      {/* Left Panel */}
      <div className="d-none d-lg-flex flex-column w-50 bg-surface-container-low p-5 position-relative overflow-hidden">
        <div className="position-absolute rounded-circle opacity-30 pointer-events-none" style={{ top: '-100px', left: '-100px', width: '380px', height: '380px', backgroundColor: '#e2dfff', filter: 'blur(80px)' }} />
        <div className="position-absolute rounded-circle opacity-30 pointer-events-none" style={{ top: '200px', right: '-50px', width: '300px', height: '300px', backgroundColor: '#acedff', filter: 'blur(80px)' }} />

        <div className="position-relative z-1">
          <Logo size="lg" />
        </div>

        <div className="flex-grow-1 d-flex align-items-center justify-content-center position-relative z-1 w-100 max-w-lg mx-auto py-4">
          <div className="w-100 position-relative rounded-4 overflow-hidden glass-panel" style={{ aspectRatio: '1/1', maxWidth: '420px' }}>
            <img
              className="w-100 h-100 object-fit-cover"
              src="/assets/learnhub_hd_workspace.jpg"
              alt="Futuristic workspace"
            />
          </div>
        </div>

        <div className="position-relative z-1 mt-auto">
          <blockquote className="font-body-base text-on-surface-variant m-0" style={{ maxWidth: '440px' }}>
            "The futuristic academic experience designed for clarity, progress, and professional empowerment."
          </blockquote>
        </div>
      </div>

      {/* Right Panel - Register Form */}
      <div className="w-100 w-lg-50 d-flex align-items-center justify-content-center p-4 p-md-5 bg-surface position-relative z-2">
        <div className="w-100" style={{ maxWidth: '420px' }}>
          <div className="d-lg-none d-flex justify-content-center mb-4">
            <Logo size="lg" />
          </div>

          <div className="mb-4">
            <h1 className="font-display-lg-mobile text-on-surface mb-2 fw-bold" style={{ fontSize: '32px' }}>
              Create Account
            </h1>
            <p className="font-body-base text-on-surface-variant m-0">Join LearnHub and start your journey today.</p>
          </div>

          {user && (
            <div className="p-3 mb-3 bg-primary-subtle border border-primary/20 rounded-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="font-body-sm text-on-surface">
                  Currently signed in as <strong>{user.name}</strong> ({user.role?.toUpperCase()})
                </span>
              </div>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  onClick={() => navigate(user.role === 'admin' ? '/admin' : '/dashboard')}
                  className="btn btn-sm btn-primary font-body-sm px-3 rounded-pill"
                >
                  Go to {user.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    await logout();
                  }}
                  className="btn btn-sm btn-outline-danger font-body-sm px-3 rounded-pill"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}

          {error && <div className="alert alert-danger font-body-sm rounded-3 mb-3">{error}</div>}

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3" noValidate>
            <div className="d-flex flex-column gap-1">
              <label className="font-label-caps text-on-surface-variant">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                className={`form-control input-premium py-3 px-3 rounded-3 font-body-base ${fieldErrors.name ? 'is-invalid' : ''}`}
                required
              />
              {fieldErrors.name && <div className="invalid-feedback font-body-sm d-block">{fieldErrors.name}</div>}
            </div>

            <div className="d-flex flex-column gap-1">
              <label className="font-label-caps text-on-surface-variant">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`form-control input-premium py-3 px-3 rounded-3 font-body-base ${fieldErrors.email ? 'is-invalid' : ''}`}
                required
              />
              {fieldErrors.email && <div className="invalid-feedback font-body-sm d-block">{fieldErrors.email}</div>}
            </div>

            <div className="d-flex flex-column gap-1">
              <label className="font-label-caps text-on-surface-variant">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className={`form-control input-premium py-3 px-3 rounded-3 font-body-base ${fieldErrors.phone ? 'is-invalid' : ''}`}
              />
              {fieldErrors.phone && <div className="invalid-feedback font-body-sm d-block">{fieldErrors.phone}</div>}
            </div>

            <div className="d-flex flex-column gap-1">
              <label className="font-label-caps text-on-surface-variant">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`form-control input-premium py-3 px-3 rounded-3 font-body-base ${fieldErrors.password ? 'is-invalid' : ''}`}
                required
              />
              {fieldErrors.password && <div className="invalid-feedback font-body-sm d-block">{fieldErrors.password}</div>}
            </div>

            <div className="d-flex flex-column gap-1">
              <label className="font-label-caps text-on-surface-variant">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`form-control input-premium py-3 px-3 rounded-3 font-body-base ${fieldErrors.confirmPassword ? 'is-invalid' : ''}`}
                required
              />
              {fieldErrors.confirmPassword && <div className="invalid-feedback font-body-sm d-block">{fieldErrors.confirmPassword}</div>}
            </div>

            {/* Security CAPTCHA Challenge */}
            <CaptchaField
              id="register-captcha"
              onCaptchaChange={(data) => {
                setCaptchaData(data);
                if (fieldErrors.captcha) setFieldErrors((prev) => ({ ...prev, captcha: '' }));
              }}
              error={fieldErrors.captcha}
            />

            <button type="submit" disabled={loading} className="btn btn-primary w-100 py-3 font-body-base fw-medium rounded-3 mt-2 shadow-sm">
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>

            <p className="text-center font-body-sm text-on-surface-variant mt-2 mb-0">
              Already have an account?{' '}
              <Link to="/login" className="text-primary fw-semibold text-decoration-none">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
