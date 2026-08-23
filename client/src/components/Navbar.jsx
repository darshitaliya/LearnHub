import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useCourses } from '../context/CourseContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { user, isAuthenticated, logout, isAdmin, isInstructor } = useAuth();
  const { cartCount } = useCart();
  const { searchQuery, setSearchQuery } = useCourses();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky-top z-3 bg-white border-bottom border-outline-variant/20 shadow-sm w-100">
      <div className="max-w-container-max mx-auto px-3 px-md-5 py-3 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-4 gap-lg-5">
          <Link to="/" className="text-decoration-none d-flex align-items-center gap-2 m-0">
            <div
              className="rounded-3 text-white d-flex align-items-center justify-content-center shadow-sm"
              style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #3525cd 0%, #4f46e5 100%)' }}
            >
              <span className="material-symbols-outlined fs-5 fill m-0 text-white">school</span>
            </div>
            <span className="font-headline-md text-primary font-bold fs-4">LearnHub</span>
          </Link>

          <nav className="d-none d-md-flex align-items-center gap-3">
            <Link to="/courses" className="font-body-base text-on-surface-variant text-decoration-none hover-primary px-2 py-1 rounded fw-medium">
              Courses
            </Link>
            <Link to="/my-courses" className="font-body-base text-on-surface-variant text-decoration-none hover-primary px-2 py-1 rounded fw-medium">
              My Courses
            </Link>
            <Link to="/about" className="font-body-base text-on-surface-variant text-decoration-none hover-primary px-2 py-1 rounded fw-medium">
              About
            </Link>
            <Link to="/contact" className="font-body-base text-on-surface-variant text-decoration-none hover-primary px-2 py-1 rounded fw-medium">
              Contact
            </Link>
          </nav>
        </div>

        <div className="d-flex align-items-center gap-3">
          {/* Live Search Form */}
          <form onSubmit={handleSearchSubmit} className="d-none d-lg-flex align-items-center bg-surface-container rounded-pill px-3 py-2 border border-outline-variant/30">
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

          {/* Dark / Light Mode Theme Switcher Icon-Only Toggle Button */}
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
            <span className="material-symbols-outlined fs-5">{theme === 'light' ? 'dark_mode' : 'light_mode'}</span>
          </button>


          {/* Auth State */}
          {isAuthenticated ? (
            <div className="position-relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="btn bg-surface-container-low text-on-surface d-flex align-items-center gap-2 p-1 pe-3 rounded-pill border border-outline-variant/30 transition-all"
              >
                <img
                  src={user.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCr9CHF12DMyqfTqDPJoBj_xC_FhZnCOV1I6J1SMhxGh9dcJ3yPsxD2HtzKxLTHnyTSpG0uX0MEYSV840HpNX-y1wjUL2W5uzc-jWwkVaS1whPOnE5SxNKOpXId2qBfE-9gu0NTJ6WC0LlVlX-xhbFqOzPgYtHkBVsyxV3NAvnoOITYBeL22R1XVab90baoCu1D0V5K4T5SuN-718WnFxyTEDsfdHu9ezm90n-qADcvPeqDMj_eqNdC'}
                  alt={user.name}
                  className="rounded-circle object-fit-cover"
                  style={{ width: '32px', height: '32px' }}
                />
                <span className="font-body-sm fw-semibold text-on-surface">{user.name.split(' ')[0]}</span>
                <span className="material-symbols-outlined fs-6 text-on-surface-variant">expand_more</span>
              </button>

              {showDropdown && (
                <div className="position-absolute end-0 mt-2 bg-white rounded-3 shadow-lg border border-outline-variant/30 p-2 z-3" style={{ minWidth: '220px' }}>
                  <div className="px-3 py-2 border-bottom border-outline-variant/20 mb-1">
                    <p className="font-body-sm fw-bold text-on-surface mb-0">{user.name}</p>
                    <p className="font-label-caps text-primary m-0 mt-1" style={{ fontSize: '10px' }}>
                      {user.role.toUpperCase()} ACCOUNT
                    </p>
                  </div>

                  <Link to="/dashboard" onClick={() => setShowDropdown(false)} className="d-flex align-items-center gap-2 px-3 py-2 text-on-surface font-body-sm text-decoration-none rounded hover-bg-low">
                    <span className="material-symbols-outlined fs-5">dashboard</span> Dashboard
                  </Link>

                  <Link to="/my-courses" onClick={() => setShowDropdown(false)} className="d-flex align-items-center gap-2 px-3 py-2 text-on-surface font-body-sm text-decoration-none rounded hover-bg-low">
                    <span className="material-symbols-outlined fs-5">school</span> My Courses
                  </Link>

                  <Link to="/profile" onClick={() => setShowDropdown(false)} className="d-flex align-items-center gap-2 px-3 py-2 text-on-surface font-body-sm text-decoration-none rounded hover-bg-low">
                    <span className="material-symbols-outlined fs-5">person</span> Profile
                  </Link>


                  {isAdmin && (
                    <Link to="/admin" onClick={() => setShowDropdown(false)} className="d-flex align-items-center gap-2 px-3 py-2 text-primary font-body-sm text-decoration-none rounded hover-bg-low">
                      <span className="material-symbols-outlined fs-5">admin_panel_settings</span> Admin Panel
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
            <div className="d-flex align-items-center gap-2">
              <Link to="/login" className="btn btn-link font-body-base text-primary text-decoration-none font-medium px-3 py-2">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary font-body-base font-medium px-4 py-2 rounded-3">
                Join for Free
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
