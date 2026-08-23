import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import CaptchaField from '../components/CaptchaField';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [captchaData, setCaptchaData] = useState({ captchaToken: '', captchaInput: '' });
  const [captchaError, setCaptchaError] = useState('');
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setCaptchaError('');

    if (!captchaData.captchaInput?.trim()) {
      setCaptchaError('Please enter the CAPTCHA code.');
      return;
    }

    if (email) {
      setSent(true);
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body-base min-vh-100 w-100 d-flex align-items-center justify-content-center p-4">
      <div className="bg-white rounded-4 border border-outline-variant/30 p-5 shadow-sm w-100" style={{ maxWidth: '440px' }}>
        <div className="mb-4">
          <Logo size="md" />
        </div>

        <h1 className="font-headline-md fw-bold mb-2">Reset Password</h1>
        <p className="font-body-base text-on-surface-variant mb-4">
          Enter your email address and we'll send you instructions to reset your password.
        </p>

        {sent ? (
          <div className="alert alert-success font-body-sm rounded-3">
            Password reset link sent to <strong>{email}</strong>. Check your inbox!
            <div className="mt-3">
              <Link to="/login" className="btn btn-primary btn-sm font-body-sm px-3 rounded-3">
                Back to Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <div className="d-flex flex-column gap-1">
              <label className="font-label-caps text-on-surface-variant">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="form-control input-premium py-3 px-3 rounded-3 font-body-base"
                required
              />
            </div>

            {/* Security CAPTCHA Challenge */}
            <CaptchaField
              id="forgot-captcha"
              onCaptchaChange={(data) => {
                setCaptchaData(data);
                setCaptchaError('');
              }}
              error={captchaError}
            />

            <button type="submit" className="btn btn-primary w-100 py-3 font-body-base fw-medium rounded-3">
              Send Reset Link
            </button>

            <p className="text-center font-body-sm text-on-surface-variant m-0">
              Remembered your password?{' '}
              <Link to="/login" className="text-primary fw-semibold text-decoration-none">
                Log in
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
