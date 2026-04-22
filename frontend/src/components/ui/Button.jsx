import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  isLoading = false,
  disabled = false,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-sans font-semibold rounded-md transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none whitespace-nowrap";
  
  const variants = {
    primary: "bg-[#FFD700] text-black hover:bg-[#FFE033] hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:-translate-y-[1px]",
    secondary: "bg-black text-white border border-[#3A3A3A] hover:border-[#FFD700] hover:bg-[#111111]",
    outline: "bg-transparent text-[#FFD700] border-2 border-[#FFD700] hover:bg-[#FFD700]/10 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:-translate-y-[1px]",
    ghost: "bg-transparent text-[#888888] hover:bg-white/5 hover:text-white",
    danger: "bg-[#EF4444] text-white hover:bg-[#DC2626] hover:-translate-y-[1px]"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs rounded",
    md: "px-6 py-2.5 text-sm rounded-md",
    lg: "px-8 py-3.5 text-base rounded-lg",
    icon: "p-2 rounded-md"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
