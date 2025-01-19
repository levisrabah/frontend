import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import '../../css/AppointmentCard.css';

const AppointmentCard = ({ 
  appointment, 
  onStatusChange,
  showActions = true
}) => {
  const { user } = useAuth();
  const isStaff = user?.role === 'staff';
  const isPatient = user?.role === 'patient';

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'status-scheduled';
      case 'completed':
        return 'status-completed';
      case 'cancelled':
        return 'status-cancelled';
      case 'no-show':
        return 'status-no-show';
      default:
        return '';
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  };

  const { date, time } = formatDateTime(appointment.appointment_date);

  return (
    <div className="appointment-card">
      <div className="appointment-time">
        <div className="date">{date}</div>
        <div className="time">{time}</div>
      </div>

      <div className="appointment-details">
        {isStaff ? (
          <div className="patient-info">
            <h4>{appointment.patient.user.name}</h4>
            <p>{appointment.patient.user.email}</p>
          </div>
        ) : (
          <div className="doctor-info">
            <h4>Dr. {appointment.staff.user.name}</h4>
            <p>{appointment.staff.specialization}</p>
          </div>
        )}

        <div className="appointment-meta">
          <span className={`appointment-status ${getStatusColor(appointment.status)}`}>
            {appointment.status}
          </span>
          {appointment.is_virtual && (
            <span className="virtual-badge">
              Virtual
            </span>
          )}
          <span className="appointment-type">
            {appointment.type}
          </span>
        </div>

        {appointment.notes && (
          <p className="appointment-notes">{appointment.notes}</p>
        )}
      </div>

      {showActions && (
        <div className="appointment-actions">
          {isStaff && onStatusChange && (
            <select
              value={appointment.status}
              onChange={(e) => onStatusChange(appointment.id, e.target.value)}
              className="status-select"
            >
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="no-show">No Show</option>
            </select>
          )}

          {appointment.is_virtual && appointment.status === 'scheduled' && (
            <Link 
              to={`/virtual-meeting/${appointment.id}`}
              className="btn btn-primary"
            >
              Join Meeting
            </Link>
          )}

          <Link
            to={`/appointments/${appointment.id}`}
            className="btn btn-outline"
          >
            View Details
          </Link>

          {isPatient && appointment.status === 'scheduled' && (
            <button
              onClick={() => onStatusChange(appointment.id, 'cancelled')}
              className="btn btn-danger"
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AppointmentCard;