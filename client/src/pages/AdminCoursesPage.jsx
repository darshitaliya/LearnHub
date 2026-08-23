import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import api from '../services/api';
import { COURSE_PRESETS_50 } from '../data/coursePresets50';

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
  const [creating, setCreating] = useState(false);
  const [selectedPresetKey, setSelectedPresetKey] = useState('');
  const [autoFillMessage, setAutoFillMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    category: 'Computer Science',
    level: 'Intermediate',
    description: '',
    techStack: 'React, Node.js, JavaScript',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    modules: [
      {
        title: 'Module 1: Foundations & Architecture',
        lessons: [
          {
            title: 'Course Overview & Setup',
            duration: '15:00',
            videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
          },
        ],
      },
    ],
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await api.get('/courses');
      setCourses(res.data || []);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    } finally {
      setLoading(false);
    }
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
        modules: found.modules.map((m) => ({
          title: m.title,
          lessons: m.lessons.map((l) => ({
            title: l.title,
            duration: l.duration,
            videoUrl: l.videoUrl,
          })),
        })),
      });
      setAutoFillMessage(`✅ Selected "${found.name}"! All fields, HD image & YouTube videos auto-filled.`);
    }
  };

  const handleAutoGenerateByTitle = () => {
    const titleLower = formData.title.toLowerCase().trim();
    if (!titleLower) {
      handleApplyPresetByKey(COURSE_PRESETS_50[0].key);
      return;
    }

    const matchedPreset = COURSE_PRESETS_50.find(
      (p) =>
        p.title.toLowerCase().includes(titleLower) ||
        p.techStack.toLowerCase().includes(titleLower) ||
        p.category.toLowerCase().includes(titleLower)
    ) || COURSE_PRESETS_50[0];

    handleApplyPresetByKey(matchedPreset.key);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddModule = () => {
    setFormData((prev) => ({
      ...prev,
      modules: [
        ...prev.modules,
        {
          title: `Module ${prev.modules.length + 1}: Practical Masterclass`,
          lessons: [
            {
              title: 'Hands-on Exercise & Code Walkthrough',
              duration: '18:00',
              videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
            },
          ],
        },
      ],
    }));
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return alert('Course title is required');

    setCreating(true);
    try {
      const payload = {
        title: formData.title,
        category: formData.category,
        level: formData.level,
        description: formData.description,
        thumbnail: formData.thumbnail,
        techStack: typeof formData.techStack === 'string' ? formData.techStack.split(',').map((s) => s.trim()) : formData.techStack,
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

      await api.post('/courses', payload);
      setShowModal(false);
      fetchCourses();
      alert('✅ New Course Published Successfully! It is now live in the student catalog and database.');
    } catch (err) {
      console.error(err);
      alert('Failed to publish course: ' + (err.response?.data?.error || err.message));
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await api.delete(`/courses/${courseId}`);
        fetchCourses();
      } catch (err) {
        alert('Failed to delete course');
      }
    }
  };

  const handleClearAllCourses = async () => {
    if (window.confirm('⚠️ Are you sure you want to CLEAR ALL COURSES from the platform database? This will clear the catalog so you can add new courses cleanly.')) {
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
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
            <div>
              <h1 className="font-display-lg-mobile text-on-surface fw-bold m-0" style={{ fontSize: '32px' }}>
                Course Management ({courses.length})
              </h1>
            </div>

            <div className="d-flex align-items-center gap-2">
              <button
                onClick={handleClearAllCourses}
                className="btn btn-outline-danger font-body-sm px-3 py-2.5 rounded-3 d-flex align-items-center gap-2"
                title="Clear all courses from platform database"
              >
                <span className="material-symbols-outlined fs-5">delete_sweep</span> Clear All Courses
              </button>
              <button
                onClick={() => {
                  setShowModal(true);
                  handleApplyPresetByKey('web_react_node');
                }}
                className="btn btn-primary font-body-sm px-4 py-2.5 rounded-3 shadow-sm d-flex align-items-center gap-2"
              >
                <span className="material-symbols-outlined fs-5">add_circle</span> Add Course
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

          <div className="bg-white rounded-4 border border-outline-variant/30 p-4 shadow-sm">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="text-center py-5 bg-surface-container-low rounded-3 p-4">
                <span className="material-symbols-outlined text-outline mb-2" style={{ fontSize: '48px' }}>search_off</span>
                <h4 className="font-headline-md fw-bold text-on-surface mb-2">No Matching Courses Found</h4>
                <p className="font-body-base text-on-surface-variant max-w-md mx-auto mb-4">
                  No courses matched your current filter criteria. Try resetting your search term or filters.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter('All');
                    setLevelFilter('All');
                    setCurrentPage(1);
                  }}
                  className="btn btn-outline-primary font-body-sm px-4 py-2 rounded-3"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className="table-responsive">
                  <table className="table align-middle table-hover mb-0">
                    <thead className="bg-surface-container-low">
                      <tr className="font-label-caps text-on-surface-variant">
                        <th className="py-3 px-3">Course Title & Tech Stack</th>
                        <th className="py-3 px-3">Category</th>
                        <th className="py-3 px-3">Modules Count</th>
                        <th className="py-3 px-3">Pricing</th>
                        <th className="py-3 px-3 text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedCourses.map((crs) => (
                        <tr key={crs.id || crs._id}>
                          <td className="py-3 px-3">
                            <div className="d-flex align-items-center gap-3">
                              <img src={crs.thumbnail} alt={crs.title} className="rounded object-fit-cover shadow-xs" style={{ width: '56px', height: '40px' }} />
                              <div>
                                <span className="font-body-base fw-bold text-on-surface d-block">{crs.title}</span>
                                <div className="d-flex flex-wrap gap-1 mt-1">
                                  {crs.techStack?.map((t, idx) => (
                                    <span key={idx} className="badge bg-surface-container text-on-surface-variant font-label-caps px-2 py-0.5" style={{ fontSize: '10px' }}>
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3 font-body-sm">{crs.category}</td>
                          <td className="py-3 px-3">
                            <span className="badge bg-primary-container text-on-primary-container font-label-caps px-2.5 py-1">
                              {crs.modules?.length || 1} Modules ({crs.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 2} Lessons)
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="badge bg-success-container text-success font-label-caps px-3 py-1 fw-bold">100% FREE</span>
                          </td>
                          <td className="py-3 px-3 text-end">
                            <div className="d-flex align-items-center justify-end gap-2">
                              <Link to={`/course/${crs.id}`} className="btn btn-sm btn-outline-primary font-body-sm px-3 py-1.5 rounded-3 text-nowrap whitespace-nowrap">
                                View Course
                              </Link>
                              <button onClick={() => handleDeleteCourse(crs.id)} className="btn btn-sm btn-outline-danger font-body-sm px-3 py-1.5 rounded-3 text-nowrap whitespace-nowrap">
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

      {/* Add Course Modal */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 rounded-4 shadow-lg p-4">
              <div className="modal-header border-0 pb-0">
                <div>
                  <h5 className="modal-title font-headline-md fw-bold text-on-surface fs-4">Publish New Course to Platform</h5>
                </div>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>

              {/* 50 Course Selection Dropdown Box */}
              <div className="mt-3 p-3 bg-surface-container-low rounded-3 border border-outline-variant/30">
                <label className="font-label-caps text-on-surface-variant mb-1.5 d-block" style={{ fontSize: '11px' }}>
                  Select Course Template (50 Pre-configured Subjects)
                </label>
                <select
                  value={selectedPresetKey}
                  onChange={(e) => handleApplyPresetByKey(e.target.value)}
                  className="form-select bg-white border border-outline-variant/40 rounded-3 px-3 py-2.5 font-body-sm w-100 fw-medium text-on-surface shadow-xs"
                  style={{ fontSize: '13px' }}
                >
                  <option value="">-- Choose 1 of 50 Pre-configured Courses --</option>
                  <optgroup label="🚀 Web Development & Frontend / Backend (1-10)">
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
                  <optgroup label="🎨 Design & User Experience (39-44)">
                    {COURSE_PRESETS_50.slice(38, 44).map((p) => (
                      <option key={p.key} value={p.key}>{p.name}</option>
                    ))}
                  </optgroup>
                  <optgroup label="⚙️ Databases, Blockchain & System Design (45-50)">
                    {COURSE_PRESETS_50.slice(44, 50).map((p) => (
                      <option key={p.key} value={p.key}>{p.name}</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              <form onSubmit={handleCreateCourse} className="modal-body p-0 mt-3">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="font-label-caps text-on-surface-variant mb-1">Course Title</label>
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

                  <div className="col-12 col-md-6">
                    <label className="font-label-caps text-on-surface-variant mb-1">Category</label>
                    <select name="category" value={formData.category} onChange={handleInputChange} className="form-select font-body-sm input-premium">
                      <option value="Computer Science">Computer Science</option>
                      <option value="Data Science">Data Science</option>
                      <option value="Design">Design</option>
                      <option value="Business">Business</option>
                    </select>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="font-label-caps text-on-surface-variant mb-1">Difficulty Level</label>
                    <select name="level" value={formData.level} onChange={handleInputChange} className="form-select font-body-sm input-premium">
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="font-label-caps text-on-surface-variant mb-1">Tech Stack Tags (Comma separated)</label>
                    <input
                      type="text"
                      name="techStack"
                      value={formData.techStack}
                      onChange={handleInputChange}
                      placeholder="React, Next.js, TypeScript, Node.js"
                      className="form-control font-body-sm input-premium"
                    />
                  </div>

                  <div className="col-12">
                    <label className="font-label-caps text-on-surface-variant mb-1">Thumbnail Image URL</label>
                    <input
                      type="url"
                      name="thumbnail"
                      value={formData.thumbnail}
                      onChange={handleInputChange}
                      placeholder="https://..."
                      className="form-control font-body-sm input-premium"
                    />
                  </div>

                  <div className="col-12">
                    <label className="font-label-caps text-on-surface-variant mb-1">Course Description</label>
                    <textarea
                      name="description"
                      rows="3"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="In-depth explanation of what students will master..."
                      className="form-control font-body-sm input-premium"
                    />
                  </div>

                  {/* Modules & Mapped Video Lessons */}
                  <div className="col-12">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <label className="font-label-caps text-primary fw-bold m-0">
                        📹 VIDEO MODULES & MAPPED YOUTUBE LESSONS ({formData.modules?.length || 0})
                      </label>
                      <button type="button" onClick={handleAddModule} className="btn btn-sm btn-outline-primary font-body-sm px-3 rounded-pill">
                        + Add Extra Module
                      </button>
                    </div>

                    <div className="d-flex flex-column gap-3 max-h-60 overflow-y-auto p-1">
                      {formData.modules?.map((mod, mIdx) => (
                        <div key={mIdx} className="p-3 bg-surface-container-low rounded-3 border border-outline-variant/30">
                          <h6 className="font-body-sm fw-bold text-on-surface mb-2">{mod.title}</h6>
                          <div className="d-flex flex-column gap-2">
                            {mod.lessons?.map((les, lIdx) => (
                              <div key={lIdx} className="row g-2 align-items-center">
                                <div className="col-12 col-md-5">
                                  <input
                                    type="text"
                                    value={les.title}
                                    onChange={(e) => {
                                      const updatedMods = [...formData.modules];
                                      updatedMods[mIdx].lessons[lIdx].title = e.target.value;
                                      setFormData({ ...formData, modules: updatedMods });
                                    }}
                                    placeholder="Lesson Title"
                                    className="form-control form-control-sm font-body-sm"
                                  />
                                </div>
                                <div className="col-12 col-md-7">
                                  <input
                                    type="text"
                                    value={les.videoUrl}
                                    onChange={(e) => {
                                      const updatedMods = [...formData.modules];
                                      updatedMods[mIdx].lessons[lIdx].videoUrl = e.target.value;
                                      setFormData({ ...formData, modules: updatedMods });
                                    }}
                                    placeholder="YouTube Video URL (https://www.youtube.com/watch?v=...)"
                                    className="form-control form-control-sm font-body-sm"
                                  />
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
                  <button type="submit" disabled={creating} className="btn btn-primary font-body-sm px-5 py-2.5 rounded-3 shadow-sm">
                    {creating ? 'Publishing Course...' : 'Publish Course'}
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
