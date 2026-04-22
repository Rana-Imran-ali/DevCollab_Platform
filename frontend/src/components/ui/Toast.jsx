import React, { useState, useEffect } from 'react';

// Normally this would be part of a context/provider system
const Toast = ({ 
  message, 
  type = 'info', 
  duration = 3000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const types = {
    success: {
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>,
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
      text: 'text-green-500'
    },
    error: {
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>,
      bg: 'bg-red-500/10',
      border: 'border-red-500/20',
      text: 'text-red-500'
    },
    warning: {
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/20',
      text: 'text-yellow-500'
    },
    info: {
      icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      text: 'text-blue-500'
    }
  };

  const currentType = types[type];

  return (
    <div className={`
      fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 
      rounded-lg shadow-lg border backdrop-blur-md
      transform transition-all duration-300
      ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
      bg-[#111111] ${currentType.border}
    `}>
      <div className={`p-1 rounded-full ${currentType.bg} ${currentType.text}`}>
        {currentType.icon}
      </div>
      <p className="text-sm font-medium text-white pr-4">{message}</p>
      
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#888888] hover:text-white transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
