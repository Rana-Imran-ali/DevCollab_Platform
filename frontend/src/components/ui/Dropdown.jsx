/**
 * Dropdown — Animated context menu / dropdown
 *
 * Usage:
 *   <Dropdown trigger={<Button>Options</Button>} align="right">
 *     <Dropdown.Item icon={<EditIcon />} onClick={...}>Edit</Dropdown.Item>
 *     <Dropdown.Divider />
 *     <Dropdown.Item icon={<TrashIcon />} variant="danger" onClick={...}>Delete</Dropdown.Item>
 *   </Dropdown>
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function DropdownItem({ children, icon, onClick, variant = 'default', disabled = false }) {
  return (
    <button
      className={[
        'dropdown-item',
        variant === 'danger' ? 'dropdown-item-danger' : '',
        disabled ? 'opacity-40 pointer-events-none' : '',
      ].join(' ')}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="shrink-0 opacity-70">{icon}</span>}
      {children}
    </button>
  );
}

function DropdownDivider() {
  return <div className="dropdown-divider" />;
}

function DropdownLabel({ children }) {
  return (
    <div className="px-3 pt-2 pb-1 text-[0.65rem] font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
      {children}
    </div>
  );
}

export default function Dropdown({
  trigger,
  children,
  align = 'right',
  className = '',
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const alignClass = align === 'right' ? 'right-0' : 'left-0';

  return (
    <div className="relative inline-block" ref={ref}>
      {/* Trigger */}
      <div onClick={() => setOpen((p) => !p)} className="cursor-pointer">
        {trigger}
      </div>

      {/* Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={['absolute z-50 mt-1.5 dropdown-menu', alignClass, className].join(' ')}
            initial={{ opacity: 0, scale: 0.95, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -6 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setOpen(false)}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

Dropdown.Item    = DropdownItem;
Dropdown.Divider = DropdownDivider;
Dropdown.Label   = DropdownLabel;
