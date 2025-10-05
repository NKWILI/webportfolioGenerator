// Import necessary libraries and components.
// React hooks for state and lifecycle management.
import React, { useState, useEffect } from 'react';
// Icons from the lucide-react library for a clean UI.
import { Mail, Phone, MapPin, Globe, Github, Linkedin, ExternalLink, Calendar, GraduationCap, Briefcase, Download } from 'lucide-react';

/**
 * PortfolioPreview component
 * This component renders a complete portfolio page based on the data provided.
 * It supports multiple themes and is fully responsive.
 * @param {object} props - The component props.
 * @param {object} props.portfolioData - An object containing all the data for the portfolio (personal info, skills, projects, etc.).
 * @param {string} [props.theme='light'] - The name of the theme to apply ('light', 'dark', 'synthwave').
 */
const PortfolioPreview = ({ portfolioData, theme = 'light' }) => {
  // Define theme-specific CSS classes for styling the component.
  // This allows for easy switching between light, dark, and other themes.
  const themeClasses = {
    light: {
      background: 'bg-white',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600',
      border: 'border-gray-200',
      cardBg: 'bg-gray-50',
      accent: 'text-blue-600'
    },
    dark: {
      background: 'bg-gray-900',
      text: 'text-white',
      textSecondary: 'text-gray-300',
      border: 'border-gray-700',
      cardBg: 'bg-gray-800',
      accent: 'text-blue-400'
    },
    synthwave: {
      background: 'bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900',
      text: 'text-pink-100',
      textSecondary: 'text-purple-200',
      border: 'border-pink-500',
      cardBg: 'bg-black bg-opacity-40',
      accent: 'text-cyan-400'
    }
  };

  // Select the current theme's classes based on the `theme` prop.
  const currentTheme = themeClasses[theme];

  // State for managing the visibility of the mobile navigation menu.
  const [mobileOpen, setMobileOpen] = useState(false);
  // Function to toggle the mobile menu's open/closed state.
  const toggleMobile = () => setMobileOpen(v => !v);

  // useEffect hook to handle side effects.
  // This effect adds a resize event listener to the window.
  useEffect(() => {
    // Function to run when the window is resized.
    const onResize = () => {
      // If the window width is 768px or more (desktop view), close the mobile menu.
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    // Add the event listener.
    window.addEventListener('resize', onResize);
    // Cleanup function: remove the event listener when the component unmounts.
    return () => window.removeEventListener('resize', onResize);
  }, []); // The empty dependency array means this effect runs only once on mount.

  // The main render method for the component.
  return (
    // Root container for the portfolio preview.
    <div id="portfolio-preview" className={`${currentTheme.background} ${currentTheme.text} min-h-screen font-sans w-full`}>
      {/* Navigation Bar: sticky to the top of the page. */}
      <nav className={`sticky top-0 z-50 ${currentTheme.cardBg} backdrop-blur-md bg-opacity-95 ${currentTheme.border} border-b mb-8`}>
        <div className="w-full px-6 md:px-10 lg:px-16">
          <div className="flex justify-between items-center py-4">
            {/* Logo/Name section of the navbar. */}
            <div className="text-xl font-bold">
              {portfolioData.personal.name || 'Portfolio'}
            </div>
            
            {/* Desktop Navigation Links: hidden on mobile screens. */}
            <div className="hidden md:flex space-x-6 text-sm">
              <a href="#home" className={`${currentTheme.accent} hover:underline transition-colors`}>Home</a>
              <a href="#about" className={`${currentTheme.textSecondary} hover:${currentTheme.accent} transition-colors`}>About</a>
              <a href="#skills" className={`${currentTheme.textSecondary} hover:${currentTheme.accent} transition-colors`}>Skills</a>
              <a href="#experience" className={`${currentTheme.textSecondary} hover:${currentTheme.accent} transition-colors`}>Experience</a>
              <a href="#projects" className={`${currentTheme.textSecondary} hover:${currentTheme.accent} transition-colors`}>Projects</a>
              <a href="#education" className={`${currentTheme.textSecondary} hover:${currentTheme.accent} transition-colors`}>Education</a>
              <a href="#contact" className={`${currentTheme.accent} px-3 py-1 rounded-lg ${currentTheme.cardBg} hover:opacity-80 transition-all text-sm`}>Contact</a>
            </div>

            {/* Mobile Menu Button: hidden on medium screens and up. */}
            <div className="md:hidden">
                <button
                  id="nav-toggle"
                  onClick={toggleMobile}
                  aria-controls="mobile-menu"
                  aria-expanded={mobileOpen}
                  className={`${currentTheme.textSecondary} hover:${currentTheme.text} transition-colors p-2 rounded-md focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500`}
                >
                  {/* Conditionally render a close (X) or hamburger icon based on mobile menu state. */}
                  {mobileOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
            </div>
          </div>
          {/* Mobile Menu: shown only when `mobileOpen` is true. */}
          <div
            id="mobile-menu"
            className={`md:hidden border-t ${currentTheme.border} px-6 pb-4 pt-2 space-y-2 ${mobileOpen ? '' : 'hidden'}`}
          >
            {/* Links in the mobile menu. Clicking a link also closes the menu. */}
            <a href="#home" onClick={() => setMobileOpen(false)} className={`${currentTheme.accent} block py-2`}>Home</a>
            <a href="#about" onClick={() => setMobileOpen(false)} className={`${currentTheme.textSecondary} hover:${currentTheme.accent} block py-2`}>About</a>
            <a href="#skills" onClick={() => setMobileOpen(false)} className={`${currentTheme.textSecondary} hover:${currentTheme.accent} block py-2`}>Skills</a>
            <a href="#experience" onClick={() => setMobileOpen(false)} className={`${currentTheme.textSecondary} hover:${currentTheme.accent} block py-2`}>Experience</a>
            <a href="#projects" onClick={() => setMobileOpen(false)} className={`${currentTheme.textSecondary} hover:${currentTheme.accent} block py-2`}>Projects</a>
            <a href="#education" onClick={() => setMobileOpen(false)} className={`${currentTheme.textSecondary} hover:${currentTheme.accent} block py-2`}>Education</a>
            <a href="#contact" onClick={() => setMobileOpen(false)} className={`${currentTheme.accent} block py-2`}>Contact</a>
          </div>
        </div>
      </nav>

  {/* Main Content Area */}
  <div className="w-full px-6 md:px-10 lg:px-16 py-8 max-w-5xl mx-auto">
        {/* Header Section: The main introduction area. */}
      <header id="home" className="text-center mb-12">
        {/* Profile Picture: Renders only if a profile image source is provided. */}
        {portfolioData.profileImage && (
          <div className="mb-8">
            <img
              src={portfolioData.profileImage.src}
              alt={portfolioData.personal.name || 'Profile picture'}
              className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full object-cover border-4 border-white shadow-xl"
            />
          </div>
        )}
        
        {/* Name and Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          {portfolioData.personal.name || 'Your Name'}
        </h1>
        <p className={`text-xl md:text-2xl ${currentTheme.textSecondary} mb-6`}>
          {portfolioData.personal.title || 'Your Job Title'}
        </p>
        
        {/* Contact Info: Email, Phone, Location. */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {portfolioData.personal.email && (
            <a href={`mailto:${portfolioData.personal.email}`} className={`flex items-center ${currentTheme.accent} hover:underline`}>
              <Mail size={16} className="mr-1" />
              {portfolioData.personal.email}
            </a>
          )}
          {portfolioData.personal.phone && (
            <a href={`tel:${portfolioData.personal.phone}`} className={`flex items-center ${currentTheme.accent} hover:underline`}>
              <Phone size={16} className="mr-1" />
              {portfolioData.personal.phone}
            </a>
          )}
          {portfolioData.personal.location && (
            <span className={`flex items-center ${currentTheme.textSecondary}`}>
              <MapPin size={16} className="mr-1" />
              {portfolioData.personal.location}
            </span>
          )}
        </div>

        {/* Social Media Links: Website, GitHub, LinkedIn. */}
        <div className="flex justify-center gap-6">
          {portfolioData.personal.website && (
            <a href={portfolioData.personal.website} target="_blank" rel="noopener noreferrer" className={`${currentTheme.accent} hover:underline`}>
              <Globe size={20} />
            </a>
          )}
          {portfolioData.personal.github && (
            <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" className={`${currentTheme.accent} hover:underline`}>
              <Github size={20} />
            </a>
          )}
          {portfolioData.personal.linkedin && (
            <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer" className={`${currentTheme.accent} hover:underline`}>
              <Linkedin size={20} />
            </a>
          )}
        </div>

        {/* Resume Download Button: Renders only if a resume file is provided. */}
        {portfolioData.resumeFile && (
          <div className="mt-8 text-center">
            <a
              href={portfolioData.resumeFile.src}
              download={portfolioData.resumeFile.name}
              className={`inline-flex items-center gap-3 ${currentTheme.accent} bg-opacity-20 px-8 py-4 rounded-xl hover:bg-opacity-30 hover:scale-105 transition-all font-semibold text-lg shadow-lg`}
            >
              <Download size={24} />
              Download Resume
            </a>
          </div>
        )}
      </header>

      {/* About Section: Renders only if 'about' data exists. */}
      {portfolioData.about && (
        <section id="about" className="mb-12">
          <h2 className={`text-2xl font-semibold mb-6 ${currentTheme.accent} border-b ${currentTheme.border} pb-2`}>
            About Me
          </h2>
          <p className={`text-lg leading-relaxed ${currentTheme.textSecondary}`}>
            {portfolioData.about}
          </p>
        </section>
      )}

      {/* Skills Section: Renders only if there are skills in the data. */}
      {portfolioData.skills && portfolioData.skills.length > 0 && (
        <section id="skills" className="mb-12">
          <h2 className={`text-2xl font-semibold mb-6 ${currentTheme.accent} border-b ${currentTheme.border} pb-2`}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {/* Map over the skills array and render each one as a styled badge. */}
            {portfolioData.skills.map((skill, index) => (
              <span
                key={index}
                className={`px-4 py-2 ${currentTheme.cardBg} ${currentTheme.border} border rounded-full text-sm font-medium`}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience Section: Renders only if there is work experience data. */}
      {portfolioData.experience && portfolioData.experience.length > 0 && (
        <section id="experience" className="mb-12">
          <h2 className={`text-2xl font-semibold mb-6 ${currentTheme.accent} border-b ${currentTheme.border} pb-2 flex items-center`}>
            <Briefcase size={24} className="mr-2" />
            Work Experience
          </h2>
          <div className="space-y-8">
            {/* Map over the experience array and render each job in a card. */}
            {portfolioData.experience.map((exp, index) => (
              <div key={index} className={`${currentTheme.cardBg} p-6 rounded-lg ${currentTheme.border} border`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{exp.position}</h3>
                  <span className={`${currentTheme.textSecondary} text-sm flex items-center`}>
                    <Calendar size={14} className="mr-1" />
                    {exp.duration}
                  </span>
                </div>
                <p className={`${currentTheme.accent} font-medium mb-1`}>{exp.company}</p>
                {exp.location && (
                  <p className={`${currentTheme.textSecondary} text-sm mb-3 flex items-center`}>
                    <MapPin size={14} className="mr-1" />
                    {exp.location}
                  </p>
                )}
                {exp.description && (
                  <p className={`${currentTheme.textSecondary} leading-relaxed`}>
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section: Renders only if there are projects in the data. */}
      {portfolioData.projects && portfolioData.projects.length > 0 && (
        <section id="projects" className="mb-12">
          <h2 className={`text-2xl font-semibold mb-6 ${currentTheme.accent} border-b ${currentTheme.border} pb-2`}>
            Projects
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Map over the projects array and render each one in a card. */}
            {portfolioData.projects.map((project, index) => (
              <div key={index} className={`${currentTheme.cardBg} p-6 rounded-lg ${currentTheme.border} border`}>
                <h3 className="text-xl font-semibold mb-3">{project.name}</h3>
                {project.description && (
                  <p className={`${currentTheme.textSecondary} mb-4 leading-relaxed`}>
                    {project.description}
                  </p>
                )}
                {/* Display technologies used if available. */}
                {project.technologies && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {/* Split the comma-separated technologies string into an array and map over it. */}
                      {project.technologies.split(',').map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={`px-2 py-1 text-xs ${currentTheme.accent} ${currentTheme.border} border rounded`}
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex gap-4">
                  {/* Link to the live demo of the project. */}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${currentTheme.accent} hover:underline flex items-center text-sm`}
                    >
                      <ExternalLink size={14} className="mr-1" />
                      Live Demo
                    </a>
                  )}
                  {/* Link to the project's source code on GitHub. */}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${currentTheme.accent} hover:underline flex items-center text-sm`}
                    >
                      <Github size={14} className="mr-1" />
                      Code
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section: Renders only if there is education data. */}
      {portfolioData.education && portfolioData.education.length > 0 && (
        <section id="education" className="mb-12">
          <h2 className={`text-2xl font-semibold mb-6 ${currentTheme.accent} border-b ${currentTheme.border} pb-2 flex items-center`}>
            <GraduationCap size={24} className="mr-2" />
            Education
          </h2>
          <div className="space-y-6">
            {/* Map over the education array and render each entry in a card. */}
            {portfolioData.education.map((edu, index) => (
              <div key={index} className={`${currentTheme.cardBg} p-6 rounded-lg ${currentTheme.border} border`}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{edu.degree}</h3>
                  <span className={`${currentTheme.textSecondary} text-sm flex items-center`}>
                    <Calendar size={14} className="mr-1" />
                    {edu.duration}
                  </span>
                </div>
                {edu.field && (
                  <p className={`${currentTheme.accent} font-medium mb-1`}>
                    {edu.field}
                  </p>
                )}
                <p className={`${currentTheme.textSecondary} mb-1`}>{edu.institution}</p>
                {edu.location && (
                  <p className={`${currentTheme.textSecondary} text-sm flex items-center`}>
                    <MapPin size={14} className="mr-1" />
                    {edu.location}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

        {/* Contact Section */}
        <section id="contact" className="mb-12">
          <h2 className={`text-2xl font-semibold mb-6 ${currentTheme.accent} border-b ${currentTheme.border} pb-2`}>
            Get In Touch
          </h2>
          <div className="text-center">
            <p className={`text-lg ${currentTheme.textSecondary} mb-8`}>
              I'm always interested in new opportunities and exciting projects. Let's connect!
            </p>
            
            {/* Contact details (Email and Phone). */}
            <div className="flex justify-center gap-8 mb-8">
              {portfolioData.personal.email && (
                <a 
                  href={`mailto:${portfolioData.personal.email}`}
                  className={`${currentTheme.accent} hover:underline flex items-center gap-2`}
                >
                  <Mail size={20} />
                  {portfolioData.personal.email}
                </a>
              )}
              
              {portfolioData.personal.phone && (
                <a 
                  href={`tel:${portfolioData.personal.phone}`}
                  className={`${currentTheme.accent} hover:underline flex items-center gap-2`}
                >
                  <Phone size={20} />
                  {portfolioData.personal.phone}
                </a>
              )}
            </div>
            
            {/* Social media links for contact. */}
            <div className="flex justify-center gap-6">
              {portfolioData.personal.github && (
                <a 
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${currentTheme.accent} hover:scale-110 transition-transform`}
                >
                  <Github size={24} />
                </a>
              )}
              
              {portfolioData.personal.linkedin && (
                <a 
                  href={portfolioData.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${currentTheme.accent} hover:scale-110 transition-transform`}
                >
                  <Linkedin size={24} />
                </a>
              )}
            </div>
            
          </div>
        </section>

        {/* Footer Section */}
        <footer className={`text-center ${currentTheme.textSecondary} text-sm mt-16 pt-8 ${currentTheme.border} border-t`}>
          {/* Copyright notice with the current year and user's name. */}
          <p>© {new Date().getFullYear()} {portfolioData.personal.name || 'Your Name'}. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

// Export the component for use in other parts of the application.
export default PortfolioPreview;