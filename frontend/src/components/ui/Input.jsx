import React, { forwardRef } from 'react';

const Input = forwardRef(({
  id,
  label,
  error,
  icon,
  helperText,
  className = '',
  fullWidth = true,
  ...props
}, ref) => {
  const containerClass = fullWidth ? 'w-full' : 'w-auto';

  return (
    <div className={`${containerClass} flex flex-col gap-1.5`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#888888]">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          id={id}
          className={`
            bg-[#1A1A1A] border border-[#3A3A3A] text-white text-sm rounded-md block w-full
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-[#FFD700]/30 focus:border-[#FFD700]
            disabled:opacity-50 disabled:cursor-not-allowed
            placeholder:text-[#555555]
            ${icon ? 'pl-10' : 'pl-3'}
            ${error ? 'border-red-500 focus:ring-red-500/30 focus:border-red-500' : ''}
            py-2.5 px-3
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
      {helperText && !error && <span className="text-xs text-[#888888]">{helperText}</span>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
