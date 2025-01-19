import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import Input from '../../components/common/Input';
import Table from '../../components/common/Table';
import '../../css/PatientManagement.css';

const PatientManagement = () => {
  const api = useApi();
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [error, setError] = useState(null);

  const statuses = [
    { id: 'all', name: 'All Statuses' },
    { id: 'active', name: 'Active' },
    { id: 'inactive', name: 'Inactive' },
    { id: 'pending', name: 'Pending' }
  ];

  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'cardiology', name: 'Cardiology' },
    { id: 'neurology', name: 'Neurology' },
    { id: 'pediatrics', name: 'Pediatrics' },
    { id: 'orthopedics', name: 'Orthopedics' },
    { id: 'primary', name: 'Primary Care' }
  ];

  const columns = [
    {
      field: 'user.name',
      title: 'Patient Name',
      render: (_, patient) => (
        <div className="patient-name-cell">
          <div className="patient-avatar">
            {patient.user.name[0].toUpperCase()}
          </div>
          <div className="patient-info">
            <span className="name">{patient.user.name}</span>
            <span className="id">ID: {patient.id}</span>
          </div>
        </div>
      )
    },
    {
      field: 'questionnaire.date_of_birth',
      title: 'Age',
      render: (value) => {
        if (!value) return 'N/A';
        const birthDate = new Date(value);
        const age = Math.floor((new Date() - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
        return `${age} years`;
      }
    },
    {
      field: 'questionnaire.gender',
      title: 'Gender',
      render: (value) => value || 'N/A'
    },
    {
      field: 'user.phone_number',
      title: 'Contact',
      render: (value, patient) => (
        <div className="contact-info">
          <div>{value || 'No phone'}</div>
          <div className="email">{patient.user.email}</div>
        </div>
      )
    },
    {
      field: 'lastVisit',
      title: 'Last Visit',
      render: (value) => value ? new Date(value).toLocaleDateString() : 'Never'
    },
    {
      field: 'status',
      title: 'Status',
      render: (value) => (
        <span className={`status-badge ${value}`}>
          {value}
        </span>
      )
    },
    {
      field: 'actions',
      title: 'Actions',
      render: (_, patient) => (
        <div className="action-buttons">
          <Link
            to={`/admin/patients/${patient.id}`}
            className="btn btn-outline btn-sm"
          >
            View
          </Link>
          <Link
            to={`/admin/patients/${patient.id}/edit`}
            className="btn btn-primary btn-sm"
          >
            Edit
          </Link>
        </div>
      )
    }
  ];

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/patients');
      setPatients(response.data);
    } catch (err) {
      setError('Failed to fetch patients');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (patient.user.phone_number && patient.user.phone_number.includes(searchQuery));
    
    const matchesStatus = selectedStatus === 'all' || patient.status === selectedStatus;
    
    const matchesDepartment = selectedDepartment === 'all' || 
      patient.primaryDepartment === selectedDepartment;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const handleStatusChange = async (patientId, newStatus) => {
    try {
      await api.put(`/admin/patients/${patientId}/status`, { status: newStatus });
      setPatients(patients.map(p => 
        p.id === patientId ? { ...p, status: newStatus } : p
      ));
    } catch (err) {
      console.error('Failed to update patient status:', err);
    }
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Loading patients...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>{error}</p>
        <button onClick={fetchPatients} className="btn btn-primary">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="patient-management">
      <div className="page-header">
        <div className="header-content">
          <h1>Patient Management</h1>
          <p>View and manage patient records</p>
        </div>
        <Link to="/admin/patients/new" className="btn btn-primary">
          Add New Patient
        </Link>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <Input
            type="text"
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            prefix="🔍"
          />
        </div>

        <div className="filters">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="filter-select"
          >
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
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

      <div className="patient-stats">
        <div className="stat-card">
          <h3>Total Patients</h3>
          <div className="stat-value">{patients.length}</div>
        </div>
        <div className="stat-card">
          <h3>Active Patients</h3>
          <div className="stat-value">
            {patients.filter(p => p.status === 'active').length}
          </div>
        </div>
        <div className="stat-card">
          <h3>New This Month</h3>
          <div className="stat-value">
            {patients.filter(p => {
              const createdDate = new Date(p.created_at);
              const now = new Date();
              return createdDate.getMonth() === now.getMonth() &&
                     createdDate.getFullYear() === now.getFullYear();
            }).length}
          </div>
        </div>
        <div className="stat-card">
          <h3>Appointments Today</h3>
          <div className="stat-value">
            {patients.filter(p => p.appointments?.some(apt => {
              const aptDate = new Date(apt.appointment_date);
              const today = new Date();
              return aptDate.toDateString() === today.toDateString();
            })).length}
          </div>
        </div>
      </div>

      <Table
        columns={columns}
        data={filteredPatients}
        sortable
        pagination
        pageSize={10}
        emptyMessage="No patients found"
      />
    </div>
  );
};

export default PatientManagement;