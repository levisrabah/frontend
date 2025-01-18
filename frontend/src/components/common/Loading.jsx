import React from 'react';
import '.../css/Loading.css';

const Loading = ({
  size = 'md',
  variant = 'primary',
  fullScreen = false,
  text,
  className = '',
  ...props
}) => {
  const baseClass = 'loading';
  const classes = [
    baseClass,
    `loading-${size}`,
    `loading-${variant}`,
    fullScreen ? 'loading-fullscreen' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} role="status" {...props}>
      <div className="loading-spinner">
        <svg viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="5"
            className="loading-circle"
          />
        </svg>
      </div>
      {text && <div className="loading-text">{text}</div>}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const LoadingOverlay = ({
  active = true,
  children,
  text,
  blur = false,
  className = '',
  ...props
}) => {
  if (!active) return children;

  return (
    <div className="loading-overlay-container">
      {children}
      <div className={`loading-overlay ${blur ? 'loading-overlay-blur' : ''} ${className}`}>
        <Loading text={text} {...props} />
      </div>
    </div>
  );
};

export default Loading;