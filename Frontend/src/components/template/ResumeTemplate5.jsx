import React, { useRef } from "react";
import { exportToPDF } from "../../utils/pdfExport";

const ResumeTemplate5 = ({formData}) => {

  const resumeRef = useRef();

  const handleExportToPDF = () => {
    exportToPDF(resumeRef, "resume.pdf");
  };

  const {name ,title , contact ,skills, languages , summary , workExperience ,certifications , education , projects} = formData 


  return (
    <div className="bg-black min-h-screen w-full flex flex-col justify-center items-center p-6">
       <div  ref={resumeRef}
        className="bg-white w-full max-w-3xl shadow-md rounded-lg p-8 font-sans"
        style={{
          width: "210mm", // Matches A4 width
          minHeight: "297mm", // Matches A4 height
          padding: "20px",
          boxSizing: "border-box",
        }}>
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-gray-900">{name || 'John Doe'}</h1>
        <p className="text-xl text-gray-500">{title || 'Senior Software Engineer'}</p>
        <p className="text-gray-400"><span>{contact.email || 'John@gmail.com'}</span>| <span>{contact.website || 'https://www.linkedin.com/in/'}</span> | <span>{contact.phone || '(123) 456-7890 '}</span></p>
      </div>

      {/* Section: Summary */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800">Summary</h2>
        <p className="text-gray-700 mt-2">
          {summary || 'Enthusiastic Full Stack Developer with 5+ years of experience in web development. Proficient in creating scalable applications with technologies like React, Node.js, and MongoDB. Passionate about solving complex problems and creating beautiful user interfaces.'}
        </p>
      </section>

      {/* Section: Skills */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800">Skills</h2>
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

      {/* Section: Experience */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800">Experience</h2>
       {
        workExperience && workExperience.length > 0 ? (
          workExperience.map((experience, index) => (
            <div className="mt-4">
            <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-lg font-semibold text-gray-800">
              { experience.title || 'Lead Software Engineer'}
            </h3>
            <p className="text-sm text-gray-500">{experience.company || 'XYZ Corp'}| {experience.duration || 'Jan 2025 - Present'}</p>
            <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
              <li>
               {experience.responsibilities || 'Led a team of 10 engineers to create a microservices-based architecture, improving system scalability by 50%.'}
              </li>
              </ul>
            </div>
          </div>
          ))
        ):(
          <p className="text-gray-600">Fresher</p>
        )
       }
      </section>

      {/* Section: Education */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800">Education</h2>
        {
          education && education.length > 0 ? (
            education.map((edu, index) => (
              <div className="mt-4">
          <div className="pl-4">
            <h3 className="font-semibold text-xl text-gray-800">{edu.degree || 'Bachelor of Science in Computer Science'}</h3>
            <p className="text-gray-600"> {edu.institution || 'University of California, Berkeley — Graduated '}{edu.year || 'May 2025'}</p>
          </div>
        </div>
            ))
          ):(
            <p className="text-gray-600">No education added yet.</p>
          )
        }
      </section>

      {/* Section: Projects */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800">Projects</h2>
       {
        projects && projects.length > 0 ? (
          projects.map((project, index) => (
            <div className="mt-4">
            <div className="pl-4">
              <h3 className="font-semibold text-xl text-gray-800">{project.title}</h3>
              <p className="text-gray-600">{project.description}</p>
              <p className="text-gray-700 mt-2">
              {project.link}
              </p>
            </div>
          </div>
          ))
        ):(
          <p className="text-gray-600">No projects added yet.</p>
        )
       }
      </section>
    </div>
    <button
        className="bg-white text-black font-semibold py-2 px-4 rounded mb-6 mt-6 hover:bg-blue-600"
        onClick={handleExportToPDF}
      >
        Download PDF
    </button>
    </div>
  )
}

export default ResumeTemplate5
