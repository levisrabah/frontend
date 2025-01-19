import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../css/Header.css';
import clinicLogo from '../../images/clinicLogo.jpeg';


const Header = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

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
    <header className={`mc-header ${isScrolled ? 'mc-header--scrolled' : ''}`}>
      <div className="mc-header__container">
        <Link to="/" className="mc-header__logo">
          <img src={clinicLogo}  alt="Hospital Logo" className="mc-header__logo-img" />
          <span className="mc-header__logo-text">Medical Center</span>
        </Link>

        <button
          className={`mc-header__menu-btn ${isMenuOpen ? 'is-active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          <span className="mc-header__menu-icon"></span>
        </button>

        <nav className={`mc-header__nav ${isMenuOpen ? 'is-open' : ''}`}>
          <ul className="mc-header__nav-list">
            {navigationItems.map((item) => (
              <li key={item.path} className="mc-header__nav-item">
                <Link
                  to={item.path}
                  className={`mc-header__nav-link ${location.pathname === item.path ? 'is-active' : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mc-header__user" ref={userMenuRef}>
          {user ? (
            <>
              <button
                className="mc-header__user-btn"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-expanded={isUserMenuOpen}
              >
                <div className="mc-header__user-avatar">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} />
                  ) : (
                    <span>{user.name.charAt(0)}</span>
                  )}
                </div>
                <span className="mc-header__user-name">{user.name}</span>
              </button>

              {isUserMenuOpen && (
                <div className="mc-header__user-menu">
                  <div className="mc-header__menu-header">
                    <strong>{user.name}</strong>
                    <small>{user.email}</small>
                  </div>
                  <div className="mc-header__menu-items">
                    <Link to="/profile" className="mc-header__menu-item">
                      <span className="mc-header__menu-icon">👤</span>
                      Profile
                    </Link>
                    <Link to="/settings" className="mc-header__menu-item">
                      <span className="mc-header__menu-icon">⚙️</span>
                      Settings
                    </Link>
                    <button onClick={onLogout} className="mc-header__menu-item">
                      <span className="mc-header__menu-icon">🚪</span>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="mc-header__auth-buttons">
              <Link to="/login" className="mc-btn mc-btn--ghost">
                Login
              </Link>
              <Link to="/signup" className="mc-btn mc-btn--primary">
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