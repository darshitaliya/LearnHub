import React from 'react';

export default function Header({ activeView, onNavigate }) {
  return (
    <header className="sticky-top z-3 flex-wrap bg-surface/80 backdrop-blur-md border-bottom border-outline-variant/20 shadow-sm w-100 bg-white border-bottom">
      <div className="max-w-container-max mx-auto px-3 px-md-5 py-3 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-4 gap-lg-5">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
            className="text-decoration-none font-headline-md text-primary font-bold fs-4 m-0"
          >
            LearnHub
          </a>
          <nav className="d-none d-md-flex align-items-center gap-4">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onNavigate('course-details'); }}
              className={`font-body-base text-decoration-none transition-colors px-2 py-1 rounded ${
                activeView === 'course-details'
                  ? 'text-primary border-bottom border-2 border-primary font-semibold'
                  : 'text-on-surface-variant hover-primary'
              }`}
            >
              Browse
            </a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
              className="font-body-base text-on-surface-variant text-decoration-none hover-primary px-2 py-1 rounded"
            >
              Pathways
            </a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
              className="font-body-base text-on-surface-variant text-decoration-none hover-primary px-2 py-1 rounded"
            >
              Mentors
            </a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
              className="font-body-base text-on-surface-variant text-decoration-none hover-primary px-2 py-1 rounded"
            >
              Enterprise
            </a>
          </nav>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="d-none d-lg-flex align-items-center bg-surface-container rounded-pill px-3 py-2 border border-outline-variant/30">
            <span className="material-symbols-outlined text-outline me-2">search</span>
            <input
              type="text"
              placeholder="Search courses..."
              className="bg-transparent border-0 font-body-sm text-on-surface outline-none"
              style={{ width: '180px', outline: 'none' }}
            />
          </div>

          <button
            onClick={() => onNavigate('login')}
            className="btn btn-link font-body-base text-primary text-decoration-none font-medium px-3 py-2 rounded-3 hover-bg-low"
          >
            Sign In
          </button>

          <button
            onClick={() => onNavigate('login')}
            className="btn btn-primary font-body-base font-medium px-4 py-2 rounded-3"
          >
            Join for Free
          </button>
        </div>
      </div>
    </header>
  );
}
