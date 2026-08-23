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

    const newCourse = await dbStore.createCourse({
      id: courseId,
      title: title.trim(),
      subtitle: description ? description.slice(0, 100) : 'Learn professional industry-standard skills.',
      description: description || '',
      category: category.trim(),
      level: level || 'Beginner',
      price: 0,
      originalPrice: 0,
      rating: 5.0,
      reviewsCount: 1,
      hours: 12,
      lessonsCount: modules ? modules.reduce((acc, m) => acc + (m.lessons ? m.lessons.length : 0), 0) : 5,
      languages: ['English'],
      techStack: parsedTechStack,
      instructorName: user ? user.name : 'Dr. Elena Rostova',
      instructorRole: 'Principal Platform Engineer',
      instructorBio: 'Expert instructor teaching modern software architecture.',
      instructorAvatar: user ? user.avatar : '',
      thumbnail: thumbnail || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc_P4bDonDSVnHhQab5Iw5rgqL2FAg1YI9MYUOdkuuHogQ9yokQeqxsakBi3ghU_SkEsswrJXOsiDE0eephEXqbAPWnwm-HVr-n6KQl44LkfqSd0bw3cqp4f73eaOQj9iNCV5879MGfNdPVgSr_qD-Q9Yuj3b52KGmh_y1v4y143OHehRzZtU9dd2EDtWwqYsl9Qh-wtSI3bXsIe2_iu4OXD6vJMxsjiFaaJhgln9n9TkKdJRzDPIW',
      status: 'published',
      featured: true,
      modules: modules || [
        {
          id: `mod_${Date.now()}`,
          title: 'Module 1: Foundations',
          lessons: [
            { id: `les_${Date.now()}`, title: 'Course Overview & Introduction', duration: '15:00', videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8', isLocked: false, type: 'video' },
          ],
        },
      ],
      includes: ['Full HD Video Access', 'Certificate of completion', 'Lifetime Access'],
    });

    return res.status(201).json(newCourse);
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
