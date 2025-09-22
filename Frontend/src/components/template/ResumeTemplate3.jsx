import React, { useRef } from "react";
import { exportToPDF } from "../../utils/pdfExport";

const ResumeTemplate3 = ({formData}) => {

  const resumeRef = useRef();

  const handleExportToPDF = () => {
    exportToPDF(resumeRef, "resume.pdf");
  };

  const { 
    name, 
    title, 
    contact = {}, 
    skills, 
    languages, 
    summary, 
    workExperience, 
    certifications, 
    education, 
    projects 
  } = formData || {};

  return (
    <div className="bg-black p-8 min-h-screen flex flex-col items-center">
      <div ref={resumeRef}
        className="bg-white w-full max-w-3xl shadow-md rounded-lg p-8 font-sans mb-8"
        style={{
          width: "210mm",
          minHeight: "297mm",
          padding: "20px",
          boxSizing: "border-box",
        }}>
        {/* Header Section */}
        <header className="border-b border-zinc-400 pb-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{name || 'John Doe'}</h1>
              <p className="text-xl text-gray-600">{title || 'Senior Software Engineer'}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600">{contact.email || 'John@gmail.com'}</p>
              <p className="text-gray-600">{contact.phone || '(123) 456-7890'}</p>
              <p className="text-gray-600">{contact.location || 'City, State'}</p>
              <p className="text-gray-600">{contact.website || 'https://www.linkedin.com/in/'}</p>
            </div>
          </div>
        </header>

        {/* Professional Summary */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-zinc-400 pb-2 mb-4">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {summary || "Results-driven Senior Software Engineer with 8+ years of expertise in full-stack development, specializing in React.js, Node.js, and cloud technologies. Proven track record of delivering scalable applications and leading cross-functional teams. Strong focus on code quality, system architecture, and implementing best practices. Experienced in Agile methodologies and continuous integration/deployment pipelines."}
          </p>
        </section>

        {/* Skills Section */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-zinc-400 pb-2 mb-4">
            Technical Skills
          </h2>
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            {skills && skills.length > 0 ? (
              skills.map((skill, index) => (
                <ul key={`skill-col-${Math.floor(index / 5)}`} className="list-disc pl-6">
                  <li>{skill}</li>
                </ul>
              ))
            ) : (
              <p className="text-gray-600">No skills added yet.</p>
            )}
          </div>
        </section>

        {/* Work Experience */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-zinc-400 pb-2 mb-4">
            Professional Experience
          </h2>
          {workExperience && workExperience.length > 0 ? (
            workExperience.map((experience, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {experience.title || 'Lead Software Engineer'}
                  </h3>
                  <p className="text-sm text-gray-500">{experience.duration || 'Jan 2025 - Present'}</p>
                </div>
                <p className="text-sm text-gray-600">{experience.company || 'XYZ Corp'} | {experience.location || 'City, State'}</p>
                <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
                  {experience.responsibilities && Array.isArray(experience.responsibilities) ? (
                    experience.responsibilities.map((responsibility, idx) => (
                      <li key={idx}>{responsibility}</li>
                    ))
                  ) : (
                    <li>{experience.responsibilities || 'Led a team of 10 engineers to create a microservices-based architecture, improving system scalability by 50%.'}</li>
                  )}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-gray-700 leading-relaxed">No work experience added yet</p>
          )}
        </section>

        {/* Education */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-zinc-400 pb-2 mb-4">
            Education
          </h2>
          {education && education.length > 0 ? (
            education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{edu.degree || 'Bachelor of Science in Computer Science'}</h3>
                    <p className="text-gray-600">{edu.institution || 'University of California, Berkeley'}</p>
                  </div>
                  <p className="text-sm text-gray-500">{edu.year || 'May 2025'}</p>
                </div>
                {edu.achievements && (
                  <ul className="list-disc pl-6 text-gray-700 mt-2">
                    {edu.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-700 leading-relaxed">No education details added yet</p>
          )}
        </section>

        {/* Certifications */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-zinc-400 pb-2 mb-4">
            Certifications
          </h2>
          {certifications && certifications.length > 0 ? (
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700 leading-relaxed">No certifications added yet</p>
          )}
        </section>

        {/* Projects */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-zinc-400 pb-2 mb-4">
            Key Projects
          </h2>
          {projects && projects.length > 0 ? (
            projects.map((project, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {project.title || 'Project Title'}
                  </h3>
                  
                </div>
                <p className="text-gray-700 mt-2">
                  {project.description || 'Project description goes here'}
                </p>
                {project.technologies && (
                  <p className="text-sm text-gray-500 mt-1">
                    Technologies: {project.technologies}
                  </p>
                )}
                {project.link && (
                  <p className="text-blue-600 mt-1">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      {project.link}
                    </a>
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-700 leading-relaxed">No projects added yet</p>
          )}
        </section>

        {/* Languages */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 border-b border-zinc-400 pb-2 mb-4">
            Languages
          </h2>
          {languages && languages.length > 0 ? (
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              {languages.map((language, index) => (
                <li key={index}>{language}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700 leading-relaxed">No languages added yet</p>
          )}
        </section>
      </div>
      <button
        className="bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-md"
        onClick={handleExportToPDF}
      >
        Download PDF
      </button>
    </div>
  );
};

export default ResumeTemplate3;
