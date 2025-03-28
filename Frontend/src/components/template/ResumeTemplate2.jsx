import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const ResumeTemplate2 = ({formData}) => {
  const resumeRef = useRef();

  const exportToPDF = async () => {
    const element = resumeRef.current;
    const canvas = await html2canvas(element, {
      scale: 2, // Increase resolution
      useCORS: true,
      logging: true,
      x: 0,
      y: 0,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm

    // Automatically scale content to fit one page
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    // Scale down if the content is too tall
    const scaleFactor = imgHeight > pdfHeight ? pdfHeight / imgHeight : 1;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth * scaleFactor, imgHeight * scaleFactor);
    pdf.save("resume.pdf");
  };

  const {name ,title , contact ,skills, languages , summary , workExperience ,certifications , education , projects} = formData


  return (
    <div className="bg-black min-h-screen flex flex-col gap-2 items-center p-6">
      <div
        ref={resumeRef}
        className="bg-white w-full max-w-4xl shadow-md rounded-lg p-8 font-sans"
      >
        {/* Header */}
        <div className="border-b border-zinc-400 pb-4">
          <h1 className="text-4xl font-bold text-gray-800">{name || 'John Doe'}</h1>
          <p className="text-lg text-gray-600">{title || 'Senior Software Engineer'}</p>
          <p className="text-sm text-gray-500 mt-2">
            <span>{contact.email || 'John@gmail.com'}</span> | <span>{contact.phone || '(123) 456-7890 '}</span> | <span>{contact.website || 'https://www.linkedin.com/in/'}</span>
          </p>
        </div>

        {/* Two-column Layout */}
        <div className="flex flex-col md:flex-row mt-6 gap-6">
          {/* Left Column */}
          <div className="w-full md:w-1/3 space-y-6">
            {/* Summary */}
            <section>
              <h2 className="text-lg font-bold text-gray-800 border-b border-zinc-400 pb-1">
                Summary
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm">
                {summary || 'Results-oriented Senior Software Engineer with 10+ years of experience in full-stack development, team leadership, and delivering scalable, high-performing solutions. Skilled in modern technologies, Agile methodologies, and mentoring junior developers.'}
              </p>
            </section>

            {/* Skills */}
            <section>
              <h2 className="text-lg font-bold text-gray-800 border-b border-zinc-400 pb-1">
                Skills
              </h2>
              <ul className="list-disc pl-6 text-gray-700 text-sm space-y-1">
              {skills && skills.length > 0 ? (
      skills.map((skill, index) => (
          <li>{skill}</li>
      ))
    ) : (
      <p className="text-gray-600">No skills added yet.</p>
    )}
              </ul>
            </section>

            {/* Certifications */}
            <section>
              <h2 className="text-lg font-bold text-gray-800 border-b pb-1">
                Certifications
              </h2>
              <ul className="list-disc pl-6 text-gray-700 text-sm space-y-1">
              {
                certifications && certifications.length > 0 ? (
                  certifications.map((certification, index) => (
                    <li>{certification}</li>
                  ))
                ):(
                  <p className="text-gray-600">No certifications added yet.</p>
                )
              }
              </ul>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-lg font-bold text-gray-800 border-b border-zinc-400 pb-1">
                Education
              </h2>
              {
                education && education.length > 0 ? (
                  education.map((edu, index) => (
                    <p className="text-sm text-gray-700">
                <strong>{edu.degree}</strong>
                <br />
                {edu.institution} <br />
                <span className="text-gray-500">{edu.year}</span>
              </p>
                  ))
                ):(
                  <p className="text-gray-600">No education added yet.</p>
                )
              }
            </section>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-2/3 space-y-6">
            {/* Work Experience */}
            <section>
              <h2 className="text-lg font-bold text-gray-800 border-b border-zinc-400 pb-1">
                Work Experience
              </h2>

              {/* Job 1 */}
              {
                workExperience && workExperience.length > 0 ? (
                  workExperience.map((job, index) => (
                    <div className="mb-4">
                <h3 className="text-md font-semibold text-gray-800">
                  {job.title}
                </h3>
                <p className="text-sm text-gray-500">{job.company} | {job.duration}</p>
                <ul className="list-disc pl-6 text-gray-700 text-sm mt-2 space-y-1">
                  <li>{job.responsibilities}</li>
                </ul>
              </div>
                  ))
                ):(
                  <p className="text-gray-600">No work experience added yet.</p>
                )
              }
            </section>

            {/* Projects */}
            <section>
              <h2 className="text-lg font-bold text-gray-800 border-b border-zinc-400 pb-1">
                Projects
              </h2>
              {
                projects && projects.length > 0 ? (
                  projects.map((project, index) => (
                    <div className="mb-4">
                <h3 className="text-md font-semibold text-gray-800">
                  {project.title}
                </h3>
                <p className="text-gray-700 text-sm">
                  {project.description}
                </p>
                <p>
                  {project.link}
                </p>
              </div>
                  ))
                ):(
                  <p className="text-gray-600">No projects added yet.</p>
                )
              }
            </section>

            {/* Awards */}
            <section>
              <h2 className="text-lg font-bold text-gray-800 border-b border-zinc-400 pb-1">
                Language
              </h2>
              <ul className="list-disc pl-6 text-gray-700 text-sm space-y-1">
                {
                  languages.map((language, index) => (
                    <li key={index}>{language}</li>
                  ))
                }
              </ul>
            </section>
          </div>
        </div>
      </div>
      <button
        className="bg-white text-black font-semibold py-2 px-4 rounded mb-6 "
        onClick={exportToPDF}
      >
        Download PDF
      </button>
    </div>
  );
};

export default ResumeTemplate2;
