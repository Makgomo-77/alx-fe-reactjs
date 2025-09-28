// src/components/Search.jsx
import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    setLoading(true);
    setError(null);
    setUserData(null);

    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setUsername(e.target.value);
    if (error) setError(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">
            Search GitHub Users
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleInputChange}
            placeholder="Enter GitHub username..."
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !username.trim()}
          >
            Search
          </button>
        </div>
      </form>

      {loading && (
        <div>
          <p>Loading...</p>
        </div>
      )}

      {error && (
        <div>
          <p>Looks like we can't find the user</p>
          <p>{error}</p>
        </div>
      )}

      {userData && (
        <div>
          <div>
            <img
              src={userData.avatar_url}
              alt={`${userData.login}'s avatar`}
            />
            <div>
              <h2>{userData.name || userData.login}</h2>
              <p>@{userData.login}</p>
            </div>
          </div>
          
          {userData.bio && (
            <p>"{userData.bio}"</p>
          )}
          
          <div>
            <p>Repositories: {userData.public_repos}</p>
            <p>Followers: {userData.followers}</p>
            <p>Following: {userData.following}</p>
          </div>

          <a
            href={userData.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default Search;