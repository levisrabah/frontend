import React from 'react';
import { Link } from 'react-router-dom';
import '.../css/HomePage.css';

const HomePage = () => {
  const features = [
    {
      icon: '🏥',
      title: 'Primary Care',
      description: 'Comprehensive healthcare services for you and your family.',
    },
    {
      icon: '🚑',
      title: 'Emergency Care',
      description: '24/7 emergency services with state-of-the-art facilities.',
    },
    {
      icon: '👨‍⚕️',
      title: 'Specialized Care',
      description: 'Expert specialists delivering advanced medical treatments.',
    },
    {
      icon: '💻',
      title: 'Virtual Care',
      description: 'Convenient online consultations from the comfort of your home.',
    },
  ];

  const stats = [
    {
      value: '50+',
      label: 'Experienced Doctors',
    },
    {
      value: '100k+',
      label: 'Satisfied Patients',
    },
    {
      value: '25+',
      label: 'Specializations',
    },
    {
      value: '15+',
      label: 'Years of Service',
    },
  ];

  const testimonials = [
    {
      content: "The care I received was exceptional. The staff was professional and caring throughout my treatment.",
      author: "Sarah Johnson",
      title: "Patient",
      image: "/testimonials/sarah.jpg"
    },
    {
      content: "State-of-the-art facilities and a team that truly cares about patient well-being. Highly recommended!",
      author: "Michael Chen",
      title: "Patient",
      image: "/testimonials/michael.jpg"
    },
    {
      content: "The virtual consultation service was convenient and effective. Great experience overall.",
      author: "Emily Rodriguez",
      title: "Patient",
      image: "/testimonials/emily.jpg"
    }
  ];

  const services = [
    {
      title: "Family Medicine",
      description: "Comprehensive care for all ages",
      icon: "👨‍👩‍👧‍👦",
      link: "/services/family-medicine"
    },
    {
      title: "Pediatrics",
      description: "Specialized care for children",
      icon: "👶",
      link: "/services/pediatrics"
    },
    {
      title: "Cardiology",
      description: "Expert heart care services",
      icon: "❤️",
      link: "/services/cardiology"
    },
    {
      title: "Orthopedics",
      description: "Musculoskeletal health specialists",
      icon: "🦴",
      link: "/services/orthopedics"
    },
    {
      title: "Neurology",
      description: "Advanced neurological care",
      icon: "🧠",
      link: "/services/neurology"
    },
    {
      title: "Mental Health",
      description: "Comprehensive mental wellness support",
      icon: "🧘‍♂️",
      link: "/services/mental-health"
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Your Health, Our Priority</h1>
          <p>Advanced medical care with a personal touch. Experience healthcare excellence.</p>
          <div className="hero-buttons">
            <Link to="/appointments/book" className="btn btn-primary btn-lg">
              Book Appointment
            </Link>
            <Link to="/services" className="btn btn-outline btn-lg">
              Our Services
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/hero-doctor.jpg" alt="Medical professionals" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-container">
          <div className="section-header">
            <h2>Why Choose Us</h2>
            <p>Experience the difference with our comprehensive healthcare services</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <span className="feature-icon">{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
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

      {/* Services Section */}
      <section className="services">
        <div className="section-container">
          <div className="section-header">
            <h2>Our Services</h2>
            <p>Comprehensive healthcare solutions for you and your family</p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <Link key={index} to={service.link} className="service-card">
                <span className="service-icon">{service.icon}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="section-container">
          <div className="section-header">
            <h2>What Our Patients Say</h2>
            <p>Real experiences from our valued patients</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-content">{testimonial.content}</div>
                <div className="testimonial-author">
                  <img src={testimonial.image} alt={testimonial.author} />
                  <div>
                    <h4>{testimonial.author}</h4>
                    <p>{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="section-container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Schedule your appointment today and experience the best in healthcare</p>
            <Link to="/appointments/book" className="btn btn-primary btn-lg">
              Book Your Visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;