import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../services/api';

export default function CourseBuilderPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Computer Science',
    level: 'Intermediate',
    price: '99.99',
    description: '',
    lessonTitle: 'Module 1 Introduction',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        title: formData.title,
        category: formData.category,
        level: formData.level,
        price: parseFloat(formData.price),
        description: formData.description,
        modules: [
          {
            id: `m_${Date.now()}`,
            title: 'Module 1: Foundations',
            lessons: [
              {
                id: `les_${Date.now()}`,
                title: formData.lessonTitle || 'Introduction Lesson',
                duration: '15:00',
                videoUrl: formData.videoUrl,
                isLocked: false,
                type: 'video',
              },
            ],
          },
        ],
      };

      await api.post('/courses', payload);
      navigate('/instructor');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create course.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-surface">
      <Navbar />

      <main className="flex-grow-1 max-w-container-max mx-auto px-3 px-md-5 py-4 py-md-5 w-100">
        <div className="bg-white rounded-4 border border-outline-variant/30 p-4 p-md-5 shadow-sm max-w-lg mx-auto">
          <h1 className="font-headline-md fw-bold mb-2">Create New Course</h1>
          <p className="font-body-base text-on-surface-variant mb-4">Build and publish a new course to the LearnHub catalog.</p>

          {error && <div className="alert alert-danger font-body-sm rounded-3">{error}</div>}

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <div className="d-flex flex-column gap-1">
              <label className="font-label-caps text-on-surface-variant">Course Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Master React & Node.js Architecture"
                className="form-control font-body-base input-premium"
                required
              />
            </div>

            <div className="row g-3">
              <div className="col-6">
                <label className="font-label-caps text-on-surface-variant">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="form-select font-body-sm input-premium">
                  <option value="Computer Science">Computer Science</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Design">Design</option>
                  <option value="Business">Business</option>
                </select>
              </div>

              <div className="col-6">
                <label className="font-label-caps text-on-surface-variant">Level</label>
                <select name="level" value={formData.level} onChange={handleChange} className="form-select font-body-sm input-premium">
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="d-flex flex-column gap-1">
              <label className="font-label-caps text-on-surface-variant">Price (₹ INR)</label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-control font-body-base input-premium"
                required
              />
            </div>

            <div className="d-flex flex-column gap-1">
              <label className="font-label-caps text-on-surface-variant">Description & Overview</label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Master state-of-the-art software principles..."
                className="form-control font-body-sm input-premium"
                required
              />
            </div>

            <hr className="my-2 border-outline-variant/30" />

            <h3 className="font-body-base fw-bold text-on-surface m-0">Initial Lesson Details</h3>

            <div className="d-flex flex-column gap-1">
              <label className="font-label-caps text-on-surface-variant">Lesson 1 Title</label>
              <input
                type="text"
                name="lessonTitle"
                value={formData.lessonTitle}
                onChange={handleChange}
                placeholder="Introduction & Setup"
                className="form-control font-body-base input-premium"
              />
            </div>

            <div className="d-flex flex-column gap-1">
              <label className="font-label-caps text-on-surface-variant">Video Stream URL (MP4 / Stream)</label>
              <input
                type="text"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                className="form-control font-body-sm input-premium"
              />
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary font-body-base py-3 rounded-3 mt-3">
              {loading ? 'Publishing Course...' : 'Publish Course'}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
