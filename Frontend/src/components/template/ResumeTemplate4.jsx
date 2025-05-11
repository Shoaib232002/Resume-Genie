import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";


const ResumeTemplate4 = ({formData}) => {

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
          </main>
        </div>
      </div>
        {/* Download Button */}
        <button
        className="bg-white text-black mt-6 font-semibold py-2 px-4 rounded mb-6 hover:bg-blue-600"
        onClick={exportToPDF}
      >
        Download PDF
      </button>
    </div>
  )
}

export default ResumeTemplate4
