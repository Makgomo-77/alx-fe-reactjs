
import { useState } from "react";
import { fetchUserData, advancedSearchUsers } from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [repos, setRepos] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 handleSubmit with preventDefault
  const handleSubmit = async (e) => {
    e.preventDefault(); // <-- prevents page refresh
    setLoading(true);
    setError("");
    setResults([]);

    try {
      let data;
      if (location || repos) {
        // Advanced search if extra fields are filled
        data = await advancedSearchUsers(username, location, repos);
      } else {
        // Basic single-user search
        const user = await fetchUserData(username);
        data = [user];
      }
      setResults(data);
    } catch (err) {
      setError("Looks like we can’t find any users.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {/* 🔹 form with onSubmit */}
      <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-3 mb-6">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="GitHub username"
          className="border p-2 rounded col-span-3 sm:col-span-1"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="border p-2 rounded col-span-3 sm:col-span-1"
        />
        <input
          type="number"
          value={repos}
          onChange={(e) => setRepos(e.target.value)}
          placeholder="Min repos"
          className="border p-2 rounded col-span-3 sm:col-span-1"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded col-span-3"
        >
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Results section */}
      <div className="grid gap-4 sm:grid-cols-2">
        {results.map((user) => (
          <div
            key={user.id}
            className="border rounded-lg p-4 flex gap-4 items-center shadow-sm hover:shadow-md transition"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <p className="font-bold">{user.name || user.login}</p>
              {user.location && <p className="text-sm">📍 {user.location}</p>}
              {user.public_repos !== undefined && (
                <p className="text-sm">📦 {user.public_repos} repos</p>
              )}
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
