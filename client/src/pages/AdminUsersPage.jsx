import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import api from '../services/api';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  // Add User Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [addFormData, setAddFormData] = useState({
    name: '',
    email: '',
    phone: '+91 98765 43210',
    password: '',
    role: 'student',
  });
  const [adding, setAdding] = useState(false);

  // Edit User Modal State
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '+91 98765 43210',
    role: 'student',
  });
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data || []);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUserSubmit = async (e) => {
    e.preventDefault();
    if (!addFormData.name || !addFormData.email || !addFormData.password) {
      return alert('Name, email, and password are required');
    }

    setAdding(true);
    try {
      await api.post('/admin/users', addFormData);
      setShowAddModal(false);
      setAddFormData({ name: '', email: '', phone: '+91 98765 43210', password: '', role: 'student' });
      fetchUsers();
      alert('✅ New Registered User Account Created Successfully!');
    } catch (err) {
      alert('Failed to register user: ' + (err.response?.data?.error || err.message));
    } finally {
      setAdding(false);
    }
  };

  const handleOpenEditModal = (user) => {
    setEditFormData({
      id: user.id || user._id,
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '+91 98765 43210',
      role: user.role || 'student',
    });
    setShowEditModal(true);
  };

  const handleEditUserSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await api.put(`/admin/users/${editFormData.id}`, {
        name: editFormData.name,
        email: editFormData.email,
        phone: editFormData.phone,
        role: editFormData.role,
      });
      setShowEditModal(false);
      fetchUsers();
      alert('✅ User Account Updated Successfully!');
    } catch (err) {
      alert('Failed to update user: ' + (err.response?.data?.error || err.message));
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete user account "${userName}"? This action cannot be undone.`)) {
      try {
        await api.delete(`/admin/users/${userId}`);
        fetchUsers();
        alert(`✅ User account "${userName}" deleted successfully.`);
      } catch (err) {
        alert('Failed to delete user: ' + (err.response?.data?.error || err.message));
      }
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.put(`/admin/users/${userId}/role`, { role: newRole });
      fetchUsers();
    } catch (err) {
      alert('Failed to update user role');
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone?.includes(searchTerm);
    const matchesRole = roleFilter === 'All' || u.role?.toLowerCase() === roleFilter.toLowerCase();
    return matchesSearch && matchesRole;
  });

  return (
    <div className="d-flex min-vh-100 bg-surface overflow-hidden">
      <AdminSidebar />

      <main className="flex-grow-1 main-with-sidebar position-relative overflow-y-auto">
        <div className="position-relative z-1 p-3 p-md-5 max-w-container-max mx-auto d-flex flex-column gap-4">
          <header className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
            <div>
              <h1 className="font-display-lg-mobile text-on-surface m-0 fw-bold" style={{ fontSize: '32px' }}>
                All Registered User Accounts ({users.length})
              </h1>
            </div>
          </header>

          <div className="bg-white rounded-4 border border-outline-variant/30 p-4 shadow-sm">
            <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
              <div className="position-relative flex-grow-1" style={{ maxWidth: '360px' }}>
                <span
                  className="material-symbols-outlined position-absolute text-outline"
                  style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '20px' }}
                >
                  search
                </span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search student by name, email, or phone..."
                  className="form-control font-body-sm ps-5 py-2.5 input-premium rounded-3"
                />
              </div>

              <div className="d-flex align-items-center gap-2">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="form-select font-body-sm input-premium rounded-3 w-auto"
                >
                  <option value="All">Filter All Roles</option>
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Admin</option>
                </select>

                <button
                  onClick={() => {
                    const headers = ['Name,Email,Phone,Role'];
                    const rows = filteredUsers.map(u => `"${u.name}","${u.email}","${u.phone || ''}","${u.role || 'student'}"`);
                    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement('a');
                    link.setAttribute('href', encodedUri);
                    link.setAttribute('download', `LearnHub_Users_Report_${new Date().toISOString().slice(0, 10)}.csv`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="btn btn-outline-primary font-body-sm px-3 rounded-3 d-flex align-items-center gap-1 text-nowrap"
                >
                  <span className="material-symbols-outlined fs-6">download</span> Export CSV
                </button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading users...</span>
                </div>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-4 bg-surface-container-low rounded-3">
                <p className="font-body-base text-on-surface-variant m-0">No registered users matched your criteria.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle table-hover mb-0">
                  <thead className="bg-surface-container-low">
                    <tr className="font-label-caps text-on-surface-variant">
                      <th className="py-3 px-3">User Profile</th>
                      <th className="py-3 px-3">Email Address</th>
                      <th className="py-3 px-3">Phone Number</th>
                      <th className="py-3 px-3">Current Role</th>
                      <th className="py-3 px-3 text-end">Actions (Edit / Delete)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((u) => (
                      <tr key={u.id || u._id}>
                        <td className="py-3 px-3">
                          <div className="d-flex align-items-center gap-3">
                            <img
                              src={
                                u.avatar ||
                                'https://lh3.googleusercontent.com/aida-public/AB6AXuCr9CHF12DMyqfTqDPJoBj_xC_FhZnCOV1I6J1SMhxGh9dcJ3yPsxD2HtzKxLTHnyTSpG0uX0MEYSV840HpNX-y1wjUL2W5uzc-jWwkVaS1whPOnE5SxNKOpXId2qBfE-9gu0NTJ6WC0LlVlX-xhbFqOzPgYtHkBVsyxV3NAvnoOITYBeL22R1XVab90baoCu1D0V5K4T5SuN-718WnFxyTEDsfdHu9ezm90n-qADcvPeqDMj_eqNdC'
                              }
                              alt={u.name}
                              className="rounded-circle object-fit-cover border border-2 border-surface-container"
                              style={{ width: '40px', height: '40px' }}
                            />
                            <div>
                              <span className="font-body-base fw-bold text-on-surface d-block">{u.name}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3 font-body-sm text-on-surface">{u.email}</td>
                        <td className="py-3 px-3 font-body-sm text-on-surface">{u.phone || '+91 98765 43210'}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`badge font-label-caps px-3 py-1.5 rounded-pill fw-bold ${
                              u.role === 'admin'
                                ? 'bg-primary text-white'
                                : u.role === 'instructor'
                                ? 'bg-secondary text-white'
                                : 'bg-secondary-container text-secondary'
                            }`}
                          >
                            {(u.role || 'STUDENT').toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-end">
                          <div className="d-flex align-items-center justify-content-end gap-2">
                            <button
                              onClick={() => handleOpenEditModal(u)}
                              className="btn btn-sm btn-outline-primary font-body-sm px-3 rounded-3 d-flex align-items-center gap-1"
                            >
                              <span className="material-symbols-outlined fs-6">edit</span> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteUser(u.id || u._id, u.name)}
                              className="btn btn-sm btn-outline-danger font-body-sm px-3 rounded-3 d-flex align-items-center gap-1"
                            >
                              <span className="material-symbols-outlined fs-6">delete</span> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add Registered User Modal */}
      {showAddModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow-lg p-4">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title font-headline-md fw-bold text-on-surface fs-4">Register New Account</h5>
                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>

              <form onSubmit={handleAddUserSubmit} className="modal-body p-0 mt-3">
                <div className="d-flex flex-column gap-3">
                  <div>
                    <label className="font-label-caps text-on-surface-variant mb-1">Full Name</label>
                    <input
                      type="text"
                      value={addFormData.name}
                      onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="form-control font-body-base input-premium"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-label-caps text-on-surface-variant mb-1">Email Address</label>
                    <input
                      type="email"
                      value={addFormData.email}
                      onChange={(e) => setAddFormData({ ...addFormData, email: e.target.value })}
                      placeholder="rahul@example.com"
                      className="form-control font-body-base input-premium"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-label-caps text-on-surface-variant mb-1">Phone Number (+91)</label>
                    <input
                      type="text"
                      value={addFormData.phone}
                      onChange={(e) => setAddFormData({ ...addFormData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="form-control font-body-base input-premium"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-label-caps text-on-surface-variant mb-1">Account Password</label>
                    <input
                      type="password"
                      value={addFormData.password}
                      onChange={(e) => setAddFormData({ ...addFormData, password: e.target.value })}
                      placeholder="••••••••"
                      className="form-control font-body-base input-premium"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-label-caps text-on-surface-variant mb-1">Account Role</label>
                    <select
                      value={addFormData.role}
                      onChange={(e) => setAddFormData({ ...addFormData, role: e.target.value })}
                      className="form-select font-body-sm input-premium"
                    >
                      <option value="student">Student</option>
                      <option value="instructor">Instructor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-end gap-2 mt-4 pt-3 border-top border-outline-variant/20">
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline-secondary font-body-sm px-4 rounded-3">
                    Cancel
                  </button>
                  <button type="submit" disabled={adding} className="btn btn-primary font-body-sm px-5 py-2.5 rounded-3 shadow-sm">
                    {adding ? 'Creating Account...' : 'Register User'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-4 shadow-lg p-4">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title font-headline-md fw-bold text-on-surface fs-4">Edit Registered Account</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>

              <form onSubmit={handleEditUserSubmit} className="modal-body p-0 mt-3">
                <div className="d-flex flex-column gap-3">
                  <div>
                    <label className="font-label-caps text-on-surface-variant mb-1">Full Name</label>
                    <input
                      type="text"
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      className="form-control font-body-base input-premium"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-label-caps text-on-surface-variant mb-1">Email Address</label>
                    <input
                      type="email"
                      value={editFormData.email}
                      onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                      className="form-control font-body-base input-premium"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-label-caps text-on-surface-variant mb-1">Phone Number (+91)</label>
                    <input
                      type="text"
                      value={editFormData.phone}
                      onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                      className="form-control font-body-base input-premium"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-label-caps text-on-surface-variant mb-1">Account Role</label>
                    <select
                      value={editFormData.role}
                      onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                      className="form-select font-body-sm input-premium"
                    >
                      <option value="student">Student</option>
                      <option value="instructor">Instructor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-end gap-2 mt-4 pt-3 border-top border-outline-variant/20">
                  <button type="button" onClick={() => setShowEditModal(false)} className="btn btn-outline-secondary font-body-sm px-4 rounded-3">
                    Cancel
                  </button>
                  <button type="submit" disabled={updating} className="btn btn-primary font-body-sm px-5 py-2.5 rounded-3 shadow-sm">
                    {updating ? 'Saving Changes...' : 'Save Changes'}
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
