import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

import HomePage from '../pages/HomePage';
import CourseListingPage from '../pages/CourseListingPage';
import CourseDetailsPage from '../pages/CourseDetailsPage';
import VideoPlayerPage from '../pages/VideoPlayerPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import StudentDashboardPage from '../pages/StudentDashboardPage';
import StudentProfilePage from '../pages/StudentProfilePage';
import MyCoursesPage from '../pages/MyCoursesPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import AdminUsersPage from '../pages/AdminUsersPage';
import AdminCoursesPage from '../pages/AdminCoursesPage';
import AdminEnrollmentsPage from '../pages/AdminEnrollmentsPage';
import AdminCategoriesPage from '../pages/AdminCategoriesPage';
import AdminReportsPage from '../pages/AdminReportsPage';
import AdminContactsPage from '../pages/AdminContactsPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import NotFoundPage from '../pages/NotFoundPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/courses" element={<CourseListingPage />} />
      <Route path="/course/:id" element={<CourseDetailsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/cart" element={<CartPage />} />

      {/* Student Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><StudentDashboardPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><StudentProfilePage /></ProtectedRoute>} />
      <Route path="/my-courses" element={<ProtectedRoute><MyCoursesPage /></ProtectedRoute>} />
      <Route path="/course/:id/learn" element={<ProtectedRoute><VideoPlayerPage /></ProtectedRoute>} />
      <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />

      {/* Admin Protected Routes */}
      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboardPage /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute role="admin"><AdminUsersPage /></ProtectedRoute>} />
      <Route path="/admin/courses" element={<ProtectedRoute role="admin"><AdminCoursesPage /></ProtectedRoute>} />
      <Route path="/admin/enrollments" element={<ProtectedRoute role="admin"><AdminEnrollmentsPage /></ProtectedRoute>} />
      <Route path="/admin/contacts" element={<ProtectedRoute role="admin"><AdminContactsPage /></ProtectedRoute>} />
      <Route path="/admin/categories" element={<ProtectedRoute role="admin"><AdminCategoriesPage /></ProtectedRoute>} />
      <Route path="/admin/reports" element={<ProtectedRoute role="admin"><AdminReportsPage /></ProtectedRoute>} />

      {/* 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
