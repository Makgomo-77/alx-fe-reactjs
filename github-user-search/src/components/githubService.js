import axios from 'axios';
// services/githubService.js
class GitHubService {
  constructor() {
    this.baseURL = 'https://api.github.com';
    this.perPage = 30; // Increased for better pagination
  }

  async makeRequest(url) {
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          // Note: Add your GitHub token here for higher rate limits
          // 'Authorization': `token ${process.env.REACT_APP_GITHUB_TOKEN}`
        }
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Rate limit exceeded. Please try again later.');
        }
        if (response.status === 422) {
          throw new Error('Invalid search query. Please check your search parameters.');
        }
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Network error. Please check your connection.');
      }
      throw error;
    }
  }

  async searchUsers(query, sort = 'best-match', order = 'desc', page = 1) {
    if (!query || query === 'type:user') {
      throw new Error('Please provide search criteria');
    }

    // GitHub Search API syntax
    const searchQuery = `${query} type:user`;
    const encodedQuery = encodeURIComponent(searchQuery);
    
    let url = `${this.baseURL}/search/users?q=${encodedQuery}&per_page=${this.perPage}&page=${page}`;
    
    // Add sorting parameters if not best-match
    if (sort !== 'best-match') {
      url += `&sort=${sort}&order=${order}`;
    }

    const data = await this.makeRequest(url);
    
    // Enhance user data with additional details
    const enhancedUsers = await this.enrichUserData(data.items);
    
    return {
      users: enhancedUsers,
      totalCount: data.total_count,
      hasMore: data.items.length === this.perPage && (page * this.perPage) < data.total_count
    };
  }

  async enrichUserData(users) {
    // Get additional details for each user
    const userPromises = users.map(async (user) => {
      try {
        const userDetail = await this.getUserDetails(user.login);
        return {
          ...user,
          name: userDetail.name,
          location: userDetail.location,
          public_repos: userDetail.public_repos,
          followers: userDetail.followers,
          following: userDetail.following,
          created_at: userDetail.created_at,
          bio: userDetail.bio,
          blog: userDetail.blog,
          company: userDetail.company,
          twitter_username: userDetail.twitter_username
        };
      } catch (error) {
        console.error(`Error fetching details for ${user.login}:`, error);
        return user; // Return basic user data if detail fetch fails
      }
    });

    return Promise.all(userPromises);
  }

  async getUserDetails(username) {
    const url = `${this.baseURL}/users/${username}`;
    return await this.makeRequest(url);
  }

  // Additional method to search users by specific criteria
  async searchUsersByCriteria(criteria) {
    const { username, location, minRepos, language, followers } = criteria;
    let query = '';
    
    if (username) query += `${username} in:login`;
    if (location) query += ` location:"${location}"`;
    if (minRepos) query += ` repos:>${minRepos}`;
    if (language) query += ` language:${language}`;
    if (followers) query += ` followers:>${followers}`;
    
    return this.searchUsers(query.trim());
  }
}

export default new GitHubService();

const GITHUB_API_BASE_URL = 'https://api.github.com/users';
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_BASE_URL}/${username}`);
    return response.data;
  } catch (error) {
    throw new Error("user not found");
  }
};
