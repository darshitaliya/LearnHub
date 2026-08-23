import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ size = 'md', to = '/', className = '', showText = true, textClass = '' }) {
  const iconSizes = {
    sm: { box: 30, icon: 18, font: 'fs-5' },
    md: { box: 36, icon: 22, font: 'fs-4' },
    lg: { box: 44, icon: 26, font: 'fs-3' },
    xl: { box: 52, icon: 32, font: 'fs-2' },
  };

  const { box, icon, font } = iconSizes[size] || iconSizes.md;

  const content = (
    <div className={`d-inline-flex align-items-center gap-2 ${className}`}>
      <div
        className="rounded-3 text-white d-flex align-items-center justify-content-center shadow-sm flex-shrink-0"
        style={{
          width: `${box}px`,
          height: `${box}px`,
          background: 'linear-gradient(135deg, #3525cd 0%, #4f46e5 50%, #7c3aed 100%)',
        }}
      >
        <svg
          width={icon}
          height={icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      </div>
      {showText && (
        <span className={`font-headline-md text-primary font-bold ${textClass || font}`}>
          LearnHub
        </span>
      )}
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="text-decoration-none d-inline-flex align-items-center m-0">
        {content}
      </Link>
    );
  }

  return content;
}
