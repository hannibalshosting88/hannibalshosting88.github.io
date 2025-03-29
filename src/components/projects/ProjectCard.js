import React, { useState, useEffect } from 'react';
import { fetchReadme } from '../../services/github';

function ProjectCard({ project }) {
  const [readme, setReadme] = useState(null);
  const [loadingReadme, setLoadingReadme] = useState(false);

  useEffect(() => {
    // Function to fetch README for this project
    const getReadme = async () => {
      if (!project.name) return;
      
      setLoadingReadme(true);
      const readmeContent = await fetchReadme(project.name);
      setReadme(readmeContent);
      setLoadingReadme(false);
    };

    // Only fetch README when we expand the card (optional feature for later)
    // For now, we'll just leave this commented out to avoid too many API calls
    // getReadme();
  }, [project.name]);

  // Helper function to format dates
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="project-card">
      <h3>{project.name}</h3>
      <p>{project.description || 'No description available'}</p>
      
      {/* Additional project details */}
      <div className="project-details">
        {project.homepage && (
          <p>
            <strong>Demo:</strong> <a href={project.homepage} target="_blank" rel="noopener noreferrer">View Demo</a>
          </p>
        )}
        <p>
          <strong>Last Updated:</strong> {formatDate(project.updated_at)}
        </p>
        {project.stargazers_count > 0 && (
          <p>
            <strong>Stars:</strong> {project.stargazers_count}
          </p>
        )}
        {project.forks_count > 0 && (
          <p>
            <strong>Forks:</strong> {project.forks_count}
          </p>
        )}
      </div>
      
      <div className="project-footer">
        <span className="language">
          {project.language || 'Not specified'}
        </span>
        <a 
          href={project.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="view-button"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
}

export default ProjectCard;