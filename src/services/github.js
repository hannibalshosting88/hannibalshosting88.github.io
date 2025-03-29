// GitHub API service for fetching user and repository information

// Base GitHub API URL
const API_BASE_URL = 'https://api.github.com';

// Your GitHub username (you'll want to replace this with yours)
const USERNAME = 'hannibalshosting88';

// Function to fetch user profile information
export const fetchUserProfile = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${USERNAME}`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

// Function to fetch user repositories
export const fetchRepositories = async () => {
  try {
    // Sort by updated time to show most recently updated projects first
    const response = await fetch(
      `${API_BASE_URL}/users/${USERNAME}/repos?sort=updated&per_page=10`
    );
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
};

// Function to fetch README content for a specific repository
export const fetchReadme = async (repoName) => {
  try {
    // Fetch the README file
    const response = await fetch(
      `${API_BASE_URL}/repos/${USERNAME}/${repoName}/readme`
    );
    
    if (!response.ok) {
      // It's okay if a repo doesn't have a README
      if (response.status === 404) {
        return null;
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // The content is Base64 encoded, so we need to decode it
    // atob is a built-in function to decode Base64
    const content = atob(data.content);
    
    return content;
  } catch (error) {
    console.error(`Error fetching README for ${repoName}:`, error);
    return null;
  }
};