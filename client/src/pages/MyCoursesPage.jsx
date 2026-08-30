import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CertificateModal from '../components/CertificateModal';
import CourseQuizModal from '../components/CourseQuizModal';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function MyCoursesPage() {
  const { user, isAdmin, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [enrolledCoursesData, setEnrolledCoursesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Certificate & Quiz Modal States
  const [selectedCertCourse, setSelectedCertCourse] = useState(null);
  const [selectedQuizCourse, setSelectedQuizCourse] = useState(null);


  useEffect(() => {
    fetchEnrolledCoursesWithProgress();
  }, []);

  const fetchEnrolledCoursesWithProgress = async () => {
    setLoading(true);
    try {
      // Refresh current user info to get latest enrolledCourses list
      let currentUser = user;
      try {
        const meRes = await api.get('/auth/me');
        if (meRes.data) {
          currentUser = meRes.data;
        }
      } catch (e) {
        // Fallback to auth context user
      }

      const enrolledIds = currentUser?.enrolledCourses || [];

      // Fetch all courses
      const res = await api.get('/courses');
      const allCourses = res.data || [];

      // Strictly filter to ONLY courses the student has actually enrolled in
      const studentCourses = allCourses.filter((c) => enrolledIds.includes(c.id) || enrolledIds.includes(c._id));

      // Fetch live progress for each enrolled course
      const coursesWithProgress = await Promise.all(
        studentCourses.map(async (crs) => {
          try {
            const courseId = crs.id || crs._id;
            const progRes = await api.get(`/progress/${courseId}`);
            const serverProg = progRes.data || {};
            const completedCount = serverProg.completedLessons?.length || 0;
            const totalLessonsCount = crs.modules?.reduce((sum, m) => sum + (m.lessons?.length || 0), 0) || Math.max(completedCount, 1);
            const calcPercentage = Math.min(100, Math.round((completedCount / totalLessonsCount) * 100));

            const isCertUnlocked = Boolean(serverProg.certificateEarned || serverProg.quizPassed || (serverProg.percentage >= 100) || calcPercentage >= 100);
            const finalPercentage = isCertUnlocked ? 100 : Math.max(serverProg.percentage || 0, calcPercentage);

            return {
              ...crs,
              progressPercentage: finalPercentage,
              completedCount,
              totalLessonsCount,
              quizPassed: Boolean(serverProg.quizPassed || isCertUnlocked),
              quizScore: serverProg.quizScore || (isCertUnlocked ? 100 : 0),
              isCompleted: isCertUnlocked,
            };
          } catch (err) {
            return {
              ...crs,
              progressPercentage: 0,
              completedCount: 0,
              totalLessonsCount: crs.modules?.reduce((sum, m) => sum + (m.lessons?.length || 0), 0) || 1,
              quizPassed: false,
              quizScore: 0,
              isCompleted: false,
            };
          }
        })
      );


      setEnrolledCoursesData(coursesWithProgress);
    } catch (err) {
      console.error('Failed to fetch enrolled courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizSuccess = (finalScore) => {
    fetchEnrolledCoursesWithProgress();
    if (selectedQuizCourse) {
      setSelectedCertCourse(selectedQuizCourse);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-surface">
      <Navbar />

      <main className="flex-grow-1 max-w-container-max mx-auto px-3 px-md-5 py-4 py-md-5 w-100">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
          <div>
            <span className="font-label-caps text-primary fw-bold">YOUR ENROLLED LEARNING DASHBOARD</span>
            <h1 className="font-headline-md text-on-surface m-0 fw-bold fs-2">My Enrolled Courses ({enrolledCoursesData.length})</h1>
          </div>
          <div className="d-flex gap-2">
            {isAdmin && (
              <button onClick={() => navigate('/admin/courses')} className="btn btn-primary font-body-sm px-4 py-2 rounded-3 shadow-sm d-flex align-items-center gap-2">
                <span className="material-symbols-outlined fs-5">add_circle</span> Manage Platform Courses (Admin)
              </button>
            )}
            <button onClick={() => navigate('/courses')} className="btn btn-outline-primary font-body-sm px-4 py-2 rounded-3">
              Explore Catalog & Enroll
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading enrolled courses...</span>
            </div>
          </div>
        ) : enrolledCoursesData.length === 0 ? (
          <div className="bg-white rounded-4 border border-outline-variant/30 p-5 text-center shadow-sm">
            <span className="material-symbols-outlined fs-1 text-outline mb-2">school</span>
            <h3 className="font-headline-md fw-bold mb-2">No Enrolled Courses Yet</h3>
            <p className="font-body-base text-on-surface-variant max-w-md mx-auto mb-4">
              Browse our course catalog to find your desired course and click "Enroll Now" to start learning!
            </p>
            <button onClick={() => navigate('/courses')} className="btn btn-primary font-body-base px-5 py-2.5 rounded-3 shadow-sm">
              Browse Course Catalog & Enroll
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {enrolledCoursesData.map((crs) => (
              <div key={crs.id || crs._id} className="col-12 col-md-6 col-lg-4">
                <div className="bg-white rounded-4 border border-outline-variant/30 overflow-hidden shadow-sm h-100 d-flex flex-column transition-hover">
                  <div className="position-relative">
                    <img src={crs.thumbnail} alt={crs.title} className="w-100 object-fit-cover" style={{ height: '180px' }} />
                    {crs.isCompleted && (
                      <span className="badge bg-warning text-dark font-label-caps position-absolute top-0 end-0 m-3 px-3 py-1.5 shadow-sm fw-bold d-flex align-items-center gap-1">
                        <span className="material-symbols-outlined fs-6 fill">workspace_premium</span> CERTIFIED
                      </span>
                    )}
                  </div>

                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <span className="font-label-caps text-secondary mb-1">{crs.category}</span>
                    <h3 className="font-body-base fw-bold text-on-surface mb-2">{crs.title}</h3>
                    <p className="font-body-sm text-on-surface-variant mb-3 line-clamp-2">{crs.subtitle || crs.description}</p>

                    <div className="mt-auto pt-3 border-top border-outline-variant/20">
                      <div className="d-flex align-items-center justify-content-between font-label-caps mb-1">
                        <span className="text-on-surface-variant">Course Progress</span>
                        <span className={`fw-bold ${crs.isCompleted ? 'text-success' : 'text-primary'}`}>
                          {crs.progressPercentage}% Complete
                        </span>
                      </div>

                      {/* Dynamic Progress Bar */}
                      <div className="w-100 bg-surface-container rounded-pill mb-3" style={{ height: '8px' }}>
                        <div
                          className={`rounded-pill h-100 transition-all ${crs.isCompleted ? 'bg-success' : 'bg-primary'}`}
                          style={{ width: `${crs.progressPercentage}%` }}
                        ></div>
                      </div>

                      <div className="d-flex flex-column gap-2">
                        <div className="d-flex gap-2">
                          <button
                            onClick={() => navigate(`/course/${crs.id || crs._id}/learn`)}
                            className="btn btn-primary flex-grow-1 font-body-sm py-2 rounded-3 d-flex align-items-center justify-content-center gap-2"
                          >
                            <span>{crs.progressPercentage === 0 ? 'Start Learning' : 'Continue Learning'}</span>
                            <span className="material-symbols-outlined fs-6">play_arrow</span>
                          </button>

                          {crs.isCompleted && (
                            <button
                              onClick={() => setSelectedCertCourse(crs)}
                              className="btn btn-warning font-body-sm px-3 rounded-3 d-flex align-items-center justify-content-center shadow-xs"
                              title="View & Print Official Certificate"
                            >
                              <span className="material-symbols-outlined fs-5 fill text-dark">workspace_premium</span>
                            </button>
                          )}
                        </div>

                        {/* Quiz Trigger Button */}
                        <button
                          onClick={() => setSelectedQuizCourse(crs)}
                          className={`btn btn-sm font-body-sm py-1.5 rounded-3 d-flex align-items-center justify-content-center gap-1.5 ${
                            crs.quizPassed
                              ? 'btn-outline-success text-success fw-semibold'
                              : 'btn-outline-primary text-primary fw-semibold'
                          }`}
                        >
                          <span className="material-symbols-outlined fs-6 fill">
                            {crs.quizPassed ? 'verified' : 'quiz'}
                          </span>
                          <span>{crs.quizPassed ? `Quiz Passed (${crs.quizScore || 100}%) ✅` : 'Take Course Quiz & Get Certificate'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Quiz Modal */}
      {selectedQuizCourse && (
        <CourseQuizModal
          course={selectedQuizCourse}
          user={user}
          onClose={() => setSelectedQuizCourse(null)}
          onQuizPassed={(score) => handleQuizSuccess(score)}
        />
      )}

      {/* Certificate Modal */}
      {selectedCertCourse && (
        <CertificateModal
          studentName={user?.name}
          courseTitle={selectedCertCourse.title}
          course={selectedCertCourse}
          user={user}
          onClose={() => setSelectedCertCourse(null)}
        />
      )}

      <Footer />
    </div>
  );
}
