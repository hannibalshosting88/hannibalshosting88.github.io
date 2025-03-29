import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { fetchRepositories } from '../../services/github';

function ProjectList() {
  // State to store repositories data
  const [repositories, setRepositories] = useState([]);
  // State to track loading status
  const [loading, setLoading] = useState(true);
  // State to track if there was an error
  const [error, setError] = useState(null);

  // useEffect hook to fetch data when component mounts
  useEffect(() => {
    const getRepositories = async () => {
      try {
        setLoading(true);
        const repoData = await fetchRepositories();
        setRepositories(repoData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch repositories');
        setLoading(false);
        console.error(err);
      }
    };

    getRepositories();
  }, []); // Empty dependency array means this runs once when component mounts

  // If loading, show loading message
  if (loading) {
    return (
      <section className="projects">
        <h2>My Projects</h2>
        <p>Loading repositories...</p>
      </section>
    );
  }

  // If error, show error message
  if (error) {
    return (
      <section className="projects">
        <h2>My Projects</h2>
        <p className="error-message">{error}</p>
      </section>
    );
  }

  // If no repositories found
  if (repositories.length === 0) {
    return (
      <section className="projects">
        <h2>My Projects</h2>
        <p>No repositories found.</p>
      </section>
    );
  }

  // Render the repositories
  return (
    <section className="projects">
      <h2>My Projects</h2>
      <div className="project-grid">
        {repositories.map(repo => (
          <ProjectCard key={repo.id} project={repo} />
        ))}
      </div>
    </section>
  );
}

export default ProjectList;