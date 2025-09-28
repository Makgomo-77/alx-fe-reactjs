
import axios from 'axios';

class GitHubService {
  constructor() {
    this.baseURL = 'https://api.github.com/search/users?q';
    this.perPage = 30;
  }

  async makeRequest(url) {
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        }
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Rate limit exceeded. Please try again later.');
        }
        if (response.status === 422) {
          throw new Error('Invalid search query. Please check your search parameters.');
        }
        if (response.status === 404) {
          throw new Error('No users found matching your criteria.');
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

  // Enhanced API integration with location and minRepos support
  async advancedSearchUsers(params) {
    const {location, minRepos } = params;
    
    if (!query || query === 'type:user') {
      throw new Error('Please provide search criteria');
    }

    // Build the search query with all parameters
    const searchQuery = query.includes('type:user') ? query : `${query} type:user`;
    const encodedQuery = encodeURIComponent(searchQuery);
    
    let url = `${this.baseURL}/search/users?q=${encodedQuery}&per_page=${this.perPage}&page=${page}`;
    
    // Add sorting parameters if not best-match
    if (sort !== 'best-match') {
      url += `&sort=${sort}&order=${order}`;
    }

    const data = await this.makeRequest(url);
    
    // Enhance user data with additional details including location and repo count
    const enhancedUsers = await this.enrichUserData(data.items);
    
    return {
      users: enhancedUsers,
      totalCount: data.total_count,
      hasMore: data.items.length === this.perPage && (page * this.perPage) < data.total_count
    };
  }

  async searchUsers(query, sort = 'best-match', order = 'desc', page = 1) {
    return this.advancedSearchUsers({ query, sort, order, page });
  }

  async enrichUserData(users) {
    if (!users || users.length === 0) return [];

    // Get additional details for each user including location and repository count
    const userPromises = users.map(async (user) => {
      try {
        const userDetail = await this.getUserDetails(user.login);
        return {
          id: user.id,
          login: user.login,
          avatar_url: user.avatar_url,
          html_url: user.html_url,
          type: user.type,
          // Enhanced details including location and repository count
          name: userDetail.name,
          location: userDetail.location,
          public_repos: userDetail.public_repos,
          followers: userDetail.followers,
          following: userDetail.following,
          created_at: userDetail.created_at,
          updated_at: userDetail.updated_at,
          bio: userDetail.bio,
          blog: userDetail.blog,
          company: userDetail.company,
          twitter_username: userDetail.twitter_username,
          email: userDetail.email
        };
      } catch (error) {
        console.error(`Error fetching details for ${user.login}:`, error);
        // Return basic user data if detail fetch fails
        return {
          id: user.id,
          login: user.login,
          avatar_url: user.avatar_url,
          html_url: user.html_url,
          type: user.type
        };
      }
    });

    return Promise.all(userPromises);
  }

  async getUserDetails(username) {
    const url = `${this.baseURL}/users/${username}`;
    return await this.makeRequest(url);
  }

  // Single user search (backward compatibility)
  async fetchUserData(username) {
    const user = await this.getUserDetails(username);
    return user;
  }
}

export default new GitHubService();