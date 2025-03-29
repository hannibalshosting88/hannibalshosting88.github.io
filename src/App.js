import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import About from './components/about/About';
import ProjectList from './components/projects/ProjectList';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <About />
        <ProjectList />
      </main>
      <Footer />
    </div>
  );
}

export default App;