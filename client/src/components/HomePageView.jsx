import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function HomePageView({ onNavigate }) {
  return (
    <div className="d-flex flex-column min-vh-100 bg-surface">
      <Header activeView="home" onNavigate={onNavigate} />

      <main className="flex-grow-1 position-relative overflow-hidden">
        {/* Decorative Background Gradients */}
        <div
          className="position-absolute rounded-circle blur-3xl pointer-events-none"
          style={{
            top: 0,
            right: '-10%',
            width: '600px',
            height: '600px',
            background: 'rgba(53, 37, 205, 0.05)',
            filter: 'blur(100px)',
            zIndex: 0,
          }}
        />
        <div
          className="position-absolute rounded-circle blur-3xl pointer-events-none"
          style={{
            bottom: 0,
            left: '-10%',
            width: '500px',
            height: '500px',
            background: 'rgba(0, 104, 122, 0.05)',
            filter: 'blur(100px)',
            zIndex: 0,
          }}
        />

        {/* Hero Section */}
        <section className="position-relative py-5 px-3 px-md-5 max-w-container-max mx-auto" style={{ zIndex: 1 }}>
          <div className="row align-items-center g-5">
            {/* Left Content Column */}
            <div className="col-12 col-lg-6 d-flex flex-column gap-3">
              <div>
                <span
                  className="font-label-caps text-secondary px-3 py-1 rounded-pill d-inline-block"
                  style={{ backgroundColor: 'rgba(87, 223, 254, 0.2)', letterSpacing: '0.1em' }}
                >
                  FUTURE-PROOF YOUR CAREER
                </span>
              </div>

              <h1 className="font-display-lg text-on-surface my-2" style={{ fontSize: 'calc(1.875rem + 1.5vw)' }}>
                Learn New Skills,<br />
                <span className="gradient-text">Build Your Future</span>
              </h1>

              <p className="font-body-base text-on-surface-variant m-0" style={{ maxWidth: '540px' }}>
                Access premium courses, expert mentors, and interactive pathways designed to elevate your professional trajectory in tech, design, and business.
              </p>

              <div className="d-flex flex-column flex-sm-row gap-3 mt-3">
                <button
                  onClick={() => onNavigate('course-details')}
                  className="btn btn-primary font-body-base fw-bold px-4 py-3 rounded-3 d-flex align-items-center justify-content-center gap-2 shadow-sm text-nowrap whitespace-nowrap"
                >
                  <span>Explore Courses</span>
                  <span className="material-symbols-outlined fs-5">arrow_forward</span>
                </button>

                <button
                  onClick={() => onNavigate('dashboard')}
                  className="btn btn-outline-primary font-body-base fw-bold px-4 py-3 rounded-3 d-flex align-items-center justify-content-center gap-2 text-nowrap whitespace-nowrap"
                >
                  <span>View Pathways</span>
                  <span className="material-symbols-outlined fs-5">alt_route</span>
                </button>
              </div>

              {/* Social Proof */}
              <div className="d-flex align-items-center gap-3 mt-4 pt-4 border-top border-outline-variant/30">
                <div className="d-flex position-relative me-2" style={{ height: '40px' }}>
                  <img
                    className="rounded-circle border border-2 border-white object-fit-cover"
                    style={{ width: '40px', height: '40px', marginRight: '-12px' }}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC__eKJ00jvU12y3o2QSdX4bL7g2K1DJWz_b_yOeibIoVvDhhjChErymqBcJC9Qbcpg7q0exQEfmvJP7b_qAaY7hcwP4_9jMl31y0ODEInQhdDKC8fZKD5To-s2AhQwP0XRCVVoPo2yM7yKRTrHr53CA5KWEme6JC_kj06JngQjePH59OREbEkDT_Q7XKy_cdjmdA_IUdYEAE1PKupBDNsA9fZSEQSQsDhiV50hnIzh_pF7vP1qNB15"
                    alt="User portrait 1"
                  />
                  <img
                    className="rounded-circle border border-2 border-white object-fit-cover"
                    style={{ width: '40px', height: '40px', marginRight: '-12px' }}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIJh83q13eEpGU20synQHsPiLBWAHfuQGbFrNMH3dBeHkJ8paWZIrNyFW4wj6cCOx5MePDBGSCIV8zxOnRIUYrTf3PfA2Cz5RuQARD_r-z7xi4y-mStutjazfEJaiP_TNrg_Yr1pSVEF3lF_e02oksSiJFrYGBvnm-T_wnG6_zVy3enIm5snB7eIde_E-KoIYRaBpoMRaaZo0MslueJlNPhAdIvxnoetUmJnLfCwOmB9-ZX-SDBmsP"
                    alt="User portrait 2"
                  />
                  <img
                    className="rounded-circle border border-2 border-white object-fit-cover"
                    style={{ width: '40px', height: '40px', marginRight: '-12px' }}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCltDBBGb1o36sJNwdVN9piBzAcW0fuRngoD3uVPh_QMMD0CzW5VFD0CyJbZk-TLFIms15TQRQjlrHkDi6a4EZDd_m7osSWHw1gP4wY6ilOB86N-nPGOcUQxDoF43GQcuHTL9qIFEIXmGubxlzdSjPaPnlxhTLV70oay2ToJ7-2IQcoAXuJyJSmOu9GjnPiBtC2s3wdRs3t8CyzLnDNJ0nMkRM0T18oDC02siOMMfphtpBXCjAb61vV"
                    alt="User portrait 3"
                  />
                  <div
                    className="rounded-circle border border-2 border-white bg-surface-container d-flex align-items-center justify-content-center font-label-caps text-primary"
                    style={{ width: '40px', height: '40px', zIndex: 4 }}
                  >
                    +2k
                  </div>
                </div>

                <p className="font-body-sm text-on-surface-variant m-0">
                  Join over <span className="fw-bold text-on-surface">10,000+</span> active learners
                </p>
              </div>
            </div>

            {/* Right Media Column */}
            <div className="col-12 col-lg-6 d-none d-md-block position-relative" style={{ minHeight: '500px' }}>
              <div className="position-relative h-100 rounded-4 overflow-hidden shadow-sm border border-outline-variant/20 bg-surface-container-low" style={{ minHeight: '480px' }}>
                <img
                  className="w-100 h-100 object-fit-cover position-absolute top-0 start-0"
                  src="/learnhub_hero_hd.jpg"
                  alt="Student 3D interface illustration 4K HD"
                />
              </div>

              {/* Floating Glass Card 1 - Left Top */}
              <div
                className="position-absolute glass-panel p-3 rounded-4 glass-card shadow-lg"
                style={{ top: '10%', left: '-30px', width: '210px', zIndex: 10 }}
              >
                <div className="d-flex align-items-center gap-2 mb-2">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center text-primary"
                    style={{ width: '38px', height: '38px', backgroundColor: 'rgba(79, 70, 229, 0.18)' }}
                  >
                    <span className="material-symbols-outlined fs-5 fill">code</span>
                  </div>
                  <div>
                    <p className="font-label-caps text-on-surface m-0 fw-bold" style={{ fontSize: '11px' }}>Web Dev Bootcamp</p>
                    <p className="font-body-sm text-on-surface-variant m-0 fw-medium" style={{ fontSize: '11px' }}>Next JS & React</p>
                  </div>
                </div>
                <div className="w-100 bg-surface-container rounded-pill" style={{ height: '6px' }}>
                  <div className="bg-secondary rounded-pill" style={{ width: '75%', height: '6px' }}></div>
                </div>
              </div>

              {/* Floating Glass Card 2 - Right Bottom */}
              <div
                className="position-absolute glass-panel p-3 rounded-4 glass-card shadow-lg"
                style={{ bottom: '15%', right: '-20px', zIndex: 10 }}
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex flex-column">
                    <span className="font-headline-md text-on-surface fw-bold fs-4">4.9/5</span>
                    <div className="d-flex text-warning">
                      <span className="material-symbols-outlined fs-6 fill">star</span>
                      <span className="material-symbols-outlined fs-6 fill">star</span>
                      <span className="material-symbols-outlined fs-6 fill">star</span>
                      <span className="material-symbols-outlined fs-6 fill">star</span>
                      <span className="material-symbols-outlined fs-6 fill">star</span>
                    </div>
                  </div>
                  <div className="ps-3 border-start border-outline-variant/30">
                    <p className="font-body-sm text-on-surface-variant m-0" style={{ fontSize: '11px', lineHeight: '1.3' }}>
                      Based on<br /><strong className="text-on-surface">1,200+</strong> reviews
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
