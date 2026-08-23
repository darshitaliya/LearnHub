import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { user, login } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    setLoading(true);

    try {
      const loggedUser = await login(email, password);
      if (loggedUser?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      const serverErr = err.response?.data?.error || 'Invalid email or password.';
      setError(serverErr);
      if (err.response?.data?.fieldErrors) {
        setFieldErrors(err.response.data.fieldErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  const fillCredentials = (roleEmail, rolePass) => {
    setEmail(roleEmail);
    setPassword(rolePass);
    setError('');
    setFieldErrors({});
  };

  return (
    <div className="min-vh-100 w-100 d-flex flex-column flex-lg-row bg-surface">
      {/* Left Panel - Brand & Illustration */}
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
              alt="Futuristic academic workspace"
            />
          </div>
        </div>

        <div className="position-relative z-1 mt-auto">
          <blockquote className="font-body-base text-on-surface-variant m-0" style={{ maxWidth: '440px' }}>
            "The futuristic academic experience designed for clarity, progress, and professional empowerment."
          </blockquote>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-100 w-lg-50 d-flex align-items-center justify-content-center p-4 p-md-5 bg-surface position-relative z-2">
        <div className="w-100" style={{ maxWidth: '420px' }}>
          <div className="d-lg-none d-flex justify-content-center mb-4">
            <Logo size="lg" />
          </div>

          <div className="mb-4">
            <h1 className="font-display-lg-mobile text-on-surface mb-2 fw-bold" style={{ fontSize: '32px' }}>
              Welcome Back
            </h1>
            <p className="font-body-base text-on-surface-variant m-0">Enter your details to access your account.</p>
          </div>

          {error && <div className="alert alert-danger font-body-sm rounded-3 mb-3">{error}</div>}

          {/* Quick Preset Login Buttons for Demo */}
          <div className="mb-3 p-3 bg-surface-container-low rounded-3 border border-outline-variant/30">
            <span className="font-label-caps text-on-surface-variant d-block mb-2">ONE-CLICK DEMO LOGINS:</span>
            <div className="d-flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => { setEmail('alex@learnhub.com'); setPassword('student123'); setFieldErrors({}); setError(''); }}
                className="btn btn-sm btn-outline-primary font-body-sm px-3 py-1.5 rounded-pill fw-semibold shadow-xs"
              >
                Student Demo
              </button>
              <button
                type="button"
                onClick={() => { setEmail('admin@learnhub.com'); setPassword('admin123'); setFieldErrors({}); setError(''); }}
                className="btn btn-sm btn-outline-primary font-body-sm px-3 py-1.5 rounded-pill fw-semibold shadow-xs"
              >
                Admin Demo
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3" noValidate>
            <div className="d-flex flex-column gap-1">
              <label className="font-label-caps text-on-surface-variant" htmlFor="login-email">
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: '' }));
                }}
                placeholder="you@example.com"
                className={`form-control input-premium py-3 px-3 rounded-3 font-body-base ${fieldErrors.email ? 'is-invalid' : ''}`}
                required
              />
              {fieldErrors.email && <div className="invalid-feedback font-body-sm d-block">{fieldErrors.email}</div>}
            </div>

            <div className="d-flex flex-column gap-1">
              <div className="d-flex justify-content-between align-items-baseline">
                <label className="font-label-caps text-on-surface-variant" htmlFor="login-password">
                  Password
                </label>
                <Link to="/forgot-password" className="font-body-sm text-primary text-decoration-none">
                  Forgot password?
                </Link>
              </div>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: '' }));
                }}
                placeholder="••••••••"
                className={`form-control input-premium py-3 px-3 rounded-3 font-body-base ${fieldErrors.password ? 'is-invalid' : ''}`}
                required
              />
              {fieldErrors.password && <div className="invalid-feedback font-body-sm d-block">{fieldErrors.password}</div>}
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary w-100 py-3 font-body-base fw-medium rounded-3 mt-2 shadow-sm">
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Signing in...
                </>
              ) : (
                'Log In'
              )}
            </button>

            <p className="text-center font-body-sm text-on-surface-variant mt-2 mb-0">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary fw-semibold text-decoration-none">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
