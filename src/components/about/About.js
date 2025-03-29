import React from 'react';

function About() {
  return (
    <section className="about">
      <h2>About Me</h2>
      <p>
        I'm a full-stack developer specializing in Linux administration, 
        containerization, and web development. Currently pursuing a B.S. in 
        Computer Science with experience in self-hosting services and 
        implementing secure network architectures.
      </p>
      <div className="skills">
        <h3>Technical Skills</h3>
        <ul>
          <li>Linux & Server Administration</li>
          <li>Docker & Containerization</li>
          <li>Web Development (HTML, CSS, JavaScript, Node.js)</li>
          <li>Network Security</li>
        </ul>
      </div>
    </section>
  );
}

export default About;