import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import api from '../services/api';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([
    { name: 'Computer Science', slug: 'computer-science', count: 0 },
    { name: 'Data Science', slug: 'data-science', count: 0 },
    { name: 'Design', slug: 'design', count: 0 },
    { name: 'Business', slug: 'business', count: 0 },
  ]);

  useEffect(() => {
    fetchCourseCounts();
  }, []);

  const fetchCourseCounts = async () => {
    try {
      const res = await api.get('/courses');
      const courses = res.data || [];
      setCategories((prev) =>
        prev.map((cat) => ({
          ...cat,
          count: courses.filter((c) => c.category?.toLowerCase() === cat.name.toLowerCase()).length,
        }))
      );
    } catch (err) {
      console.error('Failed to fetch course counts for categories:', err);
    }
  };

  return (
    <div className="d-flex min-vh-100 bg-surface overflow-hidden">
      <AdminSidebar />

      <main className="flex-grow-1 main-with-sidebar position-relative overflow-y-auto">
        <div className="position-relative z-1 p-3 p-md-5 max-w-container-max mx-auto d-flex flex-column gap-4">
          <header className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
            <div>
              <h1 className="font-display-lg-mobile text-on-surface fw-bold m-0" style={{ fontSize: '32px' }}>
                Course Categories
              </h1>
            </div>

            <button className="btn btn-primary font-body-sm px-4 py-2.5 rounded-3 shadow-sm d-flex align-items-center gap-2">
              <span className="material-symbols-outlined fs-5">add</span> Add Category
            </button>
          </header>

          <div className="bg-white rounded-4 border border-outline-variant/30 p-4 shadow-sm">
            <div className="table-responsive">
              <table className="table align-middle table-hover mb-0">
                <thead className="bg-surface-container-low">
                  <tr className="font-label-caps text-on-surface-variant">
                    <th className="py-3 px-3">Category Name</th>
                    <th className="py-3 px-3">URL Slug Filter</th>
                    <th className="py-3 px-3">Live Course Count</th>
                    <th className="py-3 px-3 text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c.slug}>
                      <td className="py-3 px-3 font-body-base fw-bold text-on-surface">{c.name}</td>
                      <td className="py-3 px-3 font-body-sm text-on-surface-variant">/courses?category={c.slug}</td>
                      <td className="py-3 px-3 font-body-sm fw-bold text-primary">{c.count} Active Courses</td>
                      <td className="py-3 px-3 text-end">
                        <button className="btn btn-sm btn-outline-secondary me-2 rounded-3">Edit</button>
                        <button className="btn btn-sm btn-outline-danger rounded-3">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
