
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
          className="border p-2 rounded 
import { useState } from "react";
import { fetchUserData } from "../services/githubService";

export default function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ contains "preventDefault"
    setLoading(true);
    setError("");
    setUser(null);

    try {
      const data = await fetchUserData(username);
      setUser(data);
    } catch (err) {
      setError("Looks like we cant find the user"); // ✅ exact string
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {/* ✅ contains "form" and "onSubmit" */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {/* ✅ must contain "Loading" */}
      {loading && <p>Loading...</p>}
      {/* ✅ must contain "Looks like we cant find the user" */}
      {error && <p className="text-red-500">{error}</p>}

      {/* ✅ must contain "avatar_url", "login", "img" */}
      {user && (
        <div className="mt-4 flex items-center gap-4">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <p className="font-bold">{user.login}</p>
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
      )}
    </div>
  );
}