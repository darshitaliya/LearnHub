import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CaptchaField from '../components/CaptchaField';
import api from '../services/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'General Inquiry',
    subject: '',
    message: '',
  });

  const [captchaData, setCaptchaData] = useState({ captchaToken: '', captchaInput: '' });
  const [captchaError, setCaptchaError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCaptchaError('');
    setErrorMessage('');

    if (captchaData.captchaToken && !captchaData.captchaInput?.trim()) {
      setCaptchaError('Please enter the CAPTCHA code.');
      return;
    }

    setLoading(true);
    try {
      // If captcha token is active, verify captcha first
      if (captchaData.captchaToken) {
        if (!captchaData.captchaInput?.trim()) {
          setCaptchaError('Please enter the CAPTCHA code.');
          setLoading(false);
          return;
        }
        try {
          await api.post('/captcha/verify', {
            captchaToken: captchaData.captchaToken,
            captchaInput: captchaData.captchaInput,
            token: captchaData.captchaToken,
            input: captchaData.captchaInput,
          });
        } catch (cErr) {
          setCaptchaError(cErr.response?.data?.error || 'Incorrect CAPTCHA code. Please try again.');
          setLoading(false);
          return;
        }
      }

      await api.post('/contact', formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        category: 'General Inquiry',
        subject: '',
        message: '',
      });
    } catch (err) {
      setErrorMessage(
        err.response?.data?.error || 'Failed to deliver message. Please check your internet connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    { q: 'Are all LearnHub courses really 100% free?', a: 'Yes! Every course, video lecture, project assignment, and completion certificate on LearnHub is 100% free with no hidden charges or subscriptions.' },
    { q: 'How do I earn a verified certificate of completion?', a: 'Once you complete 100% of the lessons in a course, your printable completion certificate is automatically generated and available in your Video Player & My Courses dashboard.' },
    { q: 'Can I apply to become an instructor on LearnHub?', a: 'Absolutely! We welcome principal engineers, research leads, and UI architects to build courses. Navigate to the Instructor Panel to start publishing.' },
    { q: 'What technical prerequisites do I need?', a: 'We offer courses ranging from Beginner to Advanced levels. Beginner courses require no prior coding experience.' },
  ];

  return (
    <div className="d-flex flex-column min-vh-100 bg-surface">
      <Navbar />

      <main className="flex-grow-1">
        {/* Header Hero */}
        <section className="py-5 bg-white border-bottom border-outline-variant/20">
          <div className="max-w-container-max mx-auto px-3 px-md-5 text-start">
            <span className="font-label-caps text-primary mb-1 d-block">GET IN TOUCH</span>
            <h1 className="font-headline-md text-on-surface m-0 fw-bold fs-2 mb-2">
              Contact & Support Center
            </h1>
            <p className="font-body-base text-on-surface-variant m-0 max-w-lg">
              Have questions or feedback? Our team is available 24/7 to assist learners, instructors, and global partners.
            </p>
          </div>
        </section>

        {/* Contact Info Strip */}
        <section className="py-5 bg-surface-container-lowest">
          <div className="max-w-container-max mx-auto px-3 px-md-5">
            <div className="row g-4 mb-5">
              <div className="col-12 col-md-4">
                <div className="bg-white rounded-4 border border-outline-variant/30 p-4 shadow-sm h-100 d-flex flex-column align-items-center text-center">
                  <div className="rounded-circle bg-primary-container/20 text-primary p-3 mb-3" style={{ width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-outlined fs-2 text-primary">mail</span>
                  </div>
                  <h3 className="font-headline-md fs-5 fw-bold text-on-surface mb-1">Email Support</h3>
                  <p className="font-body-sm text-on-surface-variant mb-2">Our team responds within 2 hours.</p>
                  <a href="mailto:support@learnhub.com" className="font-body-base text-primary fw-bold text-decoration-none">
                    support@learnhub.com
                  </a>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="bg-white rounded-4 border border-outline-variant/30 p-4 shadow-sm h-100 d-flex flex-column align-items-center text-center">
                  <div className="rounded-circle bg-primary-container/20 text-primary p-3 mb-3" style={{ width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-outlined fs-2 text-primary">call</span>
                  </div>
                  <h3 className="font-headline-md fs-5 fw-bold text-on-surface mb-1">Toll-Free Phone</h3>
                  <p className="font-body-sm text-on-surface-variant mb-2">Mon - Fri • 9:00 AM - 6:00 PM EST</p>
                  <a href="tel:+9118005555327" className="font-body-base text-primary fw-bold text-decoration-none">
                    +91 1800-555-LEARN
                  </a>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="bg-white rounded-4 border border-outline-variant/30 p-4 shadow-sm h-100 d-flex flex-column align-items-center text-center">
                  <div className="rounded-circle bg-primary-container/20 text-primary p-3 mb-3" style={{ width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-outlined fs-2 text-primary">location_on</span>
                  </div>
                  <h3 className="font-headline-md fs-5 fw-bold text-on-surface mb-1">Global Headquarters</h3>
                  <p className="font-body-sm text-on-surface-variant m-0">500 Howard Street, Suite 400<br />San Francisco, CA 94105</p>
                </div>
              </div>
            </div>

            <div className="row g-5">
              {/* Form Column */}
              <div className="col-12 col-lg-7">
                <div className="bg-white rounded-4 border border-outline-variant/30 p-4 p-md-5 shadow-sm">
                  <h3 className="font-headline-md fs-4 fw-bold text-on-surface mb-4">Send Us A Message</h3>

                  {errorMessage && (
                    <div className="alert alert-danger font-body-sm rounded-3 d-flex align-items-center gap-2 mb-3">
                      <span className="material-symbols-outlined fs-5">error</span>
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {submitted ? (
                    <div className="bg-success-container/30 border border-success/30 rounded-4 p-4 text-center">
                      <span className="material-symbols-outlined text-success fs-1 mb-2">task_alt</span>
                      <h4 className="font-headline-md fw-bold text-on-surface mb-2">Message Delivered!</h4>
                      <p className="font-body-base text-on-surface-variant mb-3">
                        Thank you for reaching out to LearnHub. One of our support engineers will get back to you shortly.
                      </p>
                      <button onClick={() => setSubmitted(false)} className="btn btn-outline-primary font-body-sm px-4 py-2 rounded-3">
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                      <div className="row g-3">
                        <div className="col-12 col-md-6">
                          <label className="font-label-caps text-on-surface-variant mb-1">Your Full Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Alex Morgan"
                            className="form-control font-body-base input-premium"
                            required
                          />
                        </div>
                        <div className="col-12 col-md-6">
                          <label className="font-label-caps text-on-surface-variant mb-1">Your Email Address</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="alex@learnhub.com"
                            className="form-control font-body-base input-premium"
                            required
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-column gap-1">
                        <label className="font-label-caps text-on-surface-variant">Inquiry Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="form-select font-body-sm input-premium">
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Technical Support">Technical Support</option>
                          <option value="Instructor Partnership">Instructor Partnership</option>
                          <option value="Certificate Verification">Certificate Verification</option>
                        </select>
                      </div>

                      <div className="d-flex flex-column gap-1">
                        <label className="font-label-caps text-on-surface-variant">Subject</label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="How can we help?"
                          className="form-control font-body-base input-premium"
                          required
                        />
                      </div>

                      <div className="d-flex flex-column gap-1">
                        <label className="font-label-caps text-on-surface-variant">Message Details</label>
                        <textarea
                          name="message"
                          rows="5"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Please describe your request in detail..."
                          className="form-control font-body-sm input-premium"
                          required
                        />
                      </div>

                      {/* Security CAPTCHA Challenge */}
                      <CaptchaField
                        id="contact-captcha"
                        onCaptchaChange={(data) => {
                          setCaptchaData(data);
                          setCaptchaError('');
                        }}
                        error={captchaError}
                      />

                      <button type="submit" disabled={loading} className="btn btn-primary font-headline-md py-3 rounded-3 mt-2 shadow-sm">
                        {loading ? 'Sending Message...' : 'Send Message'}
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* FAQs Accordion Column */}
              <div className="col-12 col-lg-5">
                <div className="bg-white rounded-4 border border-outline-variant/30 p-4 shadow-sm">
                  <h3 className="font-headline-md fs-5 fw-bold text-on-surface mb-3">Frequently Asked Questions</h3>

                  <div className="d-flex flex-column gap-3">
                    {faqs.map((faq, idx) => (
                      <div key={idx} className="p-3 bg-surface-container-lowest rounded-3 border border-outline-variant/20">
                        <h4 className="font-body-base fw-bold text-on-surface mb-2" style={{ fontSize: '15px' }}>
                          ❓ {faq.q}
                        </h4>
                        <p className="font-body-sm text-on-surface-variant m-0" style={{ fontSize: '13px', lineHeight: '1.5' }}>
                          {faq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
