import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CertificateModal from '../components/CertificateModal';
import CourseQuizModal from '../components/CourseQuizModal';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { getLocalProgress, resolveMergedProgress } from '../utils/progressStorage';

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

      // Fetch live progress for each enrolled course with 2-layer sync
      const coursesWithProgress = await Promise.all(
        studentCourses.map(async (crs) => {
          const courseId = crs.id || crs._id;
          const totalLessonsCount = crs.modules?.reduce((sum, m) => sum + (m.lessons?.length || 0), 0) || 4;
          const localData = getLocalProgress(currentUser?.id || currentUser?._id, courseId);

          try {
            const progRes = await api.get(`/progress/${courseId}`);
            const merged = resolveMergedProgress(progRes.data, localData, totalLessonsCount);

            return {
              ...crs,
              progressPercentage: merged.percentage,
              completedCount: merged.completedCount,
              totalLessonsCount: merged.totalLessonsCount,
              isModulesCompleted: merged.isModulesCompleted,
              isQuizUnlocked: merged.isQuizUnlocked,
              quizPassed: merged.quizPassed,
              quizScore: merged.quizScore,
              isCompleted: merged.certificateEarned,
            };
          } catch (err) {
            const merged = resolveMergedProgress(null, localData, totalLessonsCount);
            return {
              ...crs,
              progressPercentage: merged.percentage,
              completedCount: merged.completedCount,
              totalLessonsCount: merged.totalLessonsCount,
              isModulesCompleted: merged.isModulesCompleted,
              isQuizUnlocked: merged.isQuizUnlocked,
              quizPassed: merged.quizPassed,
              quizScore: merged.quizScore,
              isCompleted: merged.certificateEarned,
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

      <main className="flex-grow-1 max-w-container-max mx-auto px-3 px-md-5 py-4 py-md-5 w-100" style={{ marginTop: '70px' }}>
        {/* Header Title & Navigation Bar */}
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4 pb-3 border-bottom border-outline-variant/20">
          <div>
            <span className="font-label-caps text-primary">YOUR ENROLLED LEARNING</span>
            <h1 className="font-headline-md text-on-surface m-0 fw-bold fs-2">
              My Enrolled Courses ({enrolledCoursesData.length})
            </h1>
          </div>



          <div className="d-flex align-items-center gap-2">
            <button
              onClick={() => navigate('/courses')}
              className="btn btn-outline-primary font-body-sm px-3 py-2 rounded-3 d-flex align-items-center gap-1 shadow-xs"
            >
              <span className="material-symbols-outlined fs-5">search</span>
              <span>Browse Catalog</span>
            </button>
            <button
              onClick={() => navigate('/dashboard/student')}
              className="btn btn-primary font-body-sm px-3 py-2 rounded-3 d-flex align-items-center gap-1 shadow-xs"
            >
              <span className="material-symbols-outlined fs-5">dashboard</span>
              <span>Student Dashboard</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        {loading ? (
          <div className="d-flex flex-column align-items-center justify-content-center py-5">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="font-body-sm text-on-surface-variant">Loading your enrolled courses & verified progress...</p>
          </div>
        ) : enrolledCoursesData.length === 0 ? (
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-4 p-5 text-center shadow-sm">
            <div className="rounded-circle bg-primary-container text-primary d-inline-flex p-3 mb-3">
              <span className="material-symbols-outlined fs-1">school</span>
            </div>
            <h3 className="font-headline-md text-on-surface fw-bold mb-2">No Enrolled Courses Found</h3>
            <p className="font-body-base text-on-surface-variant max-w-md mx-auto mb-4">
              Explore our wide variety of industry-leading courses and start learning today.
            </p>
            <button onClick={() => navigate('/courses')} className="btn btn-primary font-body-sm px-4 py-2.5 rounded-3">
              Browse Available Courses
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {enrolledCoursesData.map((crs) => (
              <div key={crs.id || crs._id} className="col-12 col-md-6 col-lg-4">
                <div className="bg-white rounded-4 border border-outline-variant/30 overflow-hidden shadow-sm h-100 d-flex flex-column transition-hover">
                  <div className="position-relative">
                    <img src={crs.thumbnail} alt={crs.title} className="w-100 object-fit-cover" style={{ height: '180px' }} />
                    {crs.isCompleted ? (
                      <span className="badge bg-warning text-dark font-label-caps position-absolute top-0 end-0 m-3 px-3 py-1.5 shadow-sm fw-bold d-flex align-items-center gap-1">
                        <span className="material-symbols-outlined fs-6 fill">workspace_premium</span> CERTIFIED 🏆
                      </span>
                    ) : crs.isModulesCompleted ? (
                      <span className="badge bg-success text-white font-label-caps position-absolute top-0 end-0 m-3 px-3 py-1.5 shadow-sm fw-bold d-flex align-items-center gap-1">
                        <span className="material-symbols-outlined fs-6 fill">quiz</span> QUIZ UNLOCKED
                      </span>
                    ) : null}
                  </div>

                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <span className="font-label-caps text-secondary mb-1">{crs.category}</span>
                    <h3 className="font-body-base fw-bold text-on-surface mb-2">{crs.title}</h3>
                    <p className="font-body-sm text-on-surface-variant mb-3 line-clamp-2">{crs.subtitle || crs.description}</p>

                    <div className="mt-auto pt-3 border-top border-outline-variant/20">
                      {/* Step Progress Tracker Indicator */}
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="d-flex align-items-center gap-1.5 font-label-caps" style={{ fontSize: '11px' }}>
                          <span className={`badge ${crs.isModulesCompleted ? 'bg-success' : 'bg-primary'} text-white rounded-pill px-2 py-0.5`}>
                            1. Modules: {crs.progressPercentage}%
                          </span>
                          <span className={`badge ${crs.quizPassed ? 'bg-success' : crs.isQuizUnlocked ? 'bg-warning text-dark' : 'bg-light text-muted'} rounded-pill px-2 py-0.5`}>
                            2. Quiz {crs.quizPassed ? '✅' : crs.isQuizUnlocked ? '🔓' : '🔒'}
                          </span>
                          <span className={`badge ${crs.isCompleted ? 'bg-warning text-dark' : 'bg-light text-muted'} rounded-pill px-2 py-0.5`}>
                            3. Cert {crs.isCompleted ? '🏆' : '🔒'}
                          </span>
                        </div>
                      </div>

                      {/* Dynamic Progress Bar */}
                      <div className="w-100 bg-surface-container rounded-pill mb-3" style={{ height: '8px' }}>
                        <div
                          className={`rounded-pill h-100 transition-all ${crs.isCompleted ? 'bg-warning' : crs.isModulesCompleted ? 'bg-success' : 'bg-primary'}`}
                          style={{ width: `${crs.progressPercentage}%` }}
                        ></div>
                      </div>

                      <div className="d-flex flex-column gap-2">
                        {/* Step 1: Learning Button */}
                        <div className="d-flex gap-2">
                          <button
                            onClick={() => navigate(`/course/${crs.id || crs._id}/learn`)}
                            className="btn btn-primary flex-grow-1 font-body-sm py-2 rounded-3 d-flex align-items-center justify-content-center gap-2"
                          >
                            <span>{crs.progressPercentage === 0 ? 'Start Learning' : crs.isModulesCompleted ? 'Review Modules' : 'Continue Learning'}</span>
                            <span className="material-symbols-outlined fs-6">play_arrow</span>
                          </button>

                          {/* Step 3: Certificate Button (Unlocked upon Quiz Pass) */}
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

                        {/* Step 2: Sequential Quiz Button */}
                        {crs.isQuizUnlocked ? (
                          <button
                            onClick={() => setSelectedQuizCourse(crs)}
                            className={`btn btn-sm font-body-sm py-2 rounded-3 d-flex align-items-center justify-content-center gap-1.5 ${
                              crs.quizPassed
                                ? 'btn-outline-success text-success fw-bold'
                                : 'btn-warning text-dark fw-bold shadow-xs'
                            }`}
                          >
                            <span className="material-symbols-outlined fs-6 fill">
                              {crs.quizPassed ? 'verified' : 'quiz'}
                            </span>
                            <span>
                              {crs.quizPassed
                                ? `Quiz Passed (${crs.quizScore || 100}%) - Certificate Unlocked! 🏆`
                                : '📝 Take Course Quiz (Unlocked) ➔ Get Certificate'}
                            </span>
                          </button>
                        ) : (
                          <div
                            className="btn btn-sm btn-light text-muted font-body-sm py-2 rounded-3 d-flex align-items-center justify-content-center gap-1.5 border border-outline-variant/30 cursor-not-allowed"
                            style={{ fontSize: '12px' }}
                            title="Complete all course video modules first to unlock the quiz"
                          >
                            <span className="material-symbols-outlined fs-6 text-muted">lock</span>
                            <span>Complete All Modules ({crs.progressPercentage}%) to Unlock Quiz</span>
                          </div>
                        )}
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
