import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

// Set axios defaults
axios.defaults.baseURL = 'http://localhost:5000';

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    dob: '',
    location: '',
    language: '',
    religion: '',
    community: '',
    bio: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');

        const res = await axios.get(`/api/profiles/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        const profileData = res.data;
        setFormData({
          fullName: profileData.fullName,
          age: profileData.age.toString(),
          dob: profileData.dob ? new Date(profileData.dob).toISOString().split('T')[0] : '',
          location: profileData.location,
          language: profileData.language,
          religion: profileData.religion,
          community: profileData.community || '',
          bio: profileData.bio || ''
        });
      } catch (err) {
        if (err.response?.status === 404) {
          setIsEditMode(true);
        } else {
          setError(err.response?.data?.message || 'Failed to fetch profile');
        }
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    } else {
      setIsEditMode(true);
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError('Full name is required');
      return false;
    }
    if (!formData.age || isNaN(formData.age) || formData.age < 18 || formData.age > 100) {
      setError('Please enter a valid age between 18 and 100');
      return false;
    }
    if (!formData.dob) {
      setError('Date of birth is required');
      return false;
    }
    if (!formData.location.trim()) {
      setError('Location is required');
      return false;
    }
    if (!formData.language) {
      setError('Language is required');
      return false;
    }
    if (!formData.religion) {
      setError('Religion is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const profileData = {
        fullName: formData.fullName.trim(),
        age: parseInt(formData.age),
        dob: new Date(formData.dob).toISOString(),
        location: formData.location.trim(),
        language: formData.language,
        religion: formData.religion,
        community: formData.community.trim(),
        bio: formData.bio.trim()
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      const url = userId ? `/api/profiles/${userId}` : '/api/profiles';
      const method = userId ? 'put' : 'post';
      
      await axios[method](url, profileData, config);
      
      setSuccessMessage('Profile saved successfully!');
      setTimeout(() => {
        navigate('/home');
      }, 1500);
      
      if (!userId) {
        setIsEditMode(false);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                         err.response?.data?.error || 
                         'Failed to save profile';
      setError(errorMessage);
      console.error('Error saving profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  if (loading && !isEditMode) {
    return (
      <div className="profile-page" style={{ 
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}>
        <div>Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="profile-page" style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(120deg, #f3e7e9 0%, #e3eeff 100%)',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          padding: '30px',
          width: '100%',
          maxWidth: '700px',
          margin: '20px'
        }}
      >
        <h1 style={{ 
          textAlign: 'center', 
          color: '#4a4a8a',
          marginBottom: '10px',
          fontSize: '28px',
          fontWeight: '600'
        }}>
          {isEditMode ? (userId ? 'Update Your Profile' : 'Complete Your Profile') : 'Your Profile'}
        </h1>
        
        <p style={{ 
          textAlign: 'center', 
          color: '#777',
          marginBottom: '30px',
          fontSize: '16px'
        }}>
          {isEditMode ? 'Fill in your details to create/update your profile' : 'View and manage your profile information'}
        </p>

        {!isEditMode ? (
          <div>
            {/* View Mode */}
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#4a4a8a', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
                Personal Details
              </h3>
              <p><strong>Name:</strong> {formData.fullName}</p>
              <p><strong>Age:</strong> {formData.age}</p>
              <p><strong>Date of Birth:</strong> {formData.dob ? new Date(formData.dob).toLocaleDateString() : 'Not specified'}</p>
              <p><strong>Location:</strong> {formData.location}</p>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: '#4a4a8a', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
                Background Information
              </h3>
              <p><strong>Language:</strong> {formData.language}</p>
              <p><strong>Religion:</strong> {formData.religion}</p>
              {formData.community && <p><strong>Community:</strong> {formData.community}</p>}
              {formData.bio && <p><strong>Bio:</strong> {formData.bio}</p>}
            </div>

            <button
              onClick={handleEdit}
              style={{
                background: '#4a4a8a',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                width: '100%',
                transition: 'all 0.3s ease'
              }}
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Personal Details Section */}
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '20px',
                fontWeight: '600',
                color: '#4a4a8a',
                marginBottom: '20px',
                paddingBottom: '10px',
                borderBottom: '1px solid #eee'
              }}>
                Personal Details
              </h2>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '20px'
              }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Riya Sharma"
                    required
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: error && !formData.fullName.trim() ? '1px solid #ff4d6d' : '1px solid #ddd',
                      borderRadius: '10px',
                      fontSize: '16px',
                      transition: 'border-color 0.3s'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    min="18"
                    max="100"
                    placeholder="28"
                    required
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: (error && (!formData.age || isNaN(formData.age) || formData.age < 18 || formData.age > 100)) 
                        ? '1px solid #ff4d6d' 
                        : '1px solid #ddd',
                      borderRadius: '10px',
                      fontSize: '16px'
                    }}
                  />
                </div>
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '20px'
              }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                    max={new Date().toISOString().split('T')[0]}
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: error && !formData.dob ? '1px solid #ff4d6d' : '1px solid #ddd',
                      borderRadius: '10px',
                      fontSize: '16px'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Mumbai, Maharashtra"
                    required
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: error && !formData.location.trim() ? '1px solid #ff4d6d' : '1px solid #ddd',
                      borderRadius: '10px',
                      fontSize: '16px'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Background Information */}
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                fontSize: '20px',
                fontWeight: '600',
                color: '#4a4a8a',
                marginBottom: '20px',
                paddingBottom: '10px',
                borderBottom: '1px solid #eee'
              }}>
                Background Information
              </h2>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '20px'
              }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>
                    Language *
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: error && !formData.language ? '1px solid #ff4d6d' : '1px solid #ddd',
                      borderRadius: '10px',
                      fontSize: '16px',
                      background: 'white',
                      appearance: 'none',
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%234a4a8a\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M6 9l6 6 6-6\'%3E%3C/path%3E%3C/svg%3E")',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 15px center',
                      backgroundSize: '18px'
                    }}
                  >
                    <option value="">Select your language</option>
                    <option value="Hindi">Hindi</option>
                    <option value="English">English</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Bengali">Bengali</option>
                    <option value="Punjabi">Punjabi</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>
                    Religion *
                  </label>
                  <select
                    name="religion"
                    value={formData.religion}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '14px',
                      border: error && !formData.religion ? '1px solid #ff4d6d' : '1px solid #ddd',
                      borderRadius: '10px',
                      fontSize: '16px',
                      background: 'white',
                      appearance: 'none',
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%234a4a8a\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M6 9l6 6 6-6\'%3E%3C/path%3E%3C/svg%3E")',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 15px center',
                      backgroundSize: '18px'
                    }}
                  >
                    <option value="">Select your religion</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Muslim">Muslim</option>
                    <option value="Christian">Christian</option>
                    <option value="Sikh">Sikh</option>
                    <option value="Jain">Jain</option>
                    <option value="Buddhist">Buddhist</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>
                  Community (optional)
                </label>
                <input
                  type="text"
                  name="community"
                  value={formData.community}
                  onChange={handleChange}
                  placeholder="e.g., Brahmin, Sunni, etc."
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    fontSize: '16px'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>
                  Bio (optional)
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell others about yourself..."
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '14px',
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    fontSize: '16px',
                    resize: 'vertical'
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                background: 'linear-gradient(120deg, #ff7eb3 0%, #ff758c 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                padding: '16px 24px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                width: '100%',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(255, 126, 179, 0.4)',
                opacity: loading ? 0.7 : 1
              }}
              onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
              onMouseOut={(e) => !loading && (e.target.style.transform = 'translateY(0)')}
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </button>

            {error && (
              <p style={{ 
                color: '#ff4d6d', 
                textAlign: 'center', 
                marginTop: '15px',
                fontSize: '14px'
              }}>
                {error}
              </p>
            )}

            {successMessage && (
              <p style={{ 
                color: '#38b000', 
                textAlign: 'center', 
                marginTop: '15px',
                fontSize: '14px'
              }}>
                {successMessage}
              </p>
            )}
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;