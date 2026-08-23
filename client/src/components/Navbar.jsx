import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import { useTheme } from '../context/ThemeContext';
import Logo from './Logo';

export default function Navbar() {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { searchQuery, setSearchQuery } = useCourses();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { to: '/courses', label: 'Courses' },
    { to: '/my-courses', label: 'My Courses' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky-top z-3 bg-white border-bottom border-outline-variant/20 shadow-sm w-100">
      <div className="max-w-container-max mx-auto px-3 px-md-5 py-3 d-flex align-items-center justify-content-between">
        {/* Brand Logo & Desktop Navigation */}
        <div className="d-flex align-items-center gap-4 gap-lg-5">
          <Logo size="md" />

          <nav className="d-none d-md-flex align-items-center gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-body-base text-decoration-none px-2 py-1 rounded fw-medium transition-colors ${
                  location.pathname === link.to
                    ? 'text-primary fw-bold'
                    : 'text-on-surface-variant hover-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Actions (Search, Theme, Auth, Mobile Hamburger) */}
        <div className="d-flex align-items-center gap-2 gap-sm-3">
          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="d-none d-lg-flex align-items-center bg-surface-container rounded-pill px-3 py-2 border border-outline-variant/30"
          >
            <span className="material-symbols-outlined text-outline me-2">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses..."
              className="bg-transparent border-0 font-body-sm text-on-surface outline-none"
              style={{ width: '180px', outline: 'none' }}
            />
          </form>

          {/* Theme Switcher Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className={`btn p-0 rounded-circle d-flex align-items-center justify-content-center transition-all ${
              theme === 'dark'
                ? 'btn-outline-warning text-warning border-warning/40'
                : 'btn-outline-primary text-primary border-outline-variant/40'
            }`}
            style={{ width: '38px', height: '38px', flexShrink: 0 }}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            <span className="material-symbols-outlined fs-5">
              {theme === 'light' ? 'dark_mode' : 'light_mode'}
            </span>
          </button>

          {/* Authenticated State vs Auth Buttons */}
          {isAuthenticated ? (
            <div className="position-relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="btn bg-surface-container-low text-on-surface d-flex align-items-center gap-2 p-1 pe-2 pe-sm-3 rounded-pill border border-outline-variant/30 transition-all"
              >
                <img
                  src={
                    user?.avatar ||
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuCr9CHF12DMyqfTqDPJoBj_xC_FhZnCOV1I6J1SMhxGh9dcJ3yPsxD2HtzKxLTHnyTSpG0uX0MEYSV840HpNX-y1wjUL2W5uzc-jWwkVaS1whPOnE5SxNKOpXId2qBfE-9gu0NTJ6WC0LlVlX-xhbFqOzPgYtHkBVsyxV3NAvnoOITYBeL22R1XVab90baoCu1D0V5K4T5SuN-718WnFxyTEDsfdHu9ezm90n-qADcvPeqDMj_eqNdC'
                  }
                  alt={user?.name}
                  className="rounded-circle object-fit-cover flex-shrink-0"
                  style={{ width: '32px', height: '32px' }}
                />
                <span className="d-none d-sm-inline font-body-sm fw-semibold text-on-surface">
                  {user?.name?.split(' ')[0]}
                </span>
                <span className="material-symbols-outlined fs-6 text-on-surface-variant">
                  expand_more
                </span>
              </button>

              {showDropdown && (
                <div
                  className="position-absolute end-0 mt-2 bg-white rounded-3 shadow-lg border border-outline-variant/30 p-2 z-3"
                  style={{ minWidth: '220px' }}
                >
                  <div className="px-3 py-2 border-bottom border-outline-variant/20 mb-1">
                    <p className="font-body-sm fw-bold text-on-surface mb-0">{user?.name}</p>
                    <p className="font-label-caps text-primary m-0 mt-1" style={{ fontSize: '10px' }}>
                      {user?.role?.toUpperCase()} ACCOUNT
                    </p>
                  </div>

                  <Link
                    to="/dashboard"
                    onClick={() => setShowDropdown(false)}
                    className="d-flex align-items-center gap-2 px-3 py-2 text-on-surface font-body-sm text-decoration-none rounded hover-bg-low"
                  >
                    <span className="material-symbols-outlined fs-5">dashboard</span> Dashboard
                  </Link>

                  <Link
                    to="/my-courses"
                    onClick={() => setShowDropdown(false)}
                    className="d-flex align-items-center gap-2 px-3 py-2 text-on-surface font-body-sm text-decoration-none rounded hover-bg-low"
                  >
                    <span className="material-symbols-outlined fs-5">school</span> My Courses
                  </Link>

                  <Link
                    to="/profile"
                    onClick={() => setShowDropdown(false)}
                    className="d-flex align-items-center gap-2 px-3 py-2 text-on-surface font-body-sm text-decoration-none rounded hover-bg-low"
                  >
                    <span className="material-symbols-outlined fs-5">person</span> Profile
                  </Link>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setShowDropdown(false)}
                      className="d-flex align-items-center gap-2 px-3 py-2 text-primary font-body-sm text-decoration-none rounded hover-bg-low fw-bold"
                    >
                      <span className="material-symbols-outlined fs-5">admin_panel_settings</span>{' '}
                      Admin Panel
                    </Link>
                  )}

                  <div className="border-top border-outline-variant/20 my-1"></div>

                  <button
                    onClick={() => {
                      logout();
                      setShowDropdown(false);
                      navigate('/');
                    }}
                    className="w-100 d-flex align-items-center gap-2 px-3 py-2 text-error font-body-sm bg-transparent border-0 text-start rounded hover-bg-error"
                  >
                    <span className="material-symbols-outlined fs-5">logout</span> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="d-none d-sm-flex align-items-center gap-2">
              <Link
                to="/login"
                className="btn btn-link font-body-base text-primary text-decoration-none font-medium px-3 py-2"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="btn btn-primary font-body-base font-medium px-4 py-2 rounded-3 shadow-xs"
              >
                Join for Free
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="d-md-none btn p-2 text-on-surface border border-outline-variant/30 rounded-3 bg-surface-container-low"
            aria-label="Toggle navigation"
          >
            <span className="material-symbols-outlined fs-5">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Navigation Menu */}
      {mobileMenuOpen && (
        <div className="d-md-none bg-white border-top border-outline-variant/20 px-3 py-3 shadow-md">
          {/* Mobile Search Input */}
          <form onSubmit={handleSearchSubmit} className="mb-3">
            <div className="d-flex align-items-center bg-surface-container rounded-pill px-3 py-2 border border-outline-variant/30">
              <span className="material-symbols-outlined text-outline me-2">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search all courses..."
                className="bg-transparent border-0 font-body-sm text-on-surface w-100 outline-none"
                style={{ outline: 'none' }}
              />
            </div>
          </form>

          {/* Mobile Nav Links */}
          <div className="d-flex flex-column gap-1 mb-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`d-flex align-items-center justify-content-between px-3 py-2.5 rounded-3 text-decoration-none font-body-base ${
                  location.pathname === link.to
                    ? 'bg-primary text-white fw-bold'
                    : 'text-on-surface hover-bg-low'
                }`}
              >
                <span>{link.label}</span>
                <span className="material-symbols-outlined fs-6">chevron_right</span>
              </Link>
            ))}
          </div>

          {/* Mobile Unauthenticated CTA */}
          {!isAuthenticated && (
            <div className="d-flex flex-column gap-2 pt-2 border-top border-outline-variant/20">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-outline-primary w-100 py-2.5 font-body-base rounded-3 text-center"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary w-100 py-2.5 font-body-base rounded-3 text-center shadow-xs"
              >
                Join for Free
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
