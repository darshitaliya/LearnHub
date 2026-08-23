import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function NotFoundPage() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-surface">
      <Navbar />

      <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center p-5">
        <h1 className="font-display-lg text-primary fw-bold mb-2" style={{ fontSize: '80px' }}>404</h1>
        <h2 className="font-headline-md fw-bold mb-3">Page Not Found</h2>
        <p className="font-body-base text-on-surface-variant max-w-md mb-4">
          The requested page could not be found or has been moved to a new route.
        </p>
        <Link to="/" className="btn btn-primary font-body-base px-4 py-3 rounded-3">
          Return to Home Page
        </Link>
      </main>

      <Footer />
    </div>
  );
}
