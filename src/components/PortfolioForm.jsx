import React from 'react';
import { Plus, Trash2, User, Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter, FileText } from 'lucide-react';
import { Input, Textarea, Button, ImageUpload, FileUpload } from './ui';

const PortfolioForm = ({ portfolioData, setPortfolioData }) => {
  // Helper function to update nested data
  const updateData = (field, value) => {
    setPortfolioData(prev => ({ ...prev, [field]: value }));
  };

  // Helper function to update array items
  const updateArrayItem = (arrayName, index, field, value) => {
    setPortfolioData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  // Helper function to add array item
  const addArrayItem = (arrayName, newItem) => {
    setPortfolioData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], newItem]
    }));
  };

  // Helper function to remove array item
  const removeArrayItem = (arrayName, index) => {
    setPortfolioData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Portfolio Information</h2>
      
      {/* Profile Picture */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <User className="mr-2" size={20} />
          Profile Picture
        </h3>
        
        <ImageUpload
          value={portfolioData.profileImage}
          onChange={(imageData) => updateData('profileImage', imageData)}
          label="Upload your professional photo"
        />
      </section>

      {/* Resume File */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <FileText className="mr-2" size={20} />
          Resume File
        </h3>
        
        <FileUpload
          value={portfolioData.resumeFile}
          onChange={(fileData) => updateData('resumeFile', fileData)}
          label="Upload your resume (PDF, DOC, DOCX)"
          accept=".pdf,.doc,.docx"
        />
      </section>

      {/* Personal Details */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Mail className="mr-2" size={20} />
          Personal Details
        </h3>
        
        <Input
          label="Full Name"
          required
          placeholder="John Doe"
          value={portfolioData.personal.name}
          onChange={(e) => updateData('personal', { ...portfolioData.personal, name: e.target.value })}
        />
        
        <Input
          label="Job Title"
          required
          placeholder="Software Developer"
          value={portfolioData.personal.title}
          onChange={(e) => updateData('personal', { ...portfolioData.personal, title: e.target.value })}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            value={portfolioData.personal.email}
            onChange={(e) => updateData('personal', { ...portfolioData.personal, email: e.target.value })}
          />
          
          <Input
            label="Phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={portfolioData.personal.phone}
            onChange={(e) => updateData('personal', { ...portfolioData.personal, phone: e.target.value })}
          />
        </div>
        
        <Input
          label="Location"
          placeholder="New York, NY"
          value={portfolioData.personal.location}
          onChange={(e) => updateData('personal', { ...portfolioData.personal, location: e.target.value })}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Website"
            placeholder="https://johndoe.com"
            value={portfolioData.personal.website}
            onChange={(e) => updateData('personal', { ...portfolioData.personal, website: e.target.value })}
          />
          
          <Input
            label="GitHub"
            placeholder="https://github.com/johndoe"
            value={portfolioData.personal.github}
            onChange={(e) => updateData('personal', { ...portfolioData.personal, github: e.target.value })}
          />
          
          <Input
            label="LinkedIn"
            placeholder="https://linkedin.com/in/johndoe"
            value={portfolioData.personal.linkedin}
            onChange={(e) => updateData('personal', { ...portfolioData.personal, linkedin: e.target.value })}
          />
        </div>
      </section>

      {/* About Me */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About Me</h3>
        <Textarea
          label="Bio"
          placeholder="Tell us about yourself, your passion, and what drives you..."
          rows={4}
          value={portfolioData.about}
          onChange={(e) => updateData('about', e.target.value)}
        />
      </section>

      {/* Skills */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Skills</h3>
        <Textarea
          label="Skills (comma-separated)"
          placeholder="React, JavaScript, Python, Node.js, CSS, HTML..."
          rows={3}
          value={portfolioData.skills.join(', ')}
          onChange={(e) => updateData('skills', e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill))}
        />
      </section>

      {/* Experience */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Work Experience</h3>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => addArrayItem('experience', {
              company: '',
              position: '',
              duration: '',
              description: '',
              location: ''
            })}
          >
            <Plus size={16} className="mr-1" />
            Add Experience
          </Button>
        </div>
        
        {portfolioData.experience.map((exp, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-900 dark:text-white">Experience #{index + 1}</h4>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeArrayItem('experience', index)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Company"
                placeholder="Tech Corp"
                value={exp.company}
                onChange={(e) => updateArrayItem('experience', index, 'company', e.target.value)}
              />
              
              <Input
                label="Position"
                placeholder="Senior Developer"
                value={exp.position}
                onChange={(e) => updateArrayItem('experience', index, 'position', e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Duration"
                placeholder="Jan 2020 - Present"
                value={exp.duration}
                onChange={(e) => updateArrayItem('experience', index, 'duration', e.target.value)}
              />
              
              <Input
                label="Location"
                placeholder="New York, NY"
                value={exp.location}
                onChange={(e) => updateArrayItem('experience', index, 'location', e.target.value)}
              />
            </div>
            
            <Textarea
              label="Description"
              placeholder="Describe your responsibilities and achievements..."
              value={exp.description}
              onChange={(e) => updateArrayItem('experience', index, 'description', e.target.value)}
            />
          </div>
        ))}
      </section>

      {/* Projects */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Projects</h3>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => addArrayItem('projects', {
              name: '',
              description: '',
              technologies: '',
              link: '',
              github: ''
            })}
          >
            <Plus size={16} className="mr-1" />
            Add Project
          </Button>
        </div>
        
        {portfolioData.projects.map((project, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-900 dark:text-white">Project #{index + 1}</h4>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeArrayItem('projects', index)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
            
            <Input
              label="Project Name"
              placeholder="Awesome Web App"
              value={project.name}
              onChange={(e) => updateArrayItem('projects', index, 'name', e.target.value)}
            />
            
            <Textarea
              label="Description"
              placeholder="Describe what this project does and your role..."
              value={project.description}
              onChange={(e) => updateArrayItem('projects', index, 'description', e.target.value)}
            />
            
            <Input
              label="Technologies Used"
              placeholder="React, Node.js, MongoDB"
              value={project.technologies}
              onChange={(e) => updateArrayItem('projects', index, 'technologies', e.target.value)}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Live Demo URL"
                placeholder="https://project-demo.com"
                value={project.link}
                onChange={(e) => updateArrayItem('projects', index, 'link', e.target.value)}
              />
              
              <Input
                label="GitHub URL"
                placeholder="https://github.com/user/project"
                value={project.github}
                onChange={(e) => updateArrayItem('projects', index, 'github', e.target.value)}
              />
            </div>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Education</h3>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => addArrayItem('education', {
              institution: '',
              degree: '',
              field: '',
              duration: '',
              location: ''
            })}
          >
            <Plus size={16} className="mr-1" />
            Add Education
          </Button>
        </div>
        
        {portfolioData.education.map((edu, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-gray-900 dark:text-white">Education #{index + 1}</h4>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeArrayItem('education', index)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
            
            <Input
              label="Institution"
              placeholder="University of Technology"
              value={edu.institution}
              onChange={(e) => updateArrayItem('education', index, 'institution', e.target.value)}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Degree"
                placeholder="Bachelor of Science"
                value={edu.degree}
                onChange={(e) => updateArrayItem('education', index, 'degree', e.target.value)}
              />
              
              <Input
                label="Field of Study"
                placeholder="Computer Science"
                value={edu.field}
                onChange={(e) => updateArrayItem('education', index, 'field', e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Duration"
                placeholder="2018 - 2022"
                value={edu.duration}
                onChange={(e) => updateArrayItem('education', index, 'duration', e.target.value)}
              />
              
              <Input
                label="Location"
                placeholder="Boston, MA"
                value={edu.location}
                onChange={(e) => updateArrayItem('education', index, 'location', e.target.value)}
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default PortfolioForm;