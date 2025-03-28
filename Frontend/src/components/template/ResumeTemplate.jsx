import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const ResumeTemplate = ({formData}) => {
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
    <div className="bg-black min-h-screen w-full flex flex-col justify-center items-center p-6">

      {/* Resume */}
      <div
        ref={resumeRef}
        className="bg-white w-full max-w-3xl shadow-md rounded-lg p-8 font-sans"
        style={{
          width: "210mm", // Matches A4 width
          minHeight: "297mm", // Matches A4 height
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div className="text-center md:text-left border-b border-zinc-400 pb-6">
          <h1 className="text-2xl font-extrabold text-gray-800">{name || 'John Doe'}</h1>
          <p className="text-lg text-gray-600">{title || 'Senior Software Engineer'}</p>
          <p className="text-sm text-gray-500 mt-2">
            <span>{contact.email || 'John@gmail.com'}</span> | {" "}
            <span>{contact.phone || '(123) 456-7890 '}</span> | {" "}
            <span>{contact.website || 'https://www.linkedin.com/in/'}</span>
          </p>
        </div>

        {/* Professional Summary */}
        <section className="mt-6">
          <h2 className="text-lg font-bold text-gray-800 border-b border-zinc-400 pb-2 mb-4">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">
            { summary || "Experienced Senior Software Engineer with 8+ years of expertise in developing scalable applications and leading teams to success. Proficient in React.js, Node.js, AWS, and modern development methodologies. Passionate about creating efficient solutions that enhance user experience and drive business growth."}
          </p>
        </section>

        {/* Experience */}
        <section className="mt-6">
          <h2 className="text-lg font-bold text-gray-800 border-b border-zinc-400 pb-2 mb-4">
            Work Experience
          </h2>
          {workExperience && workExperience.length > 0 ? (
            workExperience.map((experience, index) => (
              <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              { experience.title || 'Lead Software Engineer'}
            </h3>
            <p className="text-sm text-gray-500">{experience.company || 'XYZ Corp'}| {experience.duration || 'Jan 2020 - Present'}</p>
            <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
              <li>
               {experience.responsibilities || 'Led a team of 10 engineers to create a microservices-based architecture, improving system scalability by 50%.'}
              </li>
            </ul>
          </div>
            ))
          ):(
            <p className="text-gray-700 leading-relaxed"> Fresher</p>
          )
            
          }
        </section>

        {/* Skills */}
        <section className="mt-6">
  <h2 className="text-lg font-bold text-gray-800 border-b border-zinc-400 pb-2 mb-4">
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


        {/* Education */}
        <section className="mt-6">
          <h2 className="text-lg font-bold text-gray-800 border-b border-zinc-400 pb-2 mb-4">
            Education
          </h2>
          {
            education && education.length > 0 ? (
              education.map((edu, index) => (
                <p className="text-gray-700">
            <strong>{edu.degree || 'Bachelor of Science in Computer Science'}</strong>
            <br />
            {edu.institution || 'University of California, Berkeley — Graduated '}{edu.year || 'May 2015'}
          </p>
              ))
            ):(<p className="text-gray-700 leading-relaxed">not added yet</p>)
          }
        </section>

        {/* Projects */}
        <section className="mt-6">
  <h2 className="text-lg font-bold text-gray-800 border-b border-zinc-400 pb-2 mb-4">
    Projects
  </h2>
  {projects && projects.length > 0 ? (
    projects.map((project, index) => (
      <div key={index} className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {project.title}
        </h3>
        <p className="text-gray-700">
          {project.description}</p>
        <p className="text-gray-700">
          {project.link}
        </p>
      </div>
    ))
  ) : (
    <p className="text-gray-700 leading-relaxed">No Project</p>
  )}
</section>

      </div>
      <button
        className="bg-white  text-black font-semibold py-2 px-4 rounded mt-6 mb-7 "
        onClick={exportToPDF}
      >
        Download PDF
      </button>
    </div>
  );
};

export default ResumeTemplate;
