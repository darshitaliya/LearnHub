import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import api from '../services/api';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get('/admin/orders');
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex min-vh-100 bg-surface overflow-hidden">
      <AdminSidebar />

      <main className="flex-grow-1 main-with-sidebar position-relative overflow-y-auto">
        <div className="position-relative z-1 p-3 p-md-5 max-w-container-max mx-auto d-flex flex-column gap-4">
          <header className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
            <div>
              <span className="badge bg-primary font-label-caps px-2 py-1 mb-1">AUDITING & PAYMENTS</span>
              <h1 className="font-display-lg-mobile text-on-surface fw-bold m-0" style={{ fontSize: '32px' }}>
                Order & Enrollment Logs ({orders.length})
              </h1>
            </div>

            <button onClick={fetchOrders} className="btn btn-outline-secondary font-body-sm px-4 py-2 rounded-3 d-flex align-items-center gap-2">
              <span className="material-symbols-outlined fs-5">refresh</span> Refresh Logs
            </button>
          </header>

          <div className="bg-white rounded-4 border border-outline-variant/30 p-4 shadow-sm">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading orders...</span>
                </div>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-4 bg-surface-container-low rounded-3">
                <p className="font-body-base text-on-surface-variant m-0">No order logs recorded yet.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle table-hover mb-0">
                  <thead className="bg-surface-container-low">
                    <tr className="font-label-caps text-on-surface-variant">
                      <th className="py-3 px-3">Order Reference</th>
                      <th className="py-3 px-3">Student Name</th>
                      <th className="py-3 px-3">Purchased Course(s)</th>
                      <th className="py-3 px-3">Total Amount</th>
                      <th className="py-3 px-3">Payment Status</th>
                      <th className="py-3 px-3">Checkout Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id || o._id}>
                        <td className="py-3 px-3 font-body-sm fw-bold text-primary">{o.id || o._id}</td>
                        <td className="py-3 px-3 font-body-sm fw-bold text-on-surface">{o.userName || 'Student User'}</td>
                        <td className="py-3 px-3 font-body-sm">{o.items ? o.items.map((i) => i.title).join(', ') : 'Course Enrollment'}</td>
                        <td className="py-3 px-3 font-body-sm fw-bold text-success">
                          {o.totalAmount === 0 ? 'FREE' : `₹${o.totalAmount?.toLocaleString('en-IN')}`}
                        </td>
                        <td className="py-3 px-3">
                          <span className="badge bg-success-container text-success font-label-caps px-3 py-1.5 rounded-pill">
                            {o.paymentStatus?.toUpperCase() || 'COMPLETED'}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-body-sm text-on-surface-variant">
                          {o.createdAt ? new Date(o.createdAt).toLocaleDateString() : 'Recent'}
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
    </div>
  );
}
