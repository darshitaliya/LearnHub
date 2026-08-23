import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column min-vh-100 bg-surface">
      <Navbar />

      <main className="flex-grow-1 max-w-container-max mx-auto px-3 px-md-5 py-4 py-md-5 w-100">
        <h1 className="font-headline-md fw-bold text-on-surface mb-4 fs-2">Shopping Cart ({cart.length})</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-4 border border-outline-variant/30 p-5 text-center shadow-sm">
            <span className="material-symbols-outlined fs-1 text-outline mb-2">shopping_cart</span>
            <h3 className="font-headline-md fw-bold mb-2">Your cart is empty</h3>
            <p className="font-body-base text-on-surface-variant mb-4">Explore our courses catalog and add skills to your cart!</p>
            <Link to="/courses" className="btn btn-primary font-body-base px-4 py-2 rounded-3">
              Explore Courses
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {/* Item List Column */}
            <div className="col-12 col-lg-8 d-flex flex-column gap-3">
              {cart.map((item) => (
                <div key={item.id} className="bg-white rounded-4 border border-outline-variant/30 p-3 p-md-4 shadow-sm d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={item.thumbnail || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc_P4bDonDSVnHhQab5Iw5rgqL2FAg1YI9MYUOdkuuHogQ9yokQeqxsakBi3ghU_SkEsswrJXOsiDE0eephEXqbAPWnwm-HVr-n6KQl44LkfqSd0bw3cqp4f73eaOQj9iNCV5879MGfNdPVgSr_qD-Q9Yuj3b52KGmh_y1v4y143OHehRzZtU9dd2EDtWwqYsl9Qh-wtSI3bXsIe2_iu4OXD6vJMxsjiFaaJhgln9n9TkKdJRzDPIW'}
                      alt={item.title}
                      className="rounded-3 object-fit-cover flex-shrink-0"
                      style={{ width: '100px', height: '70px' }}
                    />
                    <div>
                      <span className="font-label-caps text-secondary" style={{ fontSize: '11px' }}>{item.category}</span>
                      <h4 className="font-body-base fw-bold text-on-surface mb-1">{item.title}</h4>
                      <p className="font-body-sm text-on-surface-variant m-0">Instructor: {item.instructorName || 'Dr. Elena Rostova'}</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-between justify-content-sm-end gap-4 border-top border-top-sm-0 pt-2 pt-sm-0">
                    <span className="badge bg-success-container text-success font-label-caps px-2.5 py-1 rounded-pill fw-bold fs-6">FREE</span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="btn btn-outline-danger btn-sm p-2 rounded-circle border-0"
                      title="Remove from cart"
                    >
                      <span className="material-symbols-outlined fs-5">delete</span>
                    </button>
                  </div>
                </div>
              ))}

              <div className="d-flex justify-content-between align-items-center mt-2">
                <button onClick={clearCart} className="btn btn-link text-error text-decoration-none font-body-sm p-0">
                  Clear Shopping Cart
                </button>
                <Link to="/courses" className="font-body-sm text-primary fw-semibold text-decoration-none">
                  + Add More Courses
                </Link>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="col-12 col-lg-4">
              <div className="bg-white rounded-4 border border-outline-variant/30 p-4 shadow-sm">
                <h3 className="font-headline-md fw-bold mb-3 fs-5">Order Summary</h3>

                <div className="d-flex flex-column gap-2 mb-3 font-body-sm">
                  <div className="d-flex justify-content-between text-on-surface-variant">
                    <span>Subtotal:</span>
                    <span className="fw-bold text-success">FREE</span>
                  </div>
                  <div className="d-flex justify-content-between text-on-surface-variant">
                    <span>Course Discount:</span>
                    <span className="text-success">100% OFF</span>
                  </div>
                  <div className="border-top border-outline-variant/20 my-2"></div>
                  <div className="d-flex justify-content-between font-headline-md text-on-surface fw-bold fs-4">
                    <span>Total:</span>
                    <span className="text-success">FREE</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="btn btn-primary w-100 font-headline-md py-3 rounded-3 d-flex align-items-center justify-content-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>

                <p className="font-body-sm text-on-surface-variant text-center mt-3 mb-0" style={{ fontSize: '12px' }}>
                  🔒 30-Day Money Back Guarantee • Instant Course Access
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
