import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import StaffInfo from '../../components/shared/StaffInfo';
import Input from '../../components/common/Input';
// import '../../css/StaffManagement.css';

const StaffManagement = () => {
  const api = useApi();
  const [loading, setLoading] = useState(true);
  const [staff, setStaff] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [error, setError] = useState(null);

  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'cardiology', name: 'Cardiology' },
    { id: 'neurology', name: 'Neurology' },
    { id: 'pediatrics', name: 'Pediatrics' },
    { id: 'orthopedics', name: 'Orthopedics' },
    { id: 'primary', name: 'Primary Care' },
  ];

  const statuses = [
    { id: 'all', name: 'All Statuses' },
    { id: 'active', name: 'Active' },
    { id: 'on-leave', name: 'On Leave' },
    { id: 'inactive', name: 'Inactive' },
  ];

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/staff');
      setStaff(response.data);
    } catch (err) {
      setError('Failed to fetch staff members');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (staffId, newStatus) => {
    try {
      await api.put(`/admin/staff/${staffId}/status`, { status: newStatus });
      setStaff(staff.map(s => 
        s.id === staffId ? { ...s, status: newStatus } : s
      ));
    } catch (err) {
      console.error('Failed to update staff status:', err);
    }
  };

  const filteredStaff = staff.filter(member => {
    const matchesSearch = 
      member.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.designation.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = 
      selectedDepartment === 'all' || member.department === selectedDepartment;
    
    const matchesStatus = 
      selectedStatus === 'all' || member.status === selectedStatus;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Loading staff members...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>{error}</p>
        <button onClick={fetchStaff} className="btn btn-primary">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="staff-management">
      <div className="page-header">
        <div className="header-content">
          <h1>Staff Management</h1>
          <p>Manage medical staff members and their roles</p>
        </div>
        <Link to="/admin/staff/new" className="btn btn-primary">
          Add New Staff Member
        </Link>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <Input
            type="text"
            placeholder="Search by name or designation..."
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

      <div className="staff-stats">
        <div className="stat-card">
          <h3>Total Staff</h3>
          <div className="stat-value">{staff.length}</div>
        </div>
        <div className="stat-card">
          <h3>Active Staff</h3>
          <div className="stat-value">
            {staff.filter(s => s.status === 'active').length}
          </div>
        </div>
        <div className="stat-card">
          <h3>On Leave</h3>
          <div className="stat-value">
            {staff.filter(s => s.status === 'on-leave').length}
          </div>
        </div>
        <div className="stat-card">
          <h3>Departments</h3>
          <div className="stat-value">
            {new Set(staff.map(s => s.department)).size}
          </div>
        </div>
      </div>

      <div className="staff-grid">
        {filteredStaff.length > 0 ? (
          filteredStaff.map(member => (
            <div key={member.id} className="staff-card">
              <div className="staff-card-header">
                <div className="staff-info-brief">
                  <div className="staff-avatar">
                    {member.user.name[0].toUpperCase()}
                  </div>
                  <div>
                    <h3>Dr. {member.user.name}</h3>
                    <p>{member.designation}</p>
                  </div>
                </div>
                <div className={`status-badge ${member.status}`}>
                  {member.status}
                </div>
              </div>

              <div className="staff-card-content">
                <div className="info-row">
                  <span className="label">Department</span>
                  <span className="value">{member.department}</span>
                </div>
                <div className="info-row">
                  <span className="label">Experience</span>
                  <span className="value">{member.experience} years</span>
                </div>
                <div className="info-row">
                  <span className="label">Rating</span>
                  <span className="value">⭐ {member.rating.toFixed(1)}</span>
                </div>
              </div>

              <div className="staff-card-actions">
                <select
                  value={member.status}
                  onChange={(e) => handleStatusChange(member.id, e.target.value)}
                  className="status-select"
                >
                  <option value="active">Active</option>
                  <option value="on-leave">On Leave</option>
                  <option value="inactive">Inactive</option>
                </select>
                <Link 
                  to={`/admin/staff/${member.id}`}
                  className="btn btn-outline"
                >
                  View Profile
                </Link>
                <Link
                  to={`/admin/staff/${member.id}/edit`}
                  className="btn btn-primary"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <h3>No staff members found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffManagement;