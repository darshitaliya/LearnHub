import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function EnrollmentFormModal({ course, user, onClose, onSuccess }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    profession: 'Student',
    goal: 'Skill Upgrade & Professional Certification',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [enrolledSuccess, setEnrolledSuccess] = useState(false);
  const [createdEnrollment, setCreatedEnrollment] = useState(null);

  if (!course) return null;

  const courseId = course.id || course._id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please fill in your full name and email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post(`/courses/${courseId}/enroll`, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        profession: formData.profession,
        goal: formData.goal,
      });

      setCreatedEnrollment(res.data?.enrollment);
      setEnrolledSuccess(true);
      if (onSuccess) onSuccess(res.data);
    } catch (err) {
      console.error('Enrollment failed:', err);
      setError(err.response?.data?.error || 'Failed to submit enrollment application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal show d-block"
      style={{
        backgroundColor: 'rgba(11, 28, 48, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 1050,
      }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden" style={{ background: '#f8f9ff' }}>
          
          {/* Header */}
          <div className="modal-header border-0 bg-primary text-white p-4">
            <h5 className="modal-title font-headline-md fw-bold d-flex align-items-center gap-2 m-0 fs-5">
              <span className="material-symbols-outlined fill">school</span>
              {enrolledSuccess ? 'Enrollment Confirmed' : 'Course Enrollment Registration'}
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body p-4 p-md-5">
            {!enrolledSuccess ? (
              /* State 1: Form View */
              <div>
                {/* Course Banner */}
                <div className="d-flex align-items-center gap-3 p-3 rounded-3 bg-white border border-outline-variant/30 shadow-xs mb-4">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="rounded-2 object-fit-cover flex-shrink-0"
                    style={{ width: '90px', height: '65px' }}
                  />
                  <div>
                    <span className="font-label-caps text-primary fw-bold" style={{ fontSize: '10px' }}>
                      {course.category || 'Computer Science'}
                    </span>
                    <h4 className="font-body-base fw-bold text-on-surface mb-1 fs-6">{course.title}</h4>
                    <span className="badge bg-success-container text-success font-label-caps" style={{ fontSize: '10px' }}>
                      100% FREE ENROLLMENT
                    </span>
                  </div>
                </div>

                {error && <div className="alert alert-danger font-body-sm rounded-3 mb-3">{error}</div>}

                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="font-label-caps text-on-surface-variant mb-1" htmlFor="enroll-name">
                        Full Name *
                      </label>
                      <input
                        id="enroll-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="form-control input-premium py-2.5 px-3 rounded-3 font-body-base"
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="font-label-caps text-on-surface-variant mb-1" htmlFor="enroll-email">
                        Email Address *
                      </label>
                      <input
                        id="enroll-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@example.com"
                        className="form-control input-premium py-2.5 px-3 rounded-3 font-body-base"
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="font-label-caps text-on-surface-variant mb-1" htmlFor="enroll-phone">
                        Phone Number
                      </label>
                      <input
                        id="enroll-phone"
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="form-control input-premium py-2.5 px-3 rounded-3 font-body-base"
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="font-label-caps text-on-surface-variant mb-1" htmlFor="enroll-profession">
                        Current Role / Profession
                      </label>
                      <select
                        id="enroll-profession"
                        value={formData.profession}
                        onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                        className="form-select input-premium py-2.5 px-3 rounded-3 font-body-base"
                      >
                        <option value="Student">University / High School Student</option>
                        <option value="Software Developer">Software Engineer / Developer</option>
                        <option value="Data Analyst">Data Analyst / Scientist</option>
                        <option value="Freelancer">Freelancer / Consultant</option>
                        <option value="Job Seeker">Job Seeker / Transitioning Career</option>
                        <option value="Other">Other Profession</option>
                      </select>
                    </div>

                    <div className="col-12">
                      <label className="font-label-caps text-on-surface-variant mb-1" htmlFor="enroll-goal">
                        Primary Learning Goal
                      </label>
                      <select
                        id="enroll-goal"
                        value={formData.goal}
                        onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                        className="form-select input-premium py-2.5 px-3 rounded-3 font-body-base"
                      >
                        <option value="Skill Upgrade & Professional Certification">Skill Upgrade & Professional Certification</option>
                        <option value="Career Transition to Tech Industry">Career Transition to Tech Industry</option>
                        <option value="Academic Course Requirement">Academic Course Requirement</option>
                        <option value="Personal Interest & Passion Project">Personal Interest & Passion Project</option>
                      </select>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top border-outline-variant/20">
                    <button type="button" onClick={onClose} className="btn btn-outline-secondary font-body-sm px-4 rounded-3">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary font-body-sm px-4 py-2.5 rounded-3 d-flex align-items-center gap-2 shadow-sm"
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-1" role="status"></span>
                          Submitting Registration...
                        </>
                      ) : (
                        <>
                          <span>Confirm Enrollment & Submit</span>
                          <span className="material-symbols-outlined fs-5">arrow_forward</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* State 2: Success Pop-up Screen */
              <div className="text-center py-3">
                <div
                  className="rounded-circle bg-success text-white mx-auto d-flex align-items-center justify-content-center shadow-md mb-3"
                  style={{ width: '64px', height: '64px' }}
                >
                  <span className="material-symbols-outlined fs-1 fill">check_circle</span>
                </div>

                <span className="font-label-caps text-success fw-bold d-block mb-1 tracking-wider" style={{ fontSize: '11px' }}>
                  ENROLLED SUCCESSFULLY!
                </span>

                <h2 className="font-headline-md text-on-surface fw-bold mb-2">
                  Congratulations, {formData.name}!
                </h2>

                <p className="font-body-base text-on-surface-variant max-w-md mx-auto mb-4" style={{ fontSize: '14px' }}>
                  You have successfully enrolled in <strong>"{course.title}"</strong>. Your application has been registered in the database store.
                </p>

                {/* Enrollment Summary Card */}
                <div className="bg-white rounded-3 border border-outline-variant/30 p-3 max-w-md mx-auto text-start shadow-xs mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom border-outline-variant/20">
                    <span className="font-label-caps text-on-surface-variant">Registration Status</span>
                    <span className="badge bg-success text-white font-label-caps">ACTIVE ENROLLED</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="font-body-sm text-on-surface-variant">Registered Email:</span>
                    <span className="font-body-sm fw-bold text-on-surface">{formData.email}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="font-body-sm text-on-surface-variant">Initial Progress:</span>
                    <span className="font-body-sm fw-bold text-primary">0% (Ready to start)</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="font-body-sm text-on-surface-variant">Registration ID:</span>
                    <span className="font-body-sm fw-mono text-secondary">{createdEnrollment?.id || `ENR-${Date.now().toString().slice(-6)}`}</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      navigate(`/course/${courseId}/learn`);
                    }}
                    className="btn btn-primary font-body-base px-4 py-2.5 rounded-3 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                  >
                    <span>Start Learning Now</span>
                    <span className="material-symbols-outlined fs-5">play_arrow</span>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      navigate('/my-courses');
                    }}
                    className="btn btn-outline-primary font-body-base px-4 py-2.5 rounded-3"
                  >
                    Go to My Courses
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
