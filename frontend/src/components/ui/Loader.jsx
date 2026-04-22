import React from 'react';

const Loader = ({ 
  size = 'md', 
  color = 'primary',
  fullScreen = false
}) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4'
  };

  const colors = {
    primary: 'border-[#FFD700] border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-[#888888] border-t-transparent'
  };

  const spinner = (
    <div className={`animate-spin rounded-full ${sizes[size]} ${colors[color]}`} />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      {spinner}
    </div>
  );
};

export default Loader;
