//AdminDashboard.jsx
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
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Overview Stats */}
      <section className="dashboard-stats">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon patients-icon">👥</div>
            <div className="stat-info">
              <h3>Total Patients</h3>
              <div className="stat-value">{dashboardData.stats.totalPatients}</div>
              <div className="stat-change increase">+5% this month</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon staff-icon">👨‍⚕️</div>
            <div className="stat-info">
              <h3>Medical Staff</h3>
              <div className="stat-value">{dashboardData.stats.totalStaff}</div>
              <div className="stat-change">+2 new this month</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon appointments-icon">📅</div>
             <div className="stat-info">
              <h3>Total Appointments</h3>
              <div className="stat-value">{dashboardData.stats.totalAppointments}</div>
              <div className="stat-change increase">+12% this month</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon revenue-icon">💰</div>
            <div className="stat-info">
              <h3>Monthly Revenue</h3>
              <div className="stat-value">{formatCurrency(dashboardData.stats.revenue)}</div>
              <div className="stat-change increase">+8% vs last month</div>
            </div>
          </div>
        </div>
      </section>

      {/* Alerts and Notifications */}
      {dashboardData.alerts.length > 0 && (
        <section className="alerts-section">
          <div className="alerts-container">
            {dashboardData.alerts.map(alert => (
              <div key={alert.id} className={`alert-item ${alert.priority}`}>
                <span className="alert-icon">
                  {alert.priority === 'high' ? '🚨' : 
                   alert.priority === 'medium' ? '⚠️' : 'ℹ️'}
                </span>
                <div className="alert-content">
                  <h4>{alert.title}</h4>
                  <p>{alert.message}</p>
                </div>
                <button className="btn btn-sm">Acknowledge</button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main Dashboard Content */}
      <div className="dashboard-grid">
        {/* Staff Management */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2>Recently Added Staff</h2>
            <Link to="/admin/staff" className="btn btn-outline">Manage Staff</Link>
          </div>
          <div className="staff-list">
            {dashboardData.recentStaff.map(staff => (
              <div key={staff.id} className="staff-card">
                <div className="staff-avatar">
                  {staff.user.name.charAt(0)}
                </div>
                <div className="staff-info">
                  <h4>{staff.user.name}</h4>
                  <p>{staff.designation}</p>
                  <div className="staff-meta">
                    <span className="rating">⭐ {staff.rating}</span>
                    <span className="department">{staff.department}</span>
                  </div>
                </div>
                <div className="staff-actions">
                  <Link to={`/admin/staff/${staff.id}`} className="btn btn-sm">
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Appointments */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2>Upcoming Appointments</h2>
            <Link to="/admin/appointments" className="btn btn-outline">View All</Link>
          </div>
          <div className="appointments-list">
            {dashboardData.appointments.map(appointment => (
              <div key={appointment.id} className="appointment-card">
                <div className="appointment-time">
                  {new Date(appointment.appointment_date).toLocaleString()}
                </div>
                <div className="appointment-details">
                  <div className="patient-info">
                    <h4>{appointment.patient.user.name}</h4>
                    <p>with Dr. {appointment.staff.user.name}</p>
                  </div>
                  <div className="appointment-type">
                    {appointment.type}
                    {appointment.is_virtual && <span className="virtual-badge">Virtual</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Analytics Section */}
      <section className="analytics-section">
        <div className="section-header">
          <h2>Performance Analytics</h2>
          <div className="analytics-controls">
            <select defaultValue="6" className="time-range-select">
              <option value="3">Last 3 months</option>
              <option value="6">Last 6 months</option>
              <option value="12">Last 12 months</option>
            </select>
            <button className="btn btn-outline">Export Report</button>
          </div>
        </div>
        
        <div className="analytics-grid">
          {/* Patients by Department */}
          <div className="analytics-card">
            <h3>Patients by Department</h3>
            <div className="chart-container">
              <div className="department-distribution">
                {dashboardData.patientsByDepartment.map(dept => (
                  <div key={dept.department} className="distribution-item">
                    <div className="department-label">
                      <span className="dept-name">{dept.department}</span>
                      <span className="dept-count">{dept.count}</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress" 
                        style={{ width: `${(dept.count / Math.max(...dashboardData.patientsByDepartment.map(d => d.count))) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Revenue Trend */}
          <div className="analytics-card">
            <h3>Revenue Trend</h3>
            <div className="chart-container">
              <div className="revenue-trend">
                {dashboardData.revenueByMonth.map((month, index) => (
                  <div key={month.month} className="trend-bar">
                    <div 
                      className="bar"
                      style={{ 
                        height: `${(month.revenue / Math.max(...dashboardData.revenueByMonth.map(m => m.revenue))) * 100}%` 
                      }}
                    >
                      <span className="bar-value">{formatCurrency(month.revenue)}</span>
                    </div>
                    <span className="bar-label">{month.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions-section">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/admin/staff/new" className="action-card">
            <div className="action-icon">👥</div>
            <h3>Add Staff</h3>
            <p>Register new medical staff</p>
          </Link>

          <Link to="/admin/departments" className="action-card">
            <div className="action-icon">🏥</div>
            <h3>Manage Departments</h3>
            <p>Configure department settings</p>
          </Link>

          <Link to="/admin/reports" className="action-card">
            <div className="action-icon">📊</div>
            <h3>Generate Reports</h3>
            <p>Create custom analytics reports</p>
          </Link>

          <Link to="/admin/settings" className="action-card">
            <div className="action-icon">⚙️</div>
            <h3>System Settings</h3>
            <p>Configure system preferences</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;