import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css/StaffDashboard.css';

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
      <div className="stf-loading">
        <div className="stf-loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="stf-dashboard">
      {/* Stats Overview */}
      <section className="stf-stats">
        <div className="stf-stats-grid">
          <div className="stf-stat-card">
            <div className="stf-stat-icon stf-appointments-icon">📅</div>
            <div className="stf-stat-info">
              <h3>Today's Appointments</h3>
              <div className="stf-stat-value">{dashboardData.todayAppointments.length}</div>
            </div>
          </div>

          <div className="stf-stat-card">
            <div className="stf-stat-icon stf-patients-icon">👥</div>
            <div className="stf-stat-info">
              <h3>Total Patients</h3>
              <div className="stf-stat-value">{dashboardData.patients.length}</div>
            </div>
          </div>

          <div className="stf-stat-card">
            <div className="stf-stat-icon stf-requests-icon">📨</div>
            <div className="stf-stat-info">
              <h3>Pending Requests</h3>
              <div className="stf-stat-value">{dashboardData.pendingRequests.length}</div>
            </div>
          </div>

          <div className="stf-stat-card">
            <div className="stf-stat-icon stf-visits-icon">🏥</div>
            <div className="stf-stat-info">
              <h3>Recent Visits</h3>
              <div className="stf-stat-value">{dashboardData.recentVisits.length}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Appointments */}
      <section className="stf-section">
        <div className="stf-section-header">
          <h2>Today's Appointments</h2>
          <Link to="/staff/appointments" className="btn btn-outline">
            View All Appointments
          </Link>
        </div>
        <div className="stf-appointments-list">
          {dashboardData.todayAppointments.length > 0 ? (
            dashboardData.todayAppointments.map(appointment => (
              <div key={appointment.id} className="stf-appointment-card">
                <div className="stf-appointment-time">
                  {new Date(appointment.appointment_date).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                <div className="stf-appointment-info">
                  <h4>{appointment.patient.user.name}</h4>
                  <p className="stf-appointment-type">{appointment.type}</p>
                  <div className={`stf-appointment-status ${appointment.status}`}>
                    {appointment.status}
                  </div>
                </div>
                <div className="stf-appointment-actions">
                  <select
                    value={appointment.status}
                    onChange={(e) => handleAppointmentStatusChange(appointment.id, e.target.value)}
                    className="stf-status-select"
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
            <div className="stf-no-data">No appointments scheduled for today</div>
          )}
        </div>
      </section>

      {/* Recent Activity */}
      <div className="stf-dashboard-grid">
        {/* Pending Requests */}
        <section className="stf-section">
          <div className="stf-section-header">
            <h2>Pending Requests</h2>
            <Link to="/staff/requests" className="btn btn-outline">View All</Link>
          </div>
          <div className="stf-requests-list">
            {dashboardData.pendingRequests.length > 0 ? (
              dashboardData.pendingRequests.map(request => (
                <div key={request.id} className="stf-request-card">
                  <div className="stf-request-icon">
                    {request.type === 'prescription' ? '💊' :
                     request.type === 'appointment' ? '📅' :
                     request.type === 'referral' ? '📋' : '📝'}
                  </div>
                  <div className="stf-request-info">
                    <h4>{request.patient.user.name}</h4>
                    <p>{request.description}</p>
                    <span className="stf-request-date">
                      {new Date(request.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="stf-request-actions">
                    <button className="btn btn-primary btn-sm">Review</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="stf-no-data">No pending requests</div>
            )}
          </div>
        </section>

        {/* Recent Visits */}
        <section className="stf-section">
          <div className="stf-section-header">
            <h2>Recent Visits</h2>
            <Link to="/staff/visits" className="btn btn-outline">View All</Link>
          </div>
          <div className="stf-visits-list">
            {dashboardData.recentVisits.length > 0 ? (
              dashboardData.recentVisits.map(visit => (
                <div key={visit.id} className="stf-visit-card">
                  <div className="stf-visit-date">
                    {new Date(visit.visit_date).toLocaleDateString()}
                  </div>
                  <div className="stf-visit-info">
                    <h4>{visit.patient.user.name}</h4>
                    <p className="stf-visit-type">{visit.consultation_type}</p>
                    <p className="stf-visit-diagnosis">{visit.diagnosis}</p>
                  </div>
                  <div className="stf-visit-actions">
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
              <div className="stf-no-data">No recent visits</div>
            )}
          </div>
        </section>
      </div>

      {/* Quick Actions */}
      <section className="stf-quick-actions">
        <h2>Quick Actions</h2>
        <div className="stf-actions-grid">
          <Link to="/staff/appointments/new" className="stf-action-card">
            <div className="stf-action-icon">📅</div>
            <h3>New Appointment</h3>
            <p>Schedule an appointment</p>
          </Link>

          <Link to="/staff/patients/new" className="stf-action-card">
            <div className="stf-action-icon">👤</div>
            <h3>Add Patient</h3>
            <p>Register new patient</p>
          </Link>

          <Link to="/staff/prescriptions/new" className="stf-action-card">
            <div className="stf-action-icon">💊</div>
            <h3>Write Prescription</h3>
            <p>Create new prescription</p>
          </Link>

          <Link to="/staff/visits/new" className="stf-action-card">
            <div className="stf-action-icon">📝</div>
            <h3>Record Visit</h3>
            <p>Document patient visit</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default StaffDashboard;