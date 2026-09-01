import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { STATIC_AVATARS } from '../data/staticAvatars';

export default function StudentProfilePage() {
  const { user, updateProfile } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    avatar: user?.avatar || STATIC_AVATARS[0].url,
    bio: user?.bio || '',
    currentPassword: '',
    newPassword: '',
  });

  React.useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || '',
        phone: user.phone || '',
        avatar: user.avatar || STATIC_AVATARS[0].url,
        bio: user.bio || '',
      }));
    }
  }, [user]);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const categories = ['All', '3D & Anime', 'Tech & Robots', 'Pixel & Retro', 'Minimalist', 'Real Life'];

  const filteredAvatars = selectedCategory === 'All'
    ? STATIC_AVATARS
    : STATIC_AVATARS.filter((a) => a.category === selectedCategory);

  const handleSelectAvatar = (url) => {
    setFormData((prev) => ({ ...prev, avatar: url }));
  };

  const handleShuffleAvatar = () => {
    const randomIndex = Math.floor(Math.random() * STATIC_AVATARS.length);
    setFormData((prev) => ({ ...prev, avatar: STATIC_AVATARS[randomIndex].url }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.name?.trim()) {
      errors.name = 'Full name is required.';
    }
    if (formData.phone && !/^[\+\d\s\(\)\-]{7,20}$/.test(formData.phone.trim())) {
      errors.phone = 'Please enter a valid phone number.';
    }
    if (formData.newPassword) {
      if (!formData.currentPassword) {
        errors.currentPassword = 'Current password is required to set a new password.';
      }
      if (formData.newPassword.length < 6) {
        errors.newPassword = 'New password must be at least 6 characters.';
      }
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setFieldErrors({});

    const clientErrors = validate();
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      setError(Object.values(clientErrors)[0]);
      return;
    }

    setLoading(true);
    try {
      await updateProfile(formData);
      setMessage('Profile updated successfully!');
      setFormData((prev) => ({ ...prev, currentPassword: '', newPassword: '' }));
    } catch (err) {
      const serverErr = err.response?.data?.error || 'Failed to update profile.';
      setError(serverErr);
      if (err.response?.data?.fieldErrors) {
        setFieldErrors(err.response.data.fieldErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-surface">
      <Navbar />

      <main className="flex-grow-1 max-w-container-max mx-auto px-3 px-md-5 py-4 py-md-5 w-100">
        <div className="bg-white rounded-4 border border-outline-variant/30 p-4 p-md-5 shadow-sm max-w-lg mx-auto">
          <h1 className="font-headline-md fw-bold mb-1">Account Profile Settings</h1>
          <p className="font-body-base text-on-surface-variant mb-4">Manage your personal information and security credentials.</p>

          {message && <div className="alert alert-success font-body-sm rounded-3">{message}</div>}
          {error && <div className="alert alert-danger font-body-sm rounded-3">{error}</div>}

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            {/* Profile Avatar Selection Section */}
            <div className="p-3.5 p-md-4 rounded-4 bg-surface-container-low border border-outline-variant/30 mb-2">
              <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mb-3 pb-3 border-bottom border-outline-variant/20">
                <div className="d-flex align-items-center gap-3">
                  <div className="position-relative">
                    <img
                      src={formData.avatar || STATIC_AVATARS[0].url}
                      alt="Selected Avatar"
                      className="rounded-circle border border-3 border-primary object-fit-cover shadow-sm bg-white"
                      style={{ width: '74px', height: '74px' }}
                    />
                    <span
                      className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle d-flex align-items-center justify-content-center border border-2 border-white shadow-xs"
                      style={{ width: '22px', height: '22px', fontSize: '12px' }}
                      title="Active Avatar"
                    >
                      ✓
                    </span>
                  </div>
                  <div>
                    <span className="font-label-caps text-primary fw-bold d-block" style={{ fontSize: '11px' }}>
                      SELECTED AVATAR
                    </span>
                    <h4 className="font-body-base fw-bold text-on-surface m-0" style={{ fontSize: '15px' }}>
                      {formData.name || 'Your Profile'}
                    </h4>
                    <span className="font-body-sm text-on-surface-variant" style={{ fontSize: '12px' }}>
                      Click any avatar below to select
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleShuffleAvatar}
                  className="btn btn-sm btn-outline-primary font-label-caps d-flex align-items-center gap-1.5 px-3 py-1.5 rounded-pill shadow-xs align-self-start align-self-sm-center"
                  style={{ fontSize: '12px' }}
                >
                  <span>🎲 Randomize</span>
                </button>
              </div>

              {/* Category Filter Pills */}
              <div className="d-flex align-items-center gap-1.5 flex-wrap mb-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`btn btn-sm py-0.5 px-2.5 rounded-pill font-label-caps transition-all ${
                      selectedCategory === cat
                        ? 'btn-primary text-white shadow-xs'
                        : 'btn-surface border border-outline-variant/30 text-on-surface-variant hover-primary'
                    }`}
                    style={{ fontSize: '11px' }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Avatar Selector Visual Grid */}
              <div
                className="d-grid gap-2.5 p-2 rounded-3 bg-white border border-outline-variant/20 overflow-y-auto"
                style={{
                  gridTemplateColumns: 'repeat(auto-fill, minmax(58px, 1fr))',
                  maxHeight: '190px',
                }}
              >
                {filteredAvatars.map((av) => {
                  const isSelected = formData.avatar === av.url;
                  return (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => handleSelectAvatar(av.url)}
                      title={av.name}
                      className={`p-1 rounded-circle border-0 bg-transparent position-relative transition-all d-flex align-items-center justify-content-center ${
                        isSelected ? 'scale-105' : 'opacity-85 hover-opacity-100 hover-scale'
                      }`}
                      style={{ outline: 'none' }}
                    >
                      <div
                        className={`rounded-circle p-0.5 transition-all ${
                          isSelected
                            ? 'ring-3 ring-primary shadow-sm bg-primary/10'
                            : 'border border-outline-variant/30 bg-surface-container-low hover-border-primary'
                        }`}
                      >
                        <img
                          src={av.url}
                          alt={av.name}
                          className="rounded-circle object-fit-cover bg-white"
                          style={{ width: '48px', height: '48px' }}
                        />
                      </div>
                      {isSelected && (
                        <span
                          className="position-absolute top-0 end-0 bg-success text-white rounded-circle d-flex align-items-center justify-content-center border border-2 border-white shadow-xs"
                          style={{ width: '18px', height: '18px', fontSize: '10px' }}
                        >
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="d-flex flex-column gap-1">
              <label className="font-label-caps text-on-surface-variant">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-control font-body-base input-premium ${fieldErrors.name ? 'is-invalid' : ''}`}
                required
              />
              {fieldErrors.name && <div className="invalid-feedback font-body-sm d-block">{fieldErrors.name}</div>}
            </div>

            <div className="d-flex flex-column gap-1">
              <label className="font-label-caps text-on-surface-variant">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className={`form-control font-body-base input-premium ${fieldErrors.phone ? 'is-invalid' : ''}`}
              />
              {fieldErrors.phone && <div className="invalid-feedback font-body-sm d-block">{fieldErrors.phone}</div>}
            </div>

            <div className="d-flex flex-column gap-1">
              <label className="font-label-caps text-on-surface-variant">Bio / Headline</label>
              <textarea
                name="bio"
                rows="3"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Software Engineer passionate about AI and Web Dev..."
                className="form-control font-body-sm input-premium"
              />
            </div>

            <hr className="my-3 border-outline-variant/30" />

            <h3 className="font-body-base fw-bold text-on-surface mb-2">Change Password</h3>

            <div className="d-flex flex-column gap-1">
              <label className="font-label-caps text-on-surface-variant">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`form-control font-body-base input-premium ${fieldErrors.currentPassword ? 'is-invalid' : ''}`}
              />
              {fieldErrors.currentPassword && <div className="invalid-feedback font-body-sm d-block">{fieldErrors.currentPassword}</div>}
            </div>

            <div className="d-flex flex-column gap-1">
              <label className="font-label-caps text-on-surface-variant">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`form-control font-body-base input-premium ${fieldErrors.newPassword ? 'is-invalid' : ''}`}
              />
              {fieldErrors.newPassword && <div className="invalid-feedback font-body-sm d-block">{fieldErrors.newPassword}</div>}
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary font-body-base py-3 rounded-3 mt-3">
              {loading ? 'Saving Changes...' : 'Save Profile Settings'}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
