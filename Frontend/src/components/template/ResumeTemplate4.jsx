import React, { useRef } from "react";
import { exportToPDF } from "../../utils/pdfExport";

const ResumeTemplate4 = ({formData}) => {
  const resumeRef = useRef();

  const handleExportToPDF = () => {
    exportToPDF(resumeRef, "resume.pdf");
  };

  const { 
    name, 
    title, 
    contact = {}, // Provide default empty object
    skills, 
    languages, 
    summary, 
    workExperience, 
    certifications, 
    education, 
    projects 
  } = formData || {}; // Handle if formData is undefined

  const { email, phone, website } = contact; // Destructure contact safely

  return (
    <div className="min-h-screen py-10 flex flex-col items-center justify-center">
      <div ref={resumeRef}
        className="bg-white w-full max-w-3xl shadow-md rounded-lg p-8 font-sans"
        style={{
          width: "210mm", // Matches A4 width
          minHeight: "297mm", // Matches A4 height
          padding: "20px",
          boxSizing: "border-box",
        }}>
        {/* Header Section */}
        <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-t-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">{name || 'John Doe'}</h1>
              <p className="text-lg mt-2">{title || 'Senior Software Engineer'}</p>
            </div>
            <div className="mt-4 md:mt-0 text-right text-sm">
              <p>{contact.email || 'John@gmail.com'}</p>
              <p>{contact.phone || '(123) 456-7890 '}</p>
              <p>{contact.website || 'https://www.linkedin.com/in/'}</p>
            </div>
          </div>
        </header>

        {/* Sidebar and Content Section */}
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="bg-gray-50 w-full md:w-1/3 p-6 border-r border-gray-200">
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-600 pb-3 mb-4">
                Skills
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {skills && skills.length > 0 ? (
                  skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))
                ):(
                  <li>No skills listed</li>
                )
              
                }
              </ul>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-600 pb-3 mb-4">
                Languages
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {
                  languages && languages.length > 0 ? (
                    languages.map((language, index) => (
                      <li key={index}>{language}</li>
                    ))
                  ):(
                    <li>No languages listed</li>
                  )
                }
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 border-b-2 border-blue-600 pb-3 mb-4">
                Certifications
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {
                  certifications && certifications.length > 0 ? (
                    certifications.map((certification, index) => (
                      <li key={index}>{certification}</li>
                    ))
                  ):(
                    <li>No certifications listed</li>
                  )
                }
              </ul>
            </section>
          </aside>

          {/* Main Content */}
          <main className="w-full md:w-2/3 p-6">
            {/* Summary Section */}
            <section className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-600 pb-3 mb-4">
                Professional Summary
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {
                  summary || "Experienced Software Engineer with over 8 years of expertise in developing scalable web applications. Adept at working with cutting-edge technologies like React, Node.js, and AWS. Skilled in team leadership, performance optimization, and delivering projects on tight deadlines."
                }
              </p>
            </section>

            {/* Work Experience */}
            <section className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-600 pb-3 mb-4">
                Work Experience
              </h2>
              {
                workExperience && workExperience.length > 0 ? (
                  workExperience.map((experience, index) => (
                    <div className="mb-4">
                    <h3 className="text-xl text-gray-800 font-bold">{ experience.title||'Senior Software Engineer'}</h3>
                    <p className="text-gray-600">{experience.company || 'Tech Innovations'} | {
                      experience.duration ||'2025 - Present'}</p>
                    <ul className="list-disc list-inside text-gray-700 mt-2 space-y-2">
                      <li>{experience.responsibilities || "Developed a scalable e-commerce platform serving over 1 million users."}</li>
                    </ul>
                  </div>
                  ))
                ):(
                  <p>Fresher</p>
                )
              }

            </section>

            {/* Education */}
            <section className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-600 pb-3 mb-4">
                Education
              </h2>
              {
                education && education.length > 0 ? (
                  education.map((edu, index) => (
                    <div>
                <h3 className="text-xl text-gray-800 font-bold">{edu.degree || 'Bachelor of Science in Computer Science'}</h3>
                <p className="text-gray-600">{edu.institution || 'University of California, Berkeley — Graduated '}{edu.year || 'May 2025'}</p>
              </div>
                  ))
                ):(
                  <p className="text-gray-700 leading-relaxed">Uneducated</p>
                )
              }
            </section>

            {/* Projects Section */}
            <section className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-600 pb-3 mb-4">
                Projects
              </h2>
              {
                projects && projects.length > 0 ? (
                  projects.map((project, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="text-xl text-gray-800 font-bold">{project.title || 'Project Title'}</h3>
                      <p className="text-gray-700 mt-2">{project.description || 'Project Description'}</p>
                      {project.link && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 mt-1 inline-block"
                        >
                          View Project
                        </a>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-700">No projects listed</p>
                )
              }
            </section>
          </main>
        </div>
      </div>
        {/* Download Button */}
        <button
          className="bg-white text-black mt-6 font-semibold py-2 px-4 rounded mb-6 hover:bg-blue-600"
          onClick={handleExportToPDF}
        >
          Download PDF
        </button>
    </div>
  )
}

export default ResumeTemplate4
