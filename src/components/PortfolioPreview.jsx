// Import necessary libraries and components.
// React hooks for state and lifecycle management.
import React, { useState, useEffect } from 'react';
// Icons from the lucide-react library for a clean UI.
import { 
  Mail, Phone, MapPin, Globe, Github, Linkedin, ExternalLink, Calendar, 
  GraduationCap, Briefcase, Download, Code, Terminal, Building2, Factory,
  Laptop, Award, TrendingUp, ArrowUpRight, Users, Zap, Clock, CheckCircle
} from 'lucide-react';
// Import Simple Icons for real technology logos
import * as SimpleIcons from 'simple-icons';

/**
 * Utility Functions for Duration Calculation
 */

// Calculate duration between two dates in "X yrs Y mos" format
const calculateDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = endDate === 'Present' || !endDate ? new Date() : new Date(endDate);
  
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  const parts = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? 's' : ''}`);
  
  return parts.length > 0 ? parts.join(' ') : '1 mo';
};

// Get industry icon based on company name or industry type
const getIndustryIcon = (companyName = '') => {
  const name = companyName.toLowerCase();
  
  // Tech companies
  if (name.includes('tech') || name.includes('soft') || name.includes('digital') || 
      name.includes('labs') || name.includes('innovations')) {
    return Laptop;
  }
  
  // Startups
  if (name.includes('startup') || name.includes('xyz')) {
    return TrendingUp;
  }
  
  // Manufacturing/Industrial
  if (name.includes('factory') || name.includes('manufacturing') || name.includes('industrial')) {
    return Factory;
  }
  
  // Default to building
  return Building2;
};

/**
 * Utility Functions for Skills Section
 */

// Helper component to render Simple Icons as SVG
const SimpleIconSVG = ({ icon, size = 24, className = '' }) => {
  if (!icon) return null;
  
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill={`#${icon.hex}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
};

// Map skill names to Simple Icons (returns icon data object or null)
const getSkillIcon = (skillName) => {
  const skill = skillName.toLowerCase().trim();
  
  // Direct mappings to Simple Icons
  // Frontend Frameworks & Libraries
  if (skill === 'react' || skill === 'reactjs') return SimpleIcons.siReact;
  if (skill === 'vue' || skill === 'vue.js' || skill === 'vuejs') return SimpleIcons.siVuedotjs;
  if (skill === 'angular' || skill === 'angularjs') return SimpleIcons.siAngular;
  if (skill === 'svelte' || skill === 'sveltejs') return SimpleIcons.siSvelte;
  if (skill === 'next' || skill === 'next.js' || skill === 'nextjs') return SimpleIcons.siNextdotjs;
  if (skill === 'nuxt' || skill === 'nuxt.js' || skill === 'nuxtjs') return SimpleIcons.siNuxtdotjs;
  if (skill === 'gatsby' || skill === 'gatsbyjs') return SimpleIcons.siGatsby;
  if (skill === 'ember' || skill === 'ember.js' || skill === 'emberjs') return SimpleIcons.siEmberdotjs;
  
  // Languages
  if (skill === 'javascript' || skill === 'js') return SimpleIcons.siJavascript;
  if (skill === 'typescript' || skill === 'ts') return SimpleIcons.siTypescript;
  if (skill === 'python') return SimpleIcons.siPython;
  if (skill === 'java') return SimpleIcons.siOracle;
  if (skill === 'c#' || skill === 'csharp') return SimpleIcons.siCsharp;
  if (skill === 'c++' || skill === 'cpp') return SimpleIcons.siCplusplus;
  if (skill === 'c') return SimpleIcons.siC;
  if (skill === 'php') return SimpleIcons.siPhp;
  if (skill === 'ruby') return SimpleIcons.siRuby;
  if (skill === 'go' || skill === 'golang') return SimpleIcons.siGo;
  if (skill === 'rust') return SimpleIcons.siRust;
  if (skill === 'swift') return SimpleIcons.siSwift;
  if (skill === 'kotlin') return SimpleIcons.siKotlin;
  if (skill === 'scala') return SimpleIcons.siScala;
  if (skill === 'r') return SimpleIcons.siR;
  
  // Styling & Markup
  if (skill === 'html' || skill === 'html5') return SimpleIcons.siHtml5;
  if (skill === 'css' || skill === 'css3') return SimpleIcons.siCss3;
  if (skill === 'sass' || skill === 'scss') return SimpleIcons.siSass;
  if (skill === 'tailwind' || skill === 'tailwind css' || skill === 'tailwindcss') return SimpleIcons.siTailwindcss;
  if (skill === 'bootstrap') return SimpleIcons.siBootstrap;
  if (skill === 'materialui' || skill === 'material-ui' || skill === 'mui') return SimpleIcons.siMui;
  
  // Backend Frameworks
  if (skill === 'node' || skill === 'node.js' || skill === 'nodejs') return SimpleIcons.siNodedotjs;
  if (skill === 'express' || skill === 'express.js' || skill === 'expressjs') return SimpleIcons.siExpress;
  if (skill === 'nestjs' || skill === 'nest.js' || skill === 'nest') return SimpleIcons.siNestjs;
  if (skill === 'django') return SimpleIcons.siDjango;
  if (skill === 'flask') return SimpleIcons.siFlask;
  if (skill === 'fastapi') return SimpleIcons.siFastapi;
  if (skill === 'spring' || skill === 'spring boot' || skill === 'springboot') return SimpleIcons.siSpring;
  if (skill === 'laravel') return SimpleIcons.siLaravel;
  if (skill === 'rails' || skill === 'ruby on rails') return SimpleIcons.siRubyonrails;
  if (skill === '.net' || skill === 'dotnet' || skill === 'asp.net') return SimpleIcons.siDotnet;
  
  // Databases
  if (skill === 'mysql') return SimpleIcons.siMysql;
  if (skill === 'postgresql' || skill === 'postgres') return SimpleIcons.siPostgresql;
  if (skill === 'mongodb' || skill === 'mongo') return SimpleIcons.siMongodb;
  if (skill === 'redis') return SimpleIcons.siRedis;
  if (skill === 'sqlite') return SimpleIcons.siSqlite;
  if (skill === 'mariadb') return SimpleIcons.siMariadb;
  if (skill === 'firebase') return SimpleIcons.siFirebase;
  if (skill === 'supabase') return SimpleIcons.siSupabase;
  if (skill === 'dynamodb' || skill === 'dynamo') return SimpleIcons.siAmazondynamodb;
  if (skill === 'cassandra') return SimpleIcons.siApachecassandra;
  if (skill === 'elasticsearch') return SimpleIcons.siElasticsearch;
  
  // DevOps & Cloud
  if (skill === 'docker') return SimpleIcons.siDocker;
  if (skill === 'kubernetes' || skill === 'k8s') return SimpleIcons.siKubernetes;
  if (skill === 'aws' || skill === 'amazon web services') return SimpleIcons.siAmazonaws;
  if (skill === 'azure' || skill === 'microsoft azure') return SimpleIcons.siMicrosoftazure;
  if (skill === 'gcp' || skill === 'google cloud' || skill === 'google cloud platform') return SimpleIcons.siGooglecloud;
  if (skill === 'heroku') return SimpleIcons.siHeroku;
  if (skill === 'vercel') return SimpleIcons.siVercel;
  if (skill === 'netlify') return SimpleIcons.siNetlify;
  if (skill === 'digitalocean') return SimpleIcons.siDigitalocean;
  
  // Version Control
  if (skill === 'git') return SimpleIcons.siGit;
  if (skill === 'github') return SimpleIcons.siGithub;
  if (skill === 'gitlab') return SimpleIcons.siGitlab;
  if (skill === 'bitbucket') return SimpleIcons.siBitbucket;
  
  // CI/CD
  if (skill === 'jenkins') return SimpleIcons.siJenkins;
  if (skill === 'github actions' || skill === 'githubactions') return SimpleIcons.siGithubactions;
  if (skill === 'gitlab ci' || skill === 'gitlabci') return SimpleIcons.siGitlab;
  if (skill === 'circleci' || skill === 'circle ci') return SimpleIcons.siCircleci;
  if (skill === 'travis' || skill === 'travis ci' || skill === 'travisci') return SimpleIcons.siTravisci;
  
  // Testing
  if (skill === 'jest') return SimpleIcons.siJest;
  if (skill === 'mocha') return SimpleIcons.siMocha;
  if (skill === 'cypress') return SimpleIcons.siCypress;
  if (skill === 'selenium') return SimpleIcons.siSelenium;
  if (skill === 'playwright') return SimpleIcons.siPlaywright;
  if (skill === 'vitest') return SimpleIcons.siVitest;
  
  // Mobile
  if (skill === 'react native' || skill === 'reactnative') return SimpleIcons.siReact;
  if (skill === 'flutter') return SimpleIcons.siFlutter;
  if (skill === 'android') return SimpleIcons.siAndroid;
  if (skill === 'ios') return SimpleIcons.siIos;
  
  // APIs & Data
  if (skill === 'graphql') return SimpleIcons.siGraphql;
  if (skill === 'rest' || skill === 'rest api' || skill === 'rest apis') return null; // No specific icon, will use fallback
  if (skill === 'api' || skill === 'apis') return null; // No specific icon, will use fallback
  
  // Build Tools
  if (skill === 'webpack') return SimpleIcons.siWebpack;
  if (skill === 'vite') return SimpleIcons.siVite;
  if (skill === 'rollup') return SimpleIcons.siRollupdotjs;
  if (skill === 'parcel') return SimpleIcons.siParcel;
  if (skill === 'gulp') return SimpleIcons.siGulp;
  if (skill === 'grunt') return SimpleIcons.siGrunt;
  
  // Design Tools
  if (skill === 'figma') return SimpleIcons.siFigma;
  if (skill === 'sketch') return SimpleIcons.siSketch;
  if (skill === 'adobe xd' || skill === 'xd') return SimpleIcons.siAdobexd;
  if (skill === 'photoshop') return SimpleIcons.siAdobephotoshop;
  if (skill === 'illustrator') return SimpleIcons.siAdobeillustrator;
  
  // Other Popular Tools
  if (skill === 'postman') return SimpleIcons.siPostman;
  if (skill === 'insomnia') return SimpleIcons.siInsomnia;
  if (skill === 'jira') return SimpleIcons.siJira;
  if (skill === 'confluence') return SimpleIcons.siConfluence;
  if (skill === 'slack') return SimpleIcons.siSlack;
  if (skill === 'discord') return SimpleIcons.siDiscord;
  if (skill === 'notion') return SimpleIcons.siNotion;
  if (skill === 'trello') return SimpleIcons.siTrello;
  
  // If no match found, return null (will use fallback icon)
  return null;
};

// Detect skill category based on name
const getSkillCategory = (skillName) => {
  const skill = skillName.toLowerCase();
  
  // Frontend
  if (skill.includes('react') || skill.includes('vue') || skill.includes('angular') || 
      skill.includes('html') || skill.includes('css') || skill.includes('tailwind') ||
      skill.includes('sass') || skill.includes('next') || skill.includes('svelte') ||
      skill.includes('typescript') && !skill.includes('node')) {
    return 'frontend';
  }
  
  // Backend
  if (skill.includes('node') || skill.includes('express') || skill.includes('python') ||
      skill.includes('django') || skill.includes('flask') || skill.includes('java') ||
      skill.includes('spring') || skill.includes('php') || skill.includes('laravel') ||
      skill.includes('ruby') || skill.includes('rails') || skill.includes('go') ||
      skill.includes('rust') || skill.includes('c#') || skill.includes('.net') ||
      skill.includes('sql') || skill.includes('postgres') || skill.includes('mysql') ||
      skill.includes('mongo') || skill.includes('redis') || skill.includes('database')) {
    return 'backend';
  }
  
  // Testing
  if (skill.includes('jest') || skill.includes('mocha') || skill.includes('test') ||
      skill.includes('cypress') || skill.includes('selenium') || skill.includes('junit')) {
    return 'testing';
  }
  
  // Design/UX
  if (skill.includes('figma') || skill.includes('sketch') || skill.includes('adobe') ||
      skill.includes('design') || skill.includes('ux') || skill.includes('ui')) {
    return 'design';
  }
  
  // Tools/DevOps (default for infrastructure tools)
  if (skill.includes('docker') || skill.includes('kubernetes') || skill.includes('aws') ||
      skill.includes('azure') || skill.includes('gcp') || skill.includes('git') ||
      skill.includes('ci/cd') || skill.includes('jenkins') || skill.includes('cloud')) {
    return 'tools';
  }
  
  // Default to frontend for programming languages
  return 'frontend';
};

// Get category color classes (for borders and accents)
const getCategoryColors = (category, theme) => {
  const colorMap = {
    frontend: {
      border: 'border-indigo-500/50',
      hoverBorder: 'hover:border-indigo-500',
      hoverRing: 'hover:ring-indigo-500/20',
      iconColor: 'text-indigo-500',
      hoverIconColor: 'hover:text-indigo-600',
      bg: theme === 'dark' ? 'bg-indigo-500/5' : theme === 'synthwave' ? 'bg-indigo-500/10' : 'bg-indigo-50'
    },
    backend: {
      border: 'border-emerald-500/50',
      hoverBorder: 'hover:border-emerald-500',
      hoverRing: 'hover:ring-emerald-500/20',
      iconColor: 'text-emerald-500',
      hoverIconColor: 'hover:text-emerald-600',
      bg: theme === 'dark' ? 'bg-emerald-500/5' : theme === 'synthwave' ? 'bg-emerald-500/10' : 'bg-emerald-50'
    },
    tools: {
      border: 'border-amber-500/50',
      hoverBorder: 'hover:border-amber-500',
      hoverRing: 'hover:ring-amber-500/20',
      iconColor: 'text-amber-500',
      hoverIconColor: 'hover:text-amber-600',
      bg: theme === 'dark' ? 'bg-amber-500/5' : theme === 'synthwave' ? 'bg-amber-500/10' : 'bg-amber-50'
    },
    testing: {
      border: 'border-fuchsia-500/50',
      hoverBorder: 'hover:border-fuchsia-500',
      hoverRing: 'hover:ring-fuchsia-500/20',
      iconColor: 'text-fuchsia-500',
      hoverIconColor: 'hover:text-fuchsia-600',
      bg: theme === 'dark' ? 'bg-fuchsia-500/5' : theme === 'synthwave' ? 'bg-fuchsia-500/10' : 'bg-fuchsia-50'
    },
    design: {
      border: 'border-sky-500/50',
      hoverBorder: 'hover:border-sky-500',
      hoverRing: 'hover:ring-sky-500/20',
      iconColor: 'text-sky-500',
      hoverIconColor: 'hover:text-sky-600',
      bg: theme === 'dark' ? 'bg-sky-500/5' : theme === 'synthwave' ? 'bg-sky-500/10' : 'bg-sky-50'
    }
  };
  
  return colorMap[category] || colorMap.frontend;
};

/**
 * Utility Functions for Projects Section
 */

// Get achievement icon based on content
const getAchievementIcon = (achievement) => {
  const text = achievement.toLowerCase();
  
  if (text.includes('user') || text.includes('customer') || text.includes('people')) {
    return Users;
  }
  if (text.includes('performance') || text.includes('faster') || text.includes('speed') || 
      text.includes('improve') || text.includes('%')) {
    return Zap;
  }
  if (text.includes('growth') || text.includes('increase') || text.includes('revenue') || 
      text.includes('sales')) {
    return TrendingUp;
  }
  if (text.includes('time') || text.includes('hour') || text.includes('day') || 
      text.includes('save')) {
    return Clock;
  }
  
  return CheckCircle; // Default icon
};

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
      {/* Inline styles for skill card animations */}
      <style>{`
        @keyframes skillFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .skill-card {
          animation: skillFadeIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        /* Ensure smooth transitions on all interactive elements */
        .skill-card * {
          transition-property: transform, color, opacity;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Experience Timeline Animations */
        @keyframes experienceFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (min-width: 768px) {
          @keyframes experienceFadeInLeft {
            from {
              opacity: 0;
              transform: translateX(-24px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          .experience-card:nth-child(odd) {
            animation: experienceFadeInLeft 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          
          .experience-card:nth-child(even) {
            animation: experienceFadeInLeft 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
        }
        
        @media (max-width: 767px) {
          .experience-card {
            animation: experienceFadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
        }
        
        /* Line clamp utilities for text truncation */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Details/Summary styling for Read More */
        details summary {
          position: relative;
        }
        
        details[open] summary .line-clamp-2,
        details[open] summary .line-clamp-3 {
          display: none;
        }
        
        /* Project Card Animations */
        @keyframes projectFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .project-card {
          animation: projectFadeIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        /* Image zoom effect container */
        .project-image-container {
          overflow: hidden;
          position: relative;
        }
        
        .project-image {
          transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1),
                      filter 500ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .project-card:hover .project-image {
          transform: scale(1.05);
          filter: brightness(1.1);
        }
        
        /* Gradient overlay on image hover */
        .project-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
          opacity: 0;
          transition: opacity 300ms;
        }
        
        .project-card:hover .project-image-overlay {
          opacity: 1;
        }
      `}</style>
      
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
            Skills & Technologies
          </h2>
          
          {/* Skills Grid - Responsive columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {portfolioData.skills.map((skill, index) => {
              const category = getSkillCategory(skill);
              const colors = getCategoryColors(category, theme);
              const simpleIcon = getSkillIcon(skill);
              
              return (
                <div
                  key={index}
                  data-skill-category={category}
                  className={`
                    group relative
                    ${currentTheme.cardBg} ${colors.bg}
                    border-2 ${colors.border} ${colors.hoverBorder}
                    rounded-lg p-4
                    transition-all duration-200 ease-out
                    hover:shadow-lg hover:-translate-y-0.5 hover:scale-110
                    hover:ring-4 ${colors.hoverRing}
                    skill-card
                  `}
                  style={{
                    animationDelay: `${index * 40}ms`,
                    animationFillMode: 'backwards'
                  }}
                >
                  {/* Icon - positioned differently on mobile vs desktop */}
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3">
                    <div className={`
                      transition-all duration-200
                      group-hover:scale-105 group-hover:rotate-3
                      shrink-0
                    `}>
                      {simpleIcon ? (
                        <SimpleIconSVG 
                          icon={simpleIcon} 
                          size={24}
                          className="transition-transform duration-200"
                        />
                      ) : (
                        // Fallback to Lucide Terminal icon if no Simple Icon found
                        <Terminal size={24} strokeWidth={2} className={`${colors.iconColor}`} />
                      )}
                    </div>
                    
                    {/* Skill Name */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`
                        font-semibold text-sm md:text-base
                        ${currentTheme.text}
                        truncate
                        transition-colors duration-200
                      `}>
                        {skill}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Experience Section: Renders only if there is work experience data. */}
      {portfolioData.experience && portfolioData.experience.length > 0 && (
        <section id="experience" className="mb-12">
          <h2 className={`text-2xl font-semibold mb-8 ${currentTheme.accent} border-b ${currentTheme.border} pb-2 flex items-center`}>
            <Briefcase size={24} className="mr-2" />
            Work Experience
          </h2>
          
          {/* Timeline Container - relative positioning for the vertical line */}
          <div className="relative">
            {/* Vertical Timeline Line - hidden on mobile, visible on desktop */}
            <div className={`
              hidden md:block absolute left-[36px] top-0 bottom-0 w-0.5 
              ${theme === 'dark' ? 'bg-gray-700' : theme === 'synthwave' ? 'bg-pink-500/30' : 'bg-gray-200'}
            `} />
            
            {/* Experience Cards */}
            <div className="space-y-8 md:space-y-10">
              {portfolioData.experience.map((exp, index) => {
                const IconComponent = getIndustryIcon(exp.company);
                const duration = calculateDuration(
                  exp.duration?.split(' - ')[0] || exp.duration,
                  exp.duration?.split(' - ')[1] || 'Present'
                );
                const isCurrent = exp.duration?.includes('Present') || false;
                
                return (
                  <div
                    key={index}
                    className="experience-card relative"
                    style={{
                      animationDelay: `${index * 60}ms`,
                      animationFillMode: 'backwards'
                    }}
                  >
                    {/* Timeline Dot & Date Badge - Desktop Only */}
                    <div className="hidden md:flex absolute left-0 top-6 items-center">
                      {/* Dot */}
                      <div className={`
                        w-[73px] h-[73px] rounded-full flex items-center justify-center
                        ${currentTheme.cardBg} border-4 ${currentTheme.border}
                        ${isCurrent ? `ring-2 ${currentTheme.accent} ring-opacity-30` : ''}
                        transition-all duration-200
                      `}>
                        <IconComponent 
                          size={32} 
                          className={`${currentTheme.accent}`}
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>
                    
                    {/* Card Content */}
                    <div className={`
                      ml-0 md:ml-[120px]
                      ${currentTheme.cardBg} 
                      border-2 ${currentTheme.border}
                      rounded-xl p-5 md:p-6
                      shadow-sm
                      transition-all duration-200 ease-out
                      hover:-translate-y-0.5 hover:scale-[1.01]
                      hover:shadow-lg hover:ring-2 ${currentTheme.accent} hover:ring-opacity-20
                      ${isCurrent ? `ring-1 ${currentTheme.accent} ring-opacity-30` : ''}
                    `}>
                      {/* Header Row */}
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 md:gap-4 mb-3">
                        <div className="flex-1">
                          {/* Position Title */}
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className={`text-lg md:text-xl font-semibold ${currentTheme.text}`}>
                              {exp.position}
                            </h3>
                            {isCurrent && (
                              <span className={`
                                px-2 py-0.5 text-xs font-medium rounded-full
                                ${theme === 'dark' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 
                                  theme === 'synthwave' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 
                                  'bg-green-50 text-green-700 border border-green-200'}
                              `}>
                                Present
                              </span>
                            )}
                          </div>
                          
                          {/* Company Name */}
                          <p className={`${currentTheme.accent} font-medium text-base md:text-lg mb-1`}>
                            {exp.company}
                          </p>
                          
                          {/* Location */}
                          {exp.location && (
                            <p className={`${currentTheme.textSecondary} text-sm flex items-center gap-1`}>
                              <MapPin size={14} />
                              {exp.location}
                            </p>
                          )}
                        </div>
                        
                        {/* Duration with Calculated Time */}
                        <div className={`
                          ${currentTheme.textSecondary} text-sm md:text-right
                          flex md:flex-col items-center md:items-end gap-2
                        `}>
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{exp.duration}</span>
                          </div>
                          <span className={`text-xs ${currentTheme.accent} font-medium`}>
                            • {duration}
                          </span>
                        </div>
                      </div>
                      
                      {/* Description with Details/Summary for "Read More" */}
                      {exp.description && (
                        <details className="group mt-4" open={exp.description.length < 200}>
                          <summary className={`
                            ${currentTheme.textSecondary} leading-relaxed cursor-pointer
                            list-none
                          `}>
                            <div className="line-clamp-3 md:line-clamp-2">
                              {exp.description}
                            </div>
                            <span className={`
                              inline-flex items-center gap-1 mt-2 text-sm font-medium
                              ${currentTheme.accent} hover:underline
                              group-open:hidden
                            `}>
                              Read more <ArrowUpRight size={14} />
                            </span>
                          </summary>
                          <div className={`${currentTheme.textSecondary} leading-relaxed mt-2`}>
                            {exp.description}
                            <span className={`
                              inline-flex items-center gap-1 ml-2 text-sm font-medium
                              ${currentTheme.accent} hover:underline cursor-pointer
                            `}>
                              Show less
                            </span>
                          </div>
                        </details>
                      )}
                      
                      {/* Tech Stack Tags (if available in future) */}
                      {exp.techStack && exp.techStack.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {exp.techStack.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className={`
                                px-2.5 py-1 text-xs font-medium rounded-full
                                ${currentTheme.border} border
                                ${theme === 'dark' ? 'bg-white/5' : theme === 'synthwave' ? 'bg-black/20' : 'bg-gray-50'}
                                ${currentTheme.textSecondary}
                                hover:${currentTheme.accent} transition-colors
                              `}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {/* Achievement Highlights (if available in future) */}
                      {exp.achievements && exp.achievements.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {exp.achievements.slice(0, 2).map((achievement, achIndex) => (
                            <div
                              key={achIndex}
                              className={`
                                flex items-start gap-2 px-3 py-2 rounded-lg
                                ${theme === 'dark' ? 'bg-green-500/10 border border-green-500/20' :
                                  theme === 'synthwave' ? 'bg-cyan-500/10 border border-cyan-500/20' :
                                  'bg-green-50 border border-green-200'}
                              `}
                            >
                              <Award size={14} className="mt-0.5 shrink-0 text-green-600" />
                              <span className={`text-xs ${currentTheme.textSecondary}`}>
                                {achievement}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section: Renders only if there are projects in the data. */}
      {portfolioData.projects && portfolioData.projects.length > 0 && (
        <section id="projects" className="mb-12">
          <h2 className={`text-2xl font-semibold mb-8 ${currentTheme.accent} border-b ${currentTheme.border} pb-2`}>
            Projects
          </h2>
          
          {/* 2-Column Responsive Grid */}
          <div className="grid gap-6 md:gap-8 md:grid-cols-2">
            {portfolioData.projects.map((project, index) => (
              <div
                key={index}
                className={`
                  group project-card
                  ${currentTheme.cardBg}
                  border-2 ${currentTheme.border}
                  rounded-xl overflow-hidden
                  shadow-sm
                  transition-all duration-200 ease-out
                  hover:-translate-y-0.5 hover:scale-[1.02]
                  hover:shadow-lg hover:ring-2 ${currentTheme.accent} hover:ring-opacity-20
                `}
                style={{
                  animationDelay: `${index * 60}ms`,
                  animationFillMode: 'backwards'
                }}
              >
                {/* Project Image - Full Width at Top */}
                {project.image ? (
                  <div className="project-image-container aspect-video bg-gray-900">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="project-image w-full h-full object-cover"
                    />
                    <div className="project-image-overlay" />
                  </div>
                ) : (
                  // Fallback gradient when no image provided
                  <div className={`
                    aspect-video 
                    bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500
                    ${theme === 'dark' ? 'opacity-40' : theme === 'synthwave' ? 'opacity-60' : 'opacity-30'}
                  `} />
                )}
                
                {/* Card Content */}
                <div className="p-5 md:p-6">
                  {/* Project Title */}
                  <h3 className={`text-xl md:text-2xl font-semibold mb-3 ${currentTheme.text}`}>
                    {project.name}
                  </h3>
                  
                  {/* Description - Truncated to 3 lines */}
                  {project.description && (
                    <p className={`${currentTheme.textSecondary} mb-4 leading-relaxed line-clamp-3`}>
                      {project.description}
                    </p>
                  )}
                  
                  {/* Achievement Badges */}
                  {project.achievements && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(typeof project.achievements === 'string' 
                        ? project.achievements.split(',').map(a => a.trim()).filter(a => a)
                        : project.achievements
                      ).slice(0, 2).map((achievement, achIndex) => {
                        const IconComponent = getAchievementIcon(achievement);
                        return (
                          <div
                            key={achIndex}
                            className={`
                              flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                              ${theme === 'dark' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                theme === 'synthwave' ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20' :
                                'bg-green-50 text-green-700 border border-green-200'}
                            `}
                          >
                            <IconComponent size={12} className="shrink-0" />
                            <span>{achievement}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  
                  {/* Technology Stack Pills */}
                  {project.technologies && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.split(',').map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className={`
                              px-2.5 py-1 text-xs font-medium rounded-full
                              ${currentTheme.border} border
                              ${theme === 'dark' ? 'bg-white/5' : theme === 'synthwave' ? 'bg-black/20' : 'bg-gray-50'}
                              ${currentTheme.textSecondary}
                              hover:${currentTheme.accent} transition-colors
                            `}
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Action Links - Separated by Border */}
                  <div className={`flex gap-4 pt-4 border-t ${currentTheme.border}`}>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${currentTheme.accent} hover:underline flex items-center gap-1.5 text-sm font-medium transition-colors`}
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${currentTheme.accent} hover:underline flex items-center gap-1.5 text-sm font-medium transition-colors`}
                      >
                        <Github size={16} />
                        View Code
                      </a>
                    )}
                  </div>
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