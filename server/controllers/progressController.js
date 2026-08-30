import { dbStore } from '../services/dbStore.js';

export const getProgress = async (req, res, next) => {
  try {
    const prog = await dbStore.getProgress(req.user.id, req.params.courseId);
    return res.status(200).json(prog);
  } catch (err) {
    next(err);
  }
};

export const completeLesson = async (req, res, next) => {
  try {
    const { courseId, lessonId, totalLessonsCount, markCourseComplete } = req.body;
    if (!courseId) {
      return res.status(400).json({ success: false, error: 'courseId is required' });
    }

    const prog = await dbStore.getProgress(req.user.id, courseId);
    let completedLessons = [...(prog.completedLessons || [])];

    if (lessonId && !completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
    }

    const course = await dbStore.getCourseById(courseId);
    let totalLessons = totalLessonsCount || 0;
    if (!totalLessons && course?.modules && course.modules.length > 0) {
      course.modules.forEach((m) => {
        totalLessons += m.lessons ? m.lessons.length : 0;
      });
    }
    if (!totalLessons && course?.lessonsCount) {
      totalLessons = course.lessonsCount;
    }
    if (!totalLessons || totalLessons <= 0) {
      totalLessons = Math.max(completedLessons.length, 4);
    }

    let percentage = Math.min(100, Math.round((completedLessons.length / totalLessons) * 100));
    if (markCourseComplete) {
      percentage = 100;
    }

    const certificateEarned = percentage >= 100 || prog.quizPassed || prog.certificateEarned;

    const updatedProg = await dbStore.saveProgress(req.user.id, courseId, {
      completedLessons,
      lastWatchedLesson: lessonId || prog.lastWatchedLesson,
      percentage,
      certificateEarned,
      updatedAt: new Date().toISOString(),
    });

    return res.status(200).json(updatedProg);
  } catch (err) {
    next(err);
  }
};


export const submitQuiz = async (req, res, next) => {
  try {
    const { courseId, score, answers, passed } = req.body;
    if (!courseId) {
      return res.status(400).json({ success: false, error: 'courseId is required' });
    }

    const prog = await dbStore.getProgress(req.user.id, courseId);
    const numericScore = typeof score === 'number' ? score : 100;
    const isPassed = typeof passed === 'boolean' ? passed : numericScore >= 70;

    const updatedProg = await dbStore.saveProgress(req.user.id, courseId, {
      quizCompleted: true,
      quizScore: numericScore,
      quizPassed: isPassed,
      certificateEarned: isPassed,
      percentage: isPassed ? Math.max(prog?.percentage || 0, 100) : (prog?.percentage || 0),
      quizSubmittedAt: new Date().toISOString(),
    });

    return res.status(200).json({
      success: true,
      progress: updatedProg,
      certificateEarned: isPassed,
      quizScore: numericScore,
    });
  } catch (err) {
    next(err);
  }
};

