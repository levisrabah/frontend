import React from 'react';
import '../../css/Card.css';

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
  const classes = [
    'crd-container',
    padding ? 'crd-padded' : '',
    border ? 'crd-bordered' : '',
    shadow ? 'crd-shadow' : '',
    hoverable ? 'crd-hoverable' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {(title || subtitle || headerActions) && (
        <div className="crd-header">
          <div className="crd-header-content">
            {title && (
              typeof title === 'string' ? (
                <h3 className="crd-title">{title}</h3>
              ) : title
            )}
            {subtitle && (
              <div className="crd-subtitle">
                {subtitle}
              </div>
            )}
          </div>
          {headerActions && (
            <div className="crd-header-actions">
              {headerActions}
            </div>
          )}
        </div>
      )}
      
      <div className="crd-body">
        {children}
      </div>
      
      {footer && (
        <div className="crd-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;