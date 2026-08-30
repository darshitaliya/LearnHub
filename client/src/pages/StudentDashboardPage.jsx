import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CourseQuizModal from '../components/CourseQuizModal';
import CertificateModal from '../components/CertificateModal';
import api from '../services/api';

export default function StudentDashboardPage() {
  const { user, logout, isAdmin, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recommendedCourse, setRecommendedCourse] = useState(null);
  const [progressMap, setProgressMap] = useState({});
  const [loading, setLoading] = useState(true);

  // Quiz & Certificate Modal States
  const [selectedQuizCourse, setSelectedQuizCourse] = useState(null);
  const [selectedCertCourse, setSelectedCertCourse] = useState(null);


  const learningActivityData = [
    { day: 'Mon', height: '40%', hours: '1.5h' },
    { day: 'Tue', height: '70%', hours: '3.0h' },
    { day: 'Wed', height: '50%', hours: '2.0h' },
    { day: 'Thu', height: '90%', hours: '4.5h' },
    { day: 'Fri', height: '60%', hours: '2.5h' },
    { day: 'Sat', height: '20%', hours: '0.8h' },
    { day: 'Sun', height: '0%', hours: '0h' },
  ];

  useEffect(() => {
    fetchStudentDashboardData();
  }, []);

  const fetchStudentDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch fresh user data and courses
      let currentUser = user;
      try {
        const meRes = await api.get('/auth/me');
        if (meRes.data) {
          currentUser = meRes.data;
        }
      } catch (e) {
        // Fallback to existing user from context
      }

      const res = await api.get('/courses');
      const allCourses = res.data || [];

      // Filter courses user is actually enrolled in
      const userEnrolledIds = currentUser?.enrolledCourses || [];
      const userEnrolled = allCourses.filter((c) => userEnrolledIds.includes(c.id) || userEnrolledIds.includes(c._id));

      setEnrolledCourses(userEnrolled);

      // Recommended course is a course not yet enrolled in
      const notEnrolled = allCourses.find((c) => !userEnrolledIds.includes(c.id) && !userEnrolledIds.includes(c._id));
      setRecommendedCourse(notEnrolled || allCourses[0] || null);

      // Fetch live progress for enrolled courses
      const pMap = {};
      await Promise.all(
        userEnrolled.map(async (c) => {
          const primaryId = c.id || c._id;
          try {
            const pRes = await api.get(`/progress/${primaryId}`);
            const completedArr = pRes.data?.completedLessons || [];
            const totalLessonsCount = c.modules?.reduce((sum, m) => sum + (m.lessons?.length || 0), 0) || 1;
            const calcPercentage = Math.min(100, Math.round((completedArr.length / totalLessonsCount) * 100));

            const isCertUnlocked = calcPercentage >= 100 || pRes.data?.quizPassed || pRes.data?.certificateEarned;
            const progData = {
              percentage: calcPercentage,
              completedLessons: completedArr,
              quizPassed: Boolean(pRes.data?.quizPassed || pRes.data?.certificateEarned),
              quizScore: pRes.data?.quizScore || 0,
              certificateEarned: isCertUnlocked,
            };

            if (c.id) pMap[c.id] = progData;
            if (c._id) pMap[c._id] = progData;
          } catch (e) {
            const fallbackData = { percentage: 0, completedLessons: [], quizPassed: false, quizScore: 0, certificateEarned: false };
            if (c.id) pMap[c.id] = fallbackData;
            if (c._id) pMap[c._id] = fallbackData;
          }
        })
      );
      setProgressMap(pMap);
    } catch (err) {
      console.error('Error loading student dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizSuccess = (finalScore) => {
    fetchStudentDashboardData();
    if (selectedQuizCourse) {
      setSelectedCertCourse(selectedQuizCourse);
    }
  };

  // Compute stats dynamically with 100% sync
  const totalEnrolled = enrolledCourses.length;
  
  let totalCompletedLessons = 0;
  let certificatesCount = 0;
  let totalPercentageSum = 0;

  enrolledCourses.forEach((c) => {
    const courseId = c.id || c._id;
    const prog = progressMap[courseId] || { percentage: 0, completedLessons: [] };
    const pPercent = prog.percentage || 0;
    totalPercentageSum += pPercent;
    if (prog.completedLessons) {
      totalCompletedLessons += prog.completedLessons.length;
    }
    if (pPercent >= 100 || prog.certificateEarned) {
      certificatesCount += 1;
    }
  });

  const avgScore = totalEnrolled > 0 ? Math.round(totalPercentageSum / totalEnrolled) : 0;

  const currentDateFormatted = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="d-flex min-vh-100 bg-surface overflow-hidden">
      {/* Sidebar Navigation */}
      <nav
        className="d-none d-lg-flex flex-column h-100 p-4 bg-surface-container-low border-end border-outline-variant/30 shadow-sm position-fixed start-0 top-0 z-3"
        style={{ width: '260px' }}
      >
        {/* Profile Header */}
        <div className="d-flex align-items-center gap-3 px-2 py-3 border-bottom border-outline-variant/20 mb-3">
          <img
            src={
              user?.avatar ||
              'https://lh3.googleusercontent.com/aida-public/AB6AXuCr9CHF12DMyqfTqDPJoBj_xC_FhZnCOV1I6J1SMhxGh9dcJ3yPsxD2HtzKxLTHnyTSpG0uX0MEYSV840HpNX-y1wjUL2W5uzc-jWwkVaS1whPOnE5SxNKOpXId2qBfE-9gu0NTJ6WC0LlVlX-xhbFqOzPgYtHkBVsyxV3NAvnoOITYBeL22R1XVab90baoCu1D0V5K4T5SuN-718WnFxyTEDsfdHu9ezm90n-qADcvPeqDMj_eqNdC'
            }
            alt="Profile"
            className="rounded-circle border border-2 border-white object-fit-cover shadow-xs"
            style={{ width: '42px', height: '42px' }}
          />
          <div>
            <h1 className="font-headline-md text-primary fs-5 m-0 fw-bold">LearnHub Pro</h1>
            <p className="font-label-caps text-on-surface-variant m-0 mt-1" style={{ fontSize: '11px' }}>
              STUDENT ACCOUNT
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="flex-grow-1 d-flex flex-column gap-2 overflow-y-auto">
          <Link
            to="/dashboard"
            className="d-flex align-items-center gap-3 px-3 py-3 bg-primary-container text-on-primary-container rounded-3 font-body-sm text-decoration-none fw-bold border-start border-4 border-primary shadow-xs"
          >
            <span className="material-symbols-outlined fill">dashboard</span>
            <span>Dashboard</span>
          </Link>

          <Link
            to="/my-courses"
            className="d-flex align-items-center gap-3 px-3 py-3 text-on-surface-variant rounded-3 font-body-sm text-decoration-none hover-bg-high"
          >
            <span className="material-symbols-outlined">school</span>
            <span>My Courses</span>
          </Link>

          <Link
            to="/profile"
            className="d-flex align-items-center gap-3 px-3 py-3 text-on-surface-variant rounded-3 font-body-sm text-decoration-none hover-bg-high"
          >
            <span className="material-symbols-outlined">person</span>
            <span>Profile</span>
          </Link>

          {isAdmin && (
            <Link
              to="/admin"
              className="d-flex align-items-center gap-3 px-3 py-3 text-primary rounded-3 font-body-sm text-decoration-none hover-bg-high"
            >
              <span className="material-symbols-outlined">admin_panel_settings</span>
              <span>Admin Panel</span>
            </Link>
          )}
        </div>

        {/* Footer info */}
        <div className="mt-auto d-flex flex-column gap-3 pt-3 border-top border-outline-variant/20">
          <div className="bg-primary-container/30 text-primary p-3 rounded-3 text-center border border-primary/20">
            <span className="font-label-caps fw-bold d-block mb-1" style={{ fontSize: '11px' }}>100% FREE ACCESS</span>
            <span className="font-body-sm text-on-surface-variant d-block" style={{ fontSize: '12px' }}>Unlimited Platform Access</span>
          </div>

          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="btn text-error d-flex align-items-center gap-3 px-3 py-2 text-decoration-none rounded-3 font-body-sm hover-bg-error border-0 bg-transparent text-start"
          >
            <span className="material-symbols-outlined fs-5">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow-1 main-with-sidebar position-relative overflow-y-auto">
        <div
          className="position-absolute top-0 start-0 w-100 pointer-events-none"
          style={{
            height: '280px',
            background: 'linear-gradient(180deg, rgba(79, 70, 229, 0.08) 0%, transparent 100%)',
            zIndex: 0,
          }}
        />

        <div className="position-relative z-1 p-3 p-md-5 max-w-container-max mx-auto d-flex flex-column gap-4">
          {/* Top Bar Header */}
          <header className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
            <div>
              <span className="font-label-caps text-on-surface-variant text-uppercase tracking-wider">
                {currentDateFormatted}
              </span>
              <h1 className="font-display-lg-mobile text-on-surface m-0 fw-bold fs-2">
                Welcome back, <span className="text-primary">{user?.name ? user.name.split(' ')[0] : 'Student'}</span>
              </h1>
            </div>

            <div className="d-flex align-items-center gap-2">
              <Link to="/courses" className="btn btn-primary font-body-sm px-4 py-2 rounded-3 shadow-sm d-flex align-items-center gap-2">
                <span className="material-symbols-outlined fs-5">search</span> Browse Catalog
              </Link>
            </div>
          </header>

          {/* Top Bento Stat Cards (100% Synced Dynamic Live Data) */}
          <section className="row g-3">
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-4 p-4 shadow-sm h-100">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="rounded-circle bg-primary-container text-white d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                    <span className="material-symbols-outlined fill">school</span>
                  </div>
                  <span className="font-label-caps text-secondary bg-secondary-container px-2 py-1 rounded-2">ENROLLED</span>
                </div>
                <h3 className="font-display-lg-mobile text-on-surface mb-1 fw-bold">{loading ? '...' : totalEnrolled}</h3>
                <p className="font-body-sm text-on-surface-variant m-0">Enrolled Courses</p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-4 p-4 shadow-sm h-100">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="rounded-circle text-secondary d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', backgroundColor: 'rgba(0, 104, 122, 0.1)' }}>
                    <span className="material-symbols-outlined fill">task_alt</span>
                  </div>
                  <span className="font-label-caps text-on-surface-variant bg-surface-container px-2 py-1 rounded-2">COMPLETED</span>
                </div>
                <h3 className="font-display-lg-mobile text-on-surface mb-1 fw-bold">{loading ? '...' : totalCompletedLessons}</h3>
                <p className="font-body-sm text-on-surface-variant m-0">Completed Lessons</p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-4 p-4 shadow-sm h-100">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="rounded-circle text-tertiary-container d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', backgroundColor: 'rgba(136, 85, 0, 0.15)' }}>
                    <span className="material-symbols-outlined fill">workspace_premium</span>
                  </div>
                  <span className="font-label-caps text-primary bg-primary-fixed px-2 py-1 rounded-2">CERTIFIED</span>
                </div>
                <h3 className="font-display-lg-mobile text-on-surface mb-1 fw-bold">{loading ? '...' : certificatesCount}</h3>
                <p className="font-body-sm text-on-surface-variant m-0">Certificates Earned</p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-4 p-4 shadow-sm h-100">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="rounded-circle bg-surface-dim text-primary d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                    <span className="material-symbols-outlined fill">analytics</span>
                  </div>
                  <span className="font-label-caps text-secondary bg-secondary-container px-2 py-1 rounded-2">PROGRESS</span>
                </div>
                <h3 className="font-display-lg-mobile text-on-surface mb-1 fw-bold">{loading ? '...' : `${avgScore}%`}</h3>
                <p className="font-body-sm text-on-surface-variant m-0">Average Completion Rate</p>
              </div>
            </div>
          </section>

          {/* Main Bento Grid */}
          <section className="row g-4">
            {/* Left Column: Continue Learning & Chart */}
            <div className="col-12 col-lg-8 d-flex flex-column gap-4">
              {/* Continue Learning Card */}
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-4 p-4 shadow-sm">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h3 className="font-headline-md text-on-surface m-0 fw-bold fs-5">Continue Learning</h3>
                  <Link to="/my-courses" className="font-body-sm text-primary text-decoration-none fw-semibold">View all enrolled</Link>
                </div>

                {loading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status"></div>
                  </div>
                ) : enrolledCourses.length === 0 ? (
                  <div className="text-center py-4 bg-surface-container-low rounded-3">
                    <p className="font-body-base text-on-surface-variant mb-2">You haven't enrolled in any courses yet.</p>
                    <Link to="/courses" className="btn btn-primary btn-sm font-body-sm">Browse Catalog & Enroll</Link>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {enrolledCourses.map((course) => {
                      const courseId = course.id || course._id;
                      const prog = progressMap[courseId] || { percentage: 0 };
                      const pct = prog.percentage ?? 0;
                      return (
                        <div key={courseId} className="d-flex flex-column flex-sm-row gap-3 p-3 rounded-3 hover-bg-low transition-colors border border-outline-variant/20">
                          <div className="position-relative rounded-2 overflow-hidden flex-shrink-0" style={{ width: '130px', height: '90px' }}>
                            <img src={course.thumbnail} alt={course.title} className="w-100 h-100 object-fit-cover" />
                            <span className="position-absolute bottom-0 start-0 m-1 font-label-caps text-white bg-dark bg-opacity-50 px-1 py-0.5 rounded" style={{ fontSize: '10px' }}>
                              {course.category}
                            </span>
                          </div>

                          <div className="flex-grow-1 d-flex flex-column justify-content-center">
                            <h4 className="font-body-base fw-bold text-on-surface mb-1">{course.title}</h4>
                            <p className="font-body-sm text-on-surface-variant mb-2" style={{ fontSize: '12px' }}>
                              {course.subtitle || course.description?.substring(0, 70) + '...'}
                            </p>
                            <div className="d-flex align-items-center gap-3">
                              <div className="flex-grow-1 bg-surface-variant rounded-pill" style={{ height: '8px' }}>
                                <div className="bg-primary rounded-pill h-100" style={{ width: `${pct}%` }}></div>
                              </div>
                              <span className="font-label-caps text-on-surface-variant fw-bold" style={{ width: '36px', fontSize: '11px' }}>
                                {pct}%
                              </span>
                            </div>
                          </div>

                          <div className="d-flex flex-column gap-2 align-items-sm-end justify-content-center">
                            <div className="d-flex gap-2">
                              <Link to={`/course/${courseId}/learn`} className="btn btn-primary font-body-sm py-1.5 px-3 rounded-3 d-flex align-items-center gap-1">
                                <span>Resume</span>
                                <span className="material-symbols-outlined fs-6">play_arrow</span>
                              </Link>

                              {prog.certificateEarned && (
                                <button
                                  type="button"
                                  onClick={() => setSelectedCertCourse(course)}
                                  className="btn btn-warning font-body-sm px-2.5 py-1.5 rounded-3 d-flex align-items-center gap-1 shadow-xs"
                                  title="View & Print Official Certificate"
                                >
                                  <span className="material-symbols-outlined fs-6 fill text-dark">workspace_premium</span>
                                </button>
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => setSelectedQuizCourse(course)}
                              className={`btn btn-sm font-body-sm py-1 px-2 rounded-2 d-flex align-items-center gap-1 ${
                                prog.quizPassed
                                  ? 'btn-outline-success text-success fw-semibold'
                                  : 'btn-outline-primary text-primary fw-semibold'
                              }`}
                              style={{ fontSize: '11px' }}
                            >
                              <span className="material-symbols-outlined fs-6 fill">
                                {prog.quizPassed ? 'verified' : 'quiz'}
                              </span>
                              <span>{prog.quizPassed ? `Quiz Passed (${prog.quizScore || 100}%) ✅` : 'Take Quiz & Get Certificate'}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                )}
              </div>

              {/* Weekly Learning Activity */}
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-4 p-4 shadow-sm">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div>
                    <h3 className="font-headline-md text-on-surface m-0 fw-bold fs-5">Learning Activity</h3>
                    <p className="font-body-sm text-on-surface-variant m-0">Hours spent over the last 7 days</p>
                  </div>
                  <span className="badge bg-surface-container-high text-on-surface font-label-caps px-3 py-1.5 rounded-pill">This Week</span>
                </div>

                <div className="d-flex align-items-end justify-content-between pt-4 px-2" style={{ height: '180px' }}>
                  {learningActivityData.map((item, idx) => (
                    <div key={idx} className="d-flex flex-column align-items-center gap-2 flex-grow-1">
                      <span className="font-body-sm text-on-surface-variant" style={{ fontSize: '11px' }}>{item.hours}</span>
                      <div className="w-100 bg-surface-container rounded-top transition-all" style={{ maxWidth: '32px', height: '120px' }}>
                        <div className="bg-primary rounded-top w-100 h-100 transition-all" style={{ height: item.height, marginTop: 'auto' }}></div>
                      </div>
                      <span className="font-label-caps text-on-surface-variant">{item.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Deadlines & Recommended Course */}
            <div className="col-12 col-lg-4 d-flex flex-column gap-4">
              {/* Deadlines */}
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-4 p-4 shadow-sm">
                <h3 className="font-headline-md text-on-surface mb-3 fw-bold fs-5 d-flex align-items-center gap-2">
                  <span className="material-symbols-outlined text-primary">calendar_today</span> Deadlines
                </h3>
                <div className="d-flex flex-column gap-3">
                  <div className="p-3 bg-surface-container-low rounded-3 border border-outline-variant/20 d-flex align-items-center gap-3">
                    <div className="bg-white rounded-2 p-2 text-center border border-outline-variant/30" style={{ width: '48px' }}>
                      <span className="font-label-caps text-primary d-block fw-bold" style={{ fontSize: '10px' }}>OCT</span>
                      <span className="font-headline-md fw-bold text-on-surface" style={{ fontSize: '18px' }}>25</span>
                    </div>
                    <div>
                      <h5 className="font-body-base fw-bold text-on-surface m-0" style={{ fontSize: '14px' }}>Algorithm Quiz 3</h5>
                      <span className="font-body-sm text-on-surface-variant" style={{ fontSize: '12px' }}>11:59 PM</span>
                    </div>
                  </div>

                  <div className="p-3 bg-surface-container-low rounded-3 border border-outline-variant/20 d-flex align-items-center gap-3">
                    <div className="bg-white rounded-2 p-2 text-center border border-outline-variant/30" style={{ width: '48px' }}>
                      <span className="font-label-caps text-primary d-block fw-bold" style={{ fontSize: '10px' }}>NOV</span>
                      <span className="font-headline-md fw-bold text-on-surface" style={{ fontSize: '18px' }}>02</span>
                    </div>
                    <div>
                      <h5 className="font-body-base fw-bold text-on-surface m-0" style={{ fontSize: '14px' }}>Machine Learning Lab</h5>
                      <span className="font-body-sm text-on-surface-variant" style={{ fontSize: '12px' }}>5:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Course Card */}
              {recommendedCourse && (
                <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-4 p-4 shadow-sm">
                  <span className="font-label-caps text-primary fw-bold mb-2 d-block">RECOMMENDED FOR YOU</span>
                  <div className="rounded-3 overflow-hidden mb-3" style={{ height: '140px' }}>
                    <img src={recommendedCourse.thumbnail} alt={recommendedCourse.title} className="w-100 h-100 object-fit-cover" />
                  </div>
                  <h4 className="font-body-base fw-bold text-on-surface mb-1">{recommendedCourse.title}</h4>
                  <p className="font-body-sm text-on-surface-variant mb-3 line-clamp-2" style={{ fontSize: '12px' }}>
                    {recommendedCourse.subtitle || recommendedCourse.description}
                  </p>
                  <Link to={`/course/${recommendedCourse.id || recommendedCourse._id}`} className="btn btn-outline-primary w-100 font-body-sm py-2 rounded-3">
                    View Course Details
                  </Link>
                </div>
              )}
            </div>
          </section>
        </div>
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
    </div>
  );
}

