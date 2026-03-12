import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

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
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', padding: '10px 0' }}>
        <h1 style={{ color: 'var(--accent-color)' }}>Eternal Bloom</h1>
        <div>
          {user ? (
            <>
              <span style={{ marginRight: '15px' }}>Welcome, <strong>{user.full_name}</strong></span>
              <button className="btn btn-primary" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary" style={{ marginRight: '10px', textDecoration: 'none' }}>Login</Link>
              <Link to="/signup" className="btn btn-primary" style={{ textDecoration: 'none' }}>Sign Up</Link>
            </>
          )}
        </div>
      </nav>

      <section className="glass-card" style={{ textAlign: 'center', marginBottom: '40px', padding: '60px 20px' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>Find Your Perfect Match</h2>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>Connecting hearts across the globe with trust and elegance.</p>
      </section>

      {!token ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '40px' }}>
          <h3>Please login to browse profiles</h3>
          <Link to="/login" className="btn btn-primary" style={{ textDecoration: 'none' }}>Login Now</Link>
        </div>
      ) : (
        <>
          <h3 style={{ marginBottom: '20px' }}>Browse Members</h3>
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>Loading profiles...</div>
          ) : profiles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>No more profiles to show</div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                {profiles.map(profile => (
                  <div key={profile.id} className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ height: '200px', backgroundColor: '#eee', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '3rem' }}>
                      👤
                    </div>
                    <div style={{ padding: '15px' }}>
                      <h4>{profile.full_name}</h4>
                      <p>{profile.age} yrs • {profile.religion} • {profile.occupation}</p>
                      <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '10px' }}>{profile.bio?.substring(0, 100)}...</p>
                      <button className="btn btn-primary" style={{ width: '100%', marginTop: '15px' }}>View Profile</button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '40px' }}>
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
