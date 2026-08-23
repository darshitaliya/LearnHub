import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function CourseCard({ course, onEnrollClick }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const courseId = course?.id || course?._id;
  const isEnrolled = user?.enrolledCourses?.includes(courseId);

  const handleEnrollBtn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    if (isEnrolled) {
      navigate(`/course/${courseId}/learn`);
    } else if (onEnrollClick) {
      onEnrollClick(course);
    }
  };

  const techStack = course?.techStack || ['Python', 'React', 'Node.js'];

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-4 shadow-sm overflow-hidden h-100 d-flex flex-column hover-elevation transition-all">
      {/* Thumbnail */}
      <div className="w-100 position-relative overflow-hidden" style={{ height: '200px' }}>
        <img
          src={course?.thumbnail || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80'}
          alt={course?.title}
          className="w-100 h-100 object-fit-cover transition-all"
        />
      </div>

      <div className="p-4 d-flex flex-column flex-grow-1">
        {/* Category & Level Badges */}
        <div className="d-flex align-items-center justify-content-between mb-2">
          <div className="d-flex align-items-center gap-2">
            <span className="font-label-caps text-secondary bg-secondary-container/30 px-2.5 py-1 rounded-pill fw-semibold" style={{ fontSize: '11px' }}>
              {course?.level || 'Advanced'}
            </span>
            <span className="font-label-caps text-primary bg-primary-container/20 px-2.5 py-1 rounded-pill fw-semibold" style={{ fontSize: '11px' }}>
              {course?.category}
            </span>
          </div>

          <div className="d-flex align-items-center gap-1 text-tertiary-fixed-dim">
            <span className="material-symbols-outlined fs-6 fill">star</span>
            <span className="font-body-sm fw-bold text-on-surface">{course?.rating || 4.9}</span>
            <span className="font-body-sm text-on-surface-variant">({(course?.reviewsCount || 150).toLocaleString()})</span>
          </div>
        </div>

        {/* Title */}
        <Link to={`/course/${courseId}`} className="text-decoration-none my-1">
          <h3 className="font-body-base fw-bold text-on-surface hover-primary fs-5 m-0" style={{ lineHeight: '1.4' }}>
            {course?.title}
          </h3>
        </Link>

        {/* Subtitle */}
        <p className="font-body-sm text-on-surface-variant mt-2 mb-3" style={{ fontSize: '13px', lineHeight: '1.5' }}>
          {course?.subtitle || course?.description}
        </p>

        {/* Tech Stack */}
        <div className="d-flex flex-wrap gap-1.5 mb-3">
          {techStack.map((tech, idx) => (
            <span key={idx} className="badge bg-surface-container text-primary font-label-caps px-2.5 py-1 border border-outline-variant/30 fw-medium" style={{ fontSize: '10px' }}>
              {tech}
            </span>
          ))}
        </div>

        {/* Bottom Price & Button Row */}
        <div className="mt-auto pt-3 border-top border-outline-variant/20 d-flex align-items-center justify-content-between">
          <span className="badge bg-success-container text-success font-label-caps px-3 py-1.5 rounded-pill fw-bold fs-6">
            FREE
          </span>

          <button
            onClick={handleEnrollBtn}
            className={`btn ${isEnrolled ? 'btn-success' : 'btn-primary'} font-body-sm px-3.5 py-2 rounded-3 d-flex align-items-center gap-1 shadow-xs text-nowrap`}
          >
            <span className="whitespace-nowrap">{isEnrolled ? 'Go to Course' : 'Enroll Now'}</span>
            <span className="material-symbols-outlined fs-6">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
