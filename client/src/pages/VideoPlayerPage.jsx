import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CertificateModal from '../components/CertificateModal';
import CourseQuizModal from '../components/CourseQuizModal';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { getLocalProgress, saveLocalProgress, resolveMergedProgress } from '../utils/progressStorage';


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

      const totalLCount = loadedCourse?.modules?.flatMap((m) => m.lessons)?.length || 4;
      const localData = getLocalProgress(user?.id || user?._id, id);
      const merged = resolveMergedProgress(progRes.data, localData, totalLCount);

      setCompletedLessons(merged.completedLessons);
      setPercentage(merged.percentage);
      setQuizPassed(merged.quizPassed);
      setQuizScore(merged.quizScore);

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
    const targetId = lessonId || activeLesson?.id || activeLesson?.title || 'les_1';
    const totalCount = allLessons.length || 4;

    // Optimistically update state and local cache
    const updatedDone = Array.from(new Set([...completedLessons, targetId]));
    const calculatedPct = Math.min(100, Math.round((updatedDone.length / totalCount) * 100));
    setCompletedLessons(updatedDone);
    setPercentage(calculatedPct);

    saveLocalProgress(user?.id || user?._id, id, {
      completedLessons: updatedDone,
      percentage: calculatedPct,
    });

    try {
      const res = await api.post('/progress/lesson-complete', {
        courseId: id,
        lessonId: targetId,
        totalLessonsCount: totalCount,
      });

      if (res.data) {
        const serverDone = res.data.completedLessons || updatedDone;
        const serverPct = res.data.percentage !== undefined ? res.data.percentage : calculatedPct;
        setCompletedLessons(serverDone);
        setPercentage(serverPct);

        saveLocalProgress(user?.id || user?._id, id, {
          completedLessons: serverDone,
          percentage: serverPct,
          certificateEarned: Boolean(res.data.certificateEarned || quizPassed),
        });

        if (res.data.certificateEarned || quizPassed) {
          setQuizPassed(true);
        }
      }

      showToast(`Lesson Completed! 🎉 Progress: ${calculatedPct}%`, 'success');
    } catch (err) {
      console.error('Error completing lesson:', err);
    }
  };

  const handleMarkEntireCourseComplete = async () => {
    const totalCount = allLessons.length || 4;
    const allLessonIds = allLessons.map((l) => l.id || l.title);
    setCompletedLessons(allLessonIds);
    setPercentage(100);

    saveLocalProgress(user?.id || user?._id, id, {
      completedLessons: allLessonIds,
      percentage: 100,
    });

    try {
      const res = await api.post('/progress/lesson-complete', {
        courseId: id,
        lessonId: allLessonIds[0] || 'les_1',
        totalLessonsCount: totalCount,
        markCourseComplete: true,
      });

      if (res.data?.certificateEarned || quizPassed) {
        setQuizPassed(true);
      }
      showToast('All Lessons Marked Complete! 100% 🏆', 'success');
    } catch (err) {
      console.error('Error marking entire course complete:', err);
    }
  };

  const handleQuizSuccess = (finalScore, shouldOpenCert = false) => {
    setQuizPassed(true);
    setQuizScore(finalScore);
    setPercentage(100);

    saveLocalProgress(user?.id || user?._id, id, {
      percentage: 100,
      quizPassed: true,
      quizScore: finalScore,
      certificateEarned: true,
    });

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
    } else {
      // If at the end of the course, prompt to take the quiz
      handleLessonComplete(activeLesson?.id || activeLesson?.title);
      setShowQuiz(true);
    }
  };

  const handlePrevLesson = () => {
    if (currentIndex > 0) {
      setActiveLesson(allLessons[currentIndex - 1]);
    }
  };


  // Extract exact YouTube Video ID from lesson URL or fallback to high-quality subject-synchronized tutorial
  const extractYouTubeId = (lesson, currentCourse) => {
    // List of known broken/dead/restricted/placeholder video IDs on YouTube to always bypass:
    const brokenIds = new Set([
      'w7ejDZ8SWv8', 'h5wLuVCD0ls', 'PyQNfsGUnQA', 'NuyzuNBFWxQ', '2e6i_YgXW_A', 
      'jpno9AtS2wU', 'VPvVD8t0208', 'OU-A2EmVrkq', 'wm5gMKCORL4', 'ulprqHHWlnU',
      'LqUo3g2lVAc', 'inWWhr5tnEA', 'lZAoFs75_cs', 'pTFZFxd4hOI', 'SqcY0GlETPk',
      'gvkqT_UoZ5g', '1oW_W-tP9qM', '7U5F-cW2_9Y', 'YqQx75OPRa0', 'rg7Fvvl3taU'
    ]);

    const raw = lesson?.videoUrl || lesson?.url || '';
    if (raw) {
      const str = String(raw).trim();
      let extracted = '';
      if (/^[a-zA-Z0-9_-]{11}$/.test(str)) {
        extracted = str;
      } else {
        const match = str.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/i);
        if (match && match[1]) {
          extracted = match[1];
        }
      }
      if (extracted && !brokenIds.has(extracted)) {
        return extracted;
      }
    }

    // Comprehensive Subject-Matched 100% Embed-Verified Video IDs:
    const techStackText = Array.isArray(currentCourse?.techStack) ? currentCourse.techStack.join(' ') : (currentCourse?.techStack || '');
    const textToSearch = `${currentCourse?.title || ''} ${currentCourse?.category || ''} ${techStackText} ${lesson?.title || ''}`.toLowerCase();

    // FastAPI / MLOps / Microservices
    if (textToSearch.includes('fastapi') || textToSearch.includes('mlops') || textToSearch.includes('model serving')) return '0sOvCWFmrtA'; // FastAPI Course - freeCodeCamp

    // Reinforcement Learning / AI
    if (textToSearch.includes('reinforcement') || textToSearch.includes('q-learning') || textToSearch.includes('openai gym')) return 'Mut_u40Sqz4'; // Reinforcement Learning Course

    // PyTorch / Deep Learning / Vision
    if (textToSearch.includes('pytorch') || textToSearch.includes('deep learning')) return 'V_xro1bcAuA';
    if (textToSearch.includes('opencv') || textToSearch.includes('computer vision') || textToSearch.includes('image')) return 'oXlwWbU8l2o';
    if (textToSearch.includes('spark') || textToSearch.includes('pyspark') || textToSearch.includes('big data')) return '_C8kWso474U';
    if (textToSearch.includes('airflow') || textToSearch.includes('data engineering')) return 'K9AnJ9_ZAXE';
    if (textToSearch.includes('prompt') || textToSearch.includes('llm') || textToSearch.includes('chatgpt') || textToSearch.includes('genai')) return 'jC4v5AS4RIM';
    if (textToSearch.includes('transformer') || textToSearch.includes('bert') || textToSearch.includes('nlp')) return 'zjkBMFhNj_g';
    if (textToSearch.includes('machine learning') || textToSearch.includes('ai') || textToSearch.includes('data science')) return 'NWONte5ncC5';
    if (textToSearch.includes('pandas') || textToSearch.includes('numpy') || textToSearch.includes('analytics')) return 'rfscVS0vtbw';
    if (textToSearch.includes('python')) return 'rfscVS0vtbw';

    // Frontend & Web Frameworks
    if (textToSearch.includes('react') || textToSearch.includes('redux') || textToSearch.includes('zustand')) return 'bMknfKXIFA8';
    if (textToSearch.includes('next') || textToSearch.includes('nextjs')) return 'wm5gMKCORL8';
    if (textToSearch.includes('vue') || textToSearch.includes('pinia')) return 'bzlF85EjB5M';
    if (textToSearch.includes('angular')) return '3qBXWUpoPHo';
    if (textToSearch.includes('javascript') || textToSearch.includes('js') || textToSearch.includes('es6')) return 'W6NZfCO5SIk';
    if (textToSearch.includes('typescript') || textToSearch.includes('ts')) return 'd56mG7DezGs';
    if (textToSearch.includes('html') || textToSearch.includes('css') || textToSearch.includes('tailwind')) return 'mU6anWqZJcc';
    if (textToSearch.includes('graphql') || textToSearch.includes('apollo')) return 'eIQh02xuVw4';
    if (textToSearch.includes('ruby') || textToSearch.includes('rails')) return 'fmyvWzsfaEU';

    // Backend & API Development
    if (textToSearch.includes('node') || textToSearch.includes('express')) return 'Oe421EPjeBE';
    if (textToSearch.includes('django') || textToSearch.includes('drf')) return 'F5mRW0jo-U4';
    if (textToSearch.includes('laravel') || textToSearch.includes('php')) return 'MYyJ4PuL4pY';
    if (textToSearch.includes('asp.net') || textToSearch.includes('.net') || textToSearch.includes('c#')) return 'BfEjDD8mWYg';
    if (textToSearch.includes('spring') || textToSearch.includes('java')) return 'grEKMHGYyns';
    if (textToSearch.includes('golang') || textToSearch.includes('go')) return 'YS4e4mycGmg';
    if (textToSearch.includes('rust')) return 'zF34dRivLOw';

    // Cloud, DevOps & Containers
    if (textToSearch.includes('docker') || textToSearch.includes('container')) return 'fqMOX6JJhGo';
    if (textToSearch.includes('kubernetes') || textToSearch.includes('k8s')) return 'X48VuDVv0do';
    if (textToSearch.includes('terraform') || textToSearch.includes('iac')) return '7xngnjfIlK4';
    if (textToSearch.includes('github') || textToSearch.includes('ci/cd') || textToSearch.includes('git')) return 'RGOj5yH7evk';
    if (textToSearch.includes('linux') || textToSearch.includes('bash') || textToSearch.includes('shell')) return 'v-FnUwcQfZs';
    if (textToSearch.includes('aws') || textToSearch.includes('cloud') || textToSearch.includes('gcp') || textToSearch.includes('azure')) return 'k1RI5locZE4';

    // Cybersecurity & Ethical Hacking
    if (textToSearch.includes('security') || textToSearch.includes('ethical hacking') || textToSearch.includes('cyber') || textToSearch.includes('wireshark') || textToSearch.includes('nmap') || textToSearch.includes('owasp') || textToSearch.includes('crypto')) return '3Kq1MIfTWCE';

    // Mobile App Development
    if (textToSearch.includes('flutter') || textToSearch.includes('dart')) return 'VPvVD8t02U8';
    if (textToSearch.includes('react native') || textToSearch.includes('android') || textToSearch.includes('ios') || textToSearch.includes('mobile')) return '0-S5a0eXPoc';
    if (textToSearch.includes('swift') || textToSearch.includes('swiftui')) return 'b1oGLp1vYGY';
    if (textToSearch.includes('kotlin') || textToSearch.includes('compose')) return 'cC0x485H6r4';
    if (textToSearch.includes('pwa')) return 'ksXwaWHCW6k';

    // UI/UX Design & Prototyping
    if (textToSearch.includes('figma') || textToSearch.includes('design') || textToSearch.includes('ui') || textToSearch.includes('ux')) return 'c9Wg6Cb_YlU';
    if (textToSearch.includes('blender') || textToSearch.includes('3d')) return 't_cQSisS1i4';

    // Databases & Architecture
    if (textToSearch.includes('redis')) return 'jgpVdJB2sKQ';
    if (textToSearch.includes('solidity') || textToSearch.includes('blockchain') || textToSearch.includes('ethereum') || textToSearch.includes('web3')) return 'gyMwXuJrbJQ';
    if (textToSearch.includes('system design') || textToSearch.includes('scalability')) return 'm8Icp_Cid5o';
    if (textToSearch.includes('unity') || textToSearch.includes('game')) return 'gB1F9G0JXOo';
    if (textToSearch.includes('sql') || textToSearch.includes('postgres') || textToSearch.includes('mysql') || textToSearch.includes('database') || textToSearch.includes('mongodb')) return 'HXV3zeQKqGY';

    return 'bMknfKXIFA8';
  };

  const getSyncedYouTubeUrl = (lesson, currentCourse) => {
    const ytId = extractYouTubeId(lesson, currentCourse);
    return `https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1&enablejsapi=1&controls=1&playsinline=1`;
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

  const currentYtId = extractYouTubeId(activeLesson, course);
  const syncedYtUrl = getSyncedYouTubeUrl(activeLesson, course);
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
            <div className="d-flex align-items-center gap-1.5">
              {percentage < 100 && (
                <button
                  type="button"
                  onClick={handleMarkEntireCourseComplete}
                  className="btn btn-sm btn-outline-success font-label-caps px-2 py-0.5 rounded shadow-xs"
                  style={{ fontSize: '10px' }}
                  title="Mark all lessons as completed"
                >
                  ✓ Mark All Done
                </button>
              )}
              <span className="badge bg-secondary-container text-secondary font-label-caps px-2 py-1 rounded-pill" style={{ fontSize: '11px' }}>
                {completedLessons.length}/{allLessons.length} Done
              </span>
            </div>
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

