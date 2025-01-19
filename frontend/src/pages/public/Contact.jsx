import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/ContactPage.css';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
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
    <div className="cnt-page">
      {/* Hero Section */}
      <section className="cnt-hero">
        <div className="cnt-hero-content">
          <h1>Contact Us</h1>
          <p>Get in touch with our healthcare team</p>
        </div>
      </section>

      {/* Emergency Notice */}
      <section className="cnt-emergency">
        <div className="cnt-container">
          <div className="cnt-notice">
            <div className="cnt-notice-icon">🚨</div>
            <div className="cnt-notice-text">
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
      <section className="cnt-content">
        <div className="cnt-container">
          <div className="cnt-grid">
            {/* Contact Form */}
            <div className="cnt-form-wrapper">
              <div className="cnt-form-header">
                <h2>Send us a Message</h2>
                <p>Fill out the form below and we'll get back to you soon</p>
              </div>

              <form onSubmit={handleSubmit} className="cnt-form">
                {errors.submit && (
                  <div className="cnt-form-error">{errors.submit}</div>
                )}

                {submitSuccess && (
                  <div className="cnt-form-success">
                    Message sent successfully! We'll respond soon.
                  </div>
                )}

                <div className="cnt-form-group">
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
                    <span className="cnt-error-text">{errors.name}</span>
                  )}
                </div>

                <div className="cnt-form-group">
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
                    <span className="cnt-error-text">{errors.email}</span>
                  )}
                </div>

                <div className="cnt-form-group">
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
                    <span className="cnt-error-text">{errors.phone}</span>
                  )}
                </div>

                <div className="cnt-form-group">
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

                <div className="cnt-form-group">
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
                    <span className="cnt-error-text">{errors.subject}</span>
                  )}
                </div>

                <div className="cnt-form-group">
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
                    <span className="cnt-error-text">{errors.message}</span>
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
            <div className="cnt-info">
              {/* Departments */}
              <div className="cnt-section">
                <h3>Departments</h3>
                <div className="cnt-departments">
                  {departments.map((dept, index) => (
                    <div key={index} className="cnt-dept-card">
                      <h4>{dept.name}</h4>
                      <div className="cnt-dept-details">
                        <div className="cnt-contact-item">
                          <span className="cnt-icon">📞</span>
                          <a href={`tel:${dept.contact}`}>{dept.contact}</a>
                        </div>
                        <div className="cnt-contact-item">
                          <span className="cnt-icon">✉️</span>
                          <a href={`mailto:${dept.email}`}>{dept.email}</a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Locations */}
              <div className="cnt-section">
                <h3>Our Locations</h3>
                <div className="cnt-locations">
                  {locations.map(location => (
                    <div key={location.id} className="cnt-location-card">
                      <h4>{location.name}</h4>
                      <div className="cnt-location-details">
                        <div className="cnt-location-info">
                          <p className="cnt-address">
                            {location.address}<br />
                            {location.city}
                          </p>
                          <p className="cnt-hours">{location.hours}</p>
                        </div>
                        <div className="cnt-location-contacts">
                          <div className="cnt-contact-item">
                            <span className="cnt-icon">📞</span>
                            <a href={`tel:${location.phone}`}>{location.phone}</a>
                          </div>
                          <div className="cnt-contact-item">
                            <span className="cnt-icon">✉️</span>
                            <a href={`mailto:${location.email}`}>{location.email}</a>
                          </div>
                        </div>
                        <div className="cnt-location-features">
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
      <section className="cnt-map">
        <div className="cnt-container">
          <div className="cnt-map-container">
            <div className="cnt-map-placeholder">
              <div className="cnt-map-overlay">
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