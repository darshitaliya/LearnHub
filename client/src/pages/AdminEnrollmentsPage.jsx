import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import api from '../services/api';

export default function AdminEnrollmentsPage() {
  const navigate = useNavigate();

  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Manual Enroll Modal State
  const [showManualEnrollModal, setShowManualEnrollModal] = useState(false);
  const [manualForm, setManualForm] = useState({
    userId: '',
    name: '',
    email: '',
    phone: '',
    profession: 'Student',
    goal: 'Skill Upgrade & Professional Certification',
    courseId: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [enrRes, crsRes, usrRes] = await Promise.all([
        api.get('/admin/enrollments').catch(() => ({ data: [] })),
        api.get('/courses').catch(() => ({ data: [] })),
        api.get('/admin/users').catch(() => ({ data: [] })),
      ]);
      const enrList = enrRes.data || [];
      enrList.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      setEnrollments(enrList);
      setCourses(crsRes.data || []);
      setUsers(usrRes.data || []);

      if (crsRes.data?.[0]) {
        setManualForm((prev) => ({ ...prev, courseId: crsRes.data[0].id || crsRes.data[0]._id }));
      }
    } catch (err) {
      console.error('Failed to fetch enrollments data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEnrollment = async (id, studentName, courseTitle) => {
    if (window.confirm(`Are you sure you want to cancel and delete enrollment for "${studentName}" in "${courseTitle}"?`)) {
      try {
        await api.delete(`/admin/enrollments/${id}`);
        fetchData();
        alert(`✅ Enrollment deleted successfully.`);
      } catch (err) {
        alert('Failed to delete enrollment: ' + (err.response?.data?.error || err.message));
      }
    }
  };

  const handleManualEnrollSubmit = async (e) => {
    e.preventDefault();
    if (!manualForm.courseId) {
      alert('Please select a course to enroll.');
      return;
    }
    if (!manualForm.name || !manualForm.email) {
      alert('Student name and email are required.');
      return;
    }

    try {
      await api.post(`/courses/${manualForm.courseId}/enroll`, {
        name: manualForm.name.trim(),
        email: manualForm.email.trim(),
        phone: manualForm.phone.trim(),
        profession: manualForm.profession,
        goal: manualForm.goal,
      });

      setShowManualEnrollModal(false);
      setManualForm({
        userId: '',
        name: '',
        email: '',
        phone: '',
        profession: 'Student',
        goal: 'Skill Upgrade & Professional Certification',
        courseId: courses[0]?.id || '',
      });
      fetchData();
      alert('✅ Student Enrolled Successfully in Course!');
    } catch (err) {
      alert('Failed to enroll student: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleUserSelect = (e) => {
    const selectedUserId = e.target.value;
    if (!selectedUserId) {
      setManualForm({ ...manualForm, userId: '', name: '', email: '', phone: '' });
      return;
    }
    const found = users.find((u) => u.id === selectedUserId || u._id === selectedUserId);
    if (found) {
      setManualForm({
        ...manualForm,
        userId: found.id || found._id,
        name: found.name || '',
        email: found.email || '',
        phone: found.phone || '',
      });
    }
  };

  const filteredEnrollments = enrollments.filter((enr) => {
    const matchesSearch =
      enr.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enr.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enr.userPhone?.includes(searchTerm) ||
      enr.courseTitle?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = courseFilter === 'All' || enr.courseId === courseFilter;
    return matchesSearch && matchesCourse;
  });

  const totalPages = Math.ceil(filteredEnrollments.length / itemsPerPage) || 1;
  const paginatedEnrollments = filteredEnrollments.slice(
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
        <div className="p-3 p-md-5 max-w-container-max mx-auto d-flex flex-column gap-4">
          {/* Header Bar */}
          <header className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
            <div>
              <h1 className="font-headline-md text-on-surface m-0 fw-bold fs-2">Enrolled Students Management</h1>
            </div>
          </header>

          {/* Quick Metrics Bento Grid */}
          <section className="row g-3">
            <div className="col-12 col-sm-6 col-lg-4">
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-4 p-4 shadow-sm h-100">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="rounded-circle bg-primary-container text-white d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                    <span className="material-symbols-outlined fill">assignment_turned_in</span>
                  </div>
                </div>
                <h3 className="font-display-lg-mobile text-on-surface mb-1 fw-bold">{loading ? '...' : enrollments.length}</h3>
                <p className="font-body-sm text-on-surface-variant m-0">Total Student Applications</p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-4">
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-4 p-4 shadow-sm h-100">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                    <span className="material-symbols-outlined fill">check_circle</span>
                  </div>
                </div>
                <h3 className="font-display-lg-mobile text-on-surface mb-1 fw-bold">{loading ? '...' : enrollments.filter((e) => e.status === 'Active').length}</h3>
                <p className="font-body-sm text-on-surface-variant m-0">Active Course Enrollments</p>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-4">
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-4 p-4 shadow-sm h-100">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="rounded-circle text-secondary d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px', backgroundColor: 'rgba(0, 104, 122, 0.1)' }}>
                    <span className="material-symbols-outlined fill">menu_book</span>
                  </div>
                </div>
                <h3 className="font-display-lg-mobile text-on-surface mb-1 fw-bold">{loading ? '...' : Array.from(new Set(enrollments.map((e) => e.courseId))).length}</h3>
                <p className="font-body-sm text-on-surface-variant m-0">Unique Courses Enrolled</p>
              </div>
            </div>
          </section>

          {/* Student Enrollments Table Section */}
          <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-4 p-4 shadow-sm">
            <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
              <div className="d-flex flex-wrap align-items-center gap-3">
                <div className="position-relative" style={{ width: '260px', flexShrink: 0 }}>
                  <span className="material-symbols-outlined position-absolute text-on-surface-variant" style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px' }}>search</span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search name, email, course..."
                    className="form-control font-body-sm ps-5 py-2 input-premium rounded-3 w-100"
                  />
                </div>

                <div style={{ width: '220px', flexShrink: 0 }}>
                  <select
                    value={courseFilter}
                    onChange={(e) => {
                      setCourseFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="form-select font-body-sm py-2 input-premium rounded-3 w-100"
                  >
                    <option value="All">All Enrolled Courses</option>
                    {courses.map((c) => (
                      <option key={c.id || c._id} value={c.id || c._id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={() => {
                  const headers = ['Student Name,Email,Phone,Course Title,Profession,Goal,Date'];
                  const rows = filteredEnrollments.map(e => `"${e.userName}","${e.userEmail}","${e.userPhone || ''}","${e.courseTitle}","${e.profession}","${e.goal}","${new Date(e.createdAt).toLocaleDateString()}"`);
                  const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
                  const encodedUri = encodeURI(csvContent);
                  const link = document.createElement('a');
                  link.setAttribute('href', encodedUri);
                  link.setAttribute('download', `LearnHub_Enrollments_Report_${new Date().toISOString().slice(0, 10)}.csv`);
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="btn btn-outline-primary font-body-sm px-3 py-2 rounded-3 d-flex align-items-center gap-1 text-nowrap"
              >
                <span className="material-symbols-outlined fs-6">download</span> Export CSV
              </button>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
              </div>
            ) : filteredEnrollments.length === 0 ? (
              <div className="text-center py-5 bg-surface-container-low rounded-3">
                <span className="material-symbols-outlined fs-1 text-outline mb-2">assignment_late</span>
                <h4 className="font-headline-md fw-bold mb-1">No Enrollments Found</h4>
                <p className="font-body-base text-on-surface-variant mb-3">No student course enrollment applications matched your search filters.</p>
                <button onClick={() => setShowManualEnrollModal(true)} className="btn btn-primary font-body-sm px-4 py-2 rounded-3">
                  Enroll Student Manually
                </button>
              </div>
            ) : (
              <>
                <div className="table-responsive border-0 overflow-x-hidden">
                  <table className="table align-middle table-hover mb-0 w-100">
                    <thead className="bg-surface-container-low">
                      <tr className="font-label-caps text-on-surface-variant text-nowrap whitespace-nowrap" style={{ fontSize: '11px' }}>
                        <th className="py-2.5 px-2">Student Name</th>
                        <th className="py-2.5 px-2">Email Address & Phone</th>
                        <th className="py-2.5 px-2">Enrolled Course</th>
                        <th className="py-2.5 px-2">Profession / Role</th>
                        <th className="py-2.5 px-2">Learning Goal</th>
                        <th className="py-2.5 px-2">Date</th>
                        <th className="py-2.5 px-2">Status</th>
                        <th className="py-2.5 px-2 text-end">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedEnrollments.map((enr) => (
                        <tr key={enr.id || enr._id}>
                          <td className="py-2.5 px-2 text-nowrap whitespace-nowrap">
                            <div className="d-flex align-items-center gap-2">
                              <div className="rounded-circle bg-primary-container text-white d-flex align-items-center justify-content-center fw-bold" style={{ width: '32px', height: '32px', fontSize: '13px', flexShrink: 0 }}>
                                {enr.userName?.charAt(0)?.toUpperCase() || 'S'}
                              </div>
                              <span className="font-body-sm fw-bold text-on-surface text-nowrap whitespace-nowrap">{enr.userName}</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-2 font-body-sm text-nowrap whitespace-nowrap">
                            <span className="d-block text-on-surface fw-medium text-nowrap whitespace-nowrap" style={{ fontSize: '12px' }}>{enr.userEmail}</span>
                            <span className="font-body-sm text-on-surface-variant text-nowrap whitespace-nowrap" style={{ fontSize: '11px' }}>{enr.userPhone}</span>
                          </td>
                          <td className="py-2.5 px-2 font-body-sm fw-bold text-primary" style={{ fontSize: '12px', lineHeight: '1.3' }}>
                            {enr.courseTitle}
                          </td>
                          <td className="py-2.5 px-2 text-nowrap whitespace-nowrap">
                            <span className="badge bg-secondary-container text-secondary font-label-caps px-2 py-0.5 rounded-pill text-nowrap whitespace-nowrap" style={{ fontSize: '10px' }}>{enr.profession}</span>
                          </td>
                          <td className="py-2.5 px-2 font-body-sm text-on-surface-variant" style={{ fontSize: '11px', lineHeight: '1.3' }}>
                            {enr.goal}
                          </td>
                          <td className="py-2.5 px-2 font-body-sm text-on-surface-variant text-nowrap whitespace-nowrap" style={{ fontSize: '11px' }}>
                            {new Date(enr.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="py-2.5 px-2 text-nowrap whitespace-nowrap">
                            <span className="badge bg-success text-white font-label-caps px-2 py-0.5 rounded-pill text-nowrap whitespace-nowrap" style={{ fontSize: '10px' }}>ACTIVE</span>
                          </td>
                          <td className="py-2.5 px-2 text-end text-nowrap whitespace-nowrap">
                            <button
                              onClick={() => handleDeleteEnrollment(enr.id || enr._id, enr.userName, enr.courseTitle)}
                              className="btn btn-sm btn-outline-danger font-body-sm px-2.5 py-1 rounded-3 d-flex align-items-center gap-1 ms-auto text-nowrap whitespace-nowrap"
                              style={{ fontSize: '11px' }}
                              title="Cancel / Delete Enrollment"
                            >
                              <span className="material-symbols-outlined fs-6">delete</span> <span>Cancel</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Table Pagination */}
                {totalPages > 1 && (
                  <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3 pt-4 mt-2 border-top border-outline-variant/20">
                    <span className="font-body-sm text-on-surface-variant">
                      Showing <strong>{(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredEnrollments.length)}</strong> of <strong>{filteredEnrollments.length}</strong> enrollments
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
          </section>
        </div>
      </main>

      {/* Manual Enroll Student Modal */}
      {showManualEnrollModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(11, 28, 48, 0.75)', backdropFilter: 'blur(8px)', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
              <div className="modal-header border-0 bg-primary text-white p-4">
                <h5 className="modal-title font-headline-md fw-bold d-flex align-items-center gap-2 m-0 fs-5">
                  <span className="material-symbols-outlined fill">person_add</span> Enroll Student Manually (Admin)
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowManualEnrollModal(false)}></button>
              </div>

              <form onSubmit={handleManualEnrollSubmit}>
                <div className="modal-body p-4 p-md-5 d-flex flex-column gap-3">
                  {/* Select Registered User Shortcut */}
                  <div className="p-3 bg-surface-container-low rounded-3 border border-outline-variant/30 mb-2">
                    <label className="font-label-caps text-primary fw-bold mb-1">OPTIONAL: Auto-fill from Registered Users</label>
                    <select value={manualForm.userId} onChange={handleUserSelect} className="form-select font-body-sm input-premium rounded-3">
                      <option value="">-- Select Registered User or enter manually below --</option>
                      {users.map((u) => (
                        <option key={u.id || u._id} value={u.id || u._id}>
                          {u.name} ({u.email})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="font-label-caps text-on-surface-variant mb-1">Select Course to Enroll *</label>
                      <select
                        required
                        value={manualForm.courseId}
                        onChange={(e) => setManualForm({ ...manualForm, courseId: e.target.value })}
                        className="form-select input-premium py-2.5 px-3 rounded-3"
                      >
                        {courses.map((c) => (
                          <option key={c.id || c._id} value={c.id || c._id}>
                            {c.title} ({c.category})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="font-label-caps text-on-surface-variant mb-1">Student Full Name *</label>
                      <input
                        type="text"
                        required
                        value={manualForm.name}
                        onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="form-control input-premium py-2.5 px-3 rounded-3"
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="font-label-caps text-on-surface-variant mb-1">Student Email Address *</label>
                      <input
                        type="email"
                        required
                        value={manualForm.email}
                        onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
                        placeholder="alex@learnhub.com"
                        className="form-control input-premium py-2.5 px-3 rounded-3"
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="font-label-caps text-on-surface-variant mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={manualForm.phone}
                        onChange={(e) => setManualForm({ ...manualForm, phone: e.target.value })}
                        placeholder="+91 98765 43212"
                        className="form-control input-premium py-2.5 px-3 rounded-3"
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="font-label-caps text-on-surface-variant mb-1">Profession / Role</label>
                      <select
                        value={manualForm.profession}
                        onChange={(e) => setManualForm({ ...manualForm, profession: e.target.value })}
                        className="form-select input-premium py-2.5 px-3 rounded-3"
                      >
                        <option value="Student">University / High School Student</option>
                        <option value="Software Developer">Software Engineer / Developer</option>
                        <option value="Data Analyst">Data Analyst / Scientist</option>
                        <option value="Freelancer">Freelancer / Consultant</option>
                        <option value="Job Seeker">Job Seeker / Transitioning Career</option>
                        <option value="Other">Other Profession</option>
                      </select>
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="font-label-caps text-on-surface-variant mb-1">Primary Learning Goal</label>
                      <select
                        value={manualForm.goal}
                        onChange={(e) => setManualForm({ ...manualForm, goal: e.target.value })}
                        className="form-select input-premium py-2.5 px-3 rounded-3"
                      >
                        <option value="Skill Upgrade & Professional Certification">Skill Upgrade & Professional Certification</option>
                        <option value="Career Transition to Tech Industry">Career Transition to Tech Industry</option>
                        <option value="Academic Course Requirement">Academic Course Requirement</option>
                        <option value="Personal Interest & Passion Project">Personal Interest & Passion Project</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-0 p-4 bg-surface-container-low">
                  <button type="button" onClick={() => setShowManualEnrollModal(false)} className="btn btn-outline-secondary font-body-sm px-4 rounded-3">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary font-body-sm px-4 py-2.5 rounded-3 shadow-xs">
                    Confirm & Enroll Student
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
