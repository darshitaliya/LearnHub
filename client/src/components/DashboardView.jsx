import React, { useState } from 'react';

export default function DashboardView({ onNavigate }) {
  const [hoveredBar, setHoveredBar] = useState(null);

  const chartData = [
    { day: 'Mon', height: '30%', hours: '1.5h' },
    { day: 'Tue', height: '60%', hours: '3h' },
    { day: 'Wed', height: '45%', hours: '2.2h' },
    { day: 'Thu', height: '85%', hours: '4.5h', active: true },
    { day: 'Fri', height: '20%', hours: '1h' },
    { day: 'Sat', height: '5%', hours: '0.2h' },
    { day: 'Sun', height: '0%', hours: '0h' },
  ];

  return (
    <div className="d-flex min-vh-100 bg-surface overflow-hidden">
      {/* Sidebar Navigation (Desktop) */}
      <nav
        className="d-none d-lg-flex flex-column h-100 p-4 bg-surface-container-low border-end border-outline-variant/30 shadow-sm position-fixed start-0 top-0 z-3"
        style={{ width: '260px' }}
      >
        {/* Profile Header */}
        <div className="d-flex align-items-center gap-3 px-2 py-3 border-bottom border-outline-variant/20 mb-3">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCr9CHF12DMyqfTqDPJoBj_xC_FhZnCOV1I6J1SMhxGh9dcJ3yPsxD2HtzKxLTHnyTSpG0uX0MEYSV840HpNX-y1wjUL2W5uzc-jWwkVaS1whPOnE5SxNKOpXId2qBfE-9gu0NTJ6WC0LlVlX-xhbFqOzPgYtHkBVsyxV3NAvnoOITYBeL22R1XVab90baoCu1D0V5K4T5SuN-718WnFxyTEDsfdHu9ezm90n-qADcvPeqDMj_eqNdC"
            alt="Student Profile"
            className="rounded-circle border border-2 border-white object-fit-cover"
            style={{ width: '42px', height: '42px' }}
          />
          <div>
            <h1 className="font-headline-md text-primary fs-5 m-0 fw-bold">LearnHub Pro</h1>
            <p className="font-label-caps text-on-surface-variant m-0 mt-1" style={{ fontSize: '11px' }}>
              Student Account
            </p>
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex-grow-1 d-flex flex-column gap-2 overflow-y-auto">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="d-flex align-items-center gap-3 px-3 py-3 bg-primary-container text-on-primary-container rounded-3 font-body-sm text-decoration-none fw-bold border-start border-4 border-primary"
          >
            <span className="material-symbols-outlined fill">dashboard</span>
            <span>Dashboard</span>
          </a>

          <a
            href="#"
            onClick={(e) => { e.preventDefault(); onNavigate('course-details'); }}
            className="d-flex align-items-center gap-3 px-3 py-3 text-on-surface-variant rounded-3 font-body-sm text-decoration-none hover-bg-high"
          >
            <span className="material-symbols-outlined">school</span>
            <span>My Courses</span>
          </a>

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="d-flex align-items-center gap-3 px-3 py-3 text-on-surface-variant rounded-3 font-body-sm text-decoration-none hover-bg-high"
          >
            <span className="material-symbols-outlined">assignment</span>
            <span>Assignments</span>
          </a>

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="d-flex align-items-center gap-3 px-3 py-3 text-on-surface-variant rounded-3 font-body-sm text-decoration-none hover-bg-high"
          >
            <span className="material-symbols-outlined">library_books</span>
            <span>Resources</span>
          </a>

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="d-flex align-items-center gap-3 px-3 py-3 text-on-surface-variant rounded-3 font-body-sm text-decoration-none hover-bg-high"
          >
            <span className="material-symbols-outlined">settings</span>
            <span>Settings</span>
          </a>
        </div>

        {/* Footer CTA & Actions */}
        <div className="mt-auto d-flex flex-column gap-3 pt-3 border-top border-outline-variant/20">
          <button
            className="btn w-100 py-3 px-3 text-white rounded-3 font-label-caps border-0 shadow-sm"
            style={{ background: 'linear-gradient(90deg, #3525cd 0%, #4d44e3 100%)' }}
          >
            Upgrade to Premium
          </button>

          <div className="d-flex flex-column gap-1">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="d-flex align-items-center gap-3 px-3 py-2 text-on-surface-variant text-decoration-none rounded-3 font-body-sm hover-bg-high"
            >
              <span className="material-symbols-outlined fs-5">help</span>
              <span>Help Center</span>
            </a>

            <a
              href="#"
              onClick={(e) => { e.preventDefault(); onNavigate('login'); }}
              className="d-flex align-items-center gap-3 px-3 py-2 text-error text-decoration-none rounded-3 font-body-sm hover-bg-error"
            >
              <span className="material-symbols-outlined fs-5">logout</span>
              <span>Logout</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow-1 main-with-sidebar position-relative overflow-y-auto">
        {/* Background glow */}
        <div
          className="position-absolute top-0 start-0 w-100 pointer-events-none"
          style={{
            height: '350px',
            background: 'linear-gradient(180deg, rgba(220, 233, 255, 0.5) 0%, transparent 100%)',
            zIndex: 0,
          }}
        />

        <div className="position-relative z-1 p-3 p-md-5 max-w-container-max mx-auto d-flex flex-column gap-4">
          {/* Header */}
          <header className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 pt-2">
            <div>
              <p className="font-label-caps text-on-surface-variant mb-1">October 24, 2024</p>
              <h2 className="font-display-lg-mobile text-on-surface m-0 fw-bold" style={{ fontSize: '32px' }}>
                Welcome back, <span className="text-primary">Alex</span>
              </h2>
            </div>

            <div className="d-flex align-items-center gap-3">
              <div className="position-relative" style={{ width: '240px' }}>
                <span
                  className="material-symbols-outlined position-absolute text-outline"
                  style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '20px' }}
                >
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="form-control bg-white rounded-pill font-body-sm border-outline-variant/50 ps-5 py-2"
                />
              </div>

              <button className="btn btn-white position-relative p-2 rounded-circle border border-outline-variant/50 shadow-sm">
                <span className="material-symbols-outlined text-on-surface-variant">notifications</span>
                <span
                  className="position-absolute rounded-circle bg-error"
                  style={{ top: '8px', right: '8px', width: '8px', height: '8px' }}
                />
              </button>
            </div>
          </header>

          {/* Top Bento Stat Cards */}
          <section className="row g-3">
            {/* Card 1 */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-4 p-4 shadow-sm h-100">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div
                    className="rounded-circle bg-primary-container text-white d-flex align-items-center justify-content-center"
                    style={{ width: '48px', height: '48px' }}
                  >
                    <span className="material-symbols-outlined fill">school</span>
                  </div>
                  <span className="font-label-caps text-secondary bg-secondary-container px-2 py-1 rounded-2">
                    +2 this week
                  </span>
                </div>
                <h3 className="font-display-lg-mobile text-on-surface mb-1 fw-bold">12</h3>
                <p className="font-body-sm text-on-surface-variant m-0">Enrolled Courses</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-4 p-4 shadow-sm h-100">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div
                    className="rounded-circle text-secondary d-flex align-items-center justify-content-center"
                    style={{ width: '48px', height: '48px', backgroundColor: 'rgba(0, 104, 122, 0.1)' }}
                  >
                    <span className="material-symbols-outlined fill">task_alt</span>
                  </div>
                  <span className="font-label-caps text-on-surface-variant bg-surface-container px-2 py-1 rounded-2">
                    Consistent
                  </span>
                </div>
                <h3 className="font-display-lg-mobile text-on-surface mb-1 fw-bold">8</h3>
                <p className="font-body-sm text-on-surface-variant m-0">Completed Modules</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-4 p-4 shadow-sm h-100">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div
                    className="rounded-circle text-tertiary-container d-flex align-items-center justify-content-center"
                    style={{ width: '48px', height: '48px', backgroundColor: 'rgba(136, 85, 0, 0.15)' }}
                  >
                    <span className="material-symbols-outlined fill">workspace_premium</span>
                  </div>
                  <span className="font-label-caps text-primary bg-primary-fixed px-2 py-1 rounded-2">
                    Top 10%
                  </span>
                </div>
                <h3 className="font-display-lg-mobile text-on-surface mb-1 fw-bold">3</h3>
                <p className="font-body-sm text-on-surface-variant m-0">Certificates Earned</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-4 p-4 shadow-sm h-100">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div
                    className="rounded-circle bg-surface-dim text-primary d-flex align-items-center justify-content-center"
                    style={{ width: '48px', height: '48px' }}
                  >
                    <span className="material-symbols-outlined fill">analytics</span>
                  </div>
                  <span className="font-label-caps text-secondary bg-secondary-container px-2 py-1 rounded-2">
                    +5% Avg
                  </span>
                </div>
                <h3 className="font-display-lg-mobile text-on-surface mb-1 fw-bold">92%</h3>
                <p className="font-body-sm text-on-surface-variant m-0">Average Quiz Score</p>
              </div>
            </div>
          </section>

          {/* Main Bento Grid */}
          <section className="row g-4">
            {/* Left Main Content */}
            <div className="col-12 col-lg-8 d-flex flex-column gap-4">
              {/* Continue Learning Card */}
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-4 p-4 shadow-sm">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h3 className="font-headline-md text-on-surface m-0 fw-bold fs-5">Continue Learning</h3>
                  <a href="#" className="font-body-sm text-primary text-decoration-none fw-semibold">View all</a>
                </div>

                <div className="d-flex flex-column gap-3">
                  {/* Course Item 1 */}
                  <div className="d-flex flex-column flex-sm-row gap-3 p-3 rounded-3 hover-bg-low transition-colors">
                    <div className="position-relative rounded-2 overflow-hidden flex-shrink-0" style={{ width: '130px', height: '90px' }}>
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCISFDFZip2vVyFCXr3xeoIowoyKreUnksxSrtFCbDYxHh5104DghIIaU-ZP21JR8bSRLYw2yVbNLRiqWhKMBeist6868C6luuNSHMaQZKoTkNFIpBd0npgj2ySqk-hmLMizeWXzjS70nVEHydzVIMpvmJKdWoUU5e1FSCJ_--7A5pA4IOqKusRdhIa8lAiaCDVLnaIzjk3C_7y8Ah8DNmnLo3be-p7P9kW4xeiblRElp-dOQoEFEMo"
                        alt="Advanced Data Structures"
                        className="w-100 h-100 object-fit-cover"
                      />
                      <span className="position-absolute bottom-0 start-0 m-1 font-label-caps text-white bg-dark bg-opacity-50 px-1 py-0.5 rounded" style={{ fontSize: '10px' }}>
                        CS201
                      </span>
                    </div>

                    <div className="flex-grow-1 d-flex flex-column justify-content-center">
                      <h4 className="font-body-base fw-bold text-on-surface mb-1">Advanced Data Structures</h4>
                      <p className="font-body-sm text-on-surface-variant mb-2">Module 4: Graph Algorithms & Implementations</p>
                      <div className="d-flex align-items-center gap-3">
                        <div className="flex-grow-1 bg-surface-variant rounded-pill" style={{ height: '8px' }}>
                          <div className="bg-primary rounded-pill h-100" style={{ width: '65%' }}></div>
                        </div>
                        <span className="font-label-caps text-on-surface-variant" style={{ width: '32px' }}>65%</span>
                      </div>
                    </div>

                    <div className="align-self-sm-center mt-2 mt-sm-0">
                      <button
                        onClick={() => onNavigate('course-details')}
                        className="btn btn-outline-secondary font-body-sm py-2 px-3 rounded-3 d-flex align-items-center gap-1"
                      >
                        Resume <span className="material-symbols-outlined fs-6">play_arrow</span>
                      </button>
                    </div>
                  </div>

                  <div className="border-top border-outline-variant/20"></div>

                  {/* Course Item 2 */}
                  <div className="d-flex flex-column flex-sm-row gap-3 p-3 rounded-3 hover-bg-low transition-colors">
                    <div className="position-relative rounded-2 overflow-hidden flex-shrink-0" style={{ width: '130px', height: '90px' }}>
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0sYa3fQvEbz-H51v21ZmsTWJWk6aG1OgAtFMFxTKS6cegVEFTC_VcBSVgqb3FKm6AHlyDxl-NPaoGf3iWloIKO7QO7sLAAwwYC6UmzZXluD7aY_JxafxU2G-gdAbYpdexAomDFjT3V1QM-60QKUlLoIdmpeBk-BZd15_vrUygmOl6Ushqh1ZjpQEmJcDCJU5pF0OdJHeF8yZTYlw4M7QLt8JBX95UCyhZ6Y1tpmemp8Z75B_tfzAd"
                        alt="UI/UX Principles"
                        className="w-100 h-100 object-fit-cover"
                      />
                      <span className="position-absolute bottom-0 start-0 m-1 font-label-caps text-white bg-dark bg-opacity-50 px-1 py-0.5 rounded" style={{ fontSize: '10px' }}>
                        DES102
                      </span>
                    </div>

                    <div className="flex-grow-1 d-flex flex-column justify-content-center">
                      <h4 className="font-body-base fw-bold text-on-surface mb-1">UI/UX Principles</h4>
                      <p className="font-body-sm text-on-surface-variant mb-2">Lesson 2: Glassmorphism & Tonal Depth</p>
                      <div className="d-flex align-items-center gap-3">
                        <div className="flex-grow-1 bg-surface-variant rounded-pill" style={{ height: '8px' }}>
                          <div className="bg-secondary rounded-pill h-100" style={{ width: '30%' }}></div>
                        </div>
                        <span className="font-label-caps text-on-surface-variant" style={{ width: '32px' }}>30%</span>
                      </div>
                    </div>

                    <div className="align-self-sm-center mt-2 mt-sm-0">
                      <button
                        onClick={() => onNavigate('course-details')}
                        className="btn btn-outline-secondary font-body-sm py-2 px-3 rounded-3 d-flex align-items-center gap-1"
                      >
                        Resume <span className="material-symbols-outlined fs-6">play_arrow</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Learning Activity Chart Card */}
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-4 p-4 shadow-sm position-relative overflow-hidden">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div>
                    <h3 className="font-headline-md text-on-surface m-0 fw-bold fs-5">Learning Activity</h3>
                    <p className="font-body-sm text-on-surface-variant m-0 mt-1">Hours spent over the last 7 days</p>
                  </div>
                  <select className="form-select form-select-sm bg-transparent border-0 font-body-sm text-on-surface-variant w-auto cursor-pointer">
                    <option>This Week</option>
                    <option>Last Week</option>
                  </select>
                </div>

                {/* CSS Bar Chart */}
                <div className="position-relative pt-4 pb-2 border-bottom border-outline-variant/20" style={{ height: '220px' }}>
                  {/* Grid Lines */}
                  <div className="position-absolute w-100 border-top border-outline-variant/10" style={{ bottom: '25%' }}></div>
                  <div className="position-absolute w-100 border-top border-outline-variant/10" style={{ bottom: '50%' }}></div>
                  <div className="position-absolute w-100 border-top border-outline-variant/10" style={{ bottom: '75%' }}></div>

                  {/* Bars Container */}
                  <div className="d-flex align-items-end justify-content-between h-100 px-3 position-relative z-1">
                    {chartData.map((item, idx) => (
                      <div
                        key={idx}
                        className="d-flex flex-column align-items-center gap-2 h-100 justify-content-end"
                        style={{ width: '10%' }}
                        onMouseEnter={() => setHoveredBar(idx)}
                        onMouseLeave={() => setHoveredBar(null)}
                      >
                        <div className="w-100 bg-surface-variant rounded-top position-relative d-flex align-items-end justify-content-center" style={{ height: '80%' }}>
                          <div
                            className={`w-100 rounded-top transition-colors ${
                              item.active ? 'bg-primary shadow-sm' : 'bg-primary opacity-50'
                            }`}
                            style={{ height: item.height }}
                          />
                          {hoveredBar === idx && (
                            <div
                              className="position-absolute bg-dark text-white font-label-caps px-2 py-1 rounded"
                              style={{ top: '-30px', fontSize: '10px', whiteSpace: 'nowrap' }}
                            >
                              {item.hours}
                            </div>
                          )}
                        </div>
                        <span className={`font-label-caps ${item.active ? 'text-primary fw-bold' : 'text-on-surface-variant'}`}>
                          {item.day}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Deadlines & Recommendations */}
            <div className="col-12 col-lg-4 d-flex flex-column gap-4">
              {/* Upcoming Deadlines */}
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-4 p-4 shadow-sm">
                <h3 className="font-headline-md text-on-surface m-0 mb-3 fw-bold fs-5 d-flex align-items-center gap-2">
                  <span className="material-symbols-outlined text-error">event_upcoming</span>
                  Deadlines
                </h3>

                <ul className="list-unstyled d-flex flex-column gap-3 m-0">
                  <li className="d-flex gap-3 p-3 rounded-3 border border-outline-variant/30 bg-surface-container-low">
                    <div className="d-flex flex-column align-items-center justify-content-center bg-white rounded border border-outline-variant/20 p-2" style={{ width: '48px' }}>
                      <span className="font-label-caps text-error">OCT</span>
                      <span className="font-headline-md text-on-surface fw-bold fs-5">25</span>
                    </div>
                    <div>
                      <p className="font-body-base fw-semibold text-on-surface m-0">Algorithm Quiz 3</p>
                      <p className="font-body-sm text-on-surface-variant m-0 d-flex align-items-center gap-1 mt-1">
                        <span className="material-symbols-outlined fs-6">schedule</span> 11:59 PM
                      </p>
                    </div>
                  </li>

                  <li className="d-flex gap-3 p-3 rounded-3 border border-outline-variant/30 bg-surface">
                    <div className="d-flex flex-column align-items-center justify-content-center bg-white rounded border border-outline-variant/20 p-2 opacity-75" style={{ width: '48px' }}>
                      <span className="font-label-caps text-on-surface-variant">OCT</span>
                      <span className="font-headline-md text-on-surface fw-bold fs-5">28</span>
                    </div>
                    <div>
                      <p className="font-body-base fw-semibold text-on-surface m-0">UI Project Submission</p>
                      <p className="font-body-sm text-on-surface-variant m-0 d-flex align-items-center gap-1 mt-1">
                        <span className="material-symbols-outlined fs-6">schedule</span> 5:00 PM
                      </p>
                    </div>
                  </li>
                </ul>

                <button className="btn btn-outline-primary w-100 mt-3 font-label-caps py-2 rounded-3">
                  View Calendar
                </button>
              </div>

              {/* Recommended Course */}
              <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-4 p-4 shadow-sm">
                <h3 className="font-headline-md text-on-surface m-0 mb-3 fw-bold fs-5 d-flex align-items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">explore</span>
                  Recommended
                </h3>

                <div className="cursor-pointer" onClick={() => onNavigate('course-details')}>
                  <div className="w-100 rounded-3 overflow-hidden position-relative mb-3" style={{ height: '140px' }}>
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB79veAkclFfMsMY_BS2DPnbeDnLsq_j86-lKtr9o9HMIBuwZvttsJeEeT-havxl3c8tPu68axMc3IxkfhbSExgsYYtBoblAQ8MEao2rvhcCQlTIxxYn-Fsi6qHnsmI7F23JC5DWF4yhtJ-vdAc10ARtbs_ictXVogcCNONTBwH_Map9bfjfqYf2rF8gDQttOta2hCX8i73p1CmhwXX44SeQc6FtEVFADw_1S4ffI0k8CoWsufvVwi_"
                      alt="System Design Masterclass"
                      className="w-100 h-100 object-fit-cover"
                    />
                    <span className="position-absolute bottom-0 start-0 m-2 font-label-caps text-white bg-primary bg-opacity-75 px-2 py-0.5 rounded-pill" style={{ fontSize: '10px' }}>
                      Advanced
                    </span>
                  </div>

                  <h4 className="font-body-base fw-bold text-on-surface mb-1">System Design Masterclass</h4>
                  <p className="font-body-sm text-on-surface-variant m-0 d-flex align-items-center gap-1">
                    <span className="material-symbols-outlined fs-6 text-tertiary-container fill">star</span> 4.9 (2k+ reviews)
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
