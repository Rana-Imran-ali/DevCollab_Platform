import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hoverable = false, 
  title, 
  description,
  footer,
  ...props 
}) => {
  return (
    <div 
      className={`bg-[#111111] border border-[#222222]/80 rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.4)] ${hoverable ? 'transition-all duration-300 hover:-translate-y-1 hover:border-[#FFD700]/30 hover:shadow-[0_8px_32px_rgba(0,0,0,0.6)]' : ''} ${className}`}
      {...props}
    >
      {(title || description) && (
        <div className="p-5 border-b border-[#222222]/80">
          {title && <h3 className="font-display font-medium text-lg text-white m-0">{title}</h3>}
          {description && <p className="text-[#888888] text-sm mt-1">{description}</p>}
        </div>
      )}
      
      <div className="p-5">
        {children}
      </div>

      {footer && (
        <div className="px-5 py-4 bg-[#0A0A0A] border-t border-[#222222]/80 flex items-center justify-end">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
