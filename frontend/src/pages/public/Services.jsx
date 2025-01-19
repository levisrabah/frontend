import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
// import '../../css/ServicesPage.css';

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
      category: 'specialized',
      title: 'Cardiology',
      description: 'Expert care for heart and cardiovascular conditions',
      icon: '❤️',
      features: [
        'Heart disease treatment',
        'Cardiac rehabilitation',
        'EKG testing',
        'Stress tests',
      ],
      image: '/images/services/cardiology.jpg',
    },
    {
      id: 3,
      category: 'emergency',
      title: 'Emergency Care',
      description: '24/7 emergency medical services',
      icon: '🚑',
      features: [
        'Immediate medical attention',
        'Trauma care',
        'Critical care',
        'Emergency surgery',
      ],
      image: '/images/services/emergency.jpg',
    },
    {
      id: 4,
      category: 'preventive',
      title: 'Health Screenings',
      description: 'Early detection and prevention of health issues',
      icon: '🔍',
      features: [
        'Annual physicals',
        'Cancer screenings',
        'Immunizations',
        'Health risk assessments',
      ],
      image: '/images/services/screening.jpg',
    },
    {
      id: 5,
      category: 'diagnostic',
      title: 'Laboratory Services',
      description: 'Comprehensive diagnostic testing and analysis',
      icon: '🔬',
      features: [
        'Blood tests',
        'Urinalysis',
        'Pathology',
        'Molecular diagnostics',
      ],
      image: '/images/services/lab.jpg',
    },
    {
      id: 6,
      category: 'specialized',
      title: 'Orthopedics',
      description: 'Treatment for bones, joints, and muscles',
      icon: '🦴',
      features: [
        'Joint replacement',
        'Sports medicine',
        'Fracture care',
        'Physical therapy',
      ],
      image: '/images/services/orthopedics.jpg',
    },
    {
      id: 7,
      category: 'specialized',
      title: 'Neurology',
      description: 'Care for nervous system disorders',
      icon: '🧠',
      features: [
        'Neurological disorders',
        'Brain and spine care',
        'Stroke treatment',
        'Movement disorders',
      ],
      image: '/images/services/neurology.jpg',
    },
    {
      id: 8,
      category: 'diagnostic',
      title: 'Imaging Services',
      description: 'Advanced medical imaging and radiology',
      icon: '📷',
      features: [
        'X-rays',
        'MRI scans',
        'CT scans',
        'Ultrasound',
      ],
      image: '/images/services/imaging.jpg',
    },
    {
      id: 9,
      category: 'primary',
      title: 'Pediatrics',
      description: 'Specialized healthcare for children',
      icon: '👶',
      features: [
        'Well-child visits',
        'Vaccinations',
        'Growth monitoring',
        'Developmental assessments',
      ],
      image: '/images/services/pediatrics.jpg',
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