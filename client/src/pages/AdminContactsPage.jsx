import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import api from '../services/api';

export default function AdminContactsPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', message: '' });

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/contacts');
      setMessages(res.data || []);
    } catch (err) {
      console.error('Failed to load contact messages:', err);
      setAlert({ type: 'danger', message: 'Failed to load contact messages from server.' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus, notes = '') => {
    setActionLoading(true);
    try {
      await api.put(`/admin/contacts/${id}/status`, { status: newStatus, responseNotes: notes });
      setMessages((prev) =>
        prev.map((m) => (m.id === id || m._id === id ? { ...m, status: newStatus, responseNotes: notes } : m))
      );
      if (selectedMessage && (selectedMessage.id === id || selectedMessage._id === id)) {
        setSelectedMessage((prev) => ({ ...prev, status: newStatus, responseNotes: notes }));
      }
      setAlert({ type: 'success', message: `Inquiry marked as "${newStatus}".` });
      setTimeout(() => setAlert({ type: '', message: '' }), 3500);
    } catch (err) {
      setAlert({ type: 'danger', message: err.response?.data?.error || 'Failed to update message status.' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact message?')) return;
    setActionLoading(true);
    try {
      await api.delete(`/admin/contacts/${id}`);
      setMessages((prev) => prev.filter((m) => m.id !== id && m._id !== id));
      if (selectedMessage && (selectedMessage.id === id || selectedMessage._id === id)) {
        setSelectedMessage(null);
      }
      setAlert({ type: 'success', message: 'Message deleted successfully.' });
      setTimeout(() => setAlert({ type: '', message: '' }), 3500);
    } catch (err) {
      setAlert({ type: 'danger', message: err.response?.data?.error || 'Failed to delete message.' });
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenDetail = (msg) => {
    setSelectedMessage(msg);
    // If currently unread, automatically mark as read
    if (msg.status === 'Unread') {
      handleUpdateStatus(msg.id || msg._id, 'Read', msg.responseNotes || '');
    }
  };

  // Metrics
  const totalCount = messages.length;
  const unreadCount = messages.filter((m) => m.status === 'Unread').length;
  const inReviewCount = messages.filter((m) => m.status === 'In Review').length;
  const resolvedCount = messages.filter((m) => m.status === 'Resolved').length;

  // Filtered List
  const filteredMessages = messages.filter((m) => {
    const matchesSearch =
      !search ||
      m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase()) ||
      m.subject?.toLowerCase().includes(search.toLowerCase()) ||
      m.message?.toLowerCase().includes(search.toLowerCase());

    const matchesCat = categoryFilter === 'All' || m.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || m.status === statusFilter;

    return matchesSearch && matchesCat && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Unread':
        return <span className="badge bg-warning text-dark font-label-caps px-2.5 py-1 rounded-pill">● Unread</span>;
      case 'Read':
        return <span className="badge bg-info text-white font-label-caps px-2.5 py-1 rounded-pill">Read</span>;
      case 'In Review':
        return <span className="badge bg-primary text-white font-label-caps px-2.5 py-1 rounded-pill">In Review</span>;
      case 'Resolved':
        return <span className="badge bg-success text-white font-label-caps px-2.5 py-1 rounded-pill">✓ Resolved</span>;
      default:
        return <span className="badge bg-secondary text-white font-label-caps px-2.5 py-1 rounded-pill">{status}</span>;
    }
  };

  return (
    <div className="d-flex min-vh-100 bg-surface overflow-hidden">
      <AdminSidebar />

      <main className="flex-grow-1 main-with-sidebar position-relative overflow-y-auto" style={{ minWidth: 0 }}>
        <div className="position-relative z-1 p-3 p-md-5 max-w-container-max mx-auto d-flex flex-column gap-4">
          
          {/* Header Bar */}
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
            <div>
              {unreadCount > 0 && (
                <div className="d-flex align-items-center gap-2 mb-1">
                  <span className="badge bg-danger text-white font-label-caps px-2.5 py-1 rounded-pill">
                    {unreadCount} NEW UNREAD
                  </span>
                </div>
              )}
              <h1 className="font-display-lg-mobile text-on-surface fw-bold m-0" style={{ fontSize: '32px' }}>
                Contact Messages & Support Inquiries
              </h1>
              <p className="font-body-sm text-on-surface-variant m-0 mt-1">
                Manage incoming learner support requests, partnership inquiries, and feedback stored in database.
              </p>
            </div>

            <button
              onClick={fetchMessages}
              disabled={loading}
              className="btn btn-outline-primary font-body-sm d-flex align-items-center gap-2 px-3.5 py-2.5 rounded-3 align-self-start align-self-md-center shadow-xs"
            >
              <span className={`material-symbols-outlined fs-5 ${loading ? 'spin' : ''}`}>sync</span>
              <span>Refresh Data</span>
            </button>
          </div>

          {/* Alert Feedback */}
          {alert.message && (
            <div className={`alert alert-${alert.type} font-body-sm rounded-3 d-flex align-items-center justify-content-between shadow-xs m-0`}>
              <span>{alert.message}</span>
              <button onClick={() => setAlert({ type: '', message: '' })} className="btn btn-close btn-sm p-1" />
            </div>
          )}

          {/* 4 Metric Bento Cards */}
          <div className="row g-3">
            <div className="col-6 col-lg-3">
              <div className="bg-white p-4 rounded-4 border border-outline-variant/30 shadow-sm h-100 d-flex flex-column justify-content-between">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center shadow-xs" style={{ width: '42px', height: '42px' }}>
                    <span className="material-symbols-outlined fs-5">mail</span>
                  </div>
                  <span className="badge bg-surface-container-high text-on-surface font-label-caps px-2 py-1 rounded-pill" style={{ fontSize: '10px' }}>TOTAL</span>
                </div>
                <div>
                  <h3 className="font-display-lg-mobile text-on-surface fw-bold fs-2 m-0">{totalCount}</h3>
                  <p className="font-body-sm text-on-surface-variant m-0 mt-1" style={{ fontSize: '12px' }}>Total Inquiries</p>
                </div>
              </div>
            </div>

            <div className="col-6 col-lg-3">
              <div className="bg-white p-4 rounded-4 border border-warning/40 shadow-sm h-100 d-flex flex-column justify-content-between">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="rounded-circle bg-warning text-dark d-flex align-items-center justify-content-center shadow-xs" style={{ width: '42px', height: '42px' }}>
                    <span className="material-symbols-outlined fs-5">mark_email_unread</span>
                  </div>
                  <span className="badge bg-warning/20 text-warning font-label-caps px-2 py-1 rounded-pill" style={{ fontSize: '10px' }}>UNREAD</span>
                </div>
                <div>
                  <h3 className="font-display-lg-mobile text-warning fw-bold fs-2 m-0">{unreadCount}</h3>
                  <p className="font-body-sm text-on-surface-variant m-0 mt-1" style={{ fontSize: '12px' }}>Unread Messages</p>
                </div>
              </div>
            </div>

            <div className="col-6 col-lg-3">
              <div className="bg-white p-4 rounded-4 border border-primary/30 shadow-sm h-100 d-flex flex-column justify-content-between">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center shadow-xs" style={{ width: '42px', height: '42px' }}>
                    <span className="material-symbols-outlined fs-5">pending_actions</span>
                  </div>
                  <span className="badge bg-primary/20 text-primary font-label-caps px-2 py-1 rounded-pill" style={{ fontSize: '10px' }}>IN REVIEW</span>
                </div>
                <div>
                  <h3 className="font-display-lg-mobile text-primary fw-bold fs-2 m-0">{inReviewCount}</h3>
                  <p className="font-body-sm text-on-surface-variant m-0 mt-1" style={{ fontSize: '12px' }}>In Review</p>
                </div>
              </div>
            </div>

            <div className="col-6 col-lg-3">
              <div className="bg-white p-4 rounded-4 border border-success/30 shadow-sm h-100 d-flex flex-column justify-content-between">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center shadow-xs" style={{ width: '42px', height: '42px' }}>
                    <span className="material-symbols-outlined fs-5">check_circle</span>
                  </div>
                  <span className="badge bg-success/20 text-success font-label-caps px-2 py-1 rounded-pill" style={{ fontSize: '10px' }}>RESOLVED</span>
                </div>
                <div>
                  <h3 className="font-display-lg-mobile text-success fw-bold fs-2 m-0">{resolvedCount}</h3>
                  <p className="font-body-sm text-on-surface-variant m-0 mt-1" style={{ fontSize: '12px' }}>Resolved</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Card (Unified Filters & Table matching AdminUsersPage) */}
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
                  placeholder="Search sender, email, subject, text..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="form-control font-body-sm ps-5 py-2.5 input-premium rounded-3"
                />
              </div>

              <div className="d-flex flex-wrap align-items-center gap-2">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="form-select font-body-sm input-premium rounded-3 w-auto"
                >
                  <option value="All">All Categories</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Instructor Partnership">Instructor Partnership</option>
                  <option value="Certificate Verification">Certificate Verification</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="form-select font-body-sm input-premium rounded-3 w-auto"
                >
                  <option value="All">All Statuses</option>
                  <option value="Unread">Unread Only</option>
                  <option value="Read">Read</option>
                  <option value="In Review">In Review</option>
                  <option value="Resolved">Resolved</option>
                </select>

                {(search || categoryFilter !== 'All' || statusFilter !== 'All') && (
                  <button
                    onClick={() => {
                      setSearch('');
                      setCategoryFilter('All');
                      setStatusFilter('All');
                    }}
                    className="btn btn-outline-secondary font-body-sm px-3 rounded-3"
                    title="Clear filters"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading inquiries...</span>
                </div>
                <p className="font-body-sm text-on-surface-variant mt-2 mb-0">Loading database inquiries...</p>
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="text-center py-5 bg-surface-container-low rounded-3">
                <span className="material-symbols-outlined fs-1 text-muted mb-2">inbox</span>
                <h5 className="font-headline-md fw-bold text-on-surface mb-1">No Messages Found</h5>
                <p className="font-body-base text-on-surface-variant m-0">
                  {messages.length === 0
                    ? 'No contact form submissions in database yet. Form submissions on the Contact Page will appear here.'
                    : 'No inquiries match your current search and filter criteria.'}
                </p>
              </div>
            ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-surface-container-low border-bottom border-outline-variant/20">
                  <tr>
                    <th className="font-label-caps text-on-surface-variant ps-4 py-3" style={{ fontSize: '11px' }}>SENDER</th>
                    <th className="font-label-caps text-on-surface-variant py-3" style={{ fontSize: '11px' }}>CATEGORY</th>
                    <th className="font-label-caps text-on-surface-variant py-3" style={{ fontSize: '11px' }}>SUBJECT & PREVIEW</th>
                    <th className="font-label-caps text-on-surface-variant py-3" style={{ fontSize: '11px' }}>DATE / TIME</th>
                    <th className="font-label-caps text-on-surface-variant py-3" style={{ fontSize: '11px' }}>STATUS</th>
                    <th className="font-label-caps text-on-surface-variant pe-4 py-3 text-end" style={{ fontSize: '11px' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMessages.map((msg) => {
                    const id = msg.id || msg._id;
                    const dateStr = msg.createdAt
                      ? new Date(msg.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'Recently';

                    return (
                      <tr
                        key={id}
                        className={`cursor-pointer ${msg.status === 'Unread' ? 'bg-warning-subtle/10 fw-semibold' : ''}`}
                        onClick={() => handleOpenDetail(msg)}
                      >
                        <td className="ps-4 py-3">
                          <div className="d-flex align-items-center gap-2">
                            <div
                              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center flex-shrink-0 fw-bold shadow-xs"
                              style={{ width: '36px', height: '36px', fontSize: '14px' }}
                            >
                              {msg.name ? msg.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <div>
                              <div className="font-body-sm text-on-surface fw-bold">{msg.name}</div>
                              <a
                                href={`mailto:${msg.email}`}
                                onClick={(e) => e.stopPropagation()}
                                className="font-body-sm text-primary text-decoration-none"
                                style={{ fontSize: '12px' }}
                              >
                                {msg.email}
                              </a>
                            </div>
                          </div>
                        </td>

                        <td className="py-3">
                          <span className="badge bg-surface-container-high text-on-surface font-label-caps px-2.5 py-1 rounded-pill border">
                            {msg.category || 'General'}
                          </span>
                        </td>

                        <td className="py-3" style={{ maxWidth: '320px' }}>
                          <div className="font-body-sm text-on-surface fw-bold text-truncate">{msg.subject}</div>
                          <div className="font-body-sm text-on-surface-variant text-truncate" style={{ fontSize: '12px' }}>
                            {msg.message}
                          </div>
                        </td>

                        <td className="py-3 font-body-sm text-on-surface-variant text-nowrap" style={{ fontSize: '12px' }}>
                          {dateStr}
                        </td>

                        <td className="py-3 text-nowrap">
                          {getStatusBadge(msg.status)}
                        </td>

                        <td className="pe-4 py-3 text-end" onClick={(e) => e.stopPropagation()}>
                          <div className="d-flex align-items-center justify-content-end gap-2">
                            <button
                              onClick={() => handleOpenDetail(msg)}
                              className="btn btn-sm btn-outline-primary rounded-3 d-flex align-items-center justify-content-center shadow-xs"
                              style={{ width: '36px', height: '36px', flexShrink: 0 }}
                              title="View Full Message"
                            >
                              <span className="material-symbols-outlined fs-6">visibility</span>
                            </button>

                            <a
                              href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}&body=Hi ${encodeURIComponent(msg.name)},\n\nThank you for reaching out to LearnHub support.\n\nRegarding your inquiry:\n"${encodeURIComponent(msg.message)}"\n\n`}
                              className="btn btn-sm btn-outline-secondary rounded-3 d-flex align-items-center justify-content-center shadow-xs"
                              style={{ width: '36px', height: '36px', flexShrink: 0 }}
                              title="Reply via Email"
                            >
                              <span className="material-symbols-outlined fs-6">mail</span>
                            </a>

                            <select
                              value={msg.status}
                              onChange={(e) => handleUpdateStatus(id, e.target.value, msg.responseNotes || '')}
                              className="form-select form-select-sm py-1.5 px-2.5 rounded-3 font-body-sm input-premium"
                              style={{ width: '120px', height: '36px', fontSize: '12px', flexShrink: 0 }}
                            >
                              <option value="Unread">Unread</option>
                              <option value="Read">Read</option>
                              <option value="In Review">In Review</option>
                              <option value="Resolved">Resolved</option>
                            </select>

                            <button
                              onClick={() => handleDelete(id)}
                              className="btn btn-sm btn-outline-danger rounded-3 d-flex align-items-center justify-content-center shadow-xs"
                              style={{ width: '36px', height: '36px', flexShrink: 0 }}
                              title="Delete Message"
                            >
                              <span className="material-symbols-outlined fs-6">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        </div>

        {/* Message Detail Modal */}
        {selectedMessage && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 z-3 d-flex align-items-center justify-content-center p-3"
            style={{ backgroundColor: 'rgba(11, 28, 48, 0.65)', backdropFilter: 'blur(5px)' }}
            onClick={() => setSelectedMessage(null)}
          >
            <div
              className="bg-white rounded-4 shadow-xl p-4 p-md-5 border border-outline-variant/30"
              style={{ width: '640px', maxWidth: '100%', maxHeight: '90vh', overflowY: 'auto' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex align-items-center justify-content-between border-bottom border-outline-variant/20 pb-3 mb-4">
                <div className="d-flex align-items-center gap-2">
                  <span className="badge bg-primary text-white font-label-caps px-2.5 py-1 rounded-pill">
                    {selectedMessage.category}
                  </span>
                  {getStatusBadge(selectedMessage.status)}
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="btn btn-close p-2"
                  aria-label="Close"
                />
              </div>

              <div className="mb-4">
                <span className="font-label-caps text-on-surface-variant d-block mb-1" style={{ fontSize: '11px' }}>
                  SUBJECT
                </span>
                <h3 className="font-headline-md text-on-surface fw-bold fs-4 m-0">
                  {selectedMessage.subject}
                </h3>
              </div>

              <div className="p-3 bg-surface-container-low rounded-3 border border-outline-variant/20 mb-4">
                <div className="row g-3">
                  <div className="col-12 col-sm-6">
                    <span className="font-label-caps text-on-surface-variant d-block" style={{ fontSize: '10px' }}>
                      SENDER NAME
                    </span>
                    <strong className="font-body-base text-on-surface">{selectedMessage.name}</strong>
                  </div>
                  <div className="col-12 col-sm-6">
                    <span className="font-label-caps text-on-surface-variant d-block" style={{ fontSize: '10px' }}>
                      EMAIL ADDRESS
                    </span>
                    <a href={`mailto:${selectedMessage.email}`} className="font-body-base text-primary fw-bold text-decoration-none">
                      {selectedMessage.email}
                    </a>
                  </div>
                  <div className="col-12 col-sm-6">
                    <span className="font-label-caps text-on-surface-variant d-block" style={{ fontSize: '10px' }}>
                      SUBMISSION TIME
                    </span>
                    <span className="font-body-sm text-on-surface-variant">
                      {selectedMessage.createdAt ? new Date(selectedMessage.createdAt).toLocaleString() : 'N/A'}
                    </span>
                  </div>
                  <div className="col-12 col-sm-6">
                    <span className="font-label-caps text-on-surface-variant d-block" style={{ fontSize: '10px' }}>
                      DATABASE ID
                    </span>
                    <code className="font-body-sm text-muted">{selectedMessage.id || selectedMessage._id}</code>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <span className="font-label-caps text-on-surface-variant d-block mb-2" style={{ fontSize: '11px' }}>
                  MESSAGE CONTENT
                </span>
                <div
                  className="p-3.5 bg-white border border-outline-variant/30 rounded-3 font-body-base text-on-surface"
                  style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '15px' }}
                >
                  {selectedMessage.message}
                </div>
              </div>

              {/* Status Update & Actions */}
              <div className="pt-3 border-top border-outline-variant/20 d-flex flex-wrap align-items-center justify-content-between gap-3">
                <div className="d-flex align-items-center gap-2">
                  <span className="font-label-caps text-on-surface-variant" style={{ fontSize: '11px' }}>STATUS:</span>
                  <select
                    value={selectedMessage.status}
                    onChange={(e) =>
                      handleUpdateStatus(selectedMessage.id || selectedMessage._id, e.target.value, selectedMessage.responseNotes)
                    }
                    className="form-select form-select-sm rounded-2 font-body-sm"
                    style={{ width: '130px' }}
                    disabled={actionLoading}
                  >
                    <option value="Unread">Unread</option>
                    <option value="Read">Read</option>
                    <option value="In Review">In Review</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}&body=Hi ${encodeURIComponent(selectedMessage.name)},\n\nThank you for contacting LearnHub support.\n\n`}
                    className="btn btn-primary font-body-sm px-3.5 py-2 rounded-3 d-flex align-items-center gap-1.5 shadow-xs"
                  >
                    <span className="material-symbols-outlined fs-6">reply</span>
                    <span>Reply via Email</span>
                  </a>

                  <button
                    onClick={() => handleDelete(selectedMessage.id || selectedMessage._id)}
                    className="btn btn-outline-danger font-body-sm px-3 py-2 rounded-3 d-flex align-items-center gap-1"
                    disabled={actionLoading}
                  >
                    <span className="material-symbols-outlined fs-6">delete</span>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
