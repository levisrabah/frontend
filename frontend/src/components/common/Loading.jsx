import React from 'react';
import '../../css/Loading.css';

const Loading = ({
  size = 'md',
  variant = 'primary',
  fullScreen = false,
  text,
  className = '',
  ...props
}) => {
  const classes = [
    'ldr-container',
    `ldr-${size}`,
    `ldr-${variant}`,
    fullScreen ? 'ldr-fullscreen' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} role="status" {...props}>
      <div className="ldr-spinner">
        <svg viewBox="0 0 50 50">
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="5"
            className="ldr-circle"
          />
        </svg>
      </div>
      {text && <div className="ldr-text">{text}</div>}
      <span className="ldr-sr-only">Loading...</span>
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
    <div className="ldr-overlay-wrapper">
      {children}
      <div className={`ldr-overlay ${blur ? 'ldr-overlay-blur' : ''} ${className}`}>
        <Loading text={text} {...props} />
      </div>
    </div>
  );
};

export default Loading;