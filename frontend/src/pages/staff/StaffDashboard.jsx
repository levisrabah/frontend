//StaffDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './StaffDashboard.css';

const StaffDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    todayAppointments: [],
    patients: [],
    pendingRequests: [],
    recentVisits: [],
    notifications: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        const [
          appointmentsRes,
          patientsRes,
          requestsRes,
          visitsRes,
          notificationsRes
        ] = await Promise.all([
          fetch('/api/staff/appointments/today', { headers }),
          fetch('/api/staff/patients', { headers }),
          fetch('/api/staff/requests/pending', { headers }),
          fetch('/api/staff/visits/recent', { headers }),
          fetch('/api/notifications', { headers })
        ]);

        const [
          todayAppointments,
          patients,
          pendingRequests,
          recentVisits,
          notifications
        ] = await Promise.all([
          appointmentsRes.json(),
          patientsRes.json(),
          requestsRes.json(),
          visitsRes.json(),
          notificationsRes.json()
        ]);

        setDashboardData({
          todayAppointments,
          patients,
          pendingRequests,
          recentVisits,
          notifications
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        // Handle error state
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleAppointmentStatusChange = async (appointmentId, newStatus) => {
    try {
      const response = await fetch(`/api/appointments/${appointmentId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        // Update local state
        setDashboardData(prev => ({
          ...prev,
          todayAppointments: prev.todayAppointments.map(apt =>
            apt.id === appointmentId ? { ...apt, status: newStatus } : apt
          )
        }));
      }
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="staff-dashboard">
      {/* Stats Overview */}
      <section className="dashboard-stats">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon appointments-icon">📅</div>
            <div className="stat-info">
              <h3>Today's Appointments</h3>
              <div className="stat-value">{dashboardData.todayAppointments.length}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon patients-icon">👥</div>
            <div className="stat-info">
              <h3>Total Patients</h3>
              <div className="stat-value">{dashboardData.patients.length}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon requests-icon">📨</div>
            <div className="stat-info">
              <h3>Pending Requests</h3>
              <div className="stat-value">{dashboardData.pendingRequests.length}</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon visits-icon">🏥</div>
            <div className="stat-info">
              <h3>Recent Visits</h3>
              <div className="stat-value">{dashboardData.recentVisits.length}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Appointments */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2>Today's Appointments</h2>
          <Link to="/staff/appointments" className="btn btn-outline">
            View All Appointments
          </Link>
        </div>
        <div className="appointments-list">
          {dashboardData.todayAppointments.length > 0 ? (
            dashboardData.todayAppointments.map(appointment => (
              <div key={appointment.id} className="appointment-card">
                <div className="appointment-time">
                  {new Date(appointment.appointment_date).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                <div className="appointment-info">
                  <h4>{appointment.patient.user.name}</h4>
                  <p className="appointment-type">{appointment.type}</p>
                  <div className={`appointment-status ${appointment.status}`}>
                    {appointment.status}
                  </div>
                </div>
                <div className="appointment-actions">
                  <select
                    value={appointment.status}
                    onChange={(e) => handleAppointmentStatusChange(appointment.id, e.target.value)}
                    className="status-select"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="no-show">No Show</option>
                  </select>
                  <Link
                    to={`/staff/patients/${appointment.patient_id}`}
                    className="btn btn-outline btn-sm"
                  >
                    View Patient
                  </Link>
                  {appointment.is_virtual && (
                    <Link
                      to={`/virtual-meeting/${appointment.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Join Meeting
                    </Link>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="no-data">No appointments scheduled for today</div>
          )}
        </div>
      </section>

      {/* Recent Activity */}
      <div className="dashboard-grid">
        {/* Pending Requests */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2>Pending Requests</h2>
            <Link to="/staff/requests" className="btn btn-outline">
              View All
            </Link>
          </div>
          <div className="requests-list">
            {dashboardData.pendingRequests.length > 0 ? (
              dashboardData.pendingRequests.map(request => (
                <div key={request.id} className="request-card">
                  <div className="request-type-icon">
                    {request.type === 'prescription' ? '💊' :
                     request.type === 'appointment' ? '📅' :
                     request.type === 'referral' ? '📋' : '📝'}
                  </div>
                  <div className="request-info">
                    <h4>{request.patient.user.name}</h4>
                    <p>{request.description}</p>
                    <span className="request-date">
                      {new Date(request.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="request-actions">
                    <button className="btn btn-primary btn-sm">
                      Review
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-data">No pending requests</div>
            )}
          </div>
        </section>

        {/* Recent Visits */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2>Recent Visits</h2>
            <Link to="/staff/visits" className="btn btn-outline">
              View All
            </Link>
          </div>
          <div className="visits-list">
            {dashboardData.recentVisits.length > 0 ? (
              dashboardData.recentVisits.map(visit => (
                <div key={visit.id} className="visit-card">
                  <div className="visit-date">
                    {new Date(visit.visit_date).toLocaleDateString()}
                  </div>
                  <div className="visit-info">
                    <h4>{visit.patient.user.name}</h4>
                    <p className="visit-type">{visit.consultation_type}</p>
                    <p className="visit-diagnosis">{visit.diagnosis}</p>
                  </div>
                  <div className="visit-actions">
                    <Link
                      to={`/staff/visits/${visit.id}`}
                      className="btn btn-outline btn-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-data">No recent visits</div>
            )}
          </div>
        </section>
      </div>

      {/* Quick Actions */}
      <section className="dashboard-section">
        <h2>Quick Actions</h2>
        <div className="quick-actions">
          <Link to="/staff/appointments/new" className="action-card">
            <div className="action-icon">📅</div>
            <h3>New Appointment</h3>
            <p>Schedule an appointment</p>
          </Link>

          <Link to="/staff/patients/new" className="action-card">
            <div className="action-icon">👤</div>
            <h3>Add Patient</h3>
            <p>Register new patient</p>
          </Link>

          <Link to="/staff/prescriptions/new" className="action-card">
            <div className="action-icon">💊</div>
            <h3>Write Prescription</h3>
            <p>Create new prescription</p>
          </Link>

          <Link to="/staff/visits/new" className="action-card">
            <div className="action-icon">📝</div>
            <h3>Record Visit</h3>
            <p>Document patient visit</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default StaffDashboard;