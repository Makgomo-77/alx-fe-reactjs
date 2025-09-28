
import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form submission handler function
  const handleSubmit = (e) => {
    e.preventDefault();
    performSearch();
  };

  // Search function
  const performSearch = async () => {
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

  // Input change handler function
  const handleInputChange = (e) => {
    setUsername(e.target.value);
    if (error) setError(null);
  };

  // Clear search function
  const clearSearch = () => {
    setUsername('');
    setUserData(null);
    setError(null);
  };

  return (
    <div>
      {/* Form element with onSubmit handler */}
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
            <button type="submit" disabled={loading || !username.trim()}>
              Search
            </button>
            <button type="button" onClick={clearSearch}>
              Clear
            </button>
          </div>
        </div>
      </form>

      {/* Loading State */}
      {loading && (
        <div>
          <p>Loading...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div>
          <p>Looks like we cant find the user</p>
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
              <h2>{userData.name || userData.login}</h2>
              <p>@{userData.login}</p>
            </div>
          </div>
          
          {userData.bio && (
            <p>"{userData.bio}"</p>
          )}
          
          <div>
            <div>
              <p>Repositories: {userData.public_repos}</p>
            </div>
            <div>
              <p>Followers: {userData.followers}</p>
            </div>
            <div>
              <p>Following: {userData.following}</p>
            </div>
          </div>

          {userData.location && (
            <p>Location: {userData.location}</p>
          )}

          {userData.company && (
            <p>Company: {userData.company}</p>
          )}

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
  const buildQueryString = () => {
    const { username, location, minRepos, language, followers } = searchParams;
    let query = '';
    
    if (username) query += `${username} in:login`;
    if (location) query += ` location:"${location}"`;
    if (minRepos) query += ` repos:>${minRepos}`;
    if (language) query += ` language:${language}`;
    if (followers) query += ` followers:>${followers}`;
    
    return query.trim() || 'type:user';
  };

 {/* Advanced Search Fields using map */}
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            {advancedSearchFields.map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.id}
                  name={field.name}
                  value={searchParams[field.name]}
                  onChange={handleInputChange}
                  placeholder={field.placeholder}
                  min={field.min}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ))}
  );
};

export default Search;
