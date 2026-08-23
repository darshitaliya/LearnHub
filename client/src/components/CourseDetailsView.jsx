import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function CourseDetailsView({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('curriculum');
  const [openModules, setOpenModules] = useState({ 1: true, 2: false, 3: false });

  const toggleModule = (id) => {
    setOpenModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-surface">
      <Header activeView="course-details" onNavigate={onNavigate} />

      <main className="flex-grow-1 w-100 max-w-container-max mx-auto px-3 px-md-5 py-4 py-md-5">
        {/* Hero Banner Section */}
        <section className="row g-4 mb-5 align-items-center">
          {/* Video Placeholder */}
          <div className="col-12 col-lg-7">
            <div
              className="position-relative rounded-4 overflow-hidden shadow-sm bg-surface-container-high border border-outline-variant/20 d-flex align-items-center justify-content-center cursor-pointer group"
              style={{ aspectRatio: '16/9' }}
            >
              <img
                className="position-absolute w-100 h-100 object-fit-cover opacity-80"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCc_P4bDonDSVnHhQab5Iw5rgqL2FAg1YI9MYUOdkuuHogQ9yokQeqxsakBi3ghU_SkEsswrJXOsiDE0eephEXqbAPWnwm-HVr-n6KQl44LkfqSd0bw3cqp4f73eaOQj9iNCV5879MGfNdPVgSr_qD-Q9Yuj3b52KGmh_y1v4y143OHehRzZtU9dd2EDtWwqYsl9Qh-wtSI3bXsIe2_iu4OXD6vJMxsjiFaaJhgln9n9TkKdJRzDPIW"
                alt="Educational studio background"
              />
              {/* Play Button Overlay */}
              <div
                className="position-relative z-1 rounded-circle bg-primary text-white d-flex align-items-center justify-content-center shadow-lg"
                style={{ width: '70px', height: '70px', backgroundColor: 'rgba(53, 37, 205, 0.9)' }}
              >
                <span className="material-symbols-outlined fs-2 fill">play_arrow</span>
              </div>
            </div>
          </div>

          {/* Course Intro Details */}
          <div className="col-12 col-lg-5 d-flex flex-column gap-3">
            <div className="d-flex align-items-center gap-2">
              <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-pill font-label-caps">
                Advanced
              </span>
              <span className="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-pill font-label-caps">
                Data Science
              </span>
            </div>

            <h1 className="font-display-lg text-on-surface m-0" style={{ fontSize: 'calc(1.6rem + 1.2vw)' }}>
              Advanced Machine Learning Architectures
            </h1>

            <p className="font-body-base text-on-surface-variant m-0">
              Master state-of-the-art neural networks, transformer models, and scalable deployment strategies for enterprise AI applications.
            </p>

            <div className="d-flex align-items-center gap-3">
              <div className="d-flex text-tertiary-fixed-dim">
                <span className="material-symbols-outlined fs-5 fill">star</span>
                <span className="material-symbols-outlined fs-5 fill">star</span>
                <span className="material-symbols-outlined fs-5 fill">star</span>
                <span className="material-symbols-outlined fs-5 fill">star</span>
                <span className="material-symbols-outlined fs-5">star_half</span>
              </div>
              <span className="font-body-sm text-on-surface fw-bold">4.8</span>
              <span className="font-body-sm text-on-surface-variant text-decoration-underline">(12,405 reviews)</span>
            </div>

            <div className="d-flex flex-wrap align-items-center gap-4 text-on-surface-variant font-body-sm pt-2">
              <div className="d-flex align-items-center gap-1">
                <span className="material-symbols-outlined fs-5">schedule</span>
                <span>48 Hours</span>
              </div>
              <div className="d-flex align-items-center gap-1">
                <span className="material-symbols-outlined fs-5">ondemand_video</span>
                <span>120 Lessons</span>
              </div>
              <div className="d-flex align-items-center gap-1">
                <span className="material-symbols-outlined fs-5">language</span>
                <span>English, Spanish</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content & Sidebar Grid */}
        <div className="row g-4">
          {/* Left Main Content */}
          <div className="col-12 col-lg-8">
            {/* Nav Tabs */}
            <div className="border-bottom border-outline-variant d-flex overflow-x-auto hide-scrollbar mb-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={`btn rounded-0 border-0 px-4 py-3 font-body-base font-medium whitespace-nowrap ${
                  activeTab === 'overview' ? 'text-primary border-bottom border-2 border-primary' : 'text-on-surface-variant'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('curriculum')}
                className={`btn rounded-0 border-0 px-4 py-3 font-body-base font-medium whitespace-nowrap ${
                  activeTab === 'curriculum' ? 'text-primary border-bottom border-2 border-primary' : 'text-on-surface-variant'
                }`}
              >
                Curriculum
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`btn rounded-0 border-0 px-4 py-3 font-body-base font-medium whitespace-nowrap ${
                  activeTab === 'reviews' ? 'text-primary border-bottom border-2 border-primary' : 'text-on-surface-variant'
                }`}
              >
                Reviews
              </button>
              <button
                onClick={() => setActiveTab('instructor')}
                className={`btn rounded-0 border-0 px-4 py-3 font-body-base font-medium whitespace-nowrap ${
                  activeTab === 'instructor' ? 'text-primary border-bottom border-2 border-primary' : 'text-on-surface-variant'
                }`}
              >
                Instructor
              </button>
            </div>

            {/* Tab Content: Curriculum */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-4 shadow-sm p-4">
              <h2 className="font-headline-md text-on-surface mb-4">Course Curriculum</h2>

              <div className="d-flex flex-column gap-3">
                {/* Module 1 */}
                <div className={`accordion-item border border-outline-variant/30 rounded-3 overflow-hidden bg-surface-bright ${openModules[1] ? 'active' : ''}`}>
                  <button
                    onClick={() => toggleModule(1)}
                    className="w-100 d-flex align-items-center justify-content-between p-3 bg-surface-container-low border-0 text-start cursor-pointer"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <span className="font-label-caps text-on-surface-variant" style={{ width: '80px' }}>MODULE 1</span>
                      <span className="font-body-base fw-semibold text-on-surface">Foundations of Neural Networks</span>
                    </div>
                    <div className="d-flex align-items-center gap-3 text-on-surface-variant">
                      <span className="font-body-sm d-none d-md-inline">5 Lessons • 2h 15m</span>
                      <span className={`material-symbols-outlined accordion-icon ${openModules[1] ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </div>
                  </button>

                  {openModules[1] && (
                    <div className="accordion-content border-top border-outline-variant/20 p-0">
                      <ul className="list-group list-group-flush m-0">
                        <li className="list-group-item d-flex align-items-center justify-content-between p-3 bg-transparent border-bottom border-outline-variant/20">
                          <div className="d-flex align-items-center gap-3">
                            <span className="material-symbols-outlined text-primary fill">play_circle</span>
                            <span className="font-body-sm text-on-surface hover-primary cursor-pointer">
                              Introduction to Deep Learning Concepts
                            </span>
                          </div>
                          <span className="font-body-sm text-on-surface-variant">15:30</span>
                        </li>

                        <li className="list-group-item d-flex align-items-center justify-content-between p-3 bg-transparent border-bottom border-outline-variant/20">
                          <div className="d-flex align-items-center gap-3">
                            <span className="material-symbols-outlined text-primary fill">play_circle</span>
                            <span className="font-body-sm text-on-surface hover-primary cursor-pointer">
                              Perceptrons and Activation Functions
                            </span>
                          </div>
                          <span className="font-body-sm text-on-surface-variant">22:45</span>
                        </li>

                        <li className="list-group-item d-flex align-items-center justify-content-between p-3 bg-transparent">
                          <div className="d-flex align-items-center gap-3">
                            <span className="material-symbols-outlined text-secondary">description</span>
                            <span className="font-body-sm text-on-surface hover-primary cursor-pointer">
                              Reading: History of AI
                            </span>
                          </div>
                          <span className="font-body-sm text-on-surface-variant">10 Min Read</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Module 2 */}
                <div className={`accordion-item border border-outline-variant/30 rounded-3 overflow-hidden bg-surface-bright ${openModules[2] ? 'active' : ''}`}>
                  <button
                    onClick={() => toggleModule(2)}
                    className="w-100 d-flex align-items-center justify-content-between p-3 bg-surface-container-low border-0 text-start cursor-pointer"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <span className="font-label-caps text-on-surface-variant" style={{ width: '80px' }}>MODULE 2</span>
                      <span className="font-body-base fw-semibold text-on-surface">Convolutional Architectures (CNNs)</span>
                    </div>
                    <div className="d-flex align-items-center gap-3 text-on-surface-variant">
                      <span className="font-body-sm d-none d-md-inline">8 Lessons • 4h 30m</span>
                      <span className="material-symbols-outlined accordion-icon">expand_more</span>
                    </div>
                  </button>

                  {openModules[2] && (
                    <div className="accordion-content border-top border-outline-variant/20 p-0">
                      <ul className="list-group list-group-flush m-0">
                        <li className="list-group-item d-flex align-items-center justify-content-between p-3 bg-transparent">
                          <div className="d-flex align-items-center gap-3">
                            <span className="material-symbols-outlined text-on-surface-variant">lock</span>
                            <span className="font-body-sm text-on-surface-variant">Image Processing Basics</span>
                          </div>
                          <span className="font-body-sm text-on-surface-variant">18:20</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Module 3 */}
                <div className={`accordion-item border border-outline-variant/30 rounded-3 overflow-hidden bg-surface-bright ${openModules[3] ? 'active' : ''}`}>
                  <button
                    onClick={() => toggleModule(3)}
                    className="w-100 d-flex align-items-center justify-content-between p-3 bg-surface-container-low border-0 text-start cursor-pointer"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <span className="font-label-caps text-on-surface-variant" style={{ width: '80px' }}>MODULE 3</span>
                      <span className="font-body-base fw-semibold text-on-surface">Transformer Models & NLP</span>
                    </div>
                    <div className="d-flex align-items-center gap-3 text-on-surface-variant">
                      <span className="font-body-sm d-none d-md-inline">12 Lessons • 6h 00m</span>
                      <span className="material-symbols-outlined accordion-icon">expand_more</span>
                    </div>
                  </button>

                  {openModules[3] && (
                    <div className="accordion-content border-top border-outline-variant/20 p-3">
                      <div className="text-on-surface-variant font-body-sm fst-italic">
                        Content locked. Enroll to view.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-12 col-lg-4">
            <div className="sticky-top" style={{ top: '90px', zIndex: 2 }}>
              {/* Pricing & Enrollment Card */}
              <div className="bg-surface-container-lowest rounded-4 shadow-sm border border-outline-variant/20 p-4 d-flex flex-column gap-4 mb-4">
                <div className="d-flex justify-content-between align-items-end">
                  <div className="d-flex flex-column">
                    <span className="font-label-caps text-primary mb-1">Full Course Access</span>
                    <span className="font-display-lg-mobile text-on-surface fw-bold">$199.99</span>
                  </div>
                  <span className="font-body-sm text-on-surface-variant text-decoration-line-through mb-2">$299.99</span>
                </div>

                <button
                  onClick={() => onNavigate('dashboard')}
                  className="btn btn-primary w-100 font-headline-md py-3 rounded-3 d-flex align-items-center justify-content-center gap-2"
                >
                  <span>Enroll Now</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>

                <div className="pt-3 border-top border-outline-variant/20">
                  <p className="font-label-caps text-on-surface-variant mb-3">THIS COURSE INCLUDES:</p>
                  <ul className="list-unstyled d-flex flex-column gap-2 m-0">
                    <li className="d-flex align-items-start gap-2">
                      <span className="material-symbols-outlined text-secondary fs-6 mt-1">check_circle</span>
                      <span className="font-body-sm text-on-surface">48 hours of on-demand video</span>
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <span className="material-symbols-outlined text-secondary fs-6 mt-1">check_circle</span>
                      <span className="font-body-sm text-on-surface">15 hands-on projects & assignments</span>
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <span className="material-symbols-outlined text-secondary fs-6 mt-1">check_circle</span>
                      <span className="font-body-sm text-on-surface">Certificate of completion</span>
                    </li>
                    <li className="d-flex align-items-start gap-2">
                      <span className="material-symbols-outlined text-secondary fs-6 mt-1">check_circle</span>
                      <span className="font-body-sm text-on-surface">Lifetime access to updates</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Lead Instructor Card */}
              <div className="bg-surface-container-low rounded-4 border border-outline-variant/20 p-4">
                <p className="font-label-caps text-on-surface-variant mb-3">LEAD INSTRUCTOR</p>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    className="rounded-circle overflow-hidden border border-2 border-white shadow-sm flex-shrink-0"
                    style={{ width: '60px', height: '60px' }}
                  >
                    <img
                      className="w-100 h-100 object-fit-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXsLFd9D54QvHC0YzVKgLxHnnpERLlfdgwtLORSSs-tNRp-QmFZO2N6hDlOwY4x1YQPu2xppRb0y7Znoil2TshKCTUkd0a-yYGk5Su4MWRVe3T_a9Ip01U3Ouw28n9nEcUzBOnvUSpbLqrQhL2mobnRZyxz1nmOj7wHnAyCbza00LARkU3ve07zwoM3KCRp_eschNgIu0MYW1mNjmkarjPPMHEd9LoEG2l2hK4csZx1DvTbpTJqdf4"
                      alt="Dr. Elena Rostova"
                    />
                  </div>
                  <div>
                    <h3 className="font-headline-md text-on-surface fs-5 m-0 fw-bold">Dr. Elena Rostova</h3>
                    <p className="font-body-sm text-on-surface-variant m-0">Former AI Research Lead, TechCorp</p>
                  </div>
                </div>
                <p className="font-body-sm text-on-surface-variant m-0">
                  Dr. Rostova brings over 15 years of industry experience in deploying large-scale machine learning systems. She is passionate about bridging the gap between theoretical research and practical engineering.
                </p>
                <a href="#" className="d-inline-block mt-3 font-body-sm text-primary fw-semibold text-decoration-none hover-underline">
                  View full profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
