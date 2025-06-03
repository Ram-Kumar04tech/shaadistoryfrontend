// src/pages/SignUp.jsx

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import Particles from '../components/particles';
import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaUser,
  FaLock,
  FaCalendarAlt
} from 'react-icons/fa';
import '../styles/signup.css';

const SignUp = () => {
  // State for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation for required fields
    if (!firstName || !lastName || !email || !password || !confirmPassword || !dateOfBirth || !gender) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          dateOfBirth,
          gender,
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Signup failed');

      localStorage.setItem('userToken', data.token);
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page-container">
      <Canvas className="particles-canvas">
        <Particles />
      </Canvas>
      <div className="signup-content-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="signup-card"
        >
          <h2 className="signup-heading">Create an Account</h2>

          {error && <div className="error-message">{error}</div>}

          <form className="signup-form" onSubmit={handleEmailSignup}>
            {/* First Name */}
            <div className="form-group">
              <label className="form-label">First Name</label>
              <div className="input-with-icon">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  className="form-input"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <div className="input-with-icon">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  className="form-input"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              {/* Date of Birth */}
              <div className="form-group half-width">
                <label className="form-label">Date of Birth</label>
                <div className="input-with-icon">
                  <FaCalendarAlt className="input-icon" />
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="form-group half-width">
                <label className="form-label">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                  className="form-input"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? 'Please wait...' : 'Create Account'}
            </button>
          </form>

          <div className="login-link-container">
            <p className="login-text">
              Already have an account?{' '}
              <Link to="/login" className="login-link">
                Log in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
