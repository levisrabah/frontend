import React from 'react';
import { Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import '../../css/Footer.css';

// Register icons
library.add(faFacebook, faTwitter, faInstagram, faLinkedin);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Team', path: '/team' },
      { label: 'Careers', path: '/careers' },
      { label: 'News', path: '/news' },
      { label: 'Contact', path: '/contact' },
    ],
    services: [
      { label: 'Primary Care', path: '/services/primary-care' },
      { label: 'Emergency Care', path: '/services/emergency' },
      { label: 'Specialized Care', path: '/services/specialized' },
      { label: 'Virtual Consultations', path: '/services/virtual' },
      { label: 'Lab Services', path: '/services/lab' },
    ],
    patients: [
      { label: 'Patient Portal', path: '/patient/dashboard' },
      { label: 'Book Appointment', path: '/appointments/book' },
      { label: 'Insurance', path: '/insurance' },
      { label: 'Patient Rights', path: '/patient-rights' },
      { label: 'FAQs', path: '/faq' },
    ],
    legal: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Cookie Policy', path: '/cookies' },
      { label: 'Accessibility', path: '/accessibility' },
      { label: 'HIPAA Notice', path: '/hipaa' },
    ],
  };

  const socialLinks = [
    { icon: faFacebook, label: 'Facebook', url: 'https://facebook.com' },
    { icon: faTwitter, label: 'Twitter', url: 'https://twitter.com' },
    { icon: faInstagram, label: 'Instagram', url: 'https://instagram.com' },
    { icon: faLinkedin, label: 'LinkedIn', url: 'https://linkedin.com' },
  ];

  const contactInfo = {
    address: '123 Medical Center Drive, Healthcare City, HC 12345',
    phone: '+1 (555) 123-4567',
    email: 'info@medicalcenter.com',
    emergency: '911',
  };

  return (
    <footer className="mc-footer">
      <div className="mc-footer__main">
        <div className="mc-footer__content">
          {/* Logo and Contact Section */}
          <div className="mc-footer__brand">
            <Link to="/" className="mc-footer__logo">
              <img src="/logo.svg" alt="Medical Center Logo" />
              <span>Medical Center</span>
            </Link>
            
            <div className="mc-footer__contact">
              <div className="mc-footer__contact-item">
                <strong>Address:</strong>
                <p>{contactInfo.address}</p>
              </div>
              <div className="mc-footer__contact-item">
                <strong>Phone:</strong>
                <p>{contactInfo.phone}</p>
              </div>
              <div className="mc-footer__contact-item">
                <strong>Email:</strong>
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </div>
              <div className="mc-footer__contact-item mc-footer__contact-item--emergency">
                <strong>Emergency:</strong>
                <p>{contactInfo.emergency}</p>
              </div>
            </div>

            <div className="mc-footer__social">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mc-footer__social-link"
                  aria-label={social.label}
                >
                  <FontAwesomeIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="mc-footer__links">
            <div className="mc-footer__links-group">
              <h3>Company</h3>
              <ul>
                {footerLinks.company.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mc-footer__links-group">
              <h3>Services</h3>
              <ul>
                {footerLinks.services.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mc-footer__links-group">
              <h3>For Patients</h3>
              <ul>
                {footerLinks.patients.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mc-footer__links-group">
              <h3>Legal</h3>
              <ul>
                {footerLinks.legal.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mc-footer__newsletter">
          <h3>Stay Updated</h3>
          <p>Subscribe to our newsletter for health tips and updates.</p>
          <form className="mc-footer__newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email for newsletter"
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mc-footer__bottom">
        <div className="mc-footer__bottom-content">
          <p>© {currentYear} Medical Center. All rights reserved.</p>
          <div className="mc-footer__bottom-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
