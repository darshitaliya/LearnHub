import React from 'react';

export default function CertificateModal({ studentName, courseTitle, course, user, onClose }) {
  const resolvedStudentName = studentName || user?.name || user?.userName || 'Alex Morgan';
  const resolvedCourseTitle = courseTitle || course?.title || 'Advanced Software Engineering Architectures';

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(11, 28, 48, 0.7)', backdropFilter: 'blur(8px)', zIndex: 1050 }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden" style={{ background: '#f8f9ff' }}>
          <div className="modal-header border-0 bg-primary text-white p-4">
            <h5 className="modal-title font-headline-md fw-bold d-flex align-items-center gap-2">
              <span className="material-symbols-outlined fill">workspace_premium</span>
              Official Certificate of Completion
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body p-5 text-center position-relative">
            <div className="border border-4 border-primary p-4 rounded-4 bg-white shadow-sm position-relative">
              <span className="material-symbols-outlined text-primary position-absolute top-0 start-0 m-3 fs-1 opacity-25">school</span>
              <span className="material-symbols-outlined text-primary position-absolute bottom-0 end-0 m-3 fs-1 opacity-25">verified</span>

              <h2 className="font-headline-md text-primary fw-bold mb-1">LearnHub Global Education</h2>
              <p className="font-label-caps text-on-surface-variant tracking-widest mb-4">CERTIFICATE OF ACCOMPLISHMENT</p>

              <p className="font-body-base text-on-surface mb-2">This is to certify that</p>
              <h1 className="font-display-lg text-on-surface text-decoration-underline fw-bold mb-3">{resolvedStudentName}</h1>

              <p className="font-body-base text-on-surface mb-3">has successfully completed the comprehensive online course</p>
              <h3 className="font-headline-md text-primary fw-bold mb-4">{resolvedCourseTitle}</h3>

              <div className="d-flex justify-content-between align-items-end mt-5 pt-4 border-top border-outline-variant/30">
                <div className="text-start">
                  <p className="font-body-sm text-on-surface-variant mb-0">Date Issued:</p>
                  <p className="font-body-base fw-bold text-on-surface mb-0">{currentDate}</p>
                </div>
                <div>
                  <div className="font-headline-md text-primary fst-italic fw-bold" style={{ fontFamily: 'serif' }}>
                    Dr. Elena Rostova
                  </div>
                  <p className="font-body-sm text-on-surface-variant border-top border-dark pt-1 mb-0">Authorized Instructor Signature</p>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer border-0 p-4 bg-surface-container-low d-flex justify-content-between">
            <span className="font-body-sm text-on-surface-variant">Certificate ID: CERT-LH-{Math.floor(100000 + Math.random() * 900000)}</span>
            <div className="d-flex gap-2">
              <button onClick={() => window.print()} className="btn btn-outline-primary font-body-sm px-4 rounded-3 d-flex align-items-center gap-2">
                <span className="material-symbols-outlined fs-5">print</span> Print Certificate
              </button>
              <button onClick={onClose} className="btn btn-primary font-body-sm px-4 rounded-3">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
