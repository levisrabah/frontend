import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './StaffInfo.css';

const StaffInfo = ({ staff, showActions = true }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const calculateExperience = (joiningDate) => {
    if (!joiningDate) return 'N/A';
    const start = new Date(joiningDate);
    const now = new Date();
    const years = now.getFullYear() - start.getFullYear();
    const months = now.getMonth() - start.getMonth();
    const totalMonths = years * 12 + months;
    
    if (totalMonths < 12) {
      return `${totalMonths} months`;
    }
    return `${Math.floor(totalMonths / 12)} years`;
  };

  const formatAvailability = (schedule) => {
    if (!schedule) return [];
    return Object.entries(schedule).map(([day, hours]) => ({
      day,
      hours: typeof hours === 'string' ? hours : 'Unavailable'
    }));
  };

  return (
    <div className="staff-info-card">
      <div className="staff-header">
        <div className="staff-avatar">
          {staff.user.name[0].toUpperCase()}
        </div>
        <div className="staff-basic-info">
          <h2>Dr. {staff.user.name}</h2>
          <div className="staff-meta">
            <span className="meta-item">
              ID: {staff.id}
            </span>
            <span className="meta-item">
              {staff.designation}
            </span>
            <span className="meta-item rating">
              ⭐ {staff.rating.toFixed(1)}
            </span>
          </div>
        </div>
        {showActions && (
          <div className="staff-actions">
            <Link to={`/staff/${staff.id}/edit`} className="btn btn-outline">
              Edit Profile
            </Link>
            <Link to={`/staff/${staff.id}/schedule`} className="btn btn-primary">
              Manage Schedule
            </Link>
          </div>
        )}
      </div>

      <div className="staff-tabs">
        <button
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-button ${activeTab === 'schedule' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedule')}
        >
          Schedule
        </button>
        <button
          className={`tab-button ${activeTab === 'patients' ? 'active' : ''}`}
          onClick={() => setActiveTab('patients')}
        >
          Patients
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
                    <span className="value">{staff.user.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Phone</span>
                    <span className="value">{staff.user.phone_number || 'N/A'}</span>
                  </div>
                  <div className="info-item">
                    <span className="label">Experience</span>
                    <span className="value">{calculateExperience(staff.joining_date)}</span>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h3>Specializations</h3>
                <div className="specializations-list">
                  {staff.specializations?.map((spec, index) => (
                    <span key={index} className="specialization-tag">
                      {spec}
                    </span>
                  )) || <p>No specializations listed</p>}
                </div>
              </div>
            </div>

            <div className="info-section mt-6">
              <h3>Professional Summary</h3>
              <p className="professional-summary">
                {staff.professional_summary || 'No professional summary available'}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="schedule-tab">
            <div className="availability-grid">
              {formatAvailability(staff.schedule).map(({ day, hours }) => (
                <div key={day} className="availability-item">
                  <div className="day">{day}</div>
                  <div className="hours">{hours}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'patients' && (
          <div className="patients-tab">
            {staff.recent_patients?.length > 0 ? (
              <div className="recent-patients">
                {staff.recent_patients.map(patient => (
                  <div key={patient.id} className="patient-item">
                    <div className="patient-brief">
                      <h4>{patient.user.name}</h4>
                      <p>Last Visit: {new Date(patient.last_visit_date).toLocaleDateString()}</p>
                    </div>
                    <Link
                      to={`/patients/${patient.id}`}
                      className="btn btn-outline btn-sm"
                    >
                      View Patient
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">No recent patients</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffInfo;