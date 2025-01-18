import React from 'react';
import '.../css/Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  className = '',
  icon,
  ...props
}) => {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const widthClass = fullWidth ? 'btn-full' : '';
  const loadingClass = loading ? 'btn-loading' : '';
  const iconClass = icon ? 'btn-with-icon' : '';
  
  const classes = [
    baseClass,
    variantClass,
    sizeClass,
    widthClass,
    loadingClass,
    iconClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <span className="btn-spinner" aria-hidden="true">
          <svg className="animate-spin" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M12 2a10 10 0 0110 10h-2a8 8 0 00-8-8V2z"
            />
          </svg>
        </span>
      )}
      {icon && !loading && <span className="btn-icon">{icon}</span>}
      <span className="btn-content">{children}</span>
    </button>
  );
};

export default Button;