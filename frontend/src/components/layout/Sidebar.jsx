import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../../css/Sidebar.css';

const SidebarItem = ({ item, isCollapsed, isNested = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const hasChildren = item.children && item.children.length > 0;

  useEffect(() => {
    if (hasChildren) {
      const isActive = item.children.some(child => location.pathname === child.path);
      setIsOpen(isActive);
    }
  }, [location.pathname, hasChildren, item.children]);

  return (
    <li className={`sdb-item ${isNested ? 'sdb-nested' : ''}`}>
      {hasChildren ? (
        <>
          <button
            className={`sdb-link ${isOpen ? 'sdb-active' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {item.icon && <span className="sdb-icon">{item.icon}</span>}
            {!isCollapsed && (
              <>
                <span className="sdb-label">{item.label}</span>
                <span className={`sdb-arrow ${isOpen ? 'sdb-arrow-open' : ''}`}>▾</span>
              </>
            )}
          </button>
          {isOpen && (
            <ul className="sdb-submenu">
              {item.children.map((child, index) => (
                <SidebarItem
                  key={index}
                  item={child}
                  isCollapsed={isCollapsed}
                  isNested={true}
                />
              ))}
            </ul>
          )}
        </>
      ) : (
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            `sdb-link ${isActive ? 'sdb-active' : ''}`
          }
          title={isCollapsed ? item.label : undefined}
        >
          {item.icon && <span className="sdb-icon">{item.icon}</span>}
          {!isCollapsed && <span className="sdb-label">{item.label}</span>}
        </NavLink>
      )}
    </li>
  );
};

const Sidebar = ({
  items,
  isCollapsible = true,
  defaultCollapsed = false,
  onCollapse,
  className = '',
  headerComponent,
  footerComponent,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    onCollapse?.(!isCollapsed);
  };

  const handleClickOutside = (e) => {
    if (isMobileOpen && !e.target.closest('.sdb-container')) {
      setIsMobileOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileOpen]);

  return (
    <>
      <aside className={`sdb-container ${isCollapsed ? 'sdb-collapsed' : ''} ${className}`}>
        <div className="sdb-header">
          {headerComponent && (
            <div className="sdb-header-content">
              {headerComponent(isCollapsed)}
            </div>
          )}
          {isCollapsible && (
            <button
              className="sdb-collapse-btn"
              onClick={handleCollapse}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? '→' : '←'}
            </button>
          )}
        </div>

        <nav className="sdb-nav">
          <ul className="sdb-menu">
            {items.map((item, index) => (
              <SidebarItem
                key={index}
                item={item}
                isCollapsed={isCollapsed}
              />
            ))}
          </ul>
        </nav>

        {footerComponent && (
          <div className="sdb-footer">
            {footerComponent(isCollapsed)}
          </div>
        )}
      </aside>

      {/* Mobile Toggle Button */}
      <button
        className="sdb-mobile-toggle"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle mobile menu"
      >
        <span className="sdb-toggle-icon"></span>
      </button>
    </>
  );
};

export default Sidebar;