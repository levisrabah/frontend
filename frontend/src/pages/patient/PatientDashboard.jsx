import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css/PatientDashboard.css';

const PatientDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    appointments: [],
    prescriptions: [],
    medicalHistory: [],
    notifications: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          appointmentsRes,
          prescriptionsRes,
          medicalHistoryRes,
          notificationsRes
        ] = await Promise.all([
          fetch('/api/appointments', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }),
          fetch('/api/prescriptions', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }),
          fetch('/api/medical-history', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }),
          fetch('/api/notifications', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
        ]);

        const [
          appointments,
          prescriptions,
          medicalHistory,
          notifications
        ] = await Promise.all([
          appointmentsRes.json(),
          prescriptionsRes.json(),
          medicalHistoryRes.json(),
          notificationsRes.json()
        ]);

        setDashboardData({
          appointments,
          prescriptions,
          medicalHistory,
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

  const getUpcomingAppointments = () => {
    return dashboardData.appointments
      .filter(apt => new Date(apt.appointment_date) > new Date())
      .sort((a, b) => new Date(a.appointment_date) - new Date(b.appointment_date))
      .slice(0, 3);
  };

  const getRecentPrescriptions = () => {
    return dashboardData.prescriptions
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 3);
  };

  if (loading) {
    return (
      <div className="pat-loading">
        <div className="pat-loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="pat-dashboard">
      {/* Overview Section */}
      <section className="pat-overview">
        <div className="pat-overview-grid">
          <div className="pat-overview-card">
            <h3>Next Appointment</h3>
            {getUpcomingAppointments()[0] ? (
              <div className="pat-next-appointment">
                <div className="pat-appointment-date">
                  {new Date(getUpcomingAppointments()[0].appointment_date).toLocaleDateString()}
                </div>
                <div className="pat-appointment-time">
                  {new Date(getUpcomingAppointments()[0].appointment_date).toLocaleTimeString()}
                </div>
                <div className="pat-appointment-type">
                  {getUpcomingAppointments()[0].type}
                </div>
              </div>
            ) : (
              <p>No upcoming appointments</p>
            )}
            <Link to="/appointments/book" className="btn btn-primary">
              Schedule Appointment
            </Link>
          </div>

          <div className="pat-overview-card">
            <h3>Recent Prescriptions</h3>
            {getRecentPrescriptions().length > 0 ? (
              <ul className="pat-prescription-list">
                {getRecentPrescriptions().map(prescription => (
                  <li key={prescription.id} className="pat-prescription-item">
                    <div className="pat-prescription-info">
                      <strong>{prescription.medicine_name}</strong>
                      <span>{prescription.dosage}</span>
                    </div>
                    <div className="pat-prescription-date">
                      {new Date(prescription.created_at).toLocaleDateString()}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recent prescriptions</p>
            )}
            <Link to="/prescriptions" className="btn btn-outline">
              View All Prescriptions
            </Link>
          </div>

          <div className="pat-overview-card">
            <h3>Recent Activity</h3>
            {dashboardData.notifications.length > 0 ? (
              <ul className="pat-notification-list">
                {dashboardData.notifications.slice(0, 3).map(notification => (
                  <li key={notification.id} className="pat-notification-item">
                    <div className="pat-notification-icon">
                      {notification.type === 'appointment' ? '📅' :
                       notification.type === 'result' ? '📋' :
                       notification.type === 'reminder' ? '⏰' : '📢'}
                    </div>
                    <div className="pat-notification-content">
                      <p>{notification.message}</p>
                      <span className="pat-notification-time">
                        {new Date(notification.created_at).toLocaleString()}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recent notifications</p>
            )}
            <Link to="/notifications" className="btn btn-outline">
              View All Notifications
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="pat-actions">
        <h3>Quick Actions</h3>
        <div className="pat-actions-grid">
          <Link to="/appointments/book" className="pat-action-card">
            <div className="pat-action-icon">📅</div>
            <h4>Book Appointment</h4>
            <p>Schedule a visit with your healthcare provider</p>
          </Link>

          <Link to="/virtual-consultation" className="pat-action-card">
            <div className="pat-action-icon">💻</div>
            <h4>Virtual Consultation</h4>
            <p>Connect with a doctor online</p>
          </Link>

          <Link to="/prescriptions/refill" className="pat-action-card">
            <div className="pat-action-icon">💊</div>
            <h4>Request Refill</h4>
            <p>Request prescription refills online</p>
          </Link>

          <Link to="/messages" className="pat-action-card">
            <div className="pat-action-icon">✉️</div>
            <h4>Message Doctor</h4>
            <p>Send a message to your healthcare team</p>
          </Link>
        </div>
      </section>

      {/* Medical Records Section */}
      <section className="pat-records">
        <div className="pat-section-header">
          <h3>Medical Records</h3>
          <Link to="/medical-records" className="btn btn-outline">
            View All Records
          </Link>
        </div>
        <div className="pat-records-timeline">
          {dashboardData.medicalHistory.length > 0 ? (
            dashboardData.medicalHistory.map(record => (
              <div key={record.id} className="pat-timeline-item">
                <div className="pat-timeline-date">
                  {new Date(record.diagnosis_date).toLocaleDateString()}
                </div>
                <div className="pat-timeline-content">
                  <h4>{record.condition_name}</h4>
                  <p className="pat-record-status">Status: {record.status}</p>
                  {record.notes && <p className="pat-record-notes">{record.notes}</p>}
                </div>
              </div>
            ))
          ) : (
            <p>No medical history records available</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default PatientDashboard;