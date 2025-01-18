// components/common/Input.jsx
import React, { forwardRef } from 'react';
import './Input.css';

const Input = forwardRef(({
  type = 'text',
  label,
  error,
  helper,
  prefix,
  suffix,
  fullWidth = false,
  disabled = false,
  required = false,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const baseClass = 'input-field';
  const wrapperClass = [
    'input-wrapper',
    fullWidth ? 'input-full' : '',
    error ? 'input-error' : '',
    disabled ? 'input-disabled' : '',
    prefix ? 'input-with-prefix' : '',
    suffix ? 'input-with-suffix' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClass}>
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      
      <div className="input-container">
        {prefix && <span className="input-prefix">{prefix}</span>}
        
        <input
          ref={ref}
          type={type}
          id={inputId}
          className={baseClass}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined}
          required={required}
          {...props}
        />
        
        {suffix && <span className="input-suffix">{suffix}</span>}
      </div>

      {error && (
        <span className="input-error-message" id={`${inputId}-error`} role="alert">
          {error}
        </span>
      )}
      
      {helper && !error && (
        <span className="input-helper-text" id={`${inputId}-helper`}>
          {helper}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;