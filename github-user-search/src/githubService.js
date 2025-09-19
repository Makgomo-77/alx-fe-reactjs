import axios from 'axios';

const GITHUB_API_BASE_URL = 'https://api.github.com/users';
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_BASE_URL}/${username}`);
    return response.data;
  } catch (error) {
    throw new Error("user not found");
  }
};
