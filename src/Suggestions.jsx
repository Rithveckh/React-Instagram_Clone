import React, { useEffect, useState } from 'react';

function Suggestions() {
  const [profile, setProfile] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const [following, setFollowing] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/profile')
      .then((response) => response.json())
      .then((data) => setProfile(data))
      .catch(() => setError('Failed to load profile'));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/suggestions')
      .then((response) => response.json())
      .then((data) => setSuggestions(data))
      .catch(() => setError('Failed to load suggestions'));
  }, []);

  // Handle follow/unfollow toggle
  const handleFollow = (userId) => {
    setFollowing((prevState) => ({
      ...prevState,
      [userId]: !prevState[userId],
    }));
  };

  return (
    <div className="suggestions p-3 border rounded" style={{ maxWidth: '350px', background: '#fff' }}>
      {error && <p className="text-danger">{error}</p>}

      {/* Profile Section */}
      {profile ? (
        <div className="d-flex align-items-center p-2 border-bottom">
          <img
            className="rounded-circle me-3"
            src={profile.profile_picture}
            alt="Profile Pic"
            style={{ width: '45px', height: '45px', objectFit: 'cover' }}
          />
          <div>
            <h6 className="m-0">{profile.username}</h6>
            <p className="text-muted mb-0" style={{ fontSize: '12px' }}>{profile.name}</p>
          </div>
          <p className="ms-auto text-primary" style={{ cursor: 'pointer' }}>Switch</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}

      {/* Suggestions Section */}
      <div className="mt-3">
        <h6 className="text-muted mb-2">Suggestions for you</h6>
        {suggestions.length > 0 ? (
          suggestions.map((user) => (
            <div key={user.id} className="d-flex align-items-center p-2 border-bottom">
              <img
                className="rounded-circle me-3"
                src={user.profile_picture}
                alt={user.username}
                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
              />
              <div>
                <h6 className="m-0">{user.username}</h6>
                <p className="text-muted mb-0" style={{ fontSize: '12px' }}>New to Instagram</p>
              </div>
              <button
                className={`btn btn-sm ms-auto ${following[user.id] ? 'btn-outline-secondary' : 'btn-primary'}`}
                style={{ fontSize: '13px' }}
                onClick={() => handleFollow(user.id)}
              >
                {following[user.id] ? 'Following' : 'Follow'}
              </button>
            </div>
          ))
        ) : (
          <p>Loading suggestions...</p>
        )}
      </div>
    </div>
  );
}

export default Suggestions;
