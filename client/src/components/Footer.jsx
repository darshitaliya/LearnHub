import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer({ onNavigate }) {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-surface-container-highest w-100 py-5 border-top border-outline-variant mt-auto">
      <div className="max-w-container-max mx-auto px-3 px-md-5">
        <div className="row g-4 mb-5">
          {/* Brand & Mission Column */}
          <div className="col-12 col-lg-4">
            <div className="d-flex flex-column gap-3 max-w-sm">
              <Logo size="md" />

              <p className="font-body-sm text-on-surface-variant m-0" style={{ lineHeight: '1.6' }}>
                Empowering the next generation of software engineers, AI researchers, and digital product designers through state-of-the-art curriculum.
              </p>

              {/* Social Media Icons */}
              <div className="d-flex align-items-center gap-2 pt-2">
                {['code', 'terminal', 'share', 'language', 'mail'].map((icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="rounded-circle bg-primary-container/20 text-primary border border-primary/30 d-flex align-items-center justify-content-center hover-primary transition-all shadow-xs"
                    style={{ width: '36px', height: '36px' }}
                    title="LearnHub Social"
                  >
                    <span className="material-symbols-outlined fs-6 text-primary">{icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Nav Columns */}
          <div className="col-12 col-lg-8">
            <div className="row g-4">
              {/* Column 1: Platform */}
              <div className="col-6 col-sm-3">
                <span className="font-label-caps text-on-surface fw-bold d-block mb-3">PLATFORM</span>
                <ul className="list-unstyled d-flex flex-column gap-2 font-body-sm m-0">
                  <li><Link to="/courses" className="text-on-surface-variant text-decoration-none hover-primary">Browse Catalog</Link></li>
                  <li><Link to="/my-courses" className="text-on-surface-variant text-decoration-none hover-primary">Certificates</Link></li>
                  <li><Link to="/dashboard" className="text-on-surface-variant text-decoration-none hover-primary">Student Dashboard</Link></li>
                  <li><Link to="/cart" className="text-on-surface-variant text-decoration-none hover-primary">Shopping Cart</Link></li>
                </ul>
              </div>

              {/* Column 2: Pathways */}
              <div className="col-6 col-sm-3">
                <span className="font-label-caps text-on-surface fw-bold d-block mb-3">PATHWAYS</span>
                <ul className="list-unstyled d-flex flex-column gap-2 font-body-sm m-0">
                  <li><Link to="/courses?category=Data+Science" className="text-on-surface-variant text-decoration-none hover-primary">Data Science & AI</Link></li>
                  <li><Link to="/courses?category=Computer+Science" className="text-on-surface-variant text-decoration-none hover-primary">Computer Science</Link></li>
                  <li><Link to="/courses?category=Design" className="text-on-surface-variant text-decoration-none hover-primary">UI/UX & Design</Link></li>
                  <li><Link to="/courses?search=React" className="text-on-surface-variant text-decoration-none hover-primary">Full-Stack Web</Link></li>
                </ul>
              </div>

              {/* Column 3: Portals */}
              <div className="col-6 col-sm-3">
                <span className="font-label-caps text-on-surface fw-bold d-block mb-3">PORTALS</span>
                <ul className="list-unstyled d-flex flex-column gap-2 font-body-sm m-0">
                  <li><Link to="/admin" className="text-on-surface-variant text-decoration-none hover-primary">Admin Control</Link></li>
                  <li><Link to="/profile" className="text-on-surface-variant text-decoration-none hover-primary">User Profile</Link></li>
                </ul>
              </div>

              {/* Column 4: Legal & Support */}
              <div className="col-6 col-sm-3">
                <span className="font-label-caps text-on-surface fw-bold d-block mb-3">LEGAL & HELP</span>
                <ul className="list-unstyled d-flex flex-column gap-2 font-body-sm m-0">
                  <li><Link to="/about" className="text-on-surface-variant text-decoration-none hover-primary">About Us</Link></li>
                  <li><Link to="/contact" className="text-on-surface-variant text-decoration-none hover-primary">Contact Support</Link></li>
                  <li><a href="#" onClick={(e) => e.preventDefault()} className="text-on-surface-variant text-decoration-none hover-primary">Privacy Policy</a></li>
                  <li><a href="#" onClick={(e) => e.preventDefault()} className="text-on-surface-variant text-decoration-none hover-primary">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back To Top */}
        <div className="pt-4 border-top border-outline-variant/30 d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          <p className="font-body-sm text-on-surface-variant text-center text-md-start m-0">
            © 2026 LearnHub Global Education Inc. All rights reserved. Created with ❤️ by <span className="fw-bold text-on-surface">Vishv Bhikadiya, Meera Dolasiya & Jash Jiyani</span>.
          </p>

          <button
            onClick={scrollToTop}
            className="btn btn-sm btn-outline-primary rounded-pill font-body-sm px-3 py-1.5 d-flex align-items-center gap-1"
          >
            <span>Back to top</span>
            <span className="material-symbols-outlined fs-6">arrow_upward</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
