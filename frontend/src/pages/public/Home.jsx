import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/HomePage.css';

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
      title: "Herbal Consultations",
      description: " Personalized consultations to assess health concerns and recommend appropriate herbal remedies",
      icon: "👨‍👩‍👧‍👦",
      
    },
    {
      title: "Detox Programs",
      description: "Detox Programs",
      icon: "👶",
    },
    {
      title: "Custom Herbal Formulations",
      description: " Preparation of personalized herbal tinctures, teas, oils, or capsules based on individual health needs.",
      icon: "❤️",
    },
    {
      title: "Stress Management and Relaxation Therapies",
      description: "Services that incorporate calming herbal treatments such as lavender, chamomile, or ashwagandha-based products to reduce anxiety, improve sleep, and promote relaxation.",
      icon: "🦴",
    },
    {
      title: "Digestive Health Solutions",
      description: " Remedies for improving digestion and addressing conditions like bloating, acid reflux, and irritable bowel syndrome (IBS). Herbs like peppermint, ginger, and fennel are often recommended.",
      icon: "🧠",
    },
    {
      title: "Anti-inflammatory Treatments",
      description: "Herbal therapies to reduce inflammation and promote joint health, using ingredients like turmeric, boswellia, and willow bark.",
      icon: "🧘‍♂️",
    }
  ];

  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero__content">
          <h1>Your Health, Our Priority</h1>
          <p>Advanced medical care with a personal touch. Experience healthcare excellence.</p>
          <div className="home-hero__buttons">
            <Link to="/appointments/book" className="home-btn home-btn--primary">
              Book Appointment
            </Link>
            <Link to="/services" className="home-btn home-btn--outline">
              Our Services
            </Link>
          </div>
        </div>
        <div className="home-hero__image">
          <img src="/images/hero-doctor.jpg" alt="Medical professionals" />
        </div>
      </section>

      {/* Features Section */}
      <section className="home-features">
        <div className="home-container">
          <div className="home-section__header">
            <h2>Why Choose Us</h2>
            <p>Experience the difference with our comprehensive healthcare services</p>
          </div>
          <div className="home-features__grid">
            {features.map((feature, index) => (
              <div key={index} className="home-feature__card">
                <span className="home-feature__icon">{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="home-stats">
        <div className="home-container">
          <div className="home-stats__grid">
            {stats.map((stat, index) => (
              <div key={index} className="home-stat__item">
                <div className="home-stat__value">{stat.value}</div>
                <div className="home-stat__label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="home-services">
        <div className="home-container">
          <div className="home-section__header">
            <h2>Our Services</h2>
            <p>Comprehensive healthcare solutions for you and your family</p>
          </div>
          <div className="home-services__grid">
            {services.map((service, index) => (
              <Link key={index} to={service.link} className="home-service__card">
                <span className="home-service__icon">{service.icon}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="home-testimonials">
        <div className="home-container">
          <div className="home-section__header">
            <h2>What Our Patients Say</h2>
            <p>Real experiences from our valued patients</p>
          </div>
          <div className="home-testimonials__grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="home-testimonial__card">
                <div className="home-testimonial__content">{testimonial.content}</div>
                <div className="home-testimonial__author">
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
      <section className="home-cta">
        <div className="home-container">
          <div className="home-cta__content">
            <h2>Ready to Get Started?</h2>
            <p>Schedule your appointment today and experience the best in healthcare</p>
            <Link to="/appointments/book" className="home-btn home-btn--primary home-btn--lg">
              Book Your Visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;