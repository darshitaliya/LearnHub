import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

export default function StudentProfilePage() {
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    avatar: user?.avatar || '',
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
        avatar: user.avatar || '',
        bio: user.bio || '',
      }));
    }
  }, [user]);

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({});

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
            <div className="d-flex align-items-center gap-3 mb-3">
              <img
                src={formData.avatar || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCr9CHF12DMyqfTqDPJoBj_xC_FhZnCOV1I6J1SMhxGh9dcJ3yPsxD2HtzKxLTHnyTSpG0uX0MEYSV840HpNX-y1wjUL2W5uzc-jWwkVaS1whPOnE5SxNKOpXId2qBfE-9gu0NTJ6WC0LlVlX-xhbFqOzPgYtHkBVsyxV3NAvnoOITYBeL22R1XVab90baoCu1D0V5K4T5SuN-718WnFxyTEDsfdHu9ezm90n-qADcvPeqDMj_eqNdC'}
                alt="Avatar"
                className="rounded-circle border border-2 border-primary object-fit-cover"
                style={{ width: '70px', height: '70px' }}
              />
              <div className="flex-grow-1">
                <label className="font-label-caps text-on-surface-variant mb-1">Avatar Image URL</label>
                <input
                  type="text"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="form-control font-body-sm input-premium"
                />
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
