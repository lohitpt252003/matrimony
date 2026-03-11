import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { user, logout } = useAuth();
  const [profiles, setProfiles] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/users/')
      .then(res => res.json())
      .then(data => setProfiles(data))
      .catch(err => console.error(err));
  }, []);

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

      <h3 style={{ marginBottom: '20px' }}>New Members</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
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
    </div>
  );
};

export default HomePage;
