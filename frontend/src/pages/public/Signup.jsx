import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/Signup.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    role: 'patient',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 1) {
      handleNext();
      return;
    }
    
    if (!validateStep2()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      navigate('/login', {
        state: { message: 'Registration successful! Please sign in.' }
      });
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: error.message
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-content">
          <div className="signup-header">
            <Link to="/" className="signup-logo">
              <img src="/logo.svg" alt="Medical Center Logo" />
            </Link>
            <h1>Create Account</h1>
            <p>Join our healthcare community</p>
          </div>

          <div className="signup-steps">
            <div className={`signup-step ${step >= 1 ? 'active' : ''}`}>
              <div className="signup-step-number">1</div>
              <div className="signup-step-label">Account Info</div>
            </div>
            <div className="signup-step-line"></div>
            <div className={`signup-step ${step === 2 ? 'active' : ''}`}>
              <div className="signup-step-number">2</div>
              <div className="signup-step-label">Personal Info</div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="signup-form">
            {errors.submit && (
              <div className="signup-error">{errors.submit}</div>
            )}
            
            {step === 1 ? (
              <>
                <div className="signup-form-row">
                  <div className="signup-form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`signup-input ${errors.firstName ? 'signup-input--error' : ''}`}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <span className="signup-error-message">{errors.firstName}</span>
                    )}
                  </div>
                  
                  <div className="signup-form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`signup-input ${errors.lastName ? 'signup-input--error' : ''}`}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <span className="signup-error-message">{errors.lastName}</span>
                    )}
                  </div>
                </div>
                
                <div className="signup-form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`signup-input ${errors.email ? 'signup-input--error' : ''}`}
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                  {errors.email && (
                    <span className="signup-error-message">{errors.email}</span>
                  )}
                </div>
                
                <div className="signup-form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`signup-input ${errors.password ? 'signup-input--error' : ''}`}
                    placeholder="Create a password"
                    autoComplete="new-password"
                  />
                  {errors.password && (
                    <span className="signup-error-message">{errors.password}</span>
                  )}
                </div>
                
                <div className="signup-form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`signup-input ${errors.confirmPassword ? 'signup-input--error' : ''}`}
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                  />
                  {errors.confirmPassword && (
                    <span className="signup-error-message">{errors.confirmPassword}</span>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="signup-form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`signup-input ${errors.phone ? 'signup-input--error' : ''}`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <span className="signup-error-message">{errors.phone}</span>
                  )}
                </div>
                
                <div className="signup-form-group">
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={`signup-input ${errors.dateOfBirth ? 'signup-input--error' : ''}`}
                  />
                  {errors.dateOfBirth && (
                    <span className="signup-error-message">{errors.dateOfBirth}</span>
                  )}
                </div>
                
                <div className="signup-form-group">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`signup-select ${errors.gender ? 'signup-select--error' : ''}`}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <span className="signup-error-message">{errors.gender}</span>
                  )}
                </div>
              </>
            )}
            
            <div className="signup-form-buttons">
              {step === 2 && (
                <button
                  type="button"
                  className="signup-back-btn"
                  onClick={handleBack}
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className="signup-submit-btn"
                disabled={isLoading}
              >
                {isLoading
                  ? 'Creating account...'
                  : step === 1
                  ? 'Next'
                  : 'Create Account'}
              </button>
            </div>
          </form>
          
          <div className="signup-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="signup-link">Sign in here</Link>
            </p>
          </div>
        </div>
        
        <div className="signup-image">
          <img src="/images/signup-illustration.svg" alt="Healthcare illustration" />
          <div className="signup-image-overlay">
            <h2>Join Our Community</h2>
            <p>Get access to quality healthcare services and manage your health journey.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;