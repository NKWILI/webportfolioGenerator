import React, { useState, useRef } from "react";
import { Download, Palette, Sun, Moon, Zap } from "lucide-react";
import PortfolioForm from "./components/PortfolioForm";
import PortfolioPreview from "./components/PortfolioPreview";
import { Button } from "./components/ui";
import JSZip from "jszip";

function App() {
  // Initial portfolio data structure with sample data
  const [portfolioData, setPortfolioData] = useState({
    personal: {
      name: "Alex Johnson",
      title: "Full Stack Developer",
      email: "alex.johnson@email.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      website: "https://alexjohnson.dev",
      github: "https://github.com/alexjohnson",
      linkedin: "https://linkedin.com/in/alexjohnson",
    },
    profileImage: null,
    resumeFile: null,
    about:
      "Passionate full-stack developer with 5+ years of experience building scalable web applications. I love creating elegant solutions to complex problems and am always eager to learn new technologies. When I'm not coding, you can find me hiking, playing guitar, or contributing to open-source projects.",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "Python",
      "PostgreSQL",
      "MongoDB",
      "AWS",
      "Docker",
      "Git",
      "GraphQL",
      "REST APIs",
      "Tailwind CSS",
      "Express.js",
      "Next.js",
      "Vue.js",
      "Redis",
      "Kubernetes",
    ],
    experience: [
      {
        company: "TechCorp Solutions",
        position: "Senior Full Stack Developer",
        duration: "Jan 2022 - Present",
        location: "San Francisco, CA",
        description:
          "Lead development of microservices architecture serving 100K+ users. Built real-time chat system using WebSockets and Redis. Mentored 3 junior developers and reduced deployment time by 60% through CI/CD improvements.",
      },
      {
        company: "InnovateLabs",
        position: "Full Stack Developer",
        duration: "Jun 2020 - Dec 2021",
        location: "Remote",
        description:
          "Developed responsive web applications using React and Node.js. Implemented automated testing suites that improved code coverage by 40%. Collaborated with UX designers to create intuitive user interfaces.",
      },
      {
        company: "StartupXYZ",
        position: "Frontend Developer",
        duration: "Sep 2019 - May 2020",
        location: "Austin, TX",
        description:
          "Built modern single-page applications with React and TypeScript. Optimized application performance resulting in 30% faster load times. Worked closely with backend team to design RESTful APIs.",
      },
    ],
    projects: [
      {
        name: "E-Commerce Platform",
        description:
          "Full-featured e-commerce platform with real-time inventory management, payment processing, and admin dashboard. Built with React, Node.js, and Stripe integration.",
        technologies:
          "React, Node.js, Express, MongoDB, Stripe, AWS S3, Docker",
        link: "https://ecommerce-demo.alexjohnson.dev",
        github: "https://github.com/alexjohnson/ecommerce-platform",
      },
      {
        name: "Task Management App",
        description:
          "Collaborative task management application with real-time updates, file attachments, and team workspaces. Features drag-and-drop interface and notification system.",
        technologies:
          "Next.js, TypeScript, PostgreSQL, Socket.io, Tailwind CSS",
        link: "https://taskapp.alexjohnson.dev",
        github: "https://github.com/alexjohnson/task-manager",
      },
      {
        name: "Weather Analytics Dashboard",
        description:
          "Interactive weather data visualization dashboard with historical data analysis, forecasting, and location-based alerts. Processes data from multiple weather APIs.",
        technologies: "Vue.js, Python, FastAPI, D3.js, PostgreSQL, Redis",
        link: "https://weather-dashboard.alexjohnson.dev",
        github: "https://github.com/alexjohnson/weather-dashboard",
      },
      {
        name: "Open Source Library",
        description:
          "Lightweight JavaScript library for form validation with 50K+ weekly downloads on npm. Features custom validation rules, async validation, and framework-agnostic design.",
        technologies: "TypeScript, Jest, Rollup, NPM",
        link: "https://npmjs.com/package/super-validator",
        github: "https://github.com/alexjohnson/super-validator",
      },
    ],
    education: [
      {
        institution: "University of California, Berkeley",
        degree: "Bachelor of Science",
        field: "Computer Science",
        duration: "2015 - 2019",
        location: "Berkeley, CA",
      },
      {
        institution: "FreeCodeCamp",
        degree: "Full Stack Web Development",
        field: "Certification",
        duration: "2019",
        location: "Online",
      },
    ],
  });

  const [theme, setTheme] = useState("light");
  const previewRef = useRef(null);

  // Theme switching
  const themes = [
    { id: "light", name: "Light", icon: Sun },
    { id: "dark", name: "Dark", icon: Moon },
    { id: "synthwave", name: "Synthwave", icon: Zap },
  ];

  // Generate GitHub Pages ready HTML
  const generateGitHubPagesHTML = () => {
    const previewElement = document.getElementById("portfolio-preview");
    if (!previewElement) return "";

    // Clone the element to avoid modifying the original
    const clonedElement = previewElement.cloneNode(true);

    // Ensure all images have proper src attributes (base64 data is already embedded)
    const images = clonedElement.querySelectorAll("img");
    images.forEach((img) => {
      // Images with base64 data will work as-is in the exported HTML
      if (!img.src.startsWith("data:")) {
        // If it's a relative URL, make it absolute
        img.src = new URL(img.src, window.location.origin).href;
      }
    });

    // Convert lucide-react SVG icons to inline SVG (they're already rendered)
    // Lucide icons are rendered as SVGs by React, so they'll be preserved in the clone
    // No additional conversion needed - the SVGs are already in the DOM

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${portfolioData.personal.name || "Portfolio"}</title>
    <meta name="description" content="Professional portfolio of ${
      portfolioData.personal.name || "Developer"
    }">
    <meta property="og:title" content="${
      portfolioData.personal.name || "Portfolio"
    }">
    <meta property="og:description" content="${
      portfolioData.about
        ? portfolioData.about.substring(0, 160)
        : "Professional portfolio"
    }">
    <meta property="og:type" content="website">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
        }
        .font-grotesk {
            font-family: 'Space Grotesk', sans-serif;
        }
        * {
            box-sizing: border-box;
        }
        /* Ensure images are responsive */
        img {
            max-width: 100%;
            height: auto;
        }
        /* Smooth scrolling */
        html {
            scroll-behavior: smooth;
        }
        /* Mobile optimizations */
        @media (max-width: 640px) {
            body {
                font-size: 14px;
                line-height: 1.5;
            }
        }
        /* Print styles */
        @media print {
            .no-print { display: none !important; }
            nav { position: relative !important; }
        }
        
        /* Center only the main content, not the nav */
        .main-content {
            max-width: 100rem;
            margin-left: auto;
            margin-right: auto;
        }
        
        /* Skills Section Enhanced Animations */
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
        
        /* Smooth transitions for all skill card elements */
        .skill-card * {
          transition-property: transform, color, opacity;
          transition-duration: 200ms;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Ensure hover effects work in static HTML */
        .skill-card:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          transform: translateY(-2px) scale(1.1);
        }
        
        /* Icon hover effects */
        .skill-card:hover svg {
          transform: scale(1.05) rotate(3deg);
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
    </style>
</head>
<body>
    ${clonedElement.outerHTML}
    <script>
        // Apply centering to main content only, not navigation
        const mainContent = document.querySelector('#portfolio-preview > div:last-child');
        if (mainContent) {
            mainContent.classList.add('main-content');
        }
        
        // Simple script for mobile menu toggle in the exported file
        const navToggle = document.getElementById('nav-toggle');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

        if (navToggle && mobileMenu) {
            navToggle.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
        
        // Close menu when a link is clicked
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    </script>
</body>
</html>`;

    return htmlContent;
  };

  // Download functionality - Creates GitHub Pages ready ZIP
  const downloadPortfolio = async () => {
    try {
      const zip = new JSZip();

      // Generate the HTML content
      const htmlContent = generateGitHubPagesHTML();

      // Add index.html to ZIP
      zip.file("index.html", htmlContent);

      // Add resume file if exists
      if (portfolioData.resumeFile) {
        // Convert base64 to blob
        const response = await fetch(portfolioData.resumeFile.src);
        const blob = await response.blob();
        zip.file(portfolioData.resumeFile.name, blob);
      }

      // Add README.md with GitHub Pages instructions
      const readmeContent = `# ${
        portfolioData.personal.name || "Portfolio"
      } - GitHub Pages

This is a GitHub Pages ready portfolio website.

## Files Included

- \`index.html\` - Your portfolio website
${
  portfolioData.resumeFile
    ? `- \`${portfolioData.resumeFile.name}\` - Resume file`
    : ""
}

## How to Deploy to GitHub Pages

1. Create a new repository on GitHub
2. Upload all files from this ZIP to your repository
3. Go to repository Settings > Pages
4. Select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click Save

Your portfolio will be live at: \`https://yourusername.github.io/repository-name\`

## Customization

1. Edit the \`index.html\` file
2. Commit and push changes to GitHub
3. GitHub Pages will automatically update your site

## Features

- ✅ Fully responsive design
- ✅ Modern navigation with smooth scrolling
- ✅ Professional layout
- ✅ Mobile-optimized
- ✅ SEO-friendly
${portfolioData.resumeFile ? "- ✅ Downloadable resume" : ""}

---
Generated with Web Portfolio Generator
`;

      zip.file("README.md", readmeContent);

      // Generate and download ZIP
      const content = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${
        portfolioData.personal.name?.replace(/\s+/g, "-").toLowerCase() ||
        "portfolio"
      }-github-pages.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error creating portfolio ZIP:", error);
      alert("Error creating portfolio. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-grotesk">
                Web Portfolio Generator
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Create a professional portfolio in minutes
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Theme Switcher */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                {themes.map((themeOption) => {
                  const IconComponent = themeOption.icon;
                  return (
                    <button
                      key={themeOption.id}
                      onClick={() => setTheme(themeOption.id)}
                      className={`p-2 rounded-md transition-colors ${
                        theme === themeOption.id
                          ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                      }`}
                      title={themeOption.name}
                    >
                      <IconComponent size={16} />
                    </button>
                  );
                })}
              </div>

              {/* Download Portfolio Button */}
              <Button
                onClick={downloadPortfolio}
                className="flex items-center space-x-2"
                disabled={!portfolioData.personal.name}
              >
                <Download size={16} />
                <span>Download Portfolio</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 h-full">
          {/* Form Column */}
          <div className="order-2 lg:order-1 lg:col-span-2">
            <PortfolioForm
              portfolioData={portfolioData}
              setPortfolioData={setPortfolioData}
            />
          </div>

          {/* Preview Column */}
          <div className="order-1 lg:order-2 lg:col-span-3">
            <div className="sticky top-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                  <div className="flex items-center space-x-2">
                    <Palette
                      size={16}
                      className="text-gray-500 dark:text-gray-400"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Live Preview - {themes.find((t) => t.id === theme)?.name}{" "}
                      Theme
                    </span>
                  </div>
                </div>

                <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                  <PortfolioPreview
                    portfolioData={portfolioData}
                    theme={theme}
                    ref={previewRef}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              Built with React, Tailwind CSS, and ❤️ |
              <span className="ml-1">
                Create beautiful portfolios instantly
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
