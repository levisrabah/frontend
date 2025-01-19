import React from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

const AboutPage = () => {
  const milestones = [
    {
      year: 2005,
      title: 'Foundation',
      description: 'Established with a vision to provide accessible, quality healthcare.'
    },
    {
      year: 2010,
      title: 'Expansion',
      description: 'Opened specialized departments and increased capacity.'
    },
    {
      year: 2015,
      title: 'Technology Integration',
      description: 'Implemented state-of-the-art medical technology and systems.'
    },
    {
      year: 2020,
      title: 'Virtual Care Launch',
      description: 'Introduced telemedicine services for remote consultations.'
    },
  ];

  const values = [
    {
      icon: '❤️',
      title: 'Patient-Centered Care',
      description: 'Putting our patients first in everything we do.'
    },
    {
      icon: '🤝',
      title: 'Excellence',
      description: 'Maintaining the highest standards in medical care.'
    },
    {
      icon: '🌟',
      title: 'Innovation',
      description: 'Embracing advanced medical technologies and practices.'
    },
    {
      icon: '🤲',
      title: 'Compassion',
      description: 'Treating every patient with empathy and understanding.'
    },
    {
      icon: '🤓',
      title: 'Education',
      description: 'Continuous learning and development for our staff.'
    },
    {
      icon: '🌍',
      title: 'Community',
      description: 'Contributing to the health of our local community.'
    },
  ];

  const stats = [
    {
      value: '50+',
      label: 'Expert Doctors',
    },
    {
      value: '30k+',
      label: 'Patients Yearly',
    },
    {
      value: '25+',
      label: 'Specialties',
    },
    {
      value: '15+',
      label: 'Years of Service',
    },
  ];

  const leadership = [
    {
      name: 'Dr. Sarah Mitchell',
      role: 'Chief Medical Officer',
      image: '/images/team/sarah-mitchell.jpg',
      credentials: 'MD, PhD',
      specialization: 'Internal Medicine'
    },
    {
      name: 'Dr. James Wilson',
      role: 'Medical Director',
      image: '/images/team/james-wilson.jpg',
      credentials: 'MD',
      specialization: 'Cardiology'
    },
    {
      name: 'Emily Thompson',
      role: 'Chief Operating Officer',
      image: '/images/team/emily-thompson.jpg',
      credentials: 'MBA, MHA',
      specialization: 'Healthcare Administration'
    },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>Our Story</h1>
          <p className="lead">
            Founded in 2005, Medical Center has been committed to providing
            exceptional healthcare services to our community. Our journey is
            marked by continuous innovation, compassionate care, and unwavering
            dedication to patient well-being.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-section">
        <div className="section-container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                To enhance the health and well-being of our community by providing
                accessible, high-quality medical care with compassion and excellence.
              </p>
              <h2>Our Vision</h2>
              <p>
                To be the region's most trusted healthcare provider, recognized for
                excellence in patient care, innovation, and community wellness.
              </p>
            </div>
            <div className="mission-image">
              <img
                src="/images/about/mission.jpg"
                alt="Medical professionals collaborating"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-section values-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Our Values</h2>
            <p>The principles that guide our every action</p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <span className="value-icon">{value.icon}</span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="about-section timeline-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Our Journey</h2>
            <p>Key milestones in our history of excellence</p>
          </div>
           <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-content">
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-section stats-section">
        <div className="section-container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="about-section leadership-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Our Leadership</h2>
            <p>Meet the team dedicated to your health</p>
          </div>
          <div className="leadership-grid">
            {leadership.map((leader, index) => (
              <div key={index} className="leader-card">
                <div className="leader-image">
                  <img src={leader.image} alt={leader.name} />
                </div>
                <div className="leader-info">
                  <h3>{leader.name}</h3>
                  <p className="leader-role">{leader.role}</p>
                  <p className="leader-credentials">{leader.credentials}</p>
                  <p className="leader-specialization">{leader.specialization}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-section cta-section">
        <div className="section-container">
          <div className="cta-content">
            <h2>Join Our Healthcare Family</h2>
            <p>Experience the difference of patient-centered care</p>
            <div className="cta-buttons">
              <Link to="/appointments/book" className="btn btn-primary btn-lg">
                Book Appointment
              </Link>
              <Link to="/contact" className="btn btn-outline btn-lg">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;