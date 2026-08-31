import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import api from '../services/api';
import { COURSE_PRESETS_50 } from '../data/coursePresets50';

const DEFAULT_BLANK_COURSE = {
  title: '',
  category: 'Computer Science',
  level: 'Beginner',
  description: '',
  techStack: '',
  thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
  price: 0,
  instructorName: 'Admin Instructor',
  modules: [
    {
      title: 'Module 1: Introduction & Foundations',
      lessons: [
        {
          title: 'Lesson 1: Overview & Environment Setup',
          duration: '15:00',
          videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
        },
      ],
    },
  ],
};

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search, Filter & Pagination State
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [selectedPresetKey, setSelectedPresetKey] = useState('');
  const [autoFillMessage, setAutoFillMessage] = useState('');

  const [formData, setFormData] = useState({ ...DEFAULT_BLANK_COURSE });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await api.get('/courses');
      const list = res.data || [];
      list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      setCourses(list);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    setModalMode('create');
    setEditingCourseId(null);
    setSelectedPresetKey('');
    setAutoFillMessage('');
    setFormData({
      ...DEFAULT_BLANK_COURSE,
      modules: [
        {
          title: 'Module 1: Introduction & Foundations',
          lessons: [
            {
              title: 'Lesson 1: Overview & Environment Setup',
              duration: '15:00',
              videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
            },
          ],
        },
      ],
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (crs) => {
    setModalMode('edit');
    setEditingCourseId(crs.id || crs._id);
    setSelectedPresetKey('');
    setAutoFillMessage('');

    const formattedModules = crs.modules && crs.modules.length > 0
      ? crs.modules.map((m, mIdx) => ({
          title: m.title || `Module ${mIdx + 1}`,
          lessons: m.lessons && m.lessons.length > 0
            ? m.lessons.map((l, lIdx) => ({
                title: l.title || `Lesson ${lIdx + 1}`,
                duration: l.duration || '15:00',
                videoUrl: l.videoUrl || 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
              }))
            : [{ title: 'Lesson 1', duration: '15:00', videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8' }],
        }))
      : [
          {
            title: 'Module 1: Fundamentals',
            lessons: [{ title: 'Lesson 1: Overview', duration: '15:00', videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8' }],
          },
        ];

    setFormData({
      title: crs.title || '',
      category: crs.category || 'Computer Science',
      level: crs.level || 'Beginner',
      description: crs.description || '',
      techStack: Array.isArray(crs.techStack) ? crs.techStack.join(', ') : (crs.techStack || ''),
      thumbnail: crs.thumbnail || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
      price: crs.price || 0,
      instructorName: crs.instructorName || 'Dr. Elena Rostova',
      modules: formattedModules,
    });

    setShowModal(true);
  };

  const handleApplyPresetByKey = (key) => {
    setSelectedPresetKey(key);
    if (!key) return;

    const found = COURSE_PRESETS_50.find((p) => p.key === key);
    if (found) {
      setFormData({
        title: found.title,
        category: found.category,
        level: found.level,
        description: found.description,
        techStack: found.techStack,
        thumbnail: found.thumbnail,
        price: 0,
        instructorName: 'Dr. Elena Rostova',
        modules: found.modules.map((m) => ({
          title: m.title,
          lessons: m.lessons.map((l) => ({
            title: l.title,
            duration: l.duration,
            videoUrl: l.videoUrl,
          })),
        })),
      });
      setAutoFillMessage(`✅ Selected "${found.name}"! All fields, HD image & YouTube lessons auto-filled.`);
    }
  };

  const handleResetToBlank = () => {
    setSelectedPresetKey('');
    setAutoFillMessage('🧹 Form reset to clean custom state.');
    setFormData({
      ...DEFAULT_BLANK_COURSE,
      modules: [
        {
          title: 'Module 1: Introduction & Foundations',
          lessons: [
            {
              title: 'Lesson 1: Overview & Environment Setup',
              duration: '15:00',
              videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
            },
          ],
        },
      ],
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Module Management (Add / Remove / Title Change)
  const handleAddModule = () => {
    setFormData((prev) => ({
      ...prev,
      modules: [
        ...prev.modules,
        {
          title: `Module ${prev.modules.length + 1}: Core Concepts & Hands-on`,
          lessons: [
            {
              title: 'Lesson 1: Practical Exercise & Walkthrough',
              duration: '18:00',
              videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
            },
          ],
        },
      ],
    }));
  };

  const handleRemoveModule = (mIdx) => {
    if (formData.modules.length <= 1) {
      alert('Course must have at least 1 module.');
      return;
    }
    const updated = formData.modules.filter((_, idx) => idx !== mIdx);
    setFormData({ ...formData, modules: updated });
  };

  const handleModuleTitleChange = (mIdx, title) => {
    const updated = [...formData.modules];
    updated[mIdx].title = title;
    setFormData({ ...formData, modules: updated });
  };

  // Lesson Management (Add / Remove / Title / Duration / Video URL)
  const handleAddLesson = (mIdx) => {
    const updated = [...formData.modules];
    updated[mIdx].lessons.push({
      title: `Lesson ${updated[mIdx].lessons.length + 1}: Deep Dive Session`,
      duration: '15:00',
      videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
    });
    setFormData({ ...formData, modules: updated });
  };

  const handleRemoveLesson = (mIdx, lIdx) => {
    const updated = [...formData.modules];
    if (updated[mIdx].lessons.length <= 1) {
      alert('Each module must have at least 1 lesson.');
      return;
    }
    updated[mIdx].lessons = updated[mIdx].lessons.filter((_, idx) => idx !== lIdx);
    setFormData({ ...formData, modules: updated });
  };

  const handleLessonChange = (mIdx, lIdx, field, val) => {
    const updated = [...formData.modules];
    updated[mIdx].lessons[lIdx][field] = val;
    setFormData({ ...formData, modules: updated });
  };

  // Submit Handler (Create or Update)
  const handleSubmitCourse = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return alert('Course title is required');

    setSaving(true);
    try {
      const payload = {
        title: formData.title,
        category: formData.category,
        level: formData.level,
        description: formData.description,
        thumbnail: formData.thumbnail,
        price: Number(formData.price) || 0,
        instructorName: formData.instructorName || 'Dr. Elena Rostova',
        techStack: typeof formData.techStack === 'string'
          ? formData.techStack.split(',').map((s) => s.trim()).filter(Boolean)
          : formData.techStack,
        modules: formData.modules.map((m, mIdx) => ({
          id: `mod_${Date.now()}_${mIdx}`,
          title: m.title || `Module ${mIdx + 1}`,
          lessons: m.lessons.map((l, lIdx) => ({
            id: `les_${Date.now()}_${mIdx}_${lIdx}`,
            title: l.title || `Lesson ${lIdx + 1}`,
            duration: l.duration || '15:00',
            videoUrl: l.videoUrl || 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
            isLocked: false,
            type: 'video',
          })),
        })),
      };

      if (modalMode === 'edit' && editingCourseId) {
        const updateRes = await api.put(`/courses/${editingCourseId}`, payload);
        const updatedCourse = updateRes.data?.course || updateRes.data;
        if (updatedCourse) {
          setCourses((prev) =>
            prev.map((c) => (c.id === editingCourseId || c._id === editingCourseId ? updatedCourse : c))
          );
        }
        alert('✅ Course updated successfully!');
      } else {
        const createRes = await api.post('/courses', payload);
        const newCourse = createRes.data?.course || createRes.data;
        if (newCourse) {
          setCourses((prev) => [newCourse, ...prev.filter((c) => (c.id || c._id) !== (newCourse.id || newCourse._id))]);
        }
        alert('✅ New Course Published Successfully! You can add unlimited courses to LearnHub.');
      }

      setShowModal(false);
      fetchCourses();
    } catch (err) {
      console.error('Failed to save course:', err);
      const errMsg = err.response?.data?.error || err.response?.data?.message || err.message;
      alert('Failed to save course: ' + errMsg);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course from the platform?')) {
      try {
        await api.delete(`/courses/${courseId}`);
        fetchCourses();
      } catch (err) {
        alert('Failed to delete course');
      }
    }
  };

  const handleClearAllCourses = async () => {
    if (window.confirm('⚠️ Are you sure you want to CLEAR ALL COURSES from the platform database?')) {
      try {
        await api.delete('/courses/all/clear');
        fetchCourses();
        alert('✅ All courses cleared from platform database.');
      } catch (err) {
        alert('Failed to clear courses: ' + (err.response?.data?.error || err.message));
      }
    }
  };

  // Filter & Search Logic
  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      !searchTerm.trim() ||
      c.title?.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      c.description?.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      c.techStack?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase().trim()));

    const matchesCategory = categoryFilter === 'All' || c.category?.toLowerCase() === categoryFilter.toLowerCase();
    const matchesLevel = levelFilter === 'All' || c.level?.toLowerCase() === levelFilter.toLowerCase();

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage) || 1;
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="d-flex min-vh-100 bg-surface overflow-hidden">
      <AdminSidebar />

      <main className="flex-grow-1 main-with-sidebar position-relative overflow-y-auto">
        <div className="position-relative z-1 p-3 p-md-5 max-w-container-max mx-auto d-flex flex-column gap-4">
          
          {/* Header Bar */}
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
            <div>
              <h1 className="font-display-lg-mobile text-on-surface fw-bold m-0" style={{ fontSize: '30px' }}>
                Course Management
              </h1>
            </div>

            <div className="d-flex align-items-center gap-2">
              <button
                onClick={handleClearAllCourses}
                className="btn btn-outline-danger font-body-sm px-3 py-2.5 rounded-3 d-flex align-items-center gap-2"
                title="Clear all courses from platform database"
              >
                <span className="material-symbols-outlined fs-5">delete_sweep</span> Clear All
              </button>
              <button
                onClick={handleOpenCreateModal}
                className="btn btn-primary font-body-sm px-4 py-2.5 rounded-3 shadow-sm d-flex align-items-center gap-2"
              >
                <span className="material-symbols-outlined fs-5">add_circle</span> + Add New Course
              </button>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-white rounded-4 border border-outline-variant/30 p-3 shadow-xs">
            <div className="row g-3 align-items-center">
              <div className="col-12 col-md-5">
                <div className="position-relative">
                  <span className="material-symbols-outlined position-absolute top-50 start-0 translate-middle-y ms-3 text-muted fs-5">
                    search
                  </span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search courses by title, tech stack..."
                    className="form-control font-body-sm rounded-3 input-premium py-2 ps-5 pe-4"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setCurrentPage(1);
                      }}
                      className="btn position-absolute top-50 end-0 translate-middle-y border-0 text-muted p-1 me-2"
                    >
                      <span className="material-symbols-outlined fs-6">close</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="col-6 col-md-3">
                <select
                  value={categoryFilter}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="form-select font-body-sm rounded-3 border-outline-variant/30 input-premium"
                >
                  <option value="All">All Categories</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Design">Design</option>
                  <option value="Business">Business</option>
                </select>
              </div>

              <div className="col-6 col-md-2">
                <select
                  value={levelFilter}
                  onChange={(e) => {
                    setLevelFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="form-select font-body-sm rounded-3 border-outline-variant/30 input-premium"
                >
                  <option value="All">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="col-12 col-md-2 text-md-end">
                <span className="badge bg-surface-container-high text-on-surface font-label-caps px-3 py-2">
                  Showing {filteredCourses.length} of {courses.length}
                </span>
              </div>
            </div>
          </div>

          {/* Courses Table Container */}
          <div className="bg-white rounded-4 border border-outline-variant/30 p-4 shadow-sm">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="font-body-sm text-on-surface-variant mt-2">Loading platform courses...</p>
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="text-center py-5 bg-surface-container-low rounded-3 p-4">
                <span className="material-symbols-outlined text-outline mb-2" style={{ fontSize: '48px' }}>search_off</span>
                <h4 className="font-headline-md fw-bold text-on-surface mb-2">No Matching Courses Found</h4>
                <p className="font-body-base text-on-surface-variant max-w-md mx-auto mb-4">
                  {courses.length === 0
                    ? 'No courses have been added yet. Click "+ Add New Course" above to publish your first course.'
                    : 'No courses matched your current filter criteria. Try resetting your search term or filters.'}
                </p>
                <div className="d-flex justify-content-center gap-2">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setCategoryFilter('All');
                      setLevelFilter('All');
                      setCurrentPage(1);
                    }}
                    className="btn btn-outline-secondary font-body-sm px-4 py-2 rounded-3"
                  >
                    Reset Filters
                  </button>
                  <button
                    onClick={handleOpenCreateModal}
                    className="btn btn-primary font-body-sm px-4 py-2 rounded-3"
                  >
                    + Add New Course
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="table-responsive">
                  <table className="table align-middle table-hover mb-0">
                    <thead className="bg-surface-container-low">
                      <tr className="font-label-caps text-on-surface-variant">
                        <th className="py-3 px-3">Course Title & Tech Stack</th>
                        <th className="py-3 px-3">Category</th>
                        <th className="py-3 px-3">Curriculum Structure</th>
                        <th className="py-3 px-3">Pricing</th>
                        <th className="py-3 px-3 text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedCourses.map((crs) => (
                        <tr key={crs.id || crs._id}>
                          <td className="py-3 px-3">
                            <div className="d-flex align-items-center gap-3">
                              <img
                                src={crs.thumbnail}
                                alt={crs.title}
                                className="rounded object-fit-cover shadow-xs"
                                style={{ width: '56px', height: '40px' }}
                                onError={(e) => {
                                  e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80';
                                }}
                              />
                              <div>
                                <span className="font-body-base fw-bold text-on-surface d-block">{crs.title}</span>
                                <div className="d-flex flex-wrap gap-1 mt-1">
                                  <span className="badge bg-surface-container text-primary font-label-caps px-2 py-0.5" style={{ fontSize: '10px' }}>
                                    {crs.level || 'Beginner'}
                                  </span>
                                  {crs.techStack?.slice(0, 3).map((t, idx) => (
                                    <span key={idx} className="badge bg-surface-container text-on-surface-variant font-label-caps px-2 py-0.5" style={{ fontSize: '10px' }}>
                                      {t}
                                    </span>
                                  ))}
                                  {crs.techStack?.length > 3 && (
                                    <span className="badge bg-surface-container text-muted font-label-caps px-1 py-0.5" style={{ fontSize: '10px' }}>
                                      +{crs.techStack.length - 3}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3 font-body-sm">
                            <span className="badge bg-surface-container-high text-on-surface font-label-caps px-2.5 py-1">
                              {crs.category}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="badge bg-primary-container text-on-primary-container font-label-caps px-2.5 py-1">
                              {crs.modules?.length || 1} Modules ({crs.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || crs.lessonsCount || 1} Lessons)
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="badge bg-success-container text-success font-label-caps px-3 py-1 fw-bold">
                              {crs.price ? `$${crs.price}` : '100% FREE'}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-end">
                            <div className="d-flex align-items-center justify-content-end gap-1.5">
                              <Link to={`/course/${crs.id || crs._id}`} target="_blank" className="btn btn-sm btn-outline-secondary font-body-sm px-2.5 py-1.5 rounded-3 text-nowrap">
                                View
                              </Link>
                              <button onClick={() => handleOpenEditModal(crs)} className="btn btn-sm btn-outline-primary font-body-sm px-3 py-1.5 rounded-3 text-nowrap">
                                Edit
                              </button>
                              <button onClick={() => handleDeleteCourse(crs.id || crs._id)} className="btn btn-sm btn-outline-danger font-body-sm px-2.5 py-1.5 rounded-3 text-nowrap">
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Table Pagination Controls */}
                {totalPages > 1 && (
                  <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3 pt-4 mt-2 border-top border-outline-variant/20">
                    <span className="font-body-sm text-on-surface-variant">
                      Showing <strong>{(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredCourses.length)}</strong> of <strong>{filteredCourses.length}</strong> courses
                    </span>

                    <div className="d-flex align-items-center gap-1">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="btn btn-sm btn-outline-secondary px-2.5 py-1 rounded-2"
                      >
                        &laquo; Prev
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`btn btn-sm px-2.5 py-1 rounded-2 ${
                            currentPage === pageNum ? 'btn-primary fw-bold' : 'btn-light'
                          }`}
                        >
                          {pageNum}
                        </button>
                      ))}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="btn btn-sm btn-outline-secondary px-2.5 py-1 rounded-2"
                      >
                        Next &raquo;
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Add / Edit Course Modal */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)', overflowY: 'auto' }}>
          <div className="modal-dialog modal-dialog-centered modal-xl my-4">
            <div className="modal-content border-0 rounded-4 shadow-lg p-4">
              <div className="modal-header border-0 pb-2">
                <div>
                  <h5 className="modal-title font-headline-md fw-bold text-on-surface fs-4">
                    {modalMode === 'edit' ? '✏️ Edit Course Details' : '✨ Publish New Course'}
                  </h5>
                  <p className="font-body-sm text-on-surface-variant m-0">
                    {modalMode === 'edit'
                      ? 'Modify course curriculum, metadata, videos and syllabus.'
                      : 'Create a custom course from scratch or pick from pre-configured curricula.'}
                  </p>
                </div>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>

              {/* Template / Scratch Selector Header */}
              {modalMode === 'create' && (
                <div className="mt-3 p-3 bg-surface-container-low rounded-3 border border-outline-variant/30">
                  <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2 mb-2">
                    <label className="font-label-caps text-primary fw-bold m-0" style={{ fontSize: '12px' }}>
                      🚀 QUICK TEMPLATE AUTOFILL (OPTIONAL 50+ PRESETS)
                    </label>
                    <button
                      type="button"
                      onClick={handleResetToBlank}
                      className="btn btn-sm btn-outline-secondary font-body-sm px-2.5 py-0.5 rounded-pill"
                    >
                      Clear & Start Blank
                    </button>
                  </div>

                  <select
                    value={selectedPresetKey}
                    onChange={(e) => handleApplyPresetByKey(e.target.value)}
                    className="form-select bg-white border border-outline-variant/40 rounded-3 px-3 py-2 font-body-sm w-100 text-on-surface shadow-xs"
                    style={{ fontSize: '13px' }}
                  >
                    <option value="">-- Choose a Preset Template (Or leave blank to create custom) --</option>
                    <optgroup label="🚀 Web Development & Full-Stack (1-10)">
                      {COURSE_PRESETS_50.slice(0, 10).map((p) => (
                        <option key={p.key} value={p.key}>{p.name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="🤖 Data Science, AI & Machine Learning (11-20)">
                      {COURSE_PRESETS_50.slice(10, 20).map((p) => (
                        <option key={p.key} value={p.key}>{p.name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="🔒 Cybersecurity & Ethical Hacking (21-26)">
                      {COURSE_PRESETS_50.slice(20, 26).map((p) => (
                        <option key={p.key} value={p.key}>{p.name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="☁️ DevOps, Cloud & Infrastructure (27-32)">
                      {COURSE_PRESETS_50.slice(26, 32).map((p) => (
                        <option key={p.key} value={p.key}>{p.name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="📱 Mobile App Development (33-38)">
                      {COURSE_PRESETS_50.slice(32, 38).map((p) => (
                        <option key={p.key} value={p.key}>{p.name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="🎨 UI/UX Design & Frontend (39-44)">
                      {COURSE_PRESETS_50.slice(38, 44).map((p) => (
                        <option key={p.key} value={p.key}>{p.name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="⚙️ Systems, Databases & Architecture (45-50)">
                      {COURSE_PRESETS_50.slice(44, 50).map((p) => (
                        <option key={p.key} value={p.key}>{p.name}</option>
                      ))}
                    </optgroup>
                  </select>

                  {autoFillMessage && (
                    <div className="mt-2 font-body-sm text-success fw-medium">
                      {autoFillMessage}
                    </div>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmitCourse} className="modal-body p-0 mt-3">
                <div className="row g-3">
                  <div className="col-12 col-md-8">
                    <label className="font-label-caps text-on-surface-variant mb-1">Course Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g. Master Full-Stack Next.js 14 & Server Actions"
                      className="form-control font-body-base input-premium"
                      required
                    />
                  </div>

                  <div className="col-12 col-md-4">
                    <label className="font-label-caps text-on-surface-variant mb-1">Instructor Name</label>
                    <input
                      type="text"
                      name="instructorName"
                      value={formData.instructorName}
                      onChange={handleInputChange}
                      placeholder="e.g. Dr. Elena Rostova"
                      className="form-control font-body-sm input-premium"
                    />
                  </div>

                  <div className="col-12 col-md-4">
                    <label className="font-label-caps text-on-surface-variant mb-1">Category</label>
                    <select name="category" value={formData.category} onChange={handleInputChange} className="form-select font-body-sm input-premium">
                      <option value="Computer Science">Computer Science</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Design">Design</option>
                      <option value="Business">Business</option>
                    </select>
                  </div>

                  <div className="col-12 col-md-4">
                    <label className="font-label-caps text-on-surface-variant mb-1">Difficulty Level</label>
                    <select name="level" value={formData.level} onChange={handleInputChange} className="form-select font-body-sm input-premium">
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div className="col-12 col-md-4">
                    <label className="font-label-caps text-on-surface-variant mb-1">Course Price ($ USD)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="0 for 100% Free"
                      className="form-control font-body-sm input-premium"
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="font-label-caps text-on-surface-variant mb-1">Tech Stack Tags (Comma separated)</label>
                    <input
                      type="text"
                      name="techStack"
                      value={formData.techStack}
                      onChange={handleInputChange}
                      placeholder="React, Node.js, Express, MongoDB"
                      className="form-control font-body-sm input-premium"
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="font-label-caps text-on-surface-variant mb-1">Thumbnail Image URL</label>
                    <input
                      type="url"
                      name="thumbnail"
                      value={formData.thumbnail}
                      onChange={handleInputChange}
                      placeholder="https://images.unsplash.com/..."
                      className="form-control font-body-sm input-premium"
                    />
                  </div>

                  <div className="col-12">
                    <label className="font-label-caps text-on-surface-variant mb-1">Course Description</label>
                    <textarea
                      name="description"
                      rows="2"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Comprehensive syllabus overview and career learning goals..."
                      className="form-control font-body-sm input-premium"
                    />
                  </div>

                  {/* MODULES & LESSONS EDITOR */}
                  <div className="col-12 mt-4">
                    <div className="d-flex align-items-center justify-content-between mb-3 bg-surface-container-low p-2.5 rounded-3 border border-outline-variant/30">
                      <div>
                        <span className="font-label-caps text-primary fw-bold d-block" style={{ fontSize: '12px' }}>
                          📹 MODULES & LESSONS ({formData.modules?.length || 0} Modules, {formData.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0} Lessons)
                        </span>
                        <span className="font-body-sm text-muted" style={{ fontSize: '11px' }}>
                          Organize modules and synchronize video lessons.
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddModule}
                        className="btn btn-sm btn-primary font-body-sm px-3 py-1.5 rounded-pill shadow-xs d-flex align-items-center gap-1"
                      >
                        <span className="material-symbols-outlined fs-6">add</span> + Add New Module
                      </button>
                    </div>

                    <div className="d-flex flex-column gap-3" style={{ maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }}>
                      {formData.modules?.map((mod, mIdx) => (
                        <div key={mIdx} className="p-3 bg-white rounded-3 border border-outline-variant/40 shadow-xs">
                          {/* Module Header */}
                          <div className="d-flex align-items-center justify-content-between gap-2 mb-2 pb-2 border-bottom border-outline-variant/20">
                            <div className="d-flex align-items-center gap-2 flex-grow-1">
                              <span className="badge bg-primary text-white font-label-caps px-2 py-1 rounded">
                                Module {mIdx + 1}
                              </span>
                              <input
                                type="text"
                                value={mod.title}
                                onChange={(e) => handleModuleTitleChange(mIdx, e.target.value)}
                                placeholder="Module Title (e.g. Foundations & Setup)"
                                className="form-control form-control-sm font-body-sm fw-semibold"
                                required
                              />
                            </div>
                            <div className="d-flex align-items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleAddLesson(mIdx)}
                                className="btn btn-sm btn-outline-primary font-body-sm px-2.5 py-1 rounded-2 text-nowrap d-flex align-items-center gap-1"
                                title="Add lesson to this module"
                              >
                                <span className="material-symbols-outlined fs-6">add</span> Lesson
                              </button>
                              {formData.modules.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveModule(mIdx)}
                                  className="btn btn-sm btn-outline-danger font-body-sm px-2 py-1 rounded-2"
                                  title="Delete this module"
                                >
                                  <span className="material-symbols-outlined fs-6">delete</span>
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Lessons in Module */}
                          <div className="d-flex flex-column gap-2 ps-2">
                            {mod.lessons?.map((les, lIdx) => (
                              <div key={lIdx} className="row g-2 align-items-center bg-surface-container-lowest p-2 rounded-2 border border-outline-variant/20">
                                <div className="col-12 col-md-4">
                                  <div className="input-group input-group-sm">
                                    <span className="input-group-text bg-light text-muted font-label-caps" style={{ fontSize: '10px' }}>
                                      {lIdx + 1}
                                    </span>
                                    <input
                                      type="text"
                                      value={les.title}
                                      onChange={(e) => handleLessonChange(mIdx, lIdx, 'title', e.target.value)}
                                      placeholder="Lesson Title"
                                      className="form-control form-control-sm font-body-sm"
                                      required
                                    />
                                  </div>
                                </div>
                                <div className="col-4 col-md-2">
                                  <input
                                    type="text"
                                    value={les.duration}
                                    onChange={(e) => handleLessonChange(mIdx, lIdx, 'duration', e.target.value)}
                                    placeholder="15:00"
                                    className="form-control form-control-sm font-body-sm text-center"
                                  />
                                </div>
                                <div className="col-7 col-md-5">
                                  <input
                                    type="text"
                                    value={les.videoUrl}
                                    onChange={(e) => handleLessonChange(mIdx, lIdx, 'videoUrl', e.target.value)}
                                    placeholder="YouTube Video URL (https://www.youtube.com/watch?v=...)"
                                    className="form-control form-control-sm font-body-sm"
                                  />
                                </div>
                                <div className="col-1 text-end">
                                  {mod.lessons.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveLesson(mIdx, lIdx)}
                                      className="btn btn-sm btn-link text-danger p-0"
                                      title="Remove Lesson"
                                    >
                                      <span className="material-symbols-outlined fs-6">close</span>
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-end gap-2 mt-4 pt-3 border-top border-outline-variant/20">
                  <button type="button" onClick={() => setShowModal(false)} className="btn btn-outline-secondary font-body-sm px-4 rounded-3">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} className="btn btn-primary font-body-sm px-5 py-2.5 rounded-3 shadow-sm">
                    {saving ? 'Saving Course...' : modalMode === 'edit' ? 'Save Changes' : 'Publish Course'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
