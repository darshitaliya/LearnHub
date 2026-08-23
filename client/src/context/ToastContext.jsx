import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Floating Toast Notification Stack */}
      <div
        className="position-fixed d-flex flex-column gap-2 pointer-events-none"
        style={{ top: '24px', right: '24px', zIndex: 9999, maxWidth: '400px', width: '100%' }}
      >
        {toasts.map((t) => {
          const isSuccess = t.type === 'success';
          const isError = t.type === 'error';
          const isWarning = t.type === 'warning';

          const bgColor = isSuccess
            ? 'bg-success text-white'
            : isError
            ? 'bg-danger text-white'
            : isWarning
            ? 'bg-warning text-dark'
            : 'bg-primary text-white';

          const icon = isSuccess
            ? 'check_circle'
            : isError
            ? 'error'
            : isWarning
            ? 'warning'
            : 'info';

          return (
            <div
              key={t.id}
              className={`p-3 rounded-4 shadow-lg d-flex align-items-center justify-content-between pointer-events-auto transition-all animate-bounce-in ${bgColor}`}
              style={{ backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <div className="d-flex align-items-center gap-2.5">
                <span className="material-symbols-outlined fs-5">{icon}</span>
                <span className="font-body-sm fw-bold" style={{ fontSize: '13.5px' }}>{t.message}</span>
              </div>
              <button
                type="button"
                onClick={() => removeToast(t.id)}
                className="btn-close btn-close-white ms-3 opacity-75 hover-opacity-100"
                style={{ fontSize: '11px' }}
              ></button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
