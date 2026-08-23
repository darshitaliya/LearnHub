import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CourseCard from '../components/CourseCard';
import EnrollmentFormModal from '../components/EnrollmentFormModal';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function HomePage() {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const [selectedEnrollCourse, setSelectedEnrollCourse] = useState(null);
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchFeaturedCourses();
  }, []);

  const fetchFeaturedCourses = async () => {
    try {
      const res = await api.get('/courses');
      setFeaturedCourses(res.data || []);
    } catch (err) {
      setFeaturedCourses([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-surface">
      <Navbar />

      <main className="flex-grow-1 position-relative overflow-hidden">
        {/* Ambient Gradients */}
        <div
          className="position-absolute rounded-circle blur-3xl pointer-events-none"
          style={{ top: 0, right: '-10%', width: '600px', height: '600px', background: 'rgba(53, 37, 205, 0.05)', filter: 'blur(100px)', zIndex: 0 }}
        />
        <div
          className="position-absolute rounded-circle blur-3xl pointer-events-none"
          style={{ bottom: 0, left: '-10%', width: '500px', height: '500px', background: 'rgba(0, 104, 122, 0.05)', filter: 'blur(100px)', zIndex: 0 }}
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
                  onClick={() => navigate('/courses')}
                  className="btn btn-primary font-body-base fw-bold px-4 py-3 rounded-3 d-flex align-items-center justify-content-center gap-2 shadow-sm text-nowrap whitespace-nowrap"
                >
                  <span>Explore Courses</span>
                  <span className="material-symbols-outlined fs-5">arrow_forward</span>
                </button>

                <button
                  onClick={() => navigate('/courses?category=Computer+Science')}
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
                    alt="Learner 1"
                  />
                  <img
                    className="rounded-circle border border-2 border-white object-fit-cover"
                    style={{ width: '40px', height: '40px', marginRight: '-12px' }}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIJh83q13eEpGU20synQHsPiLBWAHfuQGbFrNMH3dBeHkJ8paWZIrNyFW4wj6cCOx5MePDBGSCIV8zxOnRIUYrTf3PfA2Cz5RuQARD_r-z7xi4y-mStutjazfEJaiP_TNrg_Yr1pSVEF3lF_e02oksSiJFrYGBvnm-T_wnG6_zVy3enIm5snB7eIde_E-KoIYRaBpoMRaaZo0MslueJlNPhAdIvxnoetUmJnLfCwOmB9-ZX-SDBmsP"
                    alt="Learner 2"
                  />
                  <img
                    className="rounded-circle border border-2 border-white object-fit-cover"
                    style={{ width: '40px', height: '40px', marginRight: '-12px' }}
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCltDBBGb1o36sJNwdVN9piBzAcW0fuRngoD3uVPh_QMMD0CzW5VFD0CyJbZk-TLFIms15TQRQjlrHkDi6a4EZDd_m7osSWHw1gP4wY6ilOB86N-nPGOcUQxDoF43GQcuHTL9qIFEIXmGubxlzdSjPaPnlxhTLV70oay2ToJ7-2IQcoAXuJyJSmOu9GjnPiBtC2s3wdRs3t8CyzLnDNJ0nMkRM0T18oDC02siOMMfphtpBXCjAb61vV"
                    alt="Learner 3"
                  />
                  <div className="rounded-circle border border-2 border-white bg-surface-container d-flex align-items-center justify-content-center font-label-caps text-primary" style={{ width: '40px', height: '40px', zIndex: 4 }}>
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

              {/* Floating Card 1 */}
              <div className="position-absolute glass-panel p-3 rounded-4 glass-card" style={{ top: '10%', left: '-30px', width: '210px', zIndex: 10 }}>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <div className="rounded-circle d-flex align-items-center justify-content-center text-primary" style={{ width: '38px', height: '38px', backgroundColor: 'rgba(79, 70, 229, 0.15)' }}>
                    <span className="material-symbols-outlined fs-5 fill">code</span>
                  </div>
                  <div>
                    <p className="font-label-caps text-on-surface m-0" style={{ fontSize: '11px' }}>Web Dev Bootcamp</p>
                    <p className="font-body-sm text-on-surface-variant m-0" style={{ fontSize: '10px' }}>Next JS & React</p>
                  </div>
                </div>
                <div className="w-100 bg-surface-container rounded-pill" style={{ height: '6px' }}>
                  <div className="bg-secondary rounded-pill" style={{ width: '75%', height: '6px' }}></div>
                </div>
              </div>

              {/* Floating Card 2 */}
              <div className="position-absolute glass-panel p-3 rounded-4 glass-card" style={{ bottom: '15%', right: '-20px', zIndex: 10 }}>
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex flex-column">
                    <span className="font-headline-md text-on-surface fw-bold">4.9/5</span>
                    <div className="d-flex text-tertiary-fixed-dim">
                      <span className="material-symbols-outlined fs-6 fill">star</span>
                      <span className="material-symbols-outlined fs-6 fill">star</span>
                      <span className="material-symbols-outlined fs-6 fill">star</span>
                      <span className="material-symbols-outlined fs-6 fill">star</span>
                      <span className="material-symbols-outlined fs-6 fill">star</span>
                    </div>
                  </div>
                  <div className="ps-3 border-start border-outline-variant/30">
                    <p className="font-body-sm text-on-surface-variant m-0" style={{ fontSize: '11px', lineHeight: '1.3' }}>
                      Based on<br />1,200+ reviews
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6 Static HD Featured Course Cards Feed */}
        <section className="py-5 bg-white border-top border-bottom border-outline-variant/20">
          <div className="max-w-container-max mx-auto px-3 px-md-5">
            <div className="d-flex align-items-end justify-content-between mb-4">
              <div>
                <span className="font-label-caps text-primary">FEATURED CURRICULUM</span>
                <h2 className="font-headline-md text-on-surface m-0 fw-bold fs-3">Popular Courses</h2>
              </div>
              <Link to="/courses" className="font-body-sm text-primary fw-semibold text-decoration-none d-flex align-items-center gap-1">
                View All Courses <span className="material-symbols-outlined fs-5">arrow_forward</span>
              </Link>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status" />
                <p className="mt-2 text-on-surface-variant font-body-sm">Loading live curriculum from database...</p>
              </div>
            ) : featuredCourses.length > 0 ? (
              <div className="row g-4">
                {featuredCourses.slice(0, 6).map((course) => (
                  <div key={course.id || course._id} className="col-12 col-md-6 col-lg-4">
                    <CourseCard course={course} onEnrollClick={(crs) => setSelectedEnrollCourse(crs)} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5 bg-surface-container-low rounded-4 border border-outline-variant/30 p-4">
                <span className="material-symbols-outlined fs-1 text-primary mb-2">menu_book</span>
                <h4 className="fw-bold mb-1">No Courses Published Yet</h4>
                <p className="text-on-surface-variant font-body-sm max-w-sm mx-auto mb-3">
                  Courses added by the Admin will appear here live.
                </p>
                <Link to="/courses" className="btn btn-primary font-body-sm px-4 py-2 rounded-3">
                  View Catalog
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Programming Languages & Tech Stacks Section */}
        <section className="py-5 bg-surface-container-lowest">
          <div className="max-w-container-max mx-auto px-3 px-md-5">
            <div className="d-flex align-items-end justify-content-between mb-4">
              <div>
                <span className="font-label-caps text-primary">POPULAR PROGRAMMING LANGUAGES & STACKS</span>
                <h2 className="font-headline-md text-on-surface m-0 fw-bold fs-3">Learn By Official Technology & Language</h2>
              </div>
              <Link to="/courses" className="font-body-sm text-primary fw-semibold text-decoration-none d-flex align-items-center gap-1">
                View All Technologies <span className="material-symbols-outlined fs-5">arrow_forward</span>
              </Link>
            </div>

            <div className="row g-3 g-md-4">
              {[
                { name: 'Python Programming', domain: 'Data Science, AI & Machine Learning', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', query: 'Data Science' },
                { name: 'React & Next.js', domain: 'Modern Frontend Web Development', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', query: 'React' },
                { name: 'Node.js & Express', domain: 'Backend APIs & Microservices', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', query: 'Computer Science' },
                { name: 'JavaScript & TypeScript', domain: 'Full-Stack Software Engineering', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', query: 'Computer Science' },
                { name: 'C++ Programming', domain: 'High-Performance Systems & DSA', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', query: 'Computer Science' },
                { name: 'Java Enterprise', domain: 'Object-Oriented & Distributed Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', query: 'Computer Science' },
                { name: 'PyTorch & AI', domain: 'Deep Learning, LLMs & MLOps', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', query: 'Data Science' },
                { name: 'Docker & DevOps', domain: 'Containerization & Cloud Ops', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', query: 'Computer Science' },
                { name: 'Figma & UI/UX Design', domain: 'Design Systems & Interface Architecture', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', query: 'Design' },
                { name: 'Go (Golang)', domain: 'Concurrent Cloud Microservices', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg', query: 'Computer Science' },
                { name: 'MongoDB & Databases', domain: 'NoSQL & Relational Database Systems', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', query: 'Computer Science' },
                { name: 'HTML5 & CSS3', domain: 'Responsive Web Layouts & Styling', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', query: 'Design' },
              ].map((tech, idx) => (
                <div key={idx} className="col-12 col-sm-6 col-lg-3">
                  <div
                    onClick={() => navigate(`/courses?category=${encodeURIComponent(tech.query)}`)}
                    className="bg-white rounded-4 border border-outline-variant/30 p-4 shadow-sm h-100 d-flex flex-column justify-content-between cursor-pointer hover-elevation transition-all"
                  >
                    <div>
                      <div className="d-flex align-items-center mb-3">
                        <div
                          className="rounded-3 d-flex align-items-center justify-content-center p-2 bg-surface-container-low border border-outline-variant/20 shadow-xs"
                          style={{ width: '48px', height: '48px' }}
                        >
                          <img src={tech.logo} alt={tech.name} className="w-100 h-100 object-fit-contain" />
                        </div>
                      </div>

                      <h3 className="font-headline-md fs-5 fw-bold text-on-surface mb-1 hover-primary">{tech.name}</h3>
                      <p className="font-body-sm text-on-surface-variant m-0" style={{ fontSize: '13px' }}>{tech.domain}</p>
                    </div>

                    <div className="pt-3 mt-3 border-top border-outline-variant/20 d-flex align-items-center justify-content-between font-label-caps text-primary fw-semibold" style={{ fontSize: '11px' }}>
                      <span>View Courses</span>
                      <span className="material-symbols-outlined fs-6">arrow_forward</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Enrollment Form & Success Modal */}
      {selectedEnrollCourse && (
        <EnrollmentFormModal
          course={selectedEnrollCourse}
          user={user}
          onClose={() => setSelectedEnrollCourse(null)}
          onSuccess={() => {
            if (refreshUser) refreshUser();
          }}
        />
      )}

      <Footer />
    </div>
  );
}
