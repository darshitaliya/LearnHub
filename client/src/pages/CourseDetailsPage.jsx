import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EnrollmentFormModal from '../components/EnrollmentFormModal';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function CourseDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('curriculum');
  const [openModules, setOpenModules] = useState({});
  const [showEnrollModal, setShowEnrollModal] = useState(false);

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  const fetchCourseDetails = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/courses/${id}`);
      setCourse(res.data);
      if (res.data?.modules) {
        const initial = {};
        res.data.modules.forEach((mod, idx) => {
          initial[mod.id || idx] = idx === 0;
        });
        setOpenModules(initial);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleModule = (modId) => {
    setOpenModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const courseId = course?.id || course?._id;
  const isEnrolled = user?.enrolledCourses?.includes(courseId);

  const handleEnrollOrStart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (isEnrolled) {
      navigate(`/course/${courseId}/learn`);
    } else {
      setShowEnrollModal(true);
    }
  };

  if (loading) {
    return (
      <div className="d-flex flex-column min-vh-100 bg-surface">
        <Navbar />
        <div className="flex-grow-1 d-flex align-items-center justify-content-center">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="d-flex flex-column min-vh-100 bg-surface">
        <Navbar />
        <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center p-5">
          <h2 className="font-headline-md text-on-surface mb-3">Course Not Found</h2>
          <button onClick={() => navigate('/courses')} className="btn btn-primary font-body-base px-4 py-2 rounded-3">
            Browse Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-surface">
      <Navbar />

      <main className="flex-grow-1 w-100 max-w-container-max mx-auto px-3 px-md-5 py-4 py-md-5">
        {/* Hero Section */}
        <section className="row g-4 mb-5 align-items-center">
          <div className="col-12 col-lg-7">
            <div
              className="position-relative rounded-4 overflow-hidden shadow-sm bg-surface-container-high border border-outline-variant/20 d-flex align-items-center justify-content-center cursor-pointer"
              style={{ aspectRatio: '16/9' }}
              onClick={handleEnrollOrStart}
            >
              <img
                className="position-absolute w-100 h-100 object-fit-cover opacity-80"
                src={course.thumbnail || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc_P4bDonDSVnHhQab5Iw5rgqL2FAg1YI9MYUOdkuuHogQ9yokQeqxsakBi3ghU_SkEsswrJXOsiDE0eephEXqbAPWnwm-HVr-n6KQl44LkfqSd0bw3cqp4f73eaOQj9iNCV5879MGfNdPVgSr_qD-Q9Yuj3b52KGmh_y1v4y143OHehRzZtU9dd2EDtWwqYsl9Qh-wtSI3bXsIe2_iu4OXD6vJMxsjiFaaJhgln9n9TkKdJRzDPIW'}
                alt={course.title}
              />
              <div
                className="position-relative z-1 rounded-circle bg-primary text-white d-flex align-items-center justify-content-center shadow-lg"
                style={{ width: '70px', height: '70px', backgroundColor: 'rgba(53, 37, 205, 0.9)' }}
              >
                <span className="material-symbols-outlined fs-2 fill">play_arrow</span>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-5 d-flex flex-column gap-3">
            <div className="d-flex align-items-center gap-2">
              <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-pill font-label-caps">
                {course.level}
              </span>
              <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-pill font-label-caps">
                {course.category}
              </span>
            </div>

            <h1 className="font-display-lg text-on-surface m-0" style={{ fontSize: 'calc(1.6rem + 1.2vw)' }}>
              {course.title}
            </h1>

            <p className="font-body-base text-on-surface-variant m-0">{course.subtitle || course.description}</p>

            <div className="d-flex align-items-center gap-3">
              <div className="d-flex text-tertiary-fixed-dim">
                <span className="material-symbols-outlined fs-5 fill">star</span>
                <span className="material-symbols-outlined fs-5 fill">star</span>
                <span className="material-symbols-outlined fs-5 fill">star</span>
                <span className="material-symbols-outlined fs-5 fill">star</span>
                <span className="material-symbols-outlined fs-5">star_half</span>
              </div>
              <span className="font-body-sm text-on-surface fw-bold">{course.rating || 4.8}</span>
              <span className="font-body-sm text-on-surface-variant text-decoration-underline">({(course.reviewsCount || 12000).toLocaleString()} reviews)</span>
            </div>

            <div className="d-flex flex-wrap align-items-center gap-4 text-on-surface-variant font-body-sm pt-2">
              <div className="d-flex align-items-center gap-1">
                <span className="material-symbols-outlined fs-5">schedule</span>
                <span>{course.hours || 48} Hours</span>
              </div>
              <div className="d-flex align-items-center gap-1">
                <span className="material-symbols-outlined fs-5">ondemand_video</span>
                <span>{course.lessonsCount || 120} Lessons</span>
              </div>
              <div className="d-flex align-items-center gap-1">
                <span className="material-symbols-outlined fs-5">language</span>
                <span>{course.languages ? course.languages.join(', ') : 'English'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Grid */}
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div className="border-bottom border-outline-variant d-flex overflow-x-auto hide-scrollbar mb-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={`btn rounded-0 border-0 px-4 py-3 font-body-base font-medium whitespace-nowrap ${
                  activeTab === 'overview' ? 'text-primary border-bottom border-2 border-primary' : 'text-on-surface-variant'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('curriculum')}
                className={`btn rounded-0 border-0 px-4 py-3 font-body-base font-medium whitespace-nowrap ${
                  activeTab === 'curriculum' ? 'text-primary border-bottom border-2 border-primary' : 'text-on-surface-variant'
                }`}
              >
                Curriculum
              </button>
            </div>

            {/* Tab: Curriculum Accordion */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-4 shadow-sm p-4">
              <h2 className="font-headline-md text-on-surface mb-4">Course Curriculum</h2>

              <div className="d-flex flex-column gap-3">
                {course.modules && course.modules.map((module, idx) => (
                  <div key={module.id || idx} className={`accordion-item border border-outline-variant/30 rounded-3 overflow-hidden bg-surface-bright ${openModules[module.id] ? 'active' : ''}`}>
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-100 d-flex align-items-center justify-content-between p-3 bg-surface-container-low border-0 text-start cursor-pointer"
                    >
                      <div className="d-flex align-items-center gap-3">
                        <span className="font-label-caps text-on-surface-variant" style={{ width: '80px' }}>MODULE {idx + 1}</span>
                        <span className="font-body-base fw-semibold text-on-surface">{module.title}</span>
                      </div>
                      <div className="d-flex align-items-center gap-3 text-on-surface-variant">
                        <span className="font-body-sm d-none d-md-inline">{module.lessons ? module.lessons.length : 0} Lessons</span>
                        <span className="material-symbols-outlined accordion-icon">expand_more</span>
                      </div>
                    </button>

                    {openModules[module.id] && (
                      <div className="accordion-content border-top border-outline-variant/20 p-0">
                        <ul className="list-group list-group-flush m-0">
                          {module.lessons && module.lessons.map((les) => (
                            <li
                              key={les.id}
                              onClick={handleEnrollOrStart}
                              className="list-group-item d-flex align-items-center justify-content-between p-3 bg-transparent border-bottom border-outline-variant/20 hover-bg-low cursor-pointer"
                            >
                              <div className="d-flex align-items-center gap-3">
                                <span className={`material-symbols-outlined ${les.type === 'video' ? 'text-primary fill' : 'text-secondary'}`}>
                                  {les.type === 'video' ? 'play_circle' : 'description'}
                                </span>
                                <span className="font-body-sm text-on-surface hover-primary">{les.title}</span>
                              </div>
                              <span className="font-body-sm text-on-surface-variant">{les.duration}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sticky Sidebar */}
          <div className="col-12 col-lg-4">
            <div className="sticky-top" style={{ top: '90px', zIndex: 2 }}>
              <div className="bg-surface-container-lowest rounded-4 shadow-sm border border-outline-variant/20 p-4 d-flex flex-column gap-4 mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex flex-column">
                    <span className="font-label-caps text-primary mb-1">Full Course Access</span>
                    <span className="font-display-lg-mobile text-success fw-bold fs-2">FREE</span>
                  </div>
                  <span className="badge bg-success-container text-success font-label-caps px-3 py-1.5 rounded-pill fw-bold">100% FREE</span>
                </div>

                <button
                  onClick={handleEnrollOrStart}
                  className="btn btn-primary w-100 font-headline-md py-3 rounded-3 d-flex align-items-center justify-content-center gap-2"
                >
                  <span>{isEnrolled ? 'Go to Course Player' : 'Enroll Now'}</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>

                <div className="pt-3 border-top border-outline-variant/20">
                  <p className="font-label-caps text-on-surface-variant mb-3">THIS COURSE INCLUDES:</p>
                  <ul className="list-unstyled d-flex flex-column gap-2 m-0">
                    {course.includes && course.includes.map((inc, i) => (
                      <li key={i} className="d-flex align-items-start gap-2">
                        <span className="material-symbols-outlined text-secondary fs-6 mt-1">check_circle</span>
                        <span className="font-body-sm text-on-surface">{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Instructor Card */}
              <div className="bg-surface-container-low rounded-4 border border-outline-variant/20 p-4">
                <p className="font-label-caps text-on-surface-variant mb-3">LEAD INSTRUCTOR</p>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <img
                    className="rounded-circle object-fit-cover border border-2 border-white"
                    style={{ width: '60px', height: '60px' }}
                    src={course.instructorAvatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXsLFd9D54QvHC0YzVKgLxHnnpERLlfdgwtLORSSs-tNRp-QmFZO2N6hDlOwY4x1YQPu2xppRb0y7Znoil2TshKCTUkd0a-yYGk5Su4MWRVe3T_a9Ip01U3Ouw28n9nEcUzBOnvUSpbLqrQhL2mobnRZyxz1nmOj7wHnAyCbza00LARkU3ve07zwoM3KCRp_eschNgIu0MYW1mNjmkarjPPMHEd9LoEG2l2hK4csZx1DvTbpTJqdf4'}
                    alt={course.instructorName}
                  />
                  <div>
                    <h3 className="font-headline-md text-on-surface fs-5 m-0 fw-bold">{course.instructorName}</h3>
                    <p className="font-body-sm text-on-surface-variant m-0">{course.instructorRole}</p>
                  </div>
                </div>
                <p className="font-body-sm text-on-surface-variant m-0">{course.instructorBio}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showEnrollModal && (
        <EnrollmentFormModal
          course={course}
          user={user}
          onClose={() => setShowEnrollModal(false)}
          onSuccess={() => {
            if (refreshUser) refreshUser();
          }}
        />
      )}

      <Footer />
    </div>
  );
}
