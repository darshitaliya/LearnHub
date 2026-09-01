import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutPage() {
  const values = [
    { icon: 'workspace_premium', title: 'Industry-Grade Excellence', desc: 'Curriculum architected by principal engineers and tech leads from top global software organizations.' },
    { icon: 'card_giftcard', title: '100% Free & Accessible', desc: 'Eliminating financial barriers to ensure elite software education is accessible to everyone worldwide.' },
    { icon: 'code', title: 'Hands-On Code Mastery', desc: 'Learn by building production-ready projects, distributed systems, and real portfolio applications.' },
    { icon: 'groups', title: 'Global Mentorship', desc: 'Connect with a vibrant worldwide community of 100,000+ passionate developers and mentors.' },
  ];

  const team = [
    {
      name: 'Vishv Bhikadiya',
      role: 'Co-Founder & Lead AI / Full-Stack Architect',
      bio: 'Visionary software engineer and AI researcher passionate about scalable cloud architectures, neural networks, and educational empowerment.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vishv&backgroundColor=b6e3f4',
    },
    {
      name: 'Meera Dolasiya',
      role: 'Co-Founder & Head of Product & UX Design',
      bio: 'Creative product architect specializing in modern UI/UX design systems, interactive web experiences, and learner-first digital interfaces.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Meera&backgroundColor=ffdfbf',
    },
    {
      name: 'Jash Jiyani',
      role: 'Co-Founder & Principal Platform Engineer',
      bio: 'Expert backend architect focused on high-performance distributed microservices, database scalability, and DevOps automation.',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jash&backgroundColor=d1d4f9',
    },
  ];

  return (
    <div className="d-flex flex-column min-vh-100 bg-surface">
      <Navbar />

      <main className="flex-grow-1">
        {/* Hero Section */}
        <section className="py-5 bg-white border-bottom border-outline-variant/20">
          <div className="max-w-container-max mx-auto px-3 px-md-5 text-start">
            <span className="font-label-caps text-primary mb-1 d-block">ABOUT LEARNHUB</span>
            <h1 className="font-headline-md text-on-surface m-0 fw-bold fs-2 mb-2">
              Revolutionizing Technical Education For Everyone
            </h1>
            <p className="font-body-base text-on-surface-variant m-0 max-w-lg" style={{ lineHeight: '1.6' }}>
              LearnHub was founded with a single mission: to empower software engineers, designers, and AI researchers through world-class, 100% free technical education.
            </p>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="py-4 bg-primary text-white">
          <div className="max-w-container-max mx-auto px-3 px-md-5">
            <div className="row g-4 text-center">
              <div className="col-6 col-md-3">
                <h2 className="font-headline-md fw-bold fs-1 m-0">100K+</h2>
                <span className="font-label-caps text-white-50">Active Students</span>
              </div>
              <div className="col-6 col-md-3">
                <h2 className="font-headline-md fw-bold fs-1 m-0">10+</h2>
                <span className="font-label-caps text-white-50">Expert Pathways</span>
              </div>
              <div className="col-6 col-md-3">
                <h2 className="font-headline-md fw-bold fs-1 m-0">98%</h2>
                <span className="font-label-caps text-white-50">Completion Rate</span>
              </div>
              <div className="col-6 col-md-3">
                <h2 className="font-headline-md fw-bold fs-1 m-0">150+</h2>
                <span className="font-label-caps text-white-50">Countries Reached</span>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-5 bg-surface-container-lowest">
          <div className="max-w-container-max mx-auto px-3 px-md-5">
            <div className="text-start mb-4">
              <span className="font-label-caps text-secondary mb-1 d-block">OUR GUIDING PRINCIPLES</span>
              <h2 className="font-headline-md text-on-surface fw-bold fs-3 m-0">Built On Core Engineering Values</h2>
            </div>

            <div className="row g-4">
              {values.map((v, idx) => (
                <div key={idx} className="col-12 col-md-6 col-lg-3">
                  <div className="bg-white rounded-4 border border-outline-variant/30 p-4 shadow-sm h-100 d-flex flex-column gap-3">
                    <div
                      className="rounded-3 bg-primary-container/20 text-primary d-flex align-items-center justify-content-center"
                      style={{ width: '48px', height: '48px' }}
                    >
                      <span className="material-symbols-outlined fs-4">{v.icon}</span>
                    </div>
                    <h3 className="font-headline-md fs-5 fw-bold text-on-surface m-0">{v.title}</h3>
                    <p className="font-body-sm text-on-surface-variant m-0" style={{ lineHeight: '1.5' }}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-5 bg-white border-top border-bottom border-outline-variant/20">
          <div className="max-w-container-max mx-auto px-3 px-md-5">
            <div className="text-start mb-4">
              <span className="font-label-caps text-primary mb-1 d-block">WORLD-CLASS INSTRUCTORS</span>
              <h2 className="font-headline-md text-on-surface fw-bold fs-3 m-0">Meet Our Academic Leaders</h2>
            </div>

            <div className="row g-4">
              {team.map((member, idx) => (
                <div key={idx} className="col-12 col-md-4">
                  <div className="bg-surface-container-lowest rounded-4 border border-outline-variant/30 p-4 shadow-sm text-center h-100 d-flex flex-column align-items-center">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="rounded-circle object-fit-cover shadow-sm mb-3"
                      style={{ width: '90px', height: '90px' }}
                    />
                    <h3 className="font-headline-md fs-5 fw-bold text-on-surface mb-1">{member.name}</h3>
                    <span className="font-label-caps text-primary mb-3" style={{ fontSize: '11px' }}>{member.role}</span>
                    <p className="font-body-sm text-on-surface-variant m-0" style={{ fontSize: '13px', lineHeight: '1.5' }}>{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-5 bg-surface-container-low text-center">
          <div className="max-w-container-max mx-auto px-3 px-md-5 max-w-md">
            <h2 className="font-headline-md text-on-surface fw-bold fs-2 mb-3">Start Learning For Free Today</h2>
            <p className="font-body-base text-on-surface-variant mb-4">
              Unlock access to 10+ expert-led technology courses, complete hands-on projects, and earn verified certificates.
            </p>
            <Link to="/courses" className="btn btn-primary font-headline-md px-5 py-3 rounded-3 shadow-sm">
              Explore All Free Courses
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
