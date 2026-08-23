import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CourseCard from '../components/CourseCard';
import EnrollmentFormModal from '../components/EnrollmentFormModal';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function CourseListingPage() {
  const { user, refreshUser } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [level, setLevel] = useState(searchParams.get('level') || 'All');
  const [sort, setSort] = useState(searchParams.get('sort') || 'recommended');
  const [search, setSearch] = useState(searchParams.get('search') || '');

  // Enrollment Modal state
  const [selectedEnrollCourse, setSelectedEnrollCourse] = useState(null);

  useEffect(() => {
    const qCat = searchParams.get('category');
    const qSearch = searchParams.get('search');
    if (qCat && qCat !== category) setCategory(qCat);
    if (qSearch !== null && qSearch !== search) setSearch(qSearch);
  }, [searchParams]);

  useEffect(() => {
    fetchFilteredCourses();
  }, [category, level, sort, search]);

  const fetchFilteredCourses = async () => {
    setLoading(true);
    try {
      const res = await api.get('/courses', {
        params: {
          category: category !== 'All' ? category : undefined,
          level: level !== 'All' ? level : undefined,
          sort: sort !== 'recommended' ? sort : undefined,
          search: search.trim() || undefined,
        },
      });
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetFilters = () => {
    setCategory('All');
    setLevel('All');
    setSort('recommended');
    setSearch('');
    setSearchParams({});
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-surface">
      <Navbar />

      <main className="flex-grow-1 max-w-container-max mx-auto px-3 px-md-5 py-4 py-md-5 w-100">
        {/* Header Title & Sorting Bar */}
        <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4 pb-2 border-bottom border-outline-variant/20">
          <div>
            <span className="font-label-caps text-primary">EXPLORE PLATFORM CURRICULUM</span>
            <h1 className="font-headline-md text-on-surface m-0 fw-bold fs-2">
              All Courses ({courses.length})
            </h1>
          </div>

          <div className="d-flex align-items-center gap-2">
            <span className="font-body-sm text-on-surface-variant whitespace-nowrap">Sort by:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="form-select font-body-sm rounded-3 border-outline-variant/30 input-premium w-auto"
            >
              <option value="recommended">Recommended</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips */}
        {(category !== 'All' || level !== 'All' || search) && (
          <div className="d-flex flex-wrap align-items-center gap-2 mb-4 bg-white p-3 rounded-4 border border-outline-variant/30 shadow-xs">
            <span className="font-label-caps text-on-surface-variant me-1" style={{ fontSize: '11px' }}>Active Filters:</span>
            {category !== 'All' && (
              <span className="badge bg-primary-container text-primary font-label-caps px-3 py-1.5 rounded-pill d-flex align-items-center gap-1">
                Category: {category}
                <span className="material-symbols-outlined fs-6 cursor-pointer" onClick={() => setCategory('All')}>close</span>
              </span>
            )}
            {level !== 'All' && (
              <span className="badge bg-secondary-container text-secondary font-label-caps px-3 py-1.5 rounded-pill d-flex align-items-center gap-1">
                Level: {level}
                <span className="material-symbols-outlined fs-6 cursor-pointer" onClick={() => setLevel('All')}>close</span>
              </span>
            )}
            {search && (
              <span className="badge bg-surface-container text-on-surface font-label-caps px-3 py-1.5 rounded-pill d-flex align-items-center gap-1 border">
                Search: "{search}"
                <span className="material-symbols-outlined fs-6 cursor-pointer" onClick={() => setSearch('')}>close</span>
              </span>
            )}
            <button onClick={handleResetFilters} className="btn btn-link text-primary font-body-sm p-0 ms-auto text-decoration-none fw-semibold">
              Clear All
            </button>
          </div>
        )}

        <div className="row g-4">
          {/* Sidebar Filter Column */}
          <div className="col-12 col-lg-3">
            <div className="bg-white border border-outline-variant/30 rounded-4 p-4 shadow-sm sticky-top" style={{ top: '90px', zIndex: 2 }}>
              <h3 className="font-headline-md text-on-surface fs-5 mb-4 fw-bold d-flex align-items-center gap-2">
                <span className="material-symbols-outlined text-primary">filter_list</span> Filter Catalog
              </h3>

              {/* Search Keywords */}
              <div className="mb-4">
                <label className="font-label-caps text-on-surface-variant mb-2">Search Keywords</label>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search titles, tech, instructor..."
                  className="form-control font-body-sm rounded-3 input-premium py-2 px-3"
                />
              </div>

              {/* Category Radio Group */}
              <div className="mb-4">
                <label className="font-label-caps text-on-surface-variant mb-2">Category</label>
                <div className="d-flex flex-column gap-1">
                  {['All', 'Data Science', 'Computer Science', 'Design', 'Business'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`btn text-start font-body-sm py-2 px-3 rounded-3 border-0 transition-colors ${
                        category === cat ? 'bg-primary text-white fw-bold shadow-xs' : 'hover-bg-low text-on-surface'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Level */}
              <div className="mb-3">
                <label className="font-label-caps text-on-surface-variant mb-2">Difficulty Level</label>
                <div className="d-flex flex-column gap-1">
                  {['All', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setLevel(lvl)}
                      className={`btn text-start font-body-sm py-2 px-3 rounded-3 border-0 transition-colors ${
                        level === lvl ? 'bg-secondary text-white fw-bold shadow-xs' : 'hover-bg-low text-on-surface'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Course Grid */}
          <div className="col-12 col-lg-9">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading courses...</span>
                </div>
              </div>
            ) : courses.length === 0 ? (
              <div className="bg-white rounded-4 border border-outline-variant/30 p-5 text-center shadow-sm">
                <span className="material-symbols-outlined fs-1 text-outline mb-2">search_off</span>
                <h3 className="font-headline-md fw-bold mb-2">No Courses Found</h3>
                <p className="font-body-base text-on-surface-variant mb-4">
                  We couldn't find any courses matching your search criteria.
                </p>
                <button onClick={handleResetFilters} className="btn btn-primary font-body-base px-4 py-2 rounded-3">
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="row g-4">
                {courses.map((course) => (
                  <div key={course.id || course._id} className="col-12 col-md-6 col-xl-4">
                    <CourseCard course={course} onEnrollClick={(crs) => setSelectedEnrollCourse(crs)} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Enrollment Form & Success Modal */}
      {selectedEnrollCourse && (
        <EnrollmentFormModal
          course={selectedEnrollCourse}
          user={user}
          onClose={() => setSelectedEnrollCourse(null)}
          onSuccess={() => {
            if (refreshUser) refreshUser();
          }}
        />
      )}

      <Footer />
    </div>
  );
}
