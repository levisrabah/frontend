import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/AboutPage.css';

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
    <div className="about">
      <section className="about__hero">
        <div className="about__hero-content">
          <h1>Our Story</h1>
          <p className="about__lead">
            Founded in 2005, Medical Center has been committed to providing
            exceptional healthcare services to our community. Our journey is
            marked by continuous innovation, compassionate care, and unwavering
            dedication to patient well-being.
          </p>
        </div>
      </section>

      <section className="about__section">
        <div className="about__container">
          <div className="about__mission">
            <div className="about__mission-text">
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
            <div className="about__mission-image">
              <img
                src="/images/about/mission.jpg"
                alt="Medical professionals collaborating"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="about__section about__section--values">
        <div className="about__container">
          <div className="about__section-header">
            <h2>Our Values</h2>
            <p>The principles that guide our every action</p>
          </div>
          <div className="about__values-grid">
            {values.map((value, index) => (
              <div key={index} className="about__value-card">
                <span className="about__value-icon">{value.icon}</span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about__section about__section--timeline">
        <div className="about__container">
          <div className="about__section-header">
            <h2>Our Journey</h2>
            <p>Key milestones in our history of excellence</p>
          </div>
          <div className="about__timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="about__timeline-item">
                <div className="about__timeline-year">{milestone.year}</div>
                <div className="about__timeline-content">
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about__section about__section--stats">
        <div className="about__container">
          <div className="about__stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="about__stat-item">
                <div className="about__stat-value">{stat.value}</div>
                <div className="about__stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about__section">
        <div className="about__container">
          <div className="about__section-header">
            <h2>Our Leadership</h2>
            <p>Meet the team dedicated to your health</p>
          </div>
          <div className="about__leadership-grid">
            {leadership.map((leader, index) => (
              <div key={index} className="about__leader-card">
                <div className="about__leader-image">
                  <img src={leader.image} alt={leader.name} />
                </div>
                <div className="about__leader-info">
                  <h3>{leader.name}</h3>
                  <p className="about__leader-role">{leader.role}</p>
                  <p className="about__leader-credentials">{leader.credentials}</p>
                  <p className="about__leader-specialization">{leader.specialization}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about__section about__section--cta">
        <div className="about__container">
          <div className="about__cta-content">
            <h2>Join Our Healthcare Family</h2>
            <p>Experience the difference of patient-centered care</p>
            <div className="about__cta-buttons">
              <Link to="/appointments/book" className="about__btn about__btn--primary">
                Book Appointment
              </Link>
              <Link to="/contact" className="about__btn about__btn--outline">
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