import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CertificateModal from '../components/CertificateModal';
import CourseQuizModal from '../components/CourseQuizModal';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function VideoPlayerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const [quizScore, setQuizScore] = useState(0);


  // Mode: 'youtube' or 'mp4' (Default to 'youtube' for course-synchronized video)
  const [streamMode, setStreamMode] = useState('youtube');
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    fetchCourseAndProgress();
  }, [id]);

  useEffect(() => {
    if (streamMode === 'mp4' && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [activeLesson, streamMode]);

  const handleStartPlay = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  const fetchCourseAndProgress = async () => {
    setLoading(true);
    try {
      const [crsRes, progRes] = await Promise.all([
        api.get(`/courses/${id}`),
        api.get(`/progress/${id}`).catch(() => ({ data: { completedLessons: [], percentage: 0 } })),
      ]);

      let loadedCourse = crsRes.data;

      // Fallback: If course has no modules/lessons, populate standard HD video modules
      if (!loadedCourse?.modules || loadedCourse.modules.length === 0) {
        loadedCourse = {
          ...loadedCourse,
          modules: [
            {
              title: 'Module 1: Architecture & Core Foundations',
              lessons: [
                {
                  id: 'les_1',
                  title: `${loadedCourse?.title || 'Course'} - Core Architecture Overview`,
                  duration: '22:15',
                  videoUrl: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
                  type: 'video',
                },
                {
                  id: 'les_2',
                  title: `${loadedCourse?.title || 'Course'} - Implementation Patterns & Best Practices`,
                  duration: '18:40',
                  videoUrl: 'https://www.youtube.com/watch?v=Oe421EPjeBE',
                  type: 'video',
                },
              ],
            },
            {
              title: 'Module 2: Advanced Integration & Masterclass',
              lessons: [
                {
                  id: 'les_3',
                  title: `${loadedCourse?.title || 'Course'} - Enterprise Production Setup`,
                  duration: '25:10',
                  videoUrl: 'https://www.youtube.com/watch?v=wm5gMKCORL8',
                  type: 'video',
                },
                {
                  id: 'les_4',
                  title: `${loadedCourse?.title || 'Course'} - Performance & Cloud Deployment`,
                  duration: '30:00',
                  videoUrl: 'https://www.youtube.com/watch?v=fqMOX6JJhGo',
                  type: 'video',
                },
              ],
            },
          ],
        };
      }

      setCourse(loadedCourse);
      setCompletedLessons(progRes.data?.completedLessons || []);
      setPercentage(progRes.data?.percentage || 0);
      setQuizPassed(Boolean(progRes.data?.quizPassed || progRes.data?.certificateEarned));
      setQuizScore(progRes.data?.quizScore || 0);

      // Select first available lesson
      if (loadedCourse?.modules?.[0]?.lessons?.[0]) {
        setActiveLesson(loadedCourse.modules[0].lessons[0]);
      }
    } catch (err) {
      console.error('Error fetching course player data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLessonComplete = async (lessonId) => {
    try {
      const res = await api.post('/progress/lesson-complete', { courseId: id, lessonId });
      const newDone = res.data.completedLessons || [];
      const newPct = res.data.percentage || 0;
      setCompletedLessons(newDone);
      setPercentage(newPct);

      showToast(`Lesson Completed! 🎉 Course Progress: ${newPct}%`, 'success');

      if (res.data.certificateEarned || quizPassed) {
        setQuizPassed(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuizSuccess = (finalScore, shouldOpenCert = false) => {
    setQuizPassed(true);
    setQuizScore(finalScore);
    setPercentage(100);
    showToast(`Quiz Passed with ${finalScore}%! Official Certificate Unlocked! 🏆`, 'success', 5000);
    if (shouldOpenCert) {
      setShowCertificate(true);
    }
  };

  // Flatten all lessons across modules for next/prev navigation
  const allLessons = course?.modules?.flatMap((m) => m.lessons) || [];
  const currentIndex = allLessons.findIndex((l) => (l.id || l.title) === (activeLesson?.id || activeLesson?.title));

  const handleNextLesson = () => {
    if (currentIndex < allLessons.length - 1) {
      const next = allLessons[currentIndex + 1];
      setActiveLesson(next);
      handleLessonComplete(next.id || next.title);
    }
  };

  const handlePrevLesson = () => {
    if (currentIndex > 0) {
      setActiveLesson(allLessons[currentIndex - 1]);
    }
  };

  // Extract exact YouTube Video ID from lesson URL or fallback to subject-synchronized tutorial
  const extractYouTubeId = (lesson, courseTitle) => {
    const raw = lesson?.videoUrl || lesson?.url || '';
    if (raw) {
      const str = String(raw).trim();
      if (/^[a-zA-Z0-9_-]{11}$/.test(str)) {
        return str;
      }
      const match = str.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/i);
      if (match && match[1]) {
        return match[1];
      }
    }

    // Fallback if no specific URL was entered
    const textToSearch = `${courseTitle || ''} ${lesson?.title || ''}`.toLowerCase();
    if (textToSearch.includes('next') || textToSearch.includes('react')) return 'wm5gMKCORL8';
    if (textToSearch.includes('node') || textToSearch.includes('express')) return 'Oe421EPjeBE';
    if (textToSearch.includes('python') || textToSearch.includes('machine learning') || textToSearch.includes('ai') || textToSearch.includes('pytorch')) return 'Gv9_4yMHFhI';
    if (textToSearch.includes('docker') || textToSearch.includes('kubernetes') || textToSearch.includes('devops') || textToSearch.includes('ci/cd') || textToSearch.includes('github')) return 'R8_veQiYBjU';
    if (textToSearch.includes('gcp') || textToSearch.includes('cloud')) return 'jpno9AtS2wU';
    if (textToSearch.includes('flutter') || textToSearch.includes('dart') || textToSearch.includes('mobile')) return 'VPvVD8t02U8';
    if (textToSearch.includes('security') || textToSearch.includes('owasp') || textToSearch.includes('crypto')) return '2e6i_YgXW_A';
    if (textToSearch.includes('typescript')) return 'd56mG7DezGs';
    if (textToSearch.includes('figma') || textToSearch.includes('design') || textToSearch.includes('ui')) return 'c9Wg6Cb_YlU';
    if (textToSearch.includes('sql') || textToSearch.includes('database')) return 'HXV3zeQKqGY';
    if (textToSearch.includes('java')) return 'grEKMHGYyns';
    if (textToSearch.includes('c++') || textToSearch.includes('c#')) return 'vLnPwxZdW4w';

    return 'SqcY0GlETPk';
  };

  const getSyncedYouTubeUrl = (lesson, courseTitle) => {
    const ytId = extractYouTubeId(lesson, courseTitle);
    return `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1&controls=1&playsinline=1`;
  };

  // Helper for Direct MP4 CDN Backup Stream
  const getDirectVideoSource = (lesson) => {
    if (!lesson) return 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
    const rawUrl = lesson.videoUrl || lesson.url || '';
    if (String(rawUrl).endsWith('.mp4') || String(rawUrl).includes('.mp4?')) {
      return rawUrl;
    }
    const sampleVideos = [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    ];
    const charCode = (lesson.title || 'a').charCodeAt(0);
    return sampleVideos[charCode % sampleVideos.length];
  };

  if (loading) {
    return (
      <div className="d-flex flex-column min-vh-100 bg-surface">
        <Navbar />
        <div className="flex-grow-1 d-flex align-items-center justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading Video Player...</span>
          </div>
        </div>
      </div>
    );
  }

  const currentYtId = extractYouTubeId(activeLesson, course?.title);
  const syncedYtUrl = `https://www.youtube.com/embed/${currentYtId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1&controls=1&playsinline=1`;
  const directMp4Source = getDirectVideoSource(activeLesson);
  const directWatchUrl = `https://www.youtube.com/watch?v=${currentYtId}`;

  return (
    <div className="d-flex flex-column min-vh-100 bg-surface">
      <Navbar />

      <main className="flex-grow-1 d-flex flex-column flex-lg-row overflow-hidden" style={{ minHeight: 'calc(100vh - 72px)' }}>
        {/* Left Side: Video Player Area */}
        <div className="flex-grow-1 p-3 p-md-4 d-flex flex-column bg-dark text-white">
          
          {/* Top Navigation & Progress Bar */}
          <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mb-3">
            <Link to="/dashboard" className="text-white-50 text-decoration-none font-body-sm d-flex align-items-center gap-1 hover-white">
              <span className="material-symbols-outlined fs-5">arrow_back</span> Back to Dashboard
            </Link>

            <div className="d-flex align-items-center flex-wrap gap-2">
              <span className="font-label-caps text-info">Progress: {percentage}%</span>
              <div className="bg-secondary rounded-pill me-2" style={{ width: '100px', height: '6px' }}>
                <div className="bg-primary rounded-pill h-100" style={{ width: `${percentage}%` }}></div>
              </div>

              <button
                onClick={() => setShowQuiz(true)}
                className={`btn btn-sm ${
                  quizPassed ? 'btn-success text-white' : 'btn-outline-warning text-warning'
                } font-label-caps d-flex align-items-center gap-1 fw-bold px-3 py-1.5 rounded-3 shadow-xs`}
              >
                <span className="material-symbols-outlined fs-6 fill">quiz</span>
                <span>{quizPassed ? `Quiz Passed (${quizScore || 100}%) ✅` : 'Take Course Quiz'}</span>
              </button>

              {(percentage >= 100 || quizPassed) && (
                <button
                  onClick={() => setShowCertificate(true)}
                  className="btn btn-sm btn-warning text-dark font-label-caps d-flex align-items-center gap-1 fw-bold px-3 py-1.5 rounded-3 shadow-xs"
                >
                  <span className="material-symbols-outlined fs-6 fill">workspace_premium</span> Claim Certificate
                </button>
              )}
            </div>
          </div>


          {/* Dual Stream Multi-Server Switcher */}
          <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-2 mb-2 px-1">
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-primary font-label-caps px-2.5 py-1">SYNCHRONIZED VIDEO STREAM ENGINE</span>
              <span className="font-label-caps text-white-50" style={{ fontSize: '11px' }}>
                Mode: {streamMode === 'youtube' ? '📺 Official YouTube HD Stream' : '⚡ Direct Ultra-HD MP4 Stream'}
              </span>
            </div>

            <div className="d-flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setStreamMode('youtube')}
                className={`btn btn-sm px-3 py-1 rounded-pill font-body-sm d-flex align-items-center gap-1 ${
                  streamMode === 'youtube' ? 'btn-primary text-white fw-bold shadow-xs' : 'btn-outline-light text-white-50 opacity-75'
                }`}
                style={{ fontSize: '12px' }}
              >
                <span className="material-symbols-outlined fs-6">play_circle</span> YouTube HD Stream
              </button>

              <button
                type="button"
                onClick={() => setStreamMode('mp4')}
                className={`btn btn-sm px-3 py-1 rounded-pill font-body-sm d-flex align-items-center gap-1 ${
                  streamMode === 'mp4' ? 'btn-success text-white fw-bold shadow-xs' : 'btn-outline-light text-white-50 opacity-75'
                }`}
                style={{ fontSize: '12px' }}
              >
                <span className="material-symbols-outlined fs-6">bolt</span> Direct MP4 Stream
              </button>

              <a
                href={directWatchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-danger px-3 py-1 rounded-pill font-body-sm d-flex align-items-center gap-1 text-decoration-none"
                style={{ fontSize: '12px' }}
                title="Open and watch video directly on YouTube"
              >
                <span className="material-symbols-outlined fs-6">open_in_new</span> Watch on YouTube
              </a>
            </div>
          </div>

          {/* Player Container */}
          <div className="w-100 bg-black rounded-3 overflow-hidden d-flex align-items-center justify-content-center position-relative mb-3 shadow-lg" style={{ aspectRatio: '16/9', maxHeight: '560px' }}>
            {activeLesson?.type === 'text' ? (
              <div className="p-5 text-center bg-surface-container-low text-on-surface rounded-3 w-100 h-100 d-flex flex-column justify-content-center align-items-center">
                <span className="material-symbols-outlined fs-1 text-secondary mb-2">description</span>
                <h3 className="font-headline-md fw-bold mb-2">{activeLesson?.title}</h3>
                <p className="font-body-base text-on-surface-variant max-w-lg mb-4">
                  This module reinforces modern software engineering architecture, algorithm optimization, and system design principles.
                </p>
                <button onClick={() => handleLessonComplete(activeLesson?.id || activeLesson?.title)} className="btn btn-primary font-body-sm px-4 py-2 rounded-3">
                  Mark Module Complete
                </button>
              </div>
            ) : streamMode === 'youtube' ? (
              <iframe
                key={(activeLesson?.id || activeLesson?.title) + '_yt_synced'}
                src={syncedYtUrl}
                title={activeLesson?.title || course?.title || 'Course Video Lesson'}
                className="w-100 h-100 border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <>
                <video
                  ref={videoRef}
                  controls
                  autoPlay
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  key={(activeLesson?.id || activeLesson?.title) + '_mp4_player'}
                  className="w-100 h-100 object-fit-contain"
                  poster={course?.thumbnail}
                >
                  <source src={directMp4Source} type="video/mp4" />
                  Your browser does not support HTML5 video playback.
                </video>

                {!isPlaying && (
                  <div
                    onClick={handleStartPlay}
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center cursor-pointer transition-all"
                    style={{ backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 10 }}
                  >
                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center shadow-lg hover-scale transition-transform mb-3" style={{ width: '84px', height: '84px' }}>
                      <span className="material-symbols-outlined fill" style={{ fontSize: '52px', marginLeft: '4px' }}>play_arrow</span>
                    </div>
                    <span className="badge bg-primary font-headline-md px-3.5 py-2 rounded-pill fs-6 fw-bold shadow-md">
                      ▶ Click to Start Playing Video
                    </span>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Player Navigation Bar */}
          <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 pt-2">
            <div>
              <h3 className="font-headline-md fs-4 m-0 fw-bold">{activeLesson?.title || 'Course Video Lesson'}</h3>
              <p className="font-body-sm text-white-50 m-0">{course?.title}</p>
            </div>

            <div className="d-flex align-items-center gap-2">
              <button onClick={handlePrevLesson} disabled={currentIndex <= 0} className="btn btn-outline-light font-body-sm px-3.5 py-2 rounded-3">
                &larr; Previous Lesson
              </button>

              <button
                onClick={() => {
                  handleLessonComplete(activeLesson?.id || activeLesson?.title);
                  handleNextLesson();
                }}
                className="btn btn-primary font-body-sm px-4 py-2 rounded-3 d-flex align-items-center gap-1 shadow-xs fw-bold"
              >
                <span>{completedLessons.includes(activeLesson?.id || activeLesson?.title) ? 'Completed ✅' : 'Mark Complete & Next'}</span>
                <span className="material-symbols-outlined fs-6">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Modules & Playlist Sidebar */}
        <div className="bg-surface-container-low border-start border-outline-variant/30 p-3 p-md-4 overflow-y-auto" style={{ width: '100%', maxWidth: '380px' }}>
          <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom border-outline-variant/30">
            <div>
              <span className="font-label-caps text-primary fw-bold" style={{ fontSize: '11px' }}>CURRICULUM PLAYLIST</span>
              <h2 className="font-headline-md text-on-surface fs-5 m-0 fw-bold">Course Modules</h2>
            </div>
            <span className="badge bg-secondary-container text-secondary font-label-caps px-2.5 py-1 rounded-pill">
              {allLessons.length} Lessons
            </span>
          </div>

          {/* Modules Accordion / List */}
          <div className="d-flex flex-column gap-3">
            {course?.modules?.map((mod, modIdx) => (
              <div key={modIdx} className="bg-white rounded-3 border border-outline-variant/30 overflow-hidden shadow-xs">
                <div className="p-3 bg-surface-container-lowest border-bottom border-outline-variant/20">
                  <h4 className="font-body-base fw-bold text-on-surface m-0" style={{ fontSize: '14px' }}>
                    {mod.title}
                  </h4>
                  <span className="font-body-sm text-on-surface-variant" style={{ fontSize: '11px' }}>
                    {mod.lessons?.length || 0} Lessons
                  </span>
                </div>

                <div className="list-group list-group-flush">
                  {mod.lessons?.map((lesson, lesIdx) => {
                    const lessonKey = lesson.id || lesson.title;
                    const isActive = (activeLesson?.id || activeLesson?.title) === lessonKey;
                    const isDone = completedLessons.includes(lessonKey);

                    return (
                      <button
                        key={lesIdx}
                        onClick={() => {
                          setActiveLesson(lesson);
                          handleLessonComplete(lessonKey);
                        }}
                        className={`list-group-item list-group-item-action p-3 d-flex align-items-center justify-content-between border-0 transition-colors ${
                          isActive ? 'bg-primary-container/20 text-primary fw-bold border-start border-3 border-primary' : ''
                        }`}
                      >
                        <div className="d-flex align-items-center gap-2 overflow-hidden">
                          <span className={`material-symbols-outlined fs-5 ${isDone ? 'text-success' : isActive ? 'text-primary' : 'text-on-surface-variant'}`}>
                            {isDone ? 'check_circle' : 'play_circle'}
                          </span>
                          <span className="font-body-sm text-truncate" style={{ fontSize: '13px' }}>
                            {lesson.title}
                          </span>
                        </div>
                        <span className="font-body-sm text-on-surface-variant ms-2 whitespace-nowrap" style={{ fontSize: '11px' }}>
                          {lesson.duration || '15:00'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Final Exam & Certification Assessment Item */}
            <div className="bg-white rounded-3 border border-outline-variant/30 overflow-hidden shadow-xs">
              <div className="p-3 bg-primary-container/20 border-bottom border-outline-variant/20 d-flex align-items-center justify-content-between">
                <div>
                  <h4 className="font-body-base fw-bold text-primary m-0" style={{ fontSize: '14px' }}>
                    Module: Assessment & Certification
                  </h4>
                  <span className="font-body-sm text-on-surface-variant" style={{ fontSize: '11px' }}>
                    1 Final Quiz (Passing Grade: 70%)
                  </span>
                </div>
                <span className="badge bg-primary text-white font-label-caps px-2 py-0.5 rounded">
                  {quizPassed ? 'PASSED ✅' : 'REQUIRED'}
                </span>
              </div>

              <div className="p-3 d-flex flex-column gap-2">
                <button
                  onClick={() => setShowQuiz(true)}
                  className={`btn w-100 font-body-sm py-2 px-3 rounded-3 d-flex align-items-center justify-content-between text-start ${
                    quizPassed
                      ? 'btn-outline-success border-success text-success fw-bold'
                      : 'btn-primary text-white fw-bold shadow-xs'
                  }`}
                >
                  <div className="d-flex align-items-center gap-2">
                    <span className="material-symbols-outlined fs-5 fill">
                      {quizPassed ? 'verified' : 'quiz'}
                    </span>
                    <span>{quizPassed ? `Quiz Passed (${quizScore || 100}%)` : 'Take Course Quiz'}</span>
                  </div>
                  <span className="material-symbols-outlined fs-6">
                    {quizPassed ? 'check' : 'arrow_forward'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Certificate Unlock Banner */}
          <div className="mt-4 p-4 rounded-4 bg-primary text-white text-center shadow-sm">
            <span className="material-symbols-outlined fs-1 text-warning mb-2">workspace_premium</span>
            <h4 className="font-headline-md fw-bold mb-1 fs-6">Official Course Certificate</h4>
            <p className="font-body-sm text-white-50 mb-3" style={{ fontSize: '12px' }}>
              {quizPassed
                ? 'Your verified certificate of accomplishment has been unlocked! Click below to view and print.'
                : 'Pass the course-specific assessment quiz (70%+) to unlock your verified digital certificate of completion.'}
            </p>
            <button
              onClick={() => {
                if (quizPassed || percentage >= 100) {
                  setShowCertificate(true);
                } else {
                  setShowQuiz(true);
                }
              }}
              className={`btn btn-sm ${
                quizPassed || percentage >= 100
                  ? 'btn-warning text-dark fw-bold'
                  : 'btn-outline-light text-white'
              } w-100 rounded-3 py-2.5 font-body-sm shadow-xs`}
            >
              {quizPassed || percentage >= 100
                ? '🎉 View & Download Certificate'
                : '📝 Take Quiz to Unlock Certificate'}
            </button>
          </div>
        </div>
      </main>

      {/* Quiz Modal */}
      {showQuiz && (
        <CourseQuizModal
          course={course}
          user={user}
          onClose={() => setShowQuiz(false)}
          onQuizPassed={(finalScore, shouldOpenCert) => handleQuizSuccess(finalScore, shouldOpenCert)}
        />
      )}

      {/* Certificate Modal */}
      {showCertificate && (
        <CertificateModal
          studentName={user?.name}
          courseTitle={course?.title}
          course={course}
          user={user}
          onClose={() => setShowCertificate(false)}
        />
      )}
    </div>
  );
}

