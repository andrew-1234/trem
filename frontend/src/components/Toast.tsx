import React, { useEffect } from 'react';
import { useToast } from '../contexts/ToastContext';

const Toast: React.FC = () => {
  const { toast, hideToast } = useToast();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  if (!toast) return null;

  return (
    <div className={`toast show position-fixed top-0 end-0 m-3 ${toast.type}`} role="alert">
      <div className="toast-body">
        {toast.message}
      </div>
    </div>
  );
};

export default Toast;