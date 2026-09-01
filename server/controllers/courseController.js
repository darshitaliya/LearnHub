import { dbStore } from '../services/dbStore.js';

export const getCourses = async (req, res, next) => {
  try {
    const courses = await dbStore.getCourses(req.query);
    return res.status(200).json(courses);
  } catch (err) {
    next(err);
  }
};

export const getCourseById = async (req, res, next) => {
  try {
    const course = await dbStore.getCourseById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }
    return res.status(200).json(course);
  } catch (err) {
    next(err);
  }
};

export const createCourse = async (req, res, next) => {
  try {
    const { title, category, level, description, thumbnail, techStack, modules } = req.body;

    if (!title || !category) {
      return res.status(400).json({ success: false, error: 'Title and category are required' });
    }

    const user = await dbStore.findUserById(req.user.id);

    const parsedTechStack = Array.isArray(techStack)
      ? techStack
      : typeof techStack === 'string'
      ? techStack.split(',').map((s) => s.trim())
      : ['Software Engineering'];

    const courseId = `crs_${Date.now()}`;
    const calculatedLessonsCount = modules && Array.isArray(modules)
      ? modules.reduce((acc, m) => acc + (m.lessons ? m.lessons.length : 0), 0)
      : 1;

    const newCourse = await dbStore.createCourse({
      id: courseId,
      title: title.trim(),
      subtitle: description ? description.slice(0, 100) : 'Learn professional industry-standard skills.',
      description: description || '',
      category: category.trim(),
      level: level || 'Beginner',
      price: req.body.price !== undefined ? Number(req.body.price) : 0,
      originalPrice: req.body.originalPrice !== undefined ? Number(req.body.originalPrice) : 0,
      rating: 5.0,
      reviewsCount: 1,
      hours: req.body.hours ? Number(req.body.hours) : Math.max(1, Math.round(calculatedLessonsCount * 0.75)),
      lessonsCount: calculatedLessonsCount,
      languages: req.body.languages || ['English'],
      techStack: parsedTechStack,
      instructorName: req.body.instructorName || (user ? user.name : 'Dr. Elena Rostova'),
      instructorRole: req.body.instructorRole || 'Principal Platform Engineer',
      instructorBio: req.body.instructorBio || 'Expert instructor teaching modern software architecture.',
      instructorAvatar: user ? user.avatar : '',
      thumbnail: thumbnail || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
      status: req.body.status || 'published',
      featured: req.body.featured !== undefined ? req.body.featured : true,
      modules: modules || [
        {
          id: `mod_${Date.now()}`,
          title: 'Module 1: Foundations',
          lessons: [
            { id: `les_${Date.now()}`, title: 'Course Overview & Introduction', duration: '15:00', videoUrl: 'https://www.youtube.com/watch?v=bMknfKXIFA8', isLocked: false, type: 'video' },
          ],
        },
      ],
      includes: req.body.includes || ['Full HD Video Access', 'Certificate of completion', 'Lifetime Access'],
    });

    return res.status(201).json(newCourse);
  } catch (err) {
    next(err);
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const { title, category, level, description, thumbnail, techStack, modules, price, hours, instructorName, status } = req.body;

    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (category !== undefined) updateData.category = category.trim();
    if (level !== undefined) updateData.level = level;
    if (description !== undefined) {
      updateData.description = description;
      updateData.subtitle = description.slice(0, 100);
    }
    if (thumbnail !== undefined) updateData.thumbnail = thumbnail;
    if (price !== undefined) updateData.price = Number(price);
    if (status !== undefined) updateData.status = status;
    if (instructorName !== undefined) updateData.instructorName = instructorName;

    if (techStack !== undefined) {
      updateData.techStack = Array.isArray(techStack)
        ? techStack
        : typeof techStack === 'string'
        ? techStack.split(',').map((s) => s.trim())
        : ['Software Engineering'];
    }

    if (modules !== undefined && Array.isArray(modules)) {
      updateData.modules = modules;
      updateData.lessonsCount = modules.reduce((acc, m) => acc + (m.lessons ? m.lessons.length : 0), 0);
      updateData.hours = hours ? Number(hours) : Math.max(1, Math.round(updateData.lessonsCount * 0.75));
    } else if (hours !== undefined) {
      updateData.hours = Number(hours);
    }

    const updated = await dbStore.updateCourse(courseId, updateData);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }
    return res.status(200).json({ success: true, message: 'Course updated successfully', course: updated });
  } catch (err) {
    next(err);
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const deleted = await dbStore.deleteCourse(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }
    return res.status(200).json({ success: true, message: 'Course deleted successfully', course: deleted });
  } catch (err) {
    next(err);
  }
};

export const clearAllCourses = async (req, res, next) => {
  try {
    await dbStore.deleteAllCourses();
    return res.status(200).json({ success: true, message: 'All courses cleared successfully' });
  } catch (err) {
    next(err);
  }
};

export const enrollCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;

    const user = await dbStore.findUserById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const course = await dbStore.getCourseById(courseId);
    const { name, email, phone, profession, goal } = req.body || {};

    const enrolledCourses = Array.from(new Set([...(user.enrolledCourses || []), courseId]));
    await dbStore.updateUser(userId, { enrolledCourses });

    const enrollmentRecord = await dbStore.createEnrollment({
      userId,
      userName: name || user.name,
      userEmail: email || user.email,
      userPhone: phone || user.phone || 'N/A',
      profession: profession || 'Student',
      goal: goal || 'Skill Development',
      courseId,
      courseTitle: course ? course.title : 'Enrolled Course',
    });

    return res.status(200).json({
      success: true,
      message: `You have successfully enrolled in ${course ? course.title : 'this course'}!`,
      enrolledCourses,
      enrollment: enrollmentRecord,
    });
  } catch (err) {
    next(err);
  }
};
