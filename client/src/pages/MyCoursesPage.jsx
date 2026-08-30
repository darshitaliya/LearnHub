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
                      {/* Course Progress Header */}
                      <div className="d-flex align-items-center justify-content-between font-label-caps mb-1">
                        <span className="text-on-surface-variant">COURSE PROGRESS</span>
                        <span className={`fw-bold ${crs.isCompleted ? 'text-success' : 'text-primary'}`}>
                          {crs.progressPercentage}% COMPLETE
                        </span>
                      </div>

                      {/* Clean Progress Bar */}
                      <div className="w-100 bg-surface-container rounded-pill mb-3" style={{ height: '6px' }}>
                        <div
                          className={`rounded-pill h-100 transition-all ${crs.isCompleted ? 'bg-success' : 'bg-primary'}`}
                          style={{ width: `${crs.progressPercentage}%` }}
                        ></div>
                      </div>

                      {/* Action Buttons */}
                      <div className="d-flex flex-column gap-2">
                        {crs.isCompleted ? (
                          <div className="d-flex gap-2">
                            <button
                              onClick={() => navigate(`/course/${crs.id || crs._id}/learn`)}
                              className="btn btn-outline-primary flex-grow-1 font-body-sm py-2 rounded-3 d-flex align-items-center justify-content-center gap-1.5"
                            >
                              <span>Review Lessons</span>
                              <span className="material-symbols-outlined fs-6">play_arrow</span>
                            </button>

                            <button
                              onClick={() => setSelectedCertCourse(crs)}
                              className="btn btn-warning text-dark font-body-sm py-2 px-3 rounded-3 d-flex align-items-center justify-content-center gap-1 shadow-xs fw-bold"
                              title="View & Download Certificate"
                            >
                              <span className="material-symbols-outlined fs-5 fill text-dark">workspace_premium</span>
                              <span>Certificate</span>
                            </button>
                          </div>
                        ) : crs.isModulesCompleted ? (
                          <div className="d-flex gap-2">
                            <button
                              onClick={() => navigate(`/course/${crs.id || crs._id}/learn`)}
                              className="btn btn-outline-primary font-body-sm py-2 px-3 rounded-3 d-flex align-items-center justify-content-center gap-1"
                            >
                              <span>Review</span>
                              <span className="material-symbols-outlined fs-6">play_arrow</span>
                            </button>

                            <button
                              onClick={() => setSelectedQuizCourse(crs)}
                              className="btn btn-primary flex-grow-1 font-body-sm py-2 rounded-3 d-flex align-items-center justify-content-center gap-1.5 fw-bold shadow-xs"
                            >
                              <span className="material-symbols-outlined fs-6 fill">quiz</span>
                              <span>Take Quiz & Get Cert</span>
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => navigate(`/course/${crs.id || crs._id}/learn`)}
                            className="btn btn-primary w-100 font-body-sm py-2 rounded-3 d-flex align-items-center justify-content-center gap-2"
                          >
                            <span>{crs.progressPercentage === 0 ? 'Start Learning' : 'Continue Learning'}</span>
                            <span className="material-symbols-outlined fs-6">play_arrow</span>
                          </button>
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
