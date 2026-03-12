import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import './index.css';
import './light.css';
import './dark.css';
import './mlight.css';
import './mdark.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const HomePage = () => {
  const { user, logout, isLoading, token } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return; // Only fetch if authenticated
    
    setLoading(true);
    setError('');
    
    fetch(`${API_URL}/users/?skip=${skip}&limit=10`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Failed to fetch profiles');
      })
      .then(data => setProfiles(data))
      .catch(err => {
        console.error(err);
        setError('Failed to load profiles');
      })
      .finally(() => setLoading(false));
  }, [skip, token]);

  if (isLoading) {
    return <div className="container" style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>;
  }

  return (
    <div className="container">
      <nav className="home-nav">
        <h1 className="home-title">Eternal Bloom</h1>
        <div className="home-nav-actions">
          {user ? (
            <>
              <span className="home-welcome">Welcome, <strong>{user.full_name}</strong></span>
              <button className="btn btn-primary" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary home-login-btn">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </nav>

      <section className="home-hero glass-card">
        <h2 className="home-hero-title">Find Your Perfect Match</h2>
        <p className="home-hero-subtitle">Connecting hearts across the globe with trust and elegance.</p>
      </section>

      {!token ? (
        <div className="glass-card home-auth-prompt">
          <h3>Please login to browse profiles</h3>
          <Link to="/login" className="btn btn-primary">Login Now</Link>
        </div>
      ) : (
        <>
          <h3 className="home-section-title">Browse Members</h3>
          {error && <p className="home-error">{error}</p>}
          
          {loading ? (
            <div className="home-loading">Loading profiles...</div>
          ) : profiles.length === 0 ? (
            <div className="home-empty">No more profiles to show</div>
          ) : (
            <>
              <div className="home-profiles-grid">
                {profiles.map(profile => (
                  <div key={profile.id} className="home-profile-card glass-card">
                    <div className="home-profile-image">
                      👤
                    </div>
                    <div className="home-profile-info">
                      <h4 className="home-profile-name">{profile.full_name}</h4>
                      <p className="home-profile-details">{profile.age} yrs • {profile.religion} • {profile.occupation}</p>
                      <p className="home-profile-bio">{profile.bio?.substring(0, 100)}...</p>
                      <button className="btn btn-primary home-view-btn">View Profile</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="home-pagination">
                <button className="btn btn-primary" onClick={() => setSkip(Math.max(0, skip - 10))} disabled={skip === 0}>Previous</button>
                <button className="btn btn-primary" onClick={() => setSkip(skip + 10)}>Next</button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
