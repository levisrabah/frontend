import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../../css/ServicesPage.css';

const ServicesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'primary', label: 'Primary Care' },
    { id: 'specialized', label: 'Specialized Care' },
    { id: 'emergency', label: 'Emergency' },
    { id: 'preventive', label: 'Preventive Care' },
    { id: 'diagnostic', label: 'Diagnostics' },
  ];

  const services = [
    {
      id: 1,
      category: 'primary',
      title: 'Family Medicine',
      description: 'Comprehensive healthcare for patients of all ages',
      icon: '👨‍👩‍👧‍👦',
      features: [
        'Regular check-ups',
        'Preventive care',
        'Health screenings',
        'Chronic disease management',
      ],
      image: '/images/services/family-medicine.jpg',
    },
    {
      id: 2,
      category: 'consultation',
      title: 'Herbal Consultations',
      description: 'Personalized assessments to recommend herbal remedies.',
      icon: '🩺',
      features: [
        'One-on-one consultations',
        'Tailored herbal plans',
        'Lifestyle and diet advice',
      ],
      image: '/images/services/consultation.jpg',
    },
    {
      id: 3,
      category: 'formulations',
      title: 'Custom Herbal Formulations',
      description: 'Creation of personalized herbal tinctures, teas, and capsules.',
      icon: '🌿',
      features: [
        'Personalized herbal blends',
        'Remedies for specific conditions',
        'Prepared by experienced herbalists',
      ],
      image: '/images/services/formulations.jpg',
    },
    {
      id: 4,
      category: 'detox',
      title: 'Detox Programs',
      description: 'Guided detox plans using natural herbal remedies.',
      icon: '💧',
      features: [
        'Herbal teas and supplements',
        'Body cleansing routines',
        'Improved energy and wellness',
      ],
      image: '/images/services/detox.jpg',
    },
    {
      id: 5,
      category: 'stress-management',
      title: 'Stress Management',
      description: 'Herbal treatments to reduce stress and improve relaxation.',
      icon: '🧘',
      features: [
        'Calming herbal teas',
        'Stress-reducing supplements',
        'Guidance on mindfulness',
      ],
      image: '/images/services/stress.jpg',
    },
    {
      id: 6,
      category: 'skin-care',
      title: 'Skin and Beauty Treatments',
      description: 'Natural skincare solutions for healthy, glowing skin.',
      icon: '✨',
      features: [
        'Herbal facials and masks',
        'Acne and eczema treatments',
        'Anti-aging remedies',
      ],
      image: '/images/services/skincare.jpg',
    },
    {
      id: 7,
      category: 'pain-management',
      title: 'Pain Management',
      description: 'Herbal balms and remedies for chronic and acute pain relief.',
      icon: '🌼',
      features: [
        'Joint pain solutions',
        'Arthritis support',
        'Muscle soreness relief',
      ],
      image: '/images/services/pain.jpg',
    },
    {
      id: 8,
      category: 'immune-support',
      title: 'Immune System Support',
      description: 'Herbal treatments to strengthen the immune system.',
      icon: '🛡️',
      features: [
        'Echinacea and elderberry-based remedies',
        'Cold and flu prevention',
        'General immune boosters',
      ],
      image: '/images/services/immune.jpg',
    },
    {
      id: 9,
      category: 'digestive-health',
      title: 'Digestive Health Solutions',
      description: 'Herbal remedies to improve digestion and gut health.',
      icon: '🍵',
      features: [
        'Bloating and gas relief',
        'Support for IBS and acid reflux',
        'Herbal teas for digestion',
      ],
      image: '/images/services/digestive.jpg',
    },
    {
      id: 10,
      category: 'women-health',
      title: 'Women’s Health Support',
      description: 'Herbal solutions for menstrual health and hormonal balance.',
      icon: '🌸',
      features: [
        'Support for PMS and menopause',
        'Fertility-enhancing remedies',
        'Hormone-balancing teas',
      ],
      image: '/images/services/women-health.jpg',
    },
  ];

  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
      const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="services-hero-content">
          <h1>Our Services</h1>
          <p>Comprehensive healthcare solutions for you and your family</p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="services-filters">
        <div className="container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid-section">
        <div className="container">
          {filteredServices.length === 0 ? (
            <div className="no-results">
              <h3>No services found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="services-grid">
              {filteredServices.map(service => (
                <div key={service.id} className="service-card">
                  <div className="service-image">
                    <img src={service.image} alt={service.title} />
                    <span className="service-icon">{service.icon}</span>
                  </div>
                  <div className="service-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <ul className="service-features">
                      {service.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                    <Link
                      to={`/services/${service.id}`}
                      className="btn btn-primary"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Need Medical Assistance?</h2>
            <p>Our team of medical professionals is here to help you</p>
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

export default ServicesPage;