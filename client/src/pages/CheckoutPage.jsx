import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function CheckoutPage() {
  const { cart, totalAmount, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);

  const handleProcessOrder = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      return navigate('/login?redirect=checkout');
    }

    setLoading(true);
    setError('');

    try {
      const items = cart.map((c) => ({
        courseId: c.id,
        title: c.title,
        price: c.price,
      }));

      await api.post('/orders/checkout', { items, paymentMethod: 'Simulated Credit Card' });

      clearCart();
      setOrderComplete(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="d-flex flex-column min-vh-100 bg-surface">
        <Navbar />
        <main className="flex-grow-1 d-flex align-items-center justify-content-center p-4">
          <div className="bg-white rounded-4 border border-outline-variant/30 p-5 text-center shadow-sm max-w-md w-100">
            <span className="material-symbols-outlined text-success fs-1 mb-2">task_alt</span>
            <h1 className="font-headline-md fw-bold text-on-surface mb-2">Payment Successful!</h1>
            <p className="font-body-base text-on-surface-variant mb-4">
              Your order has been processed cleanly. You now have full access to your enrolled courses!
            </p>
            <div className="d-flex flex-column gap-2">
              <button onClick={() => navigate('/dashboard')} className="btn btn-primary font-body-base py-3 rounded-3">
                Go to Student Dashboard
              </button>
              <button onClick={() => navigate('/my-courses')} className="btn btn-outline-secondary font-body-base py-2.5 rounded-3">
                View My Enrolled Courses
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-surface">
      <Navbar />

      <main className="flex-grow-1 max-w-container-max mx-auto px-3 px-md-5 py-4 py-md-5 w-100">
        <h1 className="font-headline-md fw-bold text-on-surface mb-4 fs-2">Simulated Checkout</h1>

        {error && <div className="alert alert-danger font-body-sm rounded-3 mb-4">{error}</div>}

        <div className="row g-4">
          {/* Payment Form Column */}
          <div className="col-12 col-lg-7">
            <div className="bg-white rounded-4 border border-outline-variant/30 p-4 p-md-5 shadow-sm">
              <h3 className="font-headline-md fs-5 fw-bold mb-4">Payment Method</h3>

              <form onSubmit={handleProcessOrder} className="d-flex flex-column gap-4">
                <div className="d-flex flex-column gap-2">
                  <label className="d-flex align-items-center gap-3 p-3 rounded-3 border border-primary bg-primary-container/10 cursor-pointer">
                    <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                    <span className="material-symbols-outlined text-primary">credit_card</span>
                    <span className="font-body-base fw-bold">Credit / Debit Card (Instant Test Sandbox)</span>
                  </label>
                </div>

                <div className="d-flex flex-column gap-3">
                  <div className="d-flex flex-column gap-1">
                    <label className="font-label-caps text-on-surface-variant">Cardholder Name</label>
                    <input type="text" defaultValue="Alex Morgan" className="form-control font-body-base input-premium" required />
                  </div>

                  <div className="d-flex flex-column gap-1">
                    <label className="font-label-caps text-on-surface-variant">Card Number</label>
                    <input type="text" defaultValue="4242 •••• •••• 4242" className="form-control font-body-base input-premium" required />
                  </div>

                  <div className="row g-3">
                    <div className="col-6">
                      <label className="font-label-caps text-on-surface-variant">Expiry Date</label>
                      <input type="text" defaultValue="12/28" className="form-control font-body-base input-premium" required />
                    </div>
                    <div className="col-6">
                      <label className="font-label-caps text-on-surface-variant">CVC Code</label>
                      <input type="text" defaultValue="123" className="form-control font-body-base input-premium" required />
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={loading || cart.length === 0} className="btn btn-primary font-headline-md py-3 rounded-3 mt-2 shadow-sm">
                  {loading ? 'Enrolling in Free Courses...' : 'Claim Free Course Access Now'}
                </button>
              </form>
            </div>
          </div>

          {/* Cart Summary Column */}
          <div className="col-12 col-lg-5">
            <div className="bg-white rounded-4 border border-outline-variant/30 p-4 shadow-sm">
              <h3 className="font-headline-md fs-5 fw-bold mb-3">Order Items ({cart.length})</h3>

              <div className="d-flex flex-column gap-3 mb-3">
                {cart.map((item) => (
                  <div key={item.id} className="d-flex align-items-center justify-content-between pb-2 border-bottom border-outline-variant/20">
                    <div className="d-flex align-items-center gap-2">
                      <img src={item.thumbnail} alt={item.title} className="rounded object-fit-cover" style={{ width: '48px', height: '36px' }} />
                      <span className="font-body-sm fw-semibold text-on-surface text-truncate" style={{ maxWidth: '200px' }}>
                        {item.title}
                      </span>
                    </div>
                    <span className="badge bg-success-container text-success font-label-caps px-2 py-0.5 fw-bold">FREE</span>
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-between font-headline-md text-on-surface fw-bold fs-4 pt-2">
                <span>Total Amount:</span>
                <span className="text-success">FREE</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
