import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function CaptchaField({ onCaptchaChange, error, id = 'captchaInput' }) {
  const [captchaSvg, setCaptchaSvg] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [rotating, setRotating] = useState(false);

  // Client-side fallback generator if server endpoint has network delay
  const generateClientFallbackCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="150" height="42" viewBox="0 0 150 42" style="background: #eff4ff; border-radius: 8px; user-select: none;">
        <line x1="10" y1="10" x2="140" y2="35" stroke="#4f46e5" stroke-width="1.5" stroke-opacity="0.5"/>
        <line x1="10" y1="35" x2="140" y2="10" stroke="#00687a" stroke-width="1.5" stroke-opacity="0.5"/>
        <text x="75" y="28" fill="#1e1b4b" font-family="monospace, sans-serif" font-weight="bold" font-size="22px" letter-spacing="4" text-anchor="middle">${code}</text>
      </svg>
    `.trim();
    return { token: `local_${code}`, svg };
  };

  const fetchCaptcha = async () => {
    setLoading(true);
    setRotating(true);
    setTimeout(() => setRotating(false), 500);

    try {
      const res = await api.get('/captcha/generate');
      if (res.data?.captchaSvg) {
        setCaptchaSvg(res.data.captchaSvg);
        setCaptchaToken(res.data.captchaToken);
        if (onCaptchaChange) {
          onCaptchaChange({ captchaToken: res.data.captchaToken, captchaInput });
        }
      } else {
        throw new Error('No SVG returned');
      }
    } catch (err) {
      // Fallback
      const fallback = generateClientFallbackCaptcha();
      setCaptchaSvg(fallback.svg);
      setCaptchaToken(fallback.token);
      if (onCaptchaChange) {
        onCaptchaChange({ captchaToken: fallback.token, captchaInput });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setCaptchaInput(val);
    if (onCaptchaChange) {
      onCaptchaChange({ captchaToken, captchaInput: val });
    }
  };

  return (
    <div className="d-flex flex-column gap-2">
      <label htmlFor={id} className="font-label-caps text-on-surface-variant d-flex align-items-center justify-content-between">
        <span>Security Verification (CAPTCHA)</span>
        <span className="text-muted fw-normal" style={{ fontSize: '11px' }}>Case-insensitive</span>
      </label>

      <div className="d-flex align-items-center gap-2">
        {/* Visual CAPTCHA Badge */}
        <div
          className="border border-outline-variant/30 rounded-3 p-1 bg-surface-container-low d-flex align-items-center justify-content-center shadow-xs overflow-hidden"
          style={{ width: '155px', height: '46px', flexShrink: 0 }}
          title="Security CAPTCHA challenge"
        >
          {loading && !captchaSvg ? (
            <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
          ) : (
            <div
              dangerouslySetInnerHTML={{ __html: captchaSvg }}
              className="d-flex align-items-center justify-content-center"
              style={{ width: '100%', height: '100%' }}
            />
          )}
        </div>

        {/* Refresh Challenge Button */}
        <button
          type="button"
          onClick={fetchCaptcha}
          disabled={loading}
          className="btn btn-outline-secondary p-2 rounded-3 d-flex align-items-center justify-content-center shadow-xs"
          style={{ width: '44px', height: '44px', flexShrink: 0 }}
          title="Generate new CAPTCHA challenge"
        >
          <span
            className="material-symbols-outlined fs-5"
            style={{
              transition: 'transform 0.5s ease',
              transform: rotating ? 'rotate(360deg)' : 'rotate(0deg)',
            }}
          >
            refresh
          </span>
        </button>

        {/* Code Input Field */}
        <div className="flex-grow-1 position-relative">
          <input
            id={id}
            type="text"
            value={captchaInput}
            onChange={handleInputChange}
            placeholder="Enter code"
            maxLength={6}
            autoComplete="off"
            className={`form-control input-premium py-2.5 px-3 rounded-3 font-body-base text-uppercase fw-bold letter-spacing-1 ${
              error ? 'is-invalid border-danger' : ''
            }`}
            style={{ letterSpacing: '2px' }}
            required
          />
        </div>
      </div>

      {error && (
        <div className="text-danger font-body-sm d-flex align-items-center gap-1 mt-0.5">
          <span className="material-symbols-outlined fs-6">error</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
