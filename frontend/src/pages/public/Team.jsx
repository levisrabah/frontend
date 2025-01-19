import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
// import '../../css/TeamPage.css';

const TeamPage = () => {
  const [activeSpecialty, setActiveSpecialty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const specialties = [
    { id: 'all', label: 'All Specialties' },
    { id: 'primary', label: 'Primary Care' },
    { id: 'cardiology', label: 'Cardiology' },
    { id: 'neurology', label: 'Neurology' },
    { id: 'orthopedics', label: 'Orthopedics' },
    { id: 'pediatrics', label: 'Pediatrics' },
    { id: 'oncology', label: 'Oncology' },
  ];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Mitchell',
      specialty: 'cardiology',
      title: 'Chief of Cardiology',
      image: '/images/team/sarah-mitchell.jpg',
      credentials: 'MD, FACC',
      education: 'Harvard Medical School',
      experience: '15+ years',
      languages: ['English', 'Spanish'],
      specializations: [
        'Interventional Cardiology',
        'Heart Failure Management',
        'Preventive Cardiology'
      ],
      bio: 'Dr. Mitchell is a board-certified cardiologist with extensive experience in treating complex cardiovascular conditions.',
      awards: [
        'Excellence in Cardiology Award 2022',
        'Top Doctor Award 2021'
      ]
    },
    {
      id: 2,
      name: 'Dr. James Wilson',
      specialty: 'neurology',
      title: 'Senior Neurologist',
      image: '/images/team/james-wilson.jpg',
      credentials: 'MD, PhD',
      education: 'Johns Hopkins University',
      experience: '12+ years',
      languages: ['English'],
      specializations: [
        'Movement Disorders',
        'Neurodegenerative Diseases',
        'Stroke Treatment'
      ],
      bio: 'Dr. Wilson specializes in diagnosing and treating complex neurological disorders using the latest therapeutic approaches.',
      awards: [
        'Neurological Research Excellence Award',
        'Clinical Excellence Award'
      ]
    },
    {
      id: 3,
      name: 'Dr. Maria Rodriguez',
      specialty: 'pediatrics',
      title: 'Lead Pediatrician',
      image: '/images/team/maria-rodriguez.jpg',
      credentials: 'MD, FAAP',
      education: 'Stanford University',
      experience: '10+ years',
      languages: ['English', 'Spanish'],
      specializations: [
        'Pediatric Primary Care',
        'Developmental Pediatrics',
        'Adolescent Medicine'
      ],
      bio: 'Dr. Rodriguez is passionate about providing comprehensive care for children from newborns to adolescents.',
      awards: [
        'Pediatric Care Excellence Award',
        'Community Service Award'
      ]
    },
    {
      id: 4,
      name: 'Dr. Michael Chen',
      specialty: 'orthopedics',
      title: 'Orthopedic Surgeon',
      image: '/images/team/michael-chen.jpg',
      credentials: 'MD, FAAOS',
      education: 'Yale School of Medicine',
      experience: '14+ years',
      languages: ['English', 'Mandarin'],
      specializations: [
        'Joint Replacement',
        'Sports Medicine',
        'Minimally Invasive Surgery'
      ],
      bio: 'Dr. Chen is an expert in minimally invasive orthopedic procedures and complex joint replacements.',
      awards: [
        'Surgical Excellence Award',
        'Innovation in Orthopedics Award'
      ]
    },
    {
      id: 5,
      name: 'Dr. Emily Thompson',
      specialty: 'primary',
      title: 'Family Medicine Physician',
      image: '/images/team/emily-thompson.jpg',
      credentials: 'MD',
      education: 'University of Pennsylvania',
      experience: '8+ years',
      languages: ['English'],
      specializations: [
        'Preventive Medicine',
        'Chronic Disease Management',
        'Women\'s Health'
      ],
      bio: 'Dr. Thompson focuses on building long-term relationships with patients and providing comprehensive family care.',
      awards: [
        'Patient Choice Award',
        'Excellence in Primary Care'
      ]
    }
  ];

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      const matchesSpecialty = activeSpecialty === 'all' || doctor.specialty === activeSpecialty;
      const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specializations.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSpecialty && matchesSearch;
    });
  }, [activeSpecialty, searchQuery]);

  return (
    <div className="team-page">
      {/* Hero Section */}
      <section className="team-hero">
        <div className="team-hero-content">
          <h1>Meet Our Team</h1>
          <p>Expert healthcare professionals dedicated to your well-being</p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="team-filters">
        <div className="container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search doctors by name or specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="specialty-filters">
            {specialties.map(specialty => (
              <button
                key={specialty.id}
                className={`specialty-button ${activeSpecialty === specialty.id ? 'active' : ''}`}
                onClick={() => setActiveSpecialty(specialty.id)}
              >
                {specialty.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="team-grid-section">
        <div className="container">
          {filteredDoctors.length === 0 ? (
            <div className="no-results">
              <h3>No doctors found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="team-grid">
              {filteredDoctors.map(doctor => (
                <div key={doctor.id} className="doctor-card">
                  <div className="doctor-image">
                    <img src={doctor.image} alt={doctor.name} />
                  </div>
                  <div className="doctor-content">
                    <h3>{doctor.name}</h3>
                    <p className="doctor-title">{doctor.title}</p>
                    <p className="doctor-credentials">{doctor.credentials}</p>
                    
                    <div className="doctor-info">
                      <div className="info-item">
                        <strong>Education:</strong>
                        <span>{doctor.education}</span>
                      </div>
                      <div className="info-item">
                        <strong>Experience:</strong>
                        <span>{doctor.experience}</span>
                      </div>
                      <div className="info-item">
                        <strong>Languages:</strong>
                        <span>{doctor.languages.join(', ')}</span>
                      </div>
                    </div>

                    <div className="doctor-specializations">
                      {doctor.specializations.map((spec, index) => (
                        <span key={index} className="specialization-tag">
                          {spec}
                        </span>
                      ))}
                    </div>

                    <div className="doctor-actions">
                      <Link
                        to={`/team/${doctor.id}`}
                        className="btn btn-outline"
                      >
                        View Profile
                      </Link>
                      <Link
                        to={`/appointments/book?doctor=${doctor.id}`}
                        className="btn btn-primary"
                      >
                        Book Appointment
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="team-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Join Our Team</h2>
            <p>We're always looking for talented healthcare professionals</p>
            <Link to="/careers" className="btn btn-primary btn-lg">
              View Career Opportunities
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;