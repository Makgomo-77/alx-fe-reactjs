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
    // Clear error when user starts typing
    if (error) setError(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">
            Search GitHub Users
          </label>
          <div>
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
        </div>
      </form>

      {/* Loading State */}
      {loading && (
        <div>
          <div>Loading...</div>
          <p>Loading...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div>
          <div>
            <svg viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p>Looks like we can't find the user</p>
          <p>{error}</p>
        </div>
      )}

      {/* User Data Display */}
      {userData && (
        <div>
          <div>
            <img
              src={userData.avatar_url}
              alt={`${userData.login}'s avatar`}
            />
            <div>
              <h2>
                {userData.name || userData.login}
              </h2>
              <p>@{userData.login}</p>
            </div>
          </div>
          
          {userData.bio && (
            <p>"{userData.bio}"</p>
          )}
          
          <div>
            <div>
              <p>{userData.public_repos}</p>
              <p>Repositories</p>
            </div>
            <div>
              <p>{userData.followers}</p>
              <p>Followers</p>
            </div>
            <div>
              <p>{userData.following}</p>
              <p>Following</p>
            </div>
            <div>
              <p>
                {userData.public_gists}
              </p>
              <p>Gists</p>
            </div>
          </div>

          <div>
            {userData.location && (
              <p>
                <span>Location:</span> {userData.location}
              </p>
            )}
            {userData.company && (
              <p>
                <span>Company:</span> {userData.company}
              </p>
            )}
            {userData.blog && (
              <p>
                <span>Blog:</span>{' '}
                <a href={userData.blog} target="_blank" rel="noopener noreferrer">
                  {userData.blog}
                </a>
              </p>
            )}
            <p>
              <span>Joined:</span>{' '}
              {new Date(userData.created_at).toLocaleDateString()}
            </p>
          </div>

          <div>
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View GitHub Profile
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;