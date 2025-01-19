import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';

// Public Pages
import HomePage from './pages/public/Home';
import AboutPage from './pages/public/About';
import ServicesPage from './pages/public/Services';
import TeamPage from './pages/public/Team';
import ContactPage from './pages/public/Contact';
import FAQPage from './pages/public/FAQ';

// Auth Pages
import LoginPage from './pages/public/Login';
import SignupPage from './pages/public/Signup';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import PatientManagement from './pages/admin/PatientManagement';
import StaffManagement from './pages/admin/StaffManagement';
import AppointmentManagement from './pages/admin/AppointmentManagement';
import Reports from './pages/admin/Reports';

// Patient Pages
import PatientDashboard from './pages/patient/PatientDashboard';
import Appointments from './pages/patient/Appointments';
import MedicalRecords from './pages/patient/MedicalRecords';
import Prescriptions from './pages/patient/Prescriptions';

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for stored authentication
    const initializeAuth = () => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (storedUser && token) {
        setUser(JSON.parse(storedUser));
      }
      
      setIsInitialized(true);
    };

    initializeAuth();
  }, []);

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  // Protected Route Component
  const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      return <Navigate to="/" />;
    }

    return children;
  };

  // Auth Route Component (redirects authenticated users)
  const AuthRoute = ({ children }) => {
    if (user) {
      switch (user.role) {
        case 'admin':
          return <Navigate to="/admin/dashboard" />;
        case 'staff':
          return <Navigate to="/staff/dashboard" />;
        case 'patient':
          return <Navigate to="/patient/dashboard" />;
        default:
          return <Navigate to="/" />;
      }
    }

    return children;
  };

  const authValue = {
    user,
    setUser,
    login: (userData) => {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    },
    logout: () => {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  };

  return (
    <AuthProvider value={authValue}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Outlet /></Layout>}>
            {/* Public Routes */}
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="team" element={<TeamPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="faq" element={<FAQPage />} />
          
            {/* Auth Routes */}
            <Route
              path="login"
              element={
                <AuthRoute>
                  <LoginPage />
                </AuthRoute>
              }
            />
            <Route
              path="signup"
              element={
                <AuthRoute>
                  <SignupPage />
                </AuthRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/patients/*"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <PatientManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/staff/*"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <StaffManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/appointments/*"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AppointmentManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/reports"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <Reports />
                </ProtectedRoute>
              }
            />

            {/* Patient Routes */}
            <Route
              path="patient/dashboard"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <PatientDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="patient/appointments/*"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <Appointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="patient/medical-records"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <MedicalRecords />
                </ProtectedRoute>
              }
            />
            <Route
              path="patient/prescriptions"
              element={
                <ProtectedRoute allowedRoles={['patient']}>
                  <Prescriptions />
                </ProtectedRoute>
              }
            />

            {/* Catch-all route for 404 */}
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;