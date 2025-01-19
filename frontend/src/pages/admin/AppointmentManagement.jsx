import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import Input from '../../components/common/Input';
import AppointmentCard from '../../components/shared/AppointmentCard';
import Button from '../../components/common/Button';
// import '../../css/AppointmentManagement.css';

const AppointmentManagement = () => {
  const api = useApi();
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [view, setView] = useState('calendar'); // 'calendar' or 'list'
  const [error, setError] = useState(null);

  const appointmentTypes = [
    { id: 'all', name: 'All Types' },
    { id: 'regular', name: 'Regular Checkup' },
    { id: 'follow-up', name: 'Follow-up' },
    { id: 'consultation', name: 'Consultation' },
    { id: 'emergency', name: 'Emergency' }
  ];

  const statuses = [
    { id: 'all', name: 'All Statuses' },
    { id: 'scheduled', name: 'Scheduled' },
    { id: 'completed', name: 'Completed' },
    { id: 'cancelled', name: 'Cancelled' },
    { id: 'no-show', name: 'No Show' }
  ];

  useEffect(() => {
    fetchAppointments();
  }, [selectedDate]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/appointments', {
        params: { date: selectedDate }
      });
      setAppointments(response.data);
    } catch (err) {
      setError('Failed to fetch appointments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      await api.put(`/admin/appointments/${appointmentId}/status`, { status: newStatus });
      setAppointments(appointments.map(apt => 
        apt.id === appointmentId ? { ...apt, status: newStatus } : apt
      ));
    } catch (err) {
      console.error('Failed to update appointment status:', err);
    }
  };

  const getAppointmentStats = () => {
    return {
      total: appointments.length,
      scheduled: appointments.filter(apt => apt.status === 'scheduled').length,
      completed: appointments.filter(apt => apt.status === 'completed').length,
      cancelled: appointments.filter(apt => apt.status === 'cancelled').length,
      noShow: appointments.filter(apt => apt.status === 'no-show').length,
      virtual: appointments.filter(apt => apt.is_virtual).length
    };
  };

  const stats = getAppointmentStats();

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.patient.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.staff.user.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === 'all' || appointment.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || appointment.status === selectedStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const groupAppointmentsByTime = () => {
    return filteredAppointments.reduce((groups, apt) => {
      const time = new Date(apt.appointment_date).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      });
      if (!groups[time]) {
        groups[time] = [];
      }
      groups[time].push(apt);
      return groups;
    }, {});
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Loading appointments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>{error}</p>
        <Button onClick={fetchAppointments}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="appointment-management">
      <div className="page-header">
        <div className="header-content">
          <h1>Appointment Management</h1>
          <p>Manage and track patient appointments</p>
        </div>
        <div className="header-actions">
          <div className="view-toggles">
            <button
              className={`view-toggle ${view === 'calendar' ? 'active' : ''}`}
              onClick={() => setView('calendar')}
            >
              📅 Calendar
            </button>
            <button
              className={`view-toggle ${view === 'list' ? 'active' : ''}`}
              onClick={() => setView('list')}
            >
              📋 List
            </button>
          </div>
          <Link to="/admin/appointments/new" className="btn btn-primary">
            Schedule Appointment
          </Link>
        </div>
      </div>

      <div className="appointment-stats">
        <div className="stat-card">
          <h3>Total Appointments</h3>
          <div className="stat-value">{stats.total}</div>
        </div>
        <div className="stat-card">
          <h3>Scheduled</h3>
          <div className="stat-value">{stats.scheduled}</div>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <div className="stat-value">{stats.completed}</div>
        </div>
        <div className="stat-card">
          <h3>Virtual Sessions</h3>
          <div className="stat-value">{stats.virtual}</div>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <Input
            type="text"
            placeholder="Search appointments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            prefix="🔍"
          />
        </div>

        <div className="filters">
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="filter-select"
          >
            {appointmentTypes.map(type => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="filter-select"
          >
            {statuses.map(status => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {view === 'calendar' ? (
        <div className="appointments-calendar">
          {Object.entries(groupAppointmentsByTime()).map(([time, appointments]) => (
            <div key={time} className="time-slot">
              <div className="time-label">{time}</div>
              <div className="appointments-group">
                {appointments.map(appointment => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="appointments-list">
          {filteredAppointments.map(appointment => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onStatusChange={handleStatusChange}
              showActions={true}
            />
          ))}
          {filteredAppointments.length === 0 && (
            <div className="no-results">
              <h3>No appointments found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      )}

      {filteredAppointments.length > 0 && (
        <div className="summary-section">
          <div className="summary-card">
            <h3>Today's Summary</h3>
            <div className="summary-stats">
              <div className="summary-item">
                <span className="label">Total Appointments</span>
                <span className="value">{filteredAppointments.length}</span>
              </div>
              <div className="summary-item">
                <span className="label">Virtual Sessions</span>
                <span className="value">
                  {filteredAppointments.filter(apt => apt.is_virtual).length}
                </span>
              </div>
              <div className="summary-item">
                <span className="label">Average Duration</span>
                <span className="value">
                  {Math.round(
                    filteredAppointments.reduce((acc, apt) => acc + apt.duration, 0) /
                    filteredAppointments.length
                  )} mins
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentManagement;