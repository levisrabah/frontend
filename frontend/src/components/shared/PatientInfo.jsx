import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PatientInfo.css';

const PatientInfo = ({ patient, showActions = true }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return 'N/A';
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="patient-info-card">
      <div className="patient-header">
        <div className="patient-avatar">
          {patient.user.name[0].toUpperCase()}
        </div>
        <div className="patient-basic-info">
          <h2>{patient.user.name}</h2>
          <div className="patient-meta">
            <span className="meta-item">
              ID: {patient.id}
            </span>
            <span className="meta-item">
              Age: {calculateAge(patient.questionnaire?.date_of_birth)}
            </span>
            <span className="meta-item">
              Gender: {patient.questionnaire?.gender || 'N/A'}
            </span>
          </div>
        </div>
        {showActions && (
          <div className="patient-actions">
            <Link to={`/patients/${patient.id}/edit`} className="btn btn-outline">
              Edit Profile
            </Link>
            <Link to={`/appointments/new?patientId=${patient.id}`} className="btn btn-primary">
              Schedule Appointment
            </Link>
          </div>
        )}
      </div>

      <div className="patient-tabs">
        <button
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-button ${activeTab === 'medical' ? 'active' : ''}`}
          onClick={() => setActiveTab('medical')}
        >
          Medical History
        </button>
        <button
          className={`tab-button ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          Appointments
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="info-grid">
              <div className="info-section">
                <h3>Contact Information</h3>
                <div className="info-list">
                  <div className="info-item">
                    <span className="label">Email</span>
                    <span className="value">{patient.user.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Phone</span>
                    <span className="value">{patient.user.phone_number || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Address</span>
                    <span className="value">{patient.questionnaire?.address || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h3>Emergency Contact</h3>
                <div className="info-list">
                  <div className="info-item">
                    <span className="label">Name</span>
                    <span className="value">{patient.questionnaire?.emergency_contact_name || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Phone</span>
                    <span className="value">{patient.questionnaire?.emergency_contact_phone || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Relationship</span>
                    <span className="value">{patient.questionnaire?.emergency_contact_relationship || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'medical' && (
          <div className="medical-tab">
            <div className="medical-history">
              <h3>Medical Conditions</h3>
              <p>{patient.questionnaire?.medical_conditions || 'No medical conditions recorded'}</p>

              <h3>Current Medications</h3>
              <p>{patient.questionnaire?.current_medications || 'No current medications'}</p>

              <h3>Allergies</h3>
              <p>{patient.questionnaire?.allergies || 'No known allergies'}</p>

              <h3>Previous Surgeries</h3>
              <p>{patient.questionnaire?.previous_surgeries || 'No previous surgeries recorded'}</p>

              <h3>Family History</h3>
              <p>{patient.questionnaire?.family_history || 'No family history recorded'}</p>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="appointments-tab">
            {patient.appointments?.length > 0 ? (
              <div className="appointments-history">
                {patient.appointments.map(appointment => (
                  <div key={appointment.id} className="appointment-item">
                    <div className="appointment-date">
                      {formatDate(appointment.appointment_date)}
                    </div>
                    <div className="appointment-details">
                      <h4>Dr. {appointment.staff.user.name}</h4>
                      <p>{appointment.type}</p>
                      <span className={`status ${appointment.status}`}>
                        {appointment.status}
                      </span>
                    </div>
                    <Link
                      to={`/appointments/${appointment.id}`}
                      className="btn btn-outline btn-sm"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">No appointment history available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientInfo;