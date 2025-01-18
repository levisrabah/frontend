import React from 'react';
import '.../css/Card.css';

const Card = ({
  children,
  title,
  subtitle,
  footer,
  padding = true,
  border = true,
  shadow = true,
  hoverable = false,
  className = '',
  headerActions,
  ...props
}) => {
  const baseClass = 'card';
  const classes = [
    baseClass,
    padding ? 'card-padded' : '',
    border ? 'card-bordered' : '',
    shadow ? 'card-shadow' : '',
    hoverable ? 'card-hoverable' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {(title || subtitle || headerActions) && (
        <div className="card-header">
          <div className="card-header-content">
            {title && (
              typeof title === 'string' ? (
                <h3 className="card-title">{title}</h3>
              ) : title
            )}
            {subtitle && (
              <div className="card-subtitle">
                {subtitle}
              </div>
            )}
          </div>
          {headerActions && (
            <div className="card-header-actions">
              {headerActions}
            </div>
          )}
        </div>
      )}
      
      <div className="card-content">
        {children}
      </div>
      
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
