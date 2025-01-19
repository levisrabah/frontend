// components/shared/AppointmentForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../common/Input';
import { useApi } from '../../hooks/useApi';
import '../../css/AppointmentForm.css';

const AppointmentForm = ({ initialData, onSubmit, mode = 'create' }) => {
  const navigate = useNavigate();
  const api = useApi();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  const [formData, setFormData] = useState({
    patientId: initialData?.patientId || '',
    staffId: initialData?.staffId || '',
    appointmentDate: initialData?.appointmentDate || '',
    appointmentTime: initialData?.appointmentTime || '',
    type: initialData?.type || 'regular',
    isVirtual: initialData?.isVirtual || false,
    notes: initialData?.notes || '',
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get('/staff');
        setDoctors(response.data);
      } catch (err) {
        setError('Failed to fetch doctors');
      }
    };

    fetchDoctors();
  }, [api]);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (formData.staffId && formData.appointmentDate) {
        try {
          const response = await api.get(`/appointments/available-slots`, {
            params: {
              staffId: formData.staffId,
              date: formData.appointmentDate
            }
          });
          setAvailableSlots(response.data);
        } catch (err) {
          setError('Failed to fetch available slots');
        }
      }
    };

    fetchAvailableSlots();
  }, [api, formData.staffId, formData.appointmentDate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const appointmentData = {
        ...formData,
        appointmentDate: `${formData.appointmentDate}T${formData.appointmentTime}`
      };

      if (mode === 'create') {
        await api.post('/appointments', appointmentData);
      } else {
        await api.put(`/appointments/${initialData.id}`, appointmentData);
      }

      onSubmit?.(appointmentData);
      navigate('/appointments');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="appointment-form">
      {error && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="staffId">Doctor</label>
          <select
            id="staffId"
            name="staffId"
            value={formData.staffId}
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="">Select Doctor</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>
                Dr. {doctor.user.name} - {doctor.specialization}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="appointmentDate">Date</label>
          <Input
            type="date"
            id="appointmentDate"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="form-group">
          <label htmlFor="appointmentTime">Time</label>
          <select
             id="appointmentTime"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
            required
            className="form-select"
            disabled={!availableSlots.length}
          >
            <option value="">Select Time</option>
            {availableSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {new Date(`2000-01-01T${slot}`).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="type">Appointment Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="regular">Regular Checkup</option>
            <option value="follow-up">Follow-up</option>
            <option value="emergency">Emergency</option>
            <option value="consultation">Consultation</option>
          </select>
        </div>

        <div className="form-group col-span-2">
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="isVirtual"
              name="isVirtual"
              checked={formData.isVirtual}
              onChange={handleChange}
              className="form-checkbox"
            />
            <label htmlFor="isVirtual">Virtual Appointment</label>
          </div>
        </div>

        <div className="form-group col-span-2">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="form-textarea"
            placeholder="Add any relevant notes or specific concerns..."
          />
        </div>
      </div>

      <div className="form-actions">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn btn-outline"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Saving...' : mode === 'create' ? 'Schedule Appointment' : 'Update Appointment'}
        </button>
      </div>
    </form>
  );
};

export default AppointmentForm;