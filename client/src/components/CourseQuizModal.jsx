import React, { useState } from 'react';
import { getQuizForCourse } from '../data/courseQuizzes';
import api from '../services/api';

export default function CourseQuizModal({ course, user, onClose, onQuizPassed }) {
  const quizData = getQuizForCourse(course);
  const questions = quizData.questions || [];

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [scorePercentage, setScorePercentage] = useState(0);
  const [passed, setPassed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const currentQ = questions[currentQIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentQIndex === totalQuestions - 1;

  const handleSelectOption = (qId, optionIndex) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: optionIndex,
    }));
    setErrorMsg('');
  };

  const handleNext = () => {
    if (currentQIndex < totalQuestions - 1) {
      setCurrentQIndex(currentQIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(currentQIndex - 1);
    }
  };

  const handleSubmitQuiz = async () => {
    // Verify all questions are answered
    const unanswered = questions.filter((q) => selectedAnswers[q.id] === undefined);
    if (unanswered.length > 0) {
      setErrorMsg(`Please answer all questions before submitting (${unanswered.length} remaining).`);
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    // Calculate score
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const calculatedScore = Math.round((correctCount / totalQuestions) * 100);
    const hasPassed = calculatedScore >= (quizData.passingScore || 70);

    setScorePercentage(calculatedScore);
    setPassed(hasPassed);
    setIsSubmitted(true);

    try {
      const courseId = course?.id || course?._id;
      if (courseId) {
        await api.post('/progress/quiz-submit', {
          courseId,
          score: calculatedScore,
          passed: hasPassed,
          answers: selectedAnswers,
        });
      }
    } catch (err) {
      console.warn('Could not sync quiz progress with backend:', err);
    } finally {
      setSubmitting(false);
      if (hasPassed && onQuizPassed) {
        onQuizPassed(calculatedScore);
      }
    }
  };

  const handleRetakeQuiz = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentQIndex(0);
    setScorePercentage(0);
    setPassed(false);
    setErrorMsg('');
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <div
      className="modal show d-block"
      style={{
        backgroundColor: 'rgba(11, 28, 48, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 1050,
      }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden bg-surface">
          
          {/* Header */}
          <div className="modal-header border-0 bg-primary text-white p-4 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded-circle bg-white/20 p-2 d-flex align-items-center justify-content-center text-white"
                style={{ width: '44px', height: '44px' }}
              >
                <span className="material-symbols-outlined fs-4 fill">quiz</span>
              </div>
              <div>
                <span className="badge bg-white/20 text-white font-label-caps px-2.5 py-0.5 rounded-pill mb-1">
                  OFFICIAL CERTIFICATION ASSESSMENT
                </span>
                <h5 className="modal-title font-headline-md fw-bold m-0 fs-5 text-white">
                  {quizData.title}
                </h5>
              </div>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          {/* Progress Bar */}
          {!isSubmitted && (
            <div className="px-4 pt-3 pb-1 bg-surface-container-lowest border-bottom border-outline-variant/20">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="font-label-caps text-on-surface-variant fw-bold" style={{ fontSize: '11px' }}>
                  Question {currentQIndex + 1} of {totalQuestions}
                </span>
                <span className="font-label-caps text-primary fw-bold" style={{ fontSize: '11px' }}>
                  {answeredCount}/{totalQuestions} Answered ({progressPercent}%)
                </span>
              </div>
              <div className="progress rounded-pill bg-surface-container" style={{ height: '6px' }}>
                <div
                  className="progress-bar bg-primary rounded-pill transition-all"
                  style={{ width: `${((currentQIndex + 1) / totalQuestions) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Modal Body */}
          <div className="modal-body p-4 p-md-5">
            {errorMsg && (
              <div className="alert alert-warning d-flex align-items-center gap-2 mb-4 rounded-3 font-body-sm shadow-xs">
                <span className="material-symbols-outlined fs-5">warning</span>
                <span>{errorMsg}</span>
              </div>
            )}

            {!isSubmitted ? (
              /* Quiz Taking View */
              <div className="d-flex flex-column gap-4">
                {/* Question Text */}
                <div className="p-3 p-md-4 rounded-4 bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="badge bg-primary-container text-on-primary-container font-label-caps px-2.5 py-1 rounded">
                      QUESTION {currentQIndex + 1}
                    </span>
                    <span className="font-body-sm text-on-surface-variant" style={{ fontSize: '12px' }}>
                      Single Choice
                    </span>
                  </div>
                  <h4 className="font-headline-md fw-bold text-on-surface m-0 fs-5" style={{ lineHeight: '1.4' }}>
                    {currentQ?.question}
                  </h4>
                </div>

                {/* Option Choices */}
                <div className="d-flex flex-column gap-3">
                  {currentQ?.options?.map((option, optIdx) => {
                    const isSelected = selectedAnswers[currentQ.id] === optIdx;
                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleSelectOption(currentQ.id, optIdx)}
                        className={`p-3 p-md-3.5 rounded-3 border transition-all cursor-pointer d-flex align-items-center gap-3 ${
                          isSelected
                            ? 'bg-primary-container/20 border-primary shadow-xs'
                            : 'bg-white border-outline-variant/30 hover-bg-low'
                        }`}
                        style={{ cursor: 'pointer' }}
                      >
                        <div
                          className={`rounded-circle d-flex align-items-center justify-content-center font-label-caps fw-bold flex-shrink-0 ${
                            isSelected ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant'
                          }`}
                          style={{ width: '32px', height: '32px', fontSize: '13px' }}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </div>
                        <span
                          className={`font-body-base flex-grow-1 ${isSelected ? 'fw-bold text-primary' : 'text-on-surface'}`}
                          style={{ fontSize: '14px' }}
                        >
                          {option}
                        </span>
                        {isSelected && (
                          <span className="material-symbols-outlined text-primary fs-5">check_circle</span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Question Numbers Quick Bar */}
                <div className="d-flex align-items-center justify-content-center gap-2 pt-2">
                  {questions.map((q, idx) => {
                    const isCurrent = idx === currentQIndex;
                    const isAnswered = selectedAnswers[q.id] !== undefined;
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setCurrentQIndex(idx)}
                        className={`btn btn-sm rounded-circle p-0 d-flex align-items-center justify-content-center font-label-caps fw-bold transition-all ${
                          isCurrent
                            ? 'btn-primary shadow-xs'
                            : isAnswered
                            ? 'btn-outline-primary'
                            : 'btn-outline-secondary opacity-50'
                        }`}
                        style={{ width: '30px', height: '30px', fontSize: '11px' }}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Quiz Result & Breakdown View */
              <div className="d-flex flex-column gap-4 text-center">
                <div
                  className={`p-4 rounded-4 border ${
                    passed
                      ? 'bg-success bg-opacity-10 border-success text-success'
                      : 'bg-danger bg-opacity-10 border-danger text-danger'
                  }`}
                >
                  <div
                    className={`rounded-circle d-inline-flex align-items-center justify-content-center mb-3 ${
                      passed ? 'bg-success text-white' : 'bg-danger text-white'
                    }`}
                    style={{ width: '64px', height: '64px' }}
                  >
                    <span className="material-symbols-outlined fs-1 fill">
                      {passed ? 'verified' : 'cancel'}
                    </span>
                  </div>

                  <h3 className="font-display-lg-mobile fw-bold mb-1 fs-3">
                    {passed ? '🎉 Congratulations! You Passed!' : 'Needs Improvement'}
                  </h3>
                  <p className="font-body-base text-on-surface-variant mb-3">
                    {passed
                      ? `You scored ${scorePercentage}% (Passing Grade: ${quizData.passingScore || 70}%). Your Official Verified Certificate has been unlocked!`
                      : `You scored ${scorePercentage}%. A minimum score of ${quizData.passingScore || 70}% is required to unlock your certificate.`}
                  </p>

                  <div className="d-flex justify-content-center gap-3">
                    <span className="badge bg-white text-dark border px-3 py-2 font-headline-md fs-6 shadow-xs">
                      Final Score: {scorePercentage}%
                    </span>
                    <span className={`badge px-3 py-2 font-headline-md fs-6 ${passed ? 'bg-success text-white' : 'bg-danger text-white'}`}>
                      Status: {passed ? 'PASSED & CERTIFIED' : 'NOT PASSED'}
                    </span>
                  </div>
                </div>

                {/* Review Questions & Explanations */}
                <div className="text-start">
                  <h4 className="font-headline-md fw-bold text-on-surface mb-3 fs-5">Detailed Answer Review</h4>
                  <div className="d-flex flex-column gap-3">
                    {questions.map((q, qIdx) => {
                      const userChoice = selectedAnswers[q.id];
                      const isCorrect = userChoice === q.correctAnswer;
                      return (
                        <div
                          key={q.id}
                          className={`p-3 rounded-3 border ${
                            isCorrect ? 'border-success/40 bg-success/5' : 'border-danger/40 bg-danger/5'
                          }`}
                        >
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <span className="font-label-caps fw-bold" style={{ fontSize: '11px' }}>
                              Question {qIdx + 1}
                            </span>
                            <span className={`badge ${isCorrect ? 'bg-success' : 'bg-danger'} font-label-caps`}>
                              {isCorrect ? 'Correct ✅' : 'Incorrect ❌'}
                            </span>
                          </div>
                          <p className="font-body-base fw-bold text-on-surface mb-2" style={{ fontSize: '13px' }}>
                            {q.question}
                          </p>
                          <div className="font-body-sm mb-1" style={{ fontSize: '12px' }}>
                            <span className="text-on-surface-variant">Your Answer: </span>
                            <span className={isCorrect ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                              {userChoice !== undefined ? q.options[userChoice] : 'Not Answered'}
                            </span>
                          </div>
                          {!isCorrect && (
                            <div className="font-body-sm text-success mb-1" style={{ fontSize: '12px' }}>
                              <span className="text-on-surface-variant">Correct Answer: </span>
                              <span className="fw-bold">{q.options[q.correctAnswer]}</span>
                            </div>
                          )}
                          {q.explanation && (
                            <p className="font-body-sm text-on-surface-variant mt-2 p-2 bg-white/70 rounded border border-outline-variant/20 m-0" style={{ fontSize: '11px' }}>
                              💡 <strong className="text-on-surface">Explanation:</strong> {q.explanation}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="modal-footer border-0 p-4 bg-surface-container-low d-flex justify-content-between">
            {!isSubmitted ? (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentQIndex === 0}
                  className="btn btn-outline-secondary font-body-sm px-4 rounded-3"
                >
                  &larr; Previous
                </button>

                <div className="d-flex gap-2">
                  {!isLastQuestion ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="btn btn-primary font-body-sm px-4 py-2 rounded-3 d-flex align-items-center gap-1 shadow-xs"
                    >
                      <span>Next Question</span>
                      <span className="material-symbols-outlined fs-5">arrow_forward</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmitQuiz}
                      disabled={submitting}
                      className="btn btn-success font-body-sm px-5 py-2 rounded-3 d-flex align-items-center gap-2 shadow-sm fw-bold"
                    >
                      {submitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status"></span>
                          <span>Evaluating...</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined fs-5">task_alt</span>
                          <span>Submit Assessment</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleRetakeQuiz}
                  className="btn btn-outline-primary font-body-sm px-4 rounded-3 d-flex align-items-center gap-1"
                >
                  <span className="material-symbols-outlined fs-5">replay</span> Retake Quiz
                </button>

                <div className="d-flex gap-2">
                  {passed && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        if (onQuizPassed) onQuizPassed(scorePercentage, true);
                      }}
                      className="btn btn-warning text-dark font-body-sm px-4 py-2 rounded-3 d-flex align-items-center gap-2 fw-bold shadow-sm"
                    >
                      <span className="material-symbols-outlined fs-5 fill">workspace_premium</span>
                      <span>Claim & View Certificate</span>
                    </button>
                  )}
                  <button type="button" onClick={onClose} className="btn btn-secondary font-body-sm px-4 rounded-3">
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
