import React, { forwardRef } from 'react';
import '../../css/Input.css';

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
  const baseClass = 'inp-field';
  const wrapperClass = [
    'inp-wrapper',
    fullWidth ? 'inp-full' : '',
    error ? 'inp-error' : '',
    disabled ? 'inp-disabled' : '',
    prefix ? 'inp-with-prefix' : '',
    suffix ? 'inp-with-suffix' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClass}>
      {label && (
        <label htmlFor={inputId} className="inp-label">
          {label}
          {required && <span className="inp-required">*</span>}
        </label>
      )}
      
      <div className="inp-container">
        {prefix && <span className="inp-prefix">{prefix}</span>}
        
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
        
        {suffix && <span className="inp-suffix">{suffix}</span>}
      </div>

      {error && (
        <span className="inp-error-message" id={`${inputId}-error`} role="alert">
          {error}
        </span>
      )}
      
      {helper && !error && (
        <span className="inp-helper-text" id={`${inputId}-helper`}>
          {helper}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;