import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignupPage: React.FC = () => {
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
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:8000/auth/signup', {
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
    }
  };

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '40px 0' }}>
      <div className="glass-card" style={{ width: '600px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Your Profile</h2>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <input className="input-field" name="full_name" placeholder="Full Name" onChange={handleChange} required />
          <input className="input-field" name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input className="input-field" name="username" placeholder="Username" onChange={handleChange} required />
          <input className="input-field" name="password" type="password" placeholder="Password" onChange={handleChange} required />
          
          <select className="input-field" name="gender" onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input className="input-field" name="age" type="number" placeholder="Age" onChange={handleChange} required />
          
          <input className="input-field" name="religion" placeholder="Religion" onChange={handleChange} />
          <input className="input-field" name="caste" placeholder="Caste" onChange={handleChange} />
          
          <input className="input-field" name="education" placeholder="Education" onChange={handleChange} />
          <input className="input-field" name="occupation" placeholder="Occupation" onChange={handleChange} />
          
          <textarea className="input-field" name="bio" placeholder="Tell us about yourself" style={{ gridColumn: 'span 2', minHeight: '100px' }} onChange={handleChange}></textarea>
          
          <button className="btn btn-primary" type="submit" style={{ gridColumn: 'span 2' }}>Register</button>
        </form>
        <p style={{ marginTop: '20px', textAlign: 'center' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--accent-color)' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
