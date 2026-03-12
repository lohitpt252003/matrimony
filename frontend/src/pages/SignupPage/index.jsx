import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './index.css';
import './light.css';
import './dark.css';
import './mlight.css';
import './mdark.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    full_name: '',
    gender: 'Male',
    age: 25,
    religion: '',
    caste: '',
    education: '',
    occupation: '',
    bio: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'age' ? parseInt(value) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        navigate('/login');
      } else {
        const errData = await res.json();
        setError(errData.detail || 'Signup failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card glass-card">
        <h2 className="signup-title">Create Your Profile</h2>
        {error && <p className="signup-error">{error}</p>}
        <form onSubmit={handleSubmit} className="signup-form">
          <input 
            className="signup-input input-field" 
            name="full_name" 
            placeholder="Full Name" 
            onChange={handleChange} 
            required 
            disabled={loading} 
          />
          <input 
            className="signup-input input-field" 
            name="email" 
            type="email" 
            placeholder="Email" 
            onChange={handleChange} 
            required 
            disabled={loading} 
          />
          <input 
            className="signup-input input-field" 
            name="username" 
            placeholder="Username (alphanumeric)" 
            onChange={handleChange} 
            required 
            disabled={loading} 
          />
          <input 
            className="signup-input input-field" 
            name="password" 
            type="password" 
            placeholder="Password (min 6 chars)" 
            onChange={handleChange} 
            required 
            disabled={loading} 
          />
          
          <select 
            className="signup-input signup-select input-field" 
            name="gender" 
            onChange={handleChange} 
            disabled={loading}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input 
            className="signup-input input-field" 
            name="age" 
            type="number" 
            placeholder="Age (18-100)" 
            value={formData.age} 
            onChange={handleChange} 
            required 
            disabled={loading} 
          />
          
          <input 
            className="signup-input input-field" 
            name="religion" 
            placeholder="Religion" 
            onChange={handleChange} 
            disabled={loading} 
          />
          <input 
            className="signup-input input-field" 
            name="caste" 
            placeholder="Caste" 
            onChange={handleChange} 
            disabled={loading} 
          />
          
          <input 
            className="signup-input input-field" 
            name="education" 
            placeholder="Education" 
            onChange={handleChange} 
            disabled={loading} 
          />
          <input 
            className="signup-input input-field" 
            name="occupation" 
            placeholder="Occupation" 
            onChange={handleChange} 
            disabled={loading} 
          />
          
          <textarea 
            className="signup-input signup-textarea input-field" 
            name="bio" 
            placeholder="Tell us about yourself (max 1000 chars)" 
            onChange={handleChange} 
            disabled={loading}
          ></textarea>
          
          <button className="signup-button btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="signup-footer">
          Already have an account? <Link to="/login" className="signup-link">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
