//ContactPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const locations = [
    {
      id: 1,
      name: 'Main Hospital',
      address: '123 Medical Center Drive',
      city: 'Healthcare City, HC 12345',
      phone: '(555) 123-4567',
      hours: 'Open 24/7',
      email: 'info@medicalcenter.com',
      coordinates: {
        lat: 40.7128,
        lng: -74.0060
      },
      features: [
        'Emergency Department',
        'Inpatient Services',
        'Surgery Center',
        'Diagnostic Imaging'
      ]
    },
    {
      id: 2,
      name: 'Downtown Clinic',
      address: '456 Health Street',
      city: 'Healthcare City, HC 12345',
      phone: '(555) 234-5678',
      hours: 'Mon-Fri: 8AM-6PM',
      email: 'downtown@medicalcenter.com',
      coordinates: {
        lat: 40.7112,
        lng: -74.0055
      },
      features: [
        'Primary Care',
        'Specialist Consultations',
        'Lab Services',
        'Pharmacy'
      ]
    }
  ];

  const departments = [
    {
      name: 'General Inquiries',
      contact: '(555) 123-4567',
      email: 'info@medicalcenter.com'
    },
    {
      name: 'Appointments',
      contact: '(555) 234-5678',
      email: 'appointments@medicalcenter.com'
    },
    {
      name: 'Billing',
      contact: '(555) 345-6789',
      email: 'billing@medicalcenter.com'
    },
    {
      name: 'Medical Records',
      contact: '(555) 456-7890',
      email: 'records@medicalcenter.com'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (formData.phone && !/^\+?[\d-\s()]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        preferredContact: 'email'
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to send message. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <h1>Contact Us</h1>
            <p>Get in touch with our healthcare team</p>
          </div>
        </div>
      </section>

      {/* Emergency Notice */}
      <section className="emergency-notice">
        <div className="container">
          <div className="notice-content">
            <div className="notice-icon">🚨</div>
            <div className="notice-text">
              <h2>For Medical Emergencies</h2>
              <p>Please dial <strong>911</strong> or visit the nearest emergency room</p>
            </div>
            <Link to="/services/emergency" className="btn btn-danger">
              Emergency Services
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-container">
              <div className="form-header">
                <h2>Send us a Message</h2>
                <p>Fill out the form below and we'll get back to you soon</p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                {errors.submit && (
                  <div className="form-error">{errors.submit}</div>
                )}

                {submitSuccess && (
                  <div className="form-success">
                    Message sent successfully! We'll respond soon.
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && (
                    <span className="error-message">{errors.name}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && (
                    <span className="error-message">{errors.phone}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="preferredContact">Preferred Contact Method</label>
                  <select
                    id="preferredContact"
                    name="preferredContact"
                    value={formData.preferredContact}
                    onChange={handleChange}
                  >
                   <option value="email">Email</option>
                    <option value="phone">Phone</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={errors.subject ? 'error' : ''}
                  />
                  {errors.subject && (
                    <span className="error-message">{errors.subject}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={errors.message ? 'error' : ''}
                  ></textarea>
                  {errors.message && (
                    <span className="error-message">{errors.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="contact-info">
              {/* Departments */}
              <div className="contact-section">
                <h3>Departments</h3>
                <div className="departments-grid">
                  {departments.map((dept, index) => (
                    <div key={index} className="department-card">
                      <h4>{dept.name}</h4>
                      <div className="contact-details">
                        <div className="contact-item">
                          <span className="icon">📞</span>
                          <a href={`tel:${dept.contact}`}>{dept.contact}</a>
                        </div>
                        <div className="contact-item">
                          <span className="icon">✉️</span>
                          <a href={`mailto:${dept.email}`}>{dept.email}</a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Locations */}
              <div className="contact-section">
                <h3>Our Locations</h3>
                <div className="locations-grid">
                  {locations.map(location => (
                    <div key={location.id} className="location-card">
                      <h4>{location.name}</h4>
                      <div className="location-details">
                        <div className="location-info">
                          <p className="address">
                            {location.address}<br />
                            {location.city}
                          </p>
                          <p className="hours">{location.hours}</p>
                        </div>
                        <div className="location-contacts">
                          <div className="contact-item">
                            <span className="icon">📞</span>
                            <a href={`tel:${location.phone}`}>{location.phone}</a>
                          </div>
                          <div className="contact-item">
                            <span className="icon">✉️</span>
                            <a href={`mailto:${location.email}`}>{location.email}</a>
                          </div>
                        </div>
                        <div className="location-features">
                          <h5>Available Services:</h5>
                          <ul>
                            {location.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                        <Link
                          to={`/locations/${location.id}`}
                          className="btn btn-outline"
                        >
                          View Details & Directions
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <div className="map-container">
            {/* Placeholder for map - would integrate with Google Maps or similar */}
            <div className="map-placeholder">
              <div className="map-overlay">
                <p>Interactive map would be integrated here</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;