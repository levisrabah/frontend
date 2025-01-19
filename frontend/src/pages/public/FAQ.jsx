//FAQPage.jsx
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
// import '../../css/FAQPage.css';

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openQuestions, setOpenQuestions] = useState(new Set());

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'appointments', label: 'Appointments' },
    { id: 'services', label: 'Services' },
    { id: 'insurance', label: 'Insurance & Billing' },
    { id: 'virtual', label: 'Virtual Care' },
    { id: 'policies', label: 'Policies' },
  ];

  const faqs = [
    {
      id: 1,
      category: 'appointments',
      question: 'How do I schedule an appointment?',
      answer: 'You can schedule an appointment through our online portal, by calling our office during business hours, or using our mobile app. For new patients, we recommend creating an account first to streamline the booking process.',
    },
    {
      id: 2,
      category: 'appointments',
      question: 'What should I bring to my first appointment?',
      answer: 'Please bring a valid photo ID, your insurance card, a list of current medications, and any relevant medical records or test results. Arriving 15 minutes early to complete necessary paperwork is recommended.',
    },
    {
      id: 3,
      category: 'insurance',
      question: 'What insurance plans do you accept?',
      answer: 'We accept most major insurance plans including BlueCross BlueShield, Aetna, Cigna, and Medicare. Please contact our billing department or your insurance provider to verify coverage specifics.',
    },
    {
      id: 4,
      category: 'services',
      question: 'Do you offer emergency services?',
      answer: 'Yes, we provide 24/7 emergency medical services. For life-threatening emergencies, please call 911. Our emergency department is equipped to handle a wide range of medical emergencies.',
    },
    {
      id: 5,
      category: 'virtual',
      question: 'How do virtual consultations work?',
      answer: 'Virtual consultations are conducted through our secure telehealth platform. You\'ll need a device with a camera and microphone, and a stable internet connection. Once scheduled, you\'ll receive a link to join the video call with your healthcare provider.',
    },
    {
      id: 6,
      category: 'policies',
      question: 'What is your cancellation policy?',
      answer: 'We require 24 hours notice for appointment cancellations. Late cancellations or no-shows may incur a fee. We understand emergencies happen and handle these situations on a case-by-case basis.',
    },
  ];

  const filteredFAQs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleQuestion = (id) => {
    setOpenQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="faq-page">
      {/* Hero Section */}
      <section className="faq-hero">
        <div className="container">
          <div className="faq-hero-content">
            <h1>Frequently Asked Questions</h1>
            <p>Find answers to common questions about our services and policies</p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="faq-search">
        <div className="container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                className="search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Categories and Questions */}
      <section className="faq-content">
        <div className="container">
          <div className="faq-layout">
            {/* Categories Sidebar */}
            <aside className="faq-categories">
              <nav>
                <ul>
                  {categories.map(category => (
                    <li key={category.id}>
                      <button
                        className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
                        onClick={() => setActiveCategory(category.id)}
                      >
                        {category.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Questions List */}
            <div className="faq-questions">
              {filteredFAQs.length === 0 ? (
                <div className="no-results">
                  <h3>No questions found</h3>
                  <p>Try adjusting your search or category selection</p>
                </div>
              ) : (
                <div className="questions-list">
                  {filteredFAQs.map(faq => (
                    <div
                      key={faq.id}
                      className={`question-item ${openQuestions.has(faq.id) ? 'open' : ''}`}
                    >
                      <button
                        className="question-button"
                        onClick={() => toggleQuestion(faq.id)}
                        aria-expanded={openQuestions.has(faq.id)}
                      >
                        <span className="question-text">{faq.question}</span>
                        <span className="question-icon"></span>
                      </button>
                      <div className="answer-container">
                        <div className="answer-content">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="faq-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Couldn't find your answer?</h2>
            <p>Our support team is here to help you</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Contact Us
              </Link>
              <Link to="/appointments/book" className="btn btn-outline btn-lg">
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
