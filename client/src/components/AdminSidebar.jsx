import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from './Logo';

export default function AdminSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const navItems = [
    { path: '/admin', label: 'Overview', icon: 'dashboard' },
    { path: '/admin/users', label: 'Registered Users', icon: 'group' },
    { path: '/admin/courses', label: 'Manage Courses', icon: 'menu_book' },
    { path: '/admin/enrollments', label: 'Enrolled Students', icon: 'assignment_turned_in' },
    { path: '/admin/contacts', label: 'Contact Messages', icon: 'mark_email_unread' },
    { path: '/admin/categories', label: 'Categories', icon: 'category' },
    { path: '/admin/reports', label: 'Analytics Reports', icon: 'analytics' },
  ];

  return (
    <>
      {/* 📱 Mobile Top Admin Bar (< 992px) */}
      <header className="d-lg-none bg-white border-bottom border-outline-variant/30 sticky-top z-3 px-3 py-2.5 d-flex align-items-center justify-content-between shadow-xs">
        <div className="d-flex align-items-center gap-2">
          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="btn btn-outline-primary p-1.5 rounded-3 d-flex align-items-center justify-content-center"
            style={{ width: '38px', height: '38px' }}
            aria-label="Toggle Admin Navigation"
          >
            <span className="material-symbols-outlined fs-5">
              {mobileDrawerOpen ? 'close' : 'menu'}
            </span>
          </button>
          <Logo size="sm" to="/admin" />
          <span className="badge bg-primary text-white font-label-caps" style={{ fontSize: '9px' }}>
            ADMIN
          </span>
        </div>

        <div className="d-flex align-items-center gap-2">
          <Link
            to="/dashboard"
            className="btn btn-outline-secondary btn-sm font-body-sm px-2.5 py-1 rounded-3 d-flex align-items-center gap-1"
            title="Switch to Student View"
          >
            <span className="material-symbols-outlined fs-6">school</span>
            <span className="d-none d-sm-inline">Student View</span>
          </Link>
          <button
            onClick={async () => {
              await logout();
              navigate('/login');
            }}
            className="btn btn-outline-danger btn-sm p-1.5 rounded-3 d-flex align-items-center justify-content-center"
            title="Logout"
          >
            <span className="material-symbols-outlined fs-6">logout</span>
          </button>
        </div>
      </header>

      {/* 📱 Mobile Offcanvas Backdrop & Drawer Menu */}
      {mobileDrawerOpen && (
        <div
          className="d-lg-none position-fixed top-0 start-0 w-100 h-100 z-3"
          style={{ backgroundColor: 'rgba(11, 28, 48, 0.5)', backdropFilter: 'blur(4px)' }}
          onClick={() => setMobileDrawerOpen(false)}
        >
          <div
            className="bg-white h-100 shadow-xl p-4 d-flex flex-column"
            style={{ width: '280px', maxWidth: '85vw' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex align-items-center justify-content-between border-bottom border-outline-variant/20 pb-3 mb-3">
              <div className="d-flex align-items-center gap-2">
                <img
                  src={
                    user?.avatar ||
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuCr9CHF12DMyqfTqDPJoBj_xC_FhZnCOV1I6J1SMhxGh9dcJ3yPsxD2HtzKxLTHnyTSpG0uX0MEYSV840HpNX-y1wjUL2W5uzc-jWwkVaS1whPOnE5SxNKOpXId2qBfE-9gu0NTJ6WC0LlVlX-xhbFqOzPgYtHkBVsyxV3NAvnoOITYBeL22R1XVab90baoCu1D0V5K4T5SuN-718WnFxyTEDsfdHu9ezm90n-qADcvPeqDMj_eqNdC'
                  }
                  alt="Admin Profile"
                  className="rounded-circle border border-2 border-primary object-fit-cover"
                  style={{ width: '38px', height: '38px' }}
                />
                <div>
                  <h6 className="m-0 fw-bold font-body-sm text-on-surface">{user?.name || 'Admin'}</h6>
                  <span className="font-label-caps text-primary" style={{ fontSize: '10px' }}>
                    SUPER ADMIN
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="btn btn-close p-2"
                aria-label="Close"
              />
            </div>

            <div className="flex-grow-1 d-flex flex-column gap-1 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileDrawerOpen(false)}
                    className={`d-flex align-items-center gap-3 px-3 py-2.5 rounded-3 font-body-sm text-decoration-none transition-colors ${
                      isActive
                        ? 'bg-primary text-white fw-bold shadow-xs'
                        : 'text-on-surface-variant hover-bg-low'
                    }`}
                  >
                    <span className="material-symbols-outlined fs-5">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-top border-outline-variant/20 d-flex flex-column gap-2 mt-auto">
              <Link
                to="/dashboard"
                onClick={() => setMobileDrawerOpen(false)}
                className="btn btn-outline-primary font-body-sm py-2 rounded-3 d-flex align-items-center justify-content-center gap-2"
              >
                <span className="material-symbols-outlined fs-5">school</span>
                <span>Switch to Student View</span>
              </Link>
              <button
                onClick={async () => {
                  await logout();
                  navigate('/login');
                }}
                className="btn btn-outline-danger font-body-sm py-2 rounded-3 d-flex align-items-center justify-content-center gap-2"
              >
                <span className="material-symbols-outlined fs-5">logout</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 💻 Desktop Sidebar (>= 992px) */}
      <nav
        className="d-none d-lg-flex flex-column h-100 p-4 bg-surface-container-low border-end border-outline-variant/30 shadow-sm position-fixed start-0 top-0 z-3"
        style={{ width: '260px' }}
      >
        {/* Admin Profile & Brand Header */}
        <Link
          to="/admin"
          className="text-decoration-none d-flex align-items-center gap-3 px-2 py-3 border-bottom border-outline-variant/20 mb-3 transition-all cursor-pointer rounded-3 hover-bg-low"
          title="Go to Admin Dashboard"
        >
          <img
            src={
              user?.avatar ||
              'https://lh3.googleusercontent.com/aida-public/AB6AXuCr9CHF12DMyqfTqDPJoBj_xC_FhZnCOV1I6J1SMhxGh9dcJ3yPsxD2HtzKxLTHnyTSpG0uX0MEYSV840HpNX-y1wjUL2W5uzc-jWwkVaS1whPOnE5SxNKOpXId2qBfE-9gu0NTJ6WC0LlVlX-xhbFqOzPgYtHkBVsyxV3NAvnoOITYBeL22R1XVab90baoCu1D0V5K4T5SuN-718WnFxyTEDsfdHu9ezm90n-qADcvPeqDMj_eqNdC'
            }
            alt="Admin Profile"
            className="rounded-circle border border-2 border-primary object-fit-cover flex-shrink-0"
            style={{ width: '42px', height: '42px' }}
          />
          <div className="overflow-hidden">
            <h1 className="font-headline-md text-primary fs-5 m-0 fw-bold whitespace-nowrap text-nowrap">
              LearnHub
            </h1>
            <p className="font-label-caps text-on-surface-variant m-0 mt-1" style={{ fontSize: '11px' }}>
              ADMIN PANEL
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex-grow-1 d-flex flex-column gap-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`d-flex align-items-center gap-3 px-3 py-3 rounded-3 font-body-sm text-decoration-none transition-colors ${
                  isActive
                    ? 'bg-primary text-white fw-bold shadow-sm'
                    : 'text-on-surface-variant hover-bg-high'
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Footer & Actions */}
        <div className="mt-auto d-flex flex-column gap-3 pt-3 border-top border-outline-variant/20">
          <Link
            to="/dashboard"
            className="bg-white px-3 py-2.5 rounded-4 border border-outline-variant/40 shadow-xs text-decoration-none d-flex align-items-center gap-2 transition-colors hover-bg-high"
            style={{ border: '1.5px solid rgba(79, 70, 229, 0.25)' }}
          >
            <div
              className="d-flex align-items-center justify-content-center text-primary"
              style={{ width: '26px', height: '26px', flexShrink: 0 }}
            >
              <span className="material-symbols-outlined fs-5">school</span>
            </div>
            <span
              className="font-body-sm text-primary fw-bold whitespace-nowrap text-nowrap"
              style={{ fontSize: '12.5px' }}
            >
              Switch to Student View
            </span>
          </Link>

          <button
            onClick={async () => {
              await logout();
              navigate('/login');
            }}
            className="btn text-error d-flex align-items-center gap-3 px-3 py-2 text-decoration-none rounded-3 font-body-sm hover-bg-error border-0 bg-transparent text-start"
          >
            <span className="material-symbols-outlined fs-5">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </>
  );
}
