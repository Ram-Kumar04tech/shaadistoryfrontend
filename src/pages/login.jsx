import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import Particles from '../components/particles';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import '../styles/login.css';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('https://shaadibackend2.vercel.app/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Assuming the token is in data.token
      localStorage.setItem('userToken', data.token);
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <Canvas className="particles-canvas">
        <Particles />
      </Canvas>

      <div className="login-content-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="login-card"
        >
          <div className="login-header">
            <h1 className="login-title">ShaadiStory.ai</h1>
            <p className="login-subtitle">Your wedding journey begins here</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleEmailLogin} className="login-form">
            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  className="form-input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

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

            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="signup-link-container">
            <p className="signup-text">
              Don't have an account?{' '}
              <Link to="/signup" className="signup-link">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      <div className="couple-illustration">
        <img src="/images/couple-illustration.png" alt="Couple Illustration" />
      </div>
    </div>
  );
};

export default Login;
