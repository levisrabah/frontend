import React from 'react';
import '../../css/Button.css';

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
  const baseClass = 'mc-btn';
  const variantClass = `mc-btn--${variant}`;
  const sizeClass = `mc-btn--${size}`;
  const widthClass = fullWidth ? 'mc-btn--full' : '';
  const loadingClass = loading ? 'mc-btn--loading' : '';
  const iconClass = icon ? 'mc-btn--with-icon' : '';
  
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
        <span className="mc-btn__spinner" aria-hidden="true">
          <svg className="mc-btn__spinner-icon" viewBox="0 0 24 24">
            <circle
              className="mc-btn__spinner-circle"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="mc-btn__spinner-path"
              fill="currentColor"
              d="M12 2a10 10 0 0110 10h-2a8 8 0 00-8-8V2z"
            />
          </svg>
        </span>
      )}
      {icon && !loading && <span className="mc-btn__icon">{icon}</span>}
      <span className="mc-btn__content">{children}</span>
    </button>
  );
};

export default Button;