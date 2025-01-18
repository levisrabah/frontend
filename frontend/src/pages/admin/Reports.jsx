import React, { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import './Reports.css';

const Reports = () => {
  const api = useApi();
  const [loading, setLoading] = useState(true);
  const [reportsData, setReportsData] = useState({
    revenue: [],
    appointments: [],
    patientStats: {},
    staffPerformance: [],
    departmentStats: []
  });
  const [timeRange, setTimeRange] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReportsData();
  }, [timeRange]);

  const fetchReportsData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/reports', {
        params: { timeRange }
      });
      setReportsData(response.data);
    } catch (err) {
      setError('Failed to fetch reports data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const calculateGrowth = (current, previous) => {
    if (!previous) return 0;
    return ((current - previous) / previous) * 100;
  };

  const renderOverviewReport = () => {
    const currentRevenue = reportsData.revenue[reportsData.revenue.length - 1]?.total || 0;
    const previousRevenue = reportsData.revenue[reportsData.revenue.length - 2]?.total || 0;
    const revenueGrowth = calculateGrowth(currentRevenue, previousRevenue);

    return (
      <div className="report-section">
        <h2>Overview Report</h2>
        <div className="overview-metrics">
          <div className="metric-card">
            <h3>Revenue</h3>
            <div className="metric-value">{formatCurrency(currentRevenue)}</div>
            <div className={`metric-change ${revenueGrowth >= 0 ? 'positive' : 'negative'}`}>
              {revenueGrowth.toFixed(1)}% vs last period
            </div>
          </div>

          <div className="metric-card">
            <h3>New Patients</h3>
            <div className="metric-value">{reportsData.patientStats.newPatients || 0}</div>
            <div className="metric-label">this {timeRange}</div>
          </div>

          <div className="metric-card">
            <h3>Appointment Completion Rate</h3>
            <div className="metric-value">
              {reportsData.patientStats.appointmentCompletionRate?.toFixed(1) || 0}%
            </div>
            <div className="metric-label">average</div>
          </div>

          <div className="metric-card">
            <h3>Patient Satisfaction</h3>
            <div className="metric-value">
              {reportsData.patientStats.satisfactionScore?.toFixed(1) || 0}
            </div>
            <div className="metric-label">out of 5</div>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h3>Revenue Trend</h3>
            <div className="chart-container">
              <div className="revenue-chart">
                {reportsData.revenue.map((item, index) => (
                  <div key={index} className="chart-bar">
                    <div 
                      className="bar"
                      style={{ 
                        height: `${(item.total / Math.max(...reportsData.revenue.map(r => r.total))) * 100}%`
                      }}
                    >
                      <span className="bar-value">{formatCurrency(item.total)}</span>
                    </div>
                    <span className="bar-label">{item.period}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>

          <div className="chart-card">
            <h3>Department Performance</h3>
            <div className="chart-container">
              <div className="department-stats">
                {reportsData.departmentStats.map((dept, index) => (
                  <div key={index} className="dept-stat-row">
                    <div className="dept-info">
                        <span className="dept-name">{dept.name}</span>
                        <span className="dept-count">{dept.appointmentsCount} appointments</span>
                      </div>
                      <div className="dept-bar-container">
                        <div 
                          className="dept-bar"
                          style={{ 
                            width: `${(dept.appointmentsCount / Math.max(...reportsData.departmentStats.map(d => d.appointmentsCount))) * 100}%`
                          }}
                        ></div>
                      </div>
                      <span className="dept-revenue">{formatCurrency(dept.revenue)}</span>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    );
  };

  const renderStaffReport = () => {
    return (
      <div className="report-section">
        <h2>Staff Performance Report</h2>
        <div className="staff-performance-grid">
          {reportsData.staffPerformance.map((staff, index) => (
            <div key={index} className="staff-performance-card">
              <div className="staff-header">
                <div className="staff-avatar">
                  {staff.name[0].toUpperCase()}
                </div>
                <div className="staff-info">
                  <h4>Dr. {staff.name}</h4>
                  <p>{staff.department}</p>
                </div>
                <div className="performance-rating">
                  {staff.rating.toFixed(1)} ⭐
                </div>
              </div>
              <div className="performance-metrics">
                <div className="metric">
                  <span className="label">Appointments</span>
                  <span className="value">{staff.appointmentsCount}</span>
                </div>
                <div className="metric">
                  <span className="label">Completion Rate</span>
                  <span className="value">{staff.completionRate}%</span>
                </div>
                <div className="metric">
                  <span className="label">Patient Satisfaction</span>
                  <span className="value">{staff.patientSatisfaction.toFixed(1)}/5</span>
                </div>
                <div className="metric">
                  <span className="label">Revenue Generated</span>
                  <span className="value">{formatCurrency(staff.revenue)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAppointmentsReport = () => {
    const appointmentStats = reportsData.appointments.reduce((acc, curr) => {
      acc.total += curr.count;
      acc[curr.type] = (acc[curr.type] || 0) + curr.count;
      return acc;
    }, { total: 0 });

    return (
      <div className="report-section">
        <h2>Appointments Analysis</h2>
        <div className="appointments-analysis">
          <div className="analysis-grid">
            <div className="analysis-card">
              <h3>Appointment Distribution</h3>
              <div className="pie-chart-container">
                {Object.entries(appointmentStats).map(([type, count], index) => {
                  if (type === 'total') return null;
                  const percentage = (count / appointmentStats.total) * 100;
                  return (
                    <div key={type} className="pie-segment">
                      <div className="segment-label">
                        <span className="type">{type}</span>
                        <span className="count">{count}</span>
                        <span className="percentage">({percentage.toFixed(1)}%)</span>
                      </div>
                      <div className="segment-bar" style={{ width: `${percentage}%` }}></div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="analysis-card">
              <h3>Time Slot Analysis</h3>
              <div className="time-slots-grid">
                {reportsData.appointments.timeSlots?.map((slot, index) => (
                  <div key={index} className="time-slot-card">
                    <div className="slot-time">{slot.time}</div>
                    <div className="slot-stats">
                      <div className="slot-usage">
                        <div 
                          className="usage-bar"
                          style={{ width: `${(slot.usage / 100) * 100}%` }}
                        ></div>
                        <span className="usage-label">{slot.usage}% utilization</span>
                      </div>
                      <div className="slot-metrics">
                        <span>Avg. Duration: {slot.avgDuration} mins</span>
                        <span>No-show Rate: {slot.noShowRate}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Generating reports...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>{error}</p>
        <button onClick={fetchReportsData} className="btn btn-primary">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="reports-page">
      <div className="reports-header">
        <div className="header-content">
          <h1>Analytics & Reports</h1>
          <p>Comprehensive insights and performance metrics</p>
        </div>
        <div className="header-controls">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-range-select"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <button className="btn btn-primary">
            Export Report
          </button>
        </div>
      </div>

      <div className="reports-navigation">
        <button
          className={`nav-button ${selectedReport === 'overview' ? 'active' : ''}`}
          onClick={() => setSelectedReport('overview')}
        >
          Overview
        </button>
        <button
          className={`nav-button ${selectedReport === 'staff' ? 'active' : ''}`}
          onClick={() => setSelectedReport('staff')}
        >
          Staff Performance
        </button>
        <button
          className={`nav-button ${selectedReport === 'appointments' ? 'active' : ''}`}
          onClick={() => setSelectedReport('appointments')}
        >
          Appointments Analysis
        </button>
      </div>

      <div className="report-content">
        {selectedReport === 'overview' && renderOverviewReport()}
        {selectedReport === 'staff' && renderStaffReport()}
        {selectedReport === 'appointments' && renderAppointmentsReport()}
      </div>
    </div>
  );
};

export default Reports;