import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css/AdminDashboard.css';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalPatients: 0,
      totalStaff: 0,
      totalAppointments: 0,
      revenue: 0
    },
    recentStaff: [],
    appointments: [],
    patientsByDepartment: [],
    revenueByMonth: [],
    alerts: []
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
          statsRes,
          staffRes,
          appointmentsRes,
          analyticsRes,
          alertsRes
        ] = await Promise.all([
          fetch('/api/admin/stats', { headers }),
          fetch('/api/admin/staff/recent', { headers }),
          fetch('/api/admin/appointments/upcoming', { headers }),
          fetch('/api/admin/analytics', { headers }),
          fetch('/api/admin/alerts', { headers })
        ]);

        const [
          stats,
          recentStaff,
          appointments,
          analytics,
          alerts
        ] = await Promise.all([
          statsRes.json(),
          staffRes.json(),
          appointmentsRes.json(),
          analyticsRes.json(),
          alertsRes.json()
        ]);

        setDashboardData({
          stats,
          recentStaff,
          appointments,
          patientsByDepartment: analytics.patientsByDepartment,
          revenueByMonth: analytics.revenueByMonth,
          alerts
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="adm-loading">
        <div className="adm-loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="adm-dashboard">
      {/* Stats Overview */}
      <section className="adm-stats">
        <div className="adm-stats-grid">
          <div className="adm-stat-card">
            <div className="adm-stat-icon adm-patients-icon">👥</div>
            <div className="adm-stat-info">
              <h3>Total Patients</h3>
              <div className="adm-stat-value">{dashboardData.stats.totalPatients}</div>
              <div className="adm-stat-change adm-increase">+5% this month</div>
            </div>
          </div>

          <div className="adm-stat-card">
            <div className="adm-stat-icon adm-staff-icon">👨‍⚕️</div>
            <div className="adm-stat-info">
              <h3>Medical Staff</h3>
              <div className="adm-stat-value">{dashboardData.stats.totalStaff}</div>
              <div className="adm-stat-change">+2 new this month</div>
            </div>
          </div>

          <div className="adm-stat-card">
            <div className="adm-stat-icon adm-appointments-icon">📅</div>
            <div className="adm-stat-info">
              <h3>Total Appointments</h3>
              <div className="adm-stat-value">{dashboardData.stats.totalAppointments}</div>
              <div className="adm-stat-change adm-increase">+12% this month</div>
            </div>
          </div>

          <div className="adm-stat-card">
            <div className="adm-stat-icon adm-revenue-icon">💰</div>
            <div className="adm-stat-info">
              <h3>Monthly Revenue</h3>
              <div className="adm-stat-value">{formatCurrency(dashboardData.stats.revenue)}</div>
              <div className="adm-stat-change adm-increase">+8% vs last month</div>
            </div>
          </div>
        </div>
      </section>

      {/* Alerts Section */}
      {dashboardData.alerts.length > 0 && (
        <section className="adm-alerts">
          <div className="adm-alerts-container">
            {dashboardData.alerts.map(alert => (
              <div key={alert.id} className={`adm-alert-item adm-${alert.priority}`}>
                <span className="adm-alert-icon">
                  {alert.priority === 'high' ? '🚨' : 
                   alert.priority === 'medium' ? '⚠️' : 'ℹ️'}
                </span>
                <div className="adm-alert-content">
                  <h4>{alert.title}</h4>
                  <p>{alert.message}</p>
                </div>
                <button className="btn btn-sm">Acknowledge</button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Dashboard Grid */}
      <div className="adm-dashboard-grid">
        {/* Staff Section */}
        <section className="adm-section">
          <div className="adm-section-header">
            <h2>Recently Added Staff</h2>
            <Link to="/admin/staff" className="btn btn-outline">Manage Staff</Link>
          </div>
          <div className="adm-staff-list">
            {dashboardData.recentStaff.map(staff => (
              <div key={staff.id} className="adm-staff-card">
                <div className="adm-staff-avatar">
                  {staff.user.name.charAt(0)}
                </div>
                <div className="adm-staff-info">
                  <h4>{staff.user.name}</h4>
                  <p>{staff.designation}</p>
                  <div className="adm-staff-meta">
                    <span className="adm-rating">⭐ {staff.rating}</span>
                    <span className="adm-department">{staff.department}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Appointments Section */}
        <section className="adm-section">
          <div className="adm-section-header">
            <h2>Upcoming Appointments</h2>
            <Link to="/admin/appointments" className="btn btn-outline">View All</Link>
          </div>
          <div className="adm-appointments-list">
            {dashboardData.appointments.map(appointment => (
              <div key={appointment.id} className="adm-appointment-card">
                <div className="adm-appointment-time">
                  {new Date(appointment.appointment_date).toLocaleString()}
                </div>
                <div className="adm-appointment-details">
                  <div className="adm-patient-info">
                    <h4>{appointment.patient.user.name}</h4>
                    <p>with Dr. {appointment.staff.user.name}</p>
                  </div>
                  <div className="adm-appointment-type">
                    {appointment.type}
                    {appointment.is_virtual && 
                      <span className="adm-virtual-badge">Virtual</span>
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Analytics Section */}
      <section className="adm-analytics">
        <div className="adm-section-header">
          <h2>Performance Analytics</h2>
          <div className="adm-analytics-controls">
            <select defaultValue="6" className="adm-time-select">
              <option value="3">Last 3 months</option>
              <option value="6">Last 6 months</option>
              <option value="12">Last 12 months</option>
            </select>
            <button className="btn btn-outline">Export Report</button>
          </div>
        </div>

        <div className="adm-analytics-grid">
          {/* Department Distribution */}
          <div className="adm-analytics-card">
            <h3>Patients by Department</h3>
            <div className="adm-chart-container">
              <div className="adm-dept-distribution">
                {dashboardData.patientsByDepartment.map(dept => (
                  <div key={dept.department} className="adm-dept-item">
                    <div className="adm-dept-label">
                      <span className="adm-dept-name">{dept.department}</span>
                      <span className="adm-dept-count">{dept.count}</span>
                    </div>
                    <div className="adm-progress-bar">
                      <div 
                        className="adm-progress" 
                        style={{ 
                          width: `${(dept.count / Math.max(
                            ...dashboardData.patientsByDepartment.map(d => d.count)
                          )) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="adm-analytics-card">
            <h3>Revenue Trend</h3>
            <div className="adm-chart-container">
              <div className="adm-revenue-trend">
                {dashboardData.revenueByMonth.map(month => (
                  <div key={month.month} className="adm-trend-bar">
                    <div 
                      className="adm-bar"
                      style={{ 
                        height: `${(month.revenue / Math.max(
                          ...dashboardData.revenueByMonth.map(m => m.revenue)
                        )) * 100}%` 
                      }}
                    >
                      <span className="adm-bar-value">
                        {formatCurrency(month.revenue)}
                      </span>
                    </div>
                    <span className="adm-bar-label">{month.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="adm-quick-actions">
        <h2>Quick Actions</h2>
        <div className="adm-actions-grid">
          <Link to="/admin/staff/new" className="adm-action-card">
            <div className="adm-action-icon">👥</div>
            <h3>Add Staff</h3>
            <p>Register new medical staff</p>
          </Link>

          <Link to="/admin/departments" className="adm-action-card">
            <div className="adm-action-icon">🏥</div>
            <h3>Manage Departments</h3>
            <p>Configure department settings</p>
          </Link>

          <Link to="/admin/reports" className="adm-action-card">
            <div className="adm-action-icon">📊</div>
            <h3>Generate Reports</h3>
            <p>Create custom analytics reports</p>
          </Link>

          <Link to="/admin/settings" className="adm-action-card">
            <div className="adm-action-icon">⚙️</div>
            <h3>System Settings</h3>
            <p>Configure system preferences</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;