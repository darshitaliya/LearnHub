import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../services/api';

export default function InstructorDashboardPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInstructorCourses();
  }, []);

  const fetchInstructorCourses = async () => {
    setLoading(true);
    try {
      const res = await api.get('/courses');
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-surface">
      <Navbar />

      <main className="flex-grow-1 max-w-container-max mx-auto px-3 px-md-5 py-4 py-md-5 w-100">
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
          <div>
            <span className="font-label-caps text-secondary">INSTRUCTOR MANAGEMENT</span>
            <h1 className="font-headline-md text-on-surface m-0 fw-bold fs-2">Instructor Dashboard</h1>
          </div>

          <Link to="/instructor/course/create" className="btn btn-primary font-body-base px-4 py-3 rounded-3 d-flex align-items-center gap-2">
            <span className="material-symbols-outlined fs-5">add</span> Create New Course
          </Link>
        </div>

        {/* Stats Row */}
        <div className="row g-4 mb-4">
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="bg-white rounded-4 border border-outline-variant/30 p-4 shadow-sm">
              <span className="font-label-caps text-on-surface-variant">TOTAL COURSES</span>
              <h3 className="font-display-lg-mobile text-on-surface fw-bold m-0 mt-1">{courses.length}</h3>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="bg-white rounded-4 border border-outline-variant/30 p-4 shadow-sm">
              <span className="font-label-caps text-secondary">TOTAL STUDENTS</span>
              <h3 className="font-display-lg-mobile text-on-surface fw-bold m-0 mt-1">14,850</h3>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="bg-white rounded-4 border border-outline-variant/30 p-4 shadow-sm">
              <span className="font-label-caps text-primary">AVG COURSE RATING</span>
              <h3 className="font-display-lg-mobile text-on-surface fw-bold m-0 mt-1">4.8 / 5</h3>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="bg-white rounded-4 border border-outline-variant/30 p-4 shadow-sm">
              <span className="font-label-caps text-success">TOTAL REVENUE</span>
              <h3 className="font-display-lg-mobile text-on-surface fw-bold m-0 mt-1">₹2,45,900</h3>
            </div>
          </div>
        </div>

        {/* Course List Table */}
        <div className="bg-white rounded-4 border border-outline-variant/30 p-4 shadow-sm">
          <h3 className="font-headline-md fs-5 fw-bold mb-3">Published Courses</h3>

          {loading ? (
            <div className="text-center py-4"><div className="spinner-border text-primary" role="status"></div></div>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr className="font-label-caps text-on-surface-variant">
                    <th>Course Title</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((crs) => (
                    <tr key={crs.id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <img src={crs.thumbnail} alt={crs.title} className="rounded object-fit-cover" style={{ width: '48px', height: '36px' }} />
                          <span className="font-body-base fw-bold text-on-surface">{crs.title}</span>
                        </div>
                      </td>
                      <td className="font-body-sm text-on-surface-variant">{crs.category}</td>
                      <td><span className="badge bg-success-container text-success font-label-caps px-2 py-0.5 fw-bold">FREE</span></td>
                      <td className="font-body-sm">⭐ {crs.rating}</td>
                      <td>
                        <span className="badge bg-success font-label-caps px-2 py-1">Published</span>
                      </td>
                      <td className="text-end">
                        <button onClick={() => navigate(`/course/${crs.id}`)} className="btn btn-sm btn-outline-primary me-2">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
