import React, { useState } from 'react';

export default function AuthView({ onNavigate }) {
  const [formMode, setFormMode] = useState('login'); // 'login' | 'register'

  const handleSubmit = (e) => {
    e.preventDefault();
    onNavigate('dashboard');
  };

  return (
    <div className="bg-surface text-on-surface font-body-base min-vh-100 w-100 d-flex">
      {/* Left Panel - Brand & Illustration (Hidden on Mobile) */}
      <div className="d-none d-lg-flex flex-column w-50 bg-surface-container-low p-5 position-relative overflow-hidden">
        {/* Background Gradients */}
        <div
          className="position-absolute rounded-circle opacity-30 pointer-events-none"
          style={{
            top: '-100px',
            left: '-100px',
            width: '380px',
            height: '380px',
            backgroundColor: '#e2dfff',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="position-absolute rounded-circle opacity-30 pointer-events-none"
          style={{
            top: '200px',
            right: '-50px',
            width: '300px',
            height: '300px',
            backgroundColor: '#acedff',
            filter: 'blur(80px)',
          }}
        />

        {/* Brand Header */}
        <div
          className="position-relative z-1 d-flex align-items-center gap-2 cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          <span className="material-symbols-outlined text-primary fs-2 fill">school</span>
          <span className="font-headline-md text-on-surface fw-bold fs-4">LearnHub</span>
        </div>

        {/* Illustration Container */}
        <div className="flex-grow-1 d-flex align-items-center justify-content-center position-relative z-1 w-100 max-w-lg mx-auto py-4">
          <div
            className="w-100 position-relative rounded-4 overflow-hidden glass-panel"
            style={{ aspectRatio: '1/1', maxWidth: '420px' }}
          >
            <img
              className="w-100 h-100 object-fit-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOm8qAeH7Vs5Cm9rFDsLkSx6ngKQFY1tSCa9g4Bryv4DQNbm4VaY6bE9Y75la7q8gUu-VBtiqwBbnrwxTiImisIlSxs60qILBw94JPFz1FRIze7o5T9u1zsEljcYzKDJJEFBZZRvEaeFBp4lsciBIowytVC-CVgydc78DeTS1BjfhOnvyaE2zUVToiaEC9Mw6QrG0CgcxFjCCLeGPTaT8YIifYldTxXzmGy9f6K6iZYZF1Q76pWcFI"
              alt="Futuristic academic workspace"
            />
          </div>
        </div>

        {/* Quote Footer */}
        <div className="position-relative z-1 mt-auto">
          <blockquote className="font-body-base text-on-surface-variant m-0" style={{ maxWidth: '440px' }}>
            "The futuristic academic experience designed for clarity, progress, and professional empowerment."
          </blockquote>
        </div>
      </div>

      {/* Right Panel - Form Container */}
      <div className="w-100 w-lg-50 d-flex align-items-center justify-content-center p-4 p-md-5 bg-surface position-relative z-2">
        <div className="w-100" style={{ maxWidth: '420px' }}>
          {/* Mobile Logo */}
          <div
            className="d-lg-none d-flex justify-content-center align-items-center gap-2 mb-4 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <span className="material-symbols-outlined text-primary fs-3 fill">school</span>
            <span className="font-headline-md text-on-surface fw-bold fs-4">LearnHub</span>
          </div>

          {/* Dynamic Header */}
          <div className="mb-4">
            <h1 className="font-display-lg-mobile text-on-surface mb-2 fw-bold" style={{ fontSize: '32px' }}>
              {formMode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="font-body-base text-on-surface-variant m-0">
              {formMode === 'login'
                ? 'Enter your details to access your account.'
                : 'Join LearnHub and start your journey today.'}
            </p>
          </div>

          {/* LOGIN FORM */}
          {formMode === 'login' && (
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <button
                type="button"
                onClick={() => onNavigate('dashboard')}
                className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-3 py-3 px-4 rounded-3 border-outline-variant bg-white text-on-surface font-body-base fw-semibold"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>

              <div className="d-flex align-items-center my-2 opacity-75">
                <div className="flex-grow-1 border-top border-outline-variant"></div>
                <span className="mx-3 font-label-caps text-on-surface-variant">OR CONTINUE WITH</span>
                <div className="flex-grow-1 border-top border-outline-variant"></div>
              </div>

              <div className="d-flex flex-column gap-3">
                <div className="d-flex flex-column gap-1">
                  <label className="font-label-caps text-on-surface-variant" htmlFor="login-email">
                    Email Address
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    className="form-control input-premium py-3 px-3 rounded-3 font-body-base"
                    required
                  />
                </div>

                <div className="d-flex flex-column gap-1">
                  <div className="d-flex justify-between align-items-baseline">
                    <label className="font-label-caps text-on-surface-variant" htmlFor="login-password">
                      Password
                    </label>
                    <a href="#" className="font-body-sm text-primary text-decoration-none ms-auto">
                      Forgot password?
                    </a>
                  </div>
                  <input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    className="form-control input-premium py-3 px-3 rounded-3 font-body-base"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-3 font-body-base fw-medium rounded-3 mt-2 shadow-sm"
              >
                Log In
              </button>

              <p className="text-center font-body-sm text-on-surface-variant mt-2 mb-0">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setFormMode('register')}
                  className="btn btn-link p-0 text-primary fw-semibold text-decoration-none"
                >
                  Sign up
                </button>
              </p>
            </form>
          )}

          {/* REGISTRATION FORM */}
          {formMode === 'register' && (
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <div className="d-flex flex-column gap-3">
                <div className="d-flex flex-column gap-1">
                  <label className="font-label-caps text-on-surface-variant" htmlFor="reg-name">
                    Full Name
                  </label>
                  <input
                    id="reg-name"
                    type="text"
                    placeholder="Jane Doe"
                    className="form-control input-premium py-3 px-3 rounded-3 font-body-base"
                    required
                  />
                </div>

                <div className="d-flex flex-column gap-1">
                  <label className="font-label-caps text-on-surface-variant" htmlFor="reg-email">
                    Email Address
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    placeholder="you@example.com"
                    className="form-control input-premium py-3 px-3 rounded-3 font-body-base"
                    required
                  />
                </div>

                <div className="d-flex flex-column gap-1">
                  <label className="font-label-caps text-on-surface-variant" htmlFor="reg-phone">
                    Phone Number
                  </label>
                  <input
                    id="reg-phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="form-control input-premium py-3 px-3 rounded-3 font-body-base"
                  />
                </div>

                <div className="d-flex flex-column gap-1">
                  <label className="font-label-caps text-on-surface-variant" htmlFor="reg-password">
                    Create Password
                  </label>
                  <input
                    id="reg-password"
                    type="password"
                    placeholder="••••••••"
                    className="form-control input-premium py-3 px-3 rounded-3 font-body-base"
                    required
                  />
                  <p className="font-body-sm text-outline m-0 mt-1" style={{ fontSize: '12px' }}>
                    Must be at least 8 characters.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 py-3 font-body-base fw-medium rounded-3 mt-2 shadow-sm"
              >
                Create Account
              </button>

              <p className="text-center font-body-sm text-on-surface-variant mt-2 mb-0">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setFormMode('login')}
                  className="btn btn-link p-0 text-primary fw-semibold text-decoration-none"
                >
                  Log in
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
