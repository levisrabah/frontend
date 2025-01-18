import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '.../css/Sidebar.css';

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
    <li className={`sidebar-item ${isNested ? 'nested' : ''}`}>
      {hasChildren ? (
        <>
          <button
            className={`sidebar-link ${isOpen ? 'active' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {item.icon && <span className="sidebar-icon">{item.icon}</span>}
            {!isCollapsed && (
              <>
                <span className="sidebar-label">{item.label}</span>
                <span className={`sidebar-arrow ${isOpen ? 'open' : ''}`}>▾</span>
              </>
            )}
          </button>
          {isOpen && (
            <ul className="sidebar-submenu">
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
            `sidebar-link ${isActive ? 'active' : ''}`
          }
          title={isCollapsed ? item.label : undefined}
        >
          {item.icon && <span className="sidebar-icon">{item.icon}</span>}
          {!isCollapsed && <span className="sidebar-label">{item.label}</span>}
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
    if (isMobileOpen && !e.target.closest('.sidebar')) {
      setIsMobileOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileOpen]);

  return (
    <>
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${className}`}>
        <div className="sidebar-header">
          {headerComponent && (
            <div className="sidebar-header-content">
              {headerComponent(isCollapsed)}
            </div>
          )}
          {isCollapsible && (
            <button
              className="sidebar-collapse-btn"
              onClick={handleCollapse}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? '→' : '←'}
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
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
          <div className="sidebar-footer">
            {footerComponent(isCollapsed)}
          </div>
        )}
      </aside>

      {/* Mobile Toggle Button */}
      <button
        className="sidebar-mobile-toggle"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle mobile menu"
      >
        <span className="toggle-icon"></span>
      </button>
    </>
  );
};

export default Sidebar;