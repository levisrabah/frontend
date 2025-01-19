import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../css//Header.css';

const Header = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Navigation items based on user role
  const getNavigationItems = () => {
    const commonItems = [
      { label: 'Home', path: '/' },
      { label: 'About', path: '/about' },
      { label: 'Services', path: '/services' },
      { label: 'Team', path: '/team' },
      { label: 'Contact', path: '/contact' },
      { label: 'FAQ', path: '/faq' },
    ];

    if (!user) return commonItems;

    const roleSpecificItems = {
      admin: [
        { label: 'Dashboard', path: '/admin/dashboard' },
        { label: 'Staff', path: '/admin/staff' },
        { label: 'Patients', path: '/admin/patients' },
        { label: 'Reports', path: '/admin/reports' },
      ],
      staff: [
        { label: 'Dashboard', path: '/staff/dashboard' },
        { label: 'Appointments', path: '/staff/appointments' },
        { label: 'Patients', path: '/staff/patients' },
      ],
      patient: [
        { label: 'Dashboard', path: '/patient/dashboard' },
        { label: 'Appointments', path: '/patient/appointments' },
        { label: 'Medical Records', path: '/patient/records' },
      ],
    };

    return [...commonItems, ...(roleSpecificItems[user.role] || [])];
  };

  const navigationItems = getNavigationItems();

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="header-logo">
          <img src="/logo.svg" alt="Hospital Logo" className="header-logo-img" />
          <span className="header-logo-text">Medical Center</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className={`header-menu-button ${isMenuOpen ? 'is-active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          <span className="menu-icon"></span>
        </button>

        {/* Navigation */}
        <nav className={`header-nav ${isMenuOpen ? 'is-open' : ''}`}>
          <ul className="nav-list">
            {navigationItems.map((item) => (
              <li key={item.path} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Menu */}
        <div className="header-user" ref={userMenuRef}>
          {user ? (
            <>
              <button
                className="user-menu-button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-expanded={isUserMenuOpen}
              >
                <div className="user-avatar">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} />
                  ) : (
                    <span>{user.name.charAt(0)}</span>
                  )}
                </div>
                <span className="user-name">{user.name}</span>
              </button>

              {isUserMenuOpen && (
                <div className="user-menu">
                  <div className="user-menu-header">
                    <strong>{user.name}</strong>
                    <small>{user.email}</small>
                  </div>
                  <div className="user-menu-items">
                    <Link to="/profile" className="user-menu-item">
                      <span className="icon">👤</span>
                      Profile
                    </Link>
                    <Link to="/settings" className="user-menu-item">
                      <span className="icon">⚙️</span>
                      Settings
                    </Link>
                    <button onClick={onLogout} className="user-menu-item">
                      <span className="icon">🚪</span>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-ghost">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;