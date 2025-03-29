import React, { useState, useEffect } from 'react';
import { fetchUserProfile } from '../../services/github';

function Header() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);
        const userData = await fetchUserProfile();
        setProfile(userData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  return (
    <header className="App-header">
      {loading ? (
        <p>Loading profile...</p>
      ) : profile ? (
        <>
          {profile.avatar_url && (
            <img 
              src={profile.avatar_url} 
              alt={`${profile.name || profile.login}'s avatar`}
              className="profile-avatar"
            />
          )}
          <h1>{profile.name || profile.login}</h1>
          <p>{profile.bio || 'GitHub Portfolio'}</p>
          {profile.location && <p className="location">{profile.location}</p>}
          <div className="social-links">
            <a href={profile.html_url} target="_blank" rel="noopener noreferrer">GitHub</a>
            {profile.blog && (
              <a href={profile.blog} target="_blank" rel="noopener noreferrer">Website</a>
            )}
            {/* You can add more social links here if needed */}
          </div>
        </>
      ) : (
        // Fallback if profile loading fails
        <>
          <h1>Your Name</h1>
          <p>Full Stack Developer | Linux Administrator | Security Specialist</p>
          <div className="social-links">
            <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;