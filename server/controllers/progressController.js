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
    const { courseId, lessonId } = req.body;
    if (!courseId || !lessonId) {
      return res.status(400).json({ success: false, error: 'courseId and lessonId are required' });
    }

    const prog = await dbStore.getProgress(req.user.id, courseId);

    const completedLessons = [...(prog.completedLessons || [])];
    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
    }

    let percentage = prog.percentage || 0;
    const course = await dbStore.getCourseById(courseId);
    if (course && course.modules) {
      let totalLessons = 0;
      course.modules.forEach((m) => {
        totalLessons += m.lessons ? m.lessons.length : 0;
      });
      if (totalLessons > 0) {
        percentage = Math.min(100, Math.round((completedLessons.length / totalLessons) * 100));
      }
    }

    const certificateEarned = percentage >= 100;

    const updatedProg = await dbStore.saveProgress(req.user.id, courseId, {
      completedLessons,
      lastWatchedLesson: lessonId,
      percentage,
      certificateEarned,
    });

    return res.status(200).json(updatedProg);
  } catch (err) {
    next(err);
  }
};
