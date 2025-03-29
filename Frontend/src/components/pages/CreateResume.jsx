
import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ResumeTemplate from '../template/ResumeTemplate';
import ResumeTemplate4 from '../template/ResumeTemplate4';
import ResumeTemplate5 from '../template/ResumeTemplate5';
import ResumeTemplate3 from '../template/ResumeTemplate3';
import ResumeTemplate2 from '../template/ResumeTemplate2';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { UserDataContext } from '../../context/UserContext';
import 'remixicon/fonts/remixicon.css'
import gsap from 'gsap';

const CreateResume = () => {
  const navigate = useNavigate();
    const { layoutId } = useParams(); // Get the layout ID from the route
    const {userData} = useContext(UserDataContext)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profilePanel , setProfilePanel] = useState(false);
    const [chatpannel , setChatPannel] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true); 

    const [newSkill, setNewSkill] = useState("");
    const [newLanguage, setNewLanguage] = useState("");
    const [newCertification, setNewCertification] = useState("");
    const [newProject, setNewProject] = useState({ title: "", description: "", link: "" });

    const [prompt , setPrompt] = useState('');
    const [messages, setMessages] = useState([]);
  

    useEffect(()=>{
      const checkLoginStatus = () => {
          const token = localStorage.getItem('token'); // Example of checking user data in local storage
          if (token) {
            setIsLoggedIn(true);
          }
        };
    
      checkLoginStatus();

  },[])


  useEffect(() => {
    gsap.killTweensOf('.profileTogel');
    if(profilePanel){
      gsap.to('.profileTogel',{
        duration: 0.5,
        height:'95px'
      })
    }
    if(!profilePanel){
      gsap.to('.profileTogel',{
        duration: 0.5,
        height:'0px'
        })
    }

  },[profilePanel])
  
  useEffect(() => {
    if (initialLoad) {
      // Skip animation during the initial load
      setInitialLoad(false);
      return;  // Early return to avoid animation on first render
    }
  
    // Handle animation based on the chatpannel state
    gsap.killTweensOf('.ai-chat');
    if (chatpannel) {
      gsap.to('.ai-chat', {
        duration: 0.5,
        opacity: 1,
        width: '30vw',
      });
    } else {
      gsap.to('.ai-chat', {
        duration: 0.5,
        opacity: 0,
        width: '0',
      });
    }
  }, [chatpannel, initialLoad]);  // 

  const sendMessege = async () => {
    if(!prompt){
      alert('Please enter a prompt')
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: prompt, type: 'outgoing' },
    ]);


    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ai/get-result`,{
        params: {prompt}
      })
      if(response.status === 200){
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response.data, type: 'incoming' },
        ]);
        setPrompt(' ');
      }else{
        console.log('Error')
      }
    }catch(err){
      console.log(err)
    }
  }
  
    const [formData, setFormData] = useState({
      name: "",
      title: "",
      contact: {
        email: "",
        phone: "",
        website: "",
      },
      skills: [],
      languages: [],
      certifications: [],
      summary: "",
      workExperience: [
        {
          title: "",
          company: "",
          duration: "",
          responsibilities: "",
        },
      ],
      education: [
        {
          degree: "",
          institution: "",
          year: "",
        },
      ],
      projects:[
        {
          title: "",
          description: "",
          link:""
          },
      ],
      layout: layoutId,
      userId:userData._id
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
    
      if (name.includes(".")) {
        const [section, key] = name.split(".");
        setFormData((prevData) => ({
          ...prevData,
          [section]: {
            ...prevData[section],
            [key]: value,
          },
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    };
    
    // Handle adding a new skill
  const handleAddSkill = () => {
      if (newSkill.trim()) {
        setFormData({
          ...formData,
          skills: [...formData.skills, newSkill.trim()],
        });
        setNewSkill(""); // Clear the input field
      }
  };
  
    // Handle removing a skill
  const handleRemoveSkill = (index) => {
      const updatedSkills = formData.skills.filter((_, i) => i !== index);
      setFormData({ ...formData, skills: updatedSkills });
  };
  
    // Handle adding a new language
  const handleAddLanguage = () => {
      if (newLanguage.trim()) {
        setFormData({
          ...formData,
          languages: [...formData.languages, newLanguage.trim()],
        });
        setNewLanguage(""); // Clear the input field
      }
  };
  
    // Handle removing a language
  const handleRemoveLanguage = (index) => {
      const updatedLanguages = formData.languages.filter((_, i) => i !== index);
      setFormData({ ...formData, languages: updatedLanguages });
  };
  
    // Handle adding a new certification
  const handleAddCertification = () => {
      if (newCertification.trim()) {
        setFormData({
          ...formData,
          certifications: [...formData.certifications, newCertification.trim()],
        });
        setNewCertification(""); // Clear the input field
      }
  };
  
    // Handle removing a certification
  const handleRemoveCertification = (index) => {
      const updatedCertifications = formData.certifications.filter((_, i) => i !== index);
      setFormData({ ...formData, certifications: updatedCertifications });
  };
  
    // Handle work experience changes
  const handleWorkExperienceChange = (index, field, value) => {
      const updatedWorkExperience = [...formData.workExperience];
      updatedWorkExperience[index][field] = value;
      setFormData({ ...formData, workExperience: updatedWorkExperience });
  };
  
    // Add a new work experience entry
  const handleAddWorkExperience = () => {
      setFormData({
        ...formData,
        workExperience: [
          ...formData.workExperience,
          { title: "", company: "", duration: "", responsibilities: "" },
        ],
      });
  };
  
    // Remove a work experience entry
  const handleRemoveWorkExperience = (index) => {
      const updatedWorkExperience = formData.workExperience.filter((_, i) => i !== index);
      setFormData({ ...formData, workExperience: updatedWorkExperience });
  };
  
    //adding work expreience entry
    const handleAddProject = () => {
      if (newProject.title.trim() && newProject.description.trim()) {
        // Make sure newProject has proper values before adding to formData
        setFormData({
          ...formData,
          projects: [...formData.projects, { ...newProject }],
        });
        setNewProject({ title: "", description: "", link: "" }); // Clear input fields
      } else {
        alert("Please fill in both the title and description for the project.");
      }
    };
    
  
    // Handle removing a project
  const handleRemoveProject = (index) => {
    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: updatedProjects });
  };
  
    // Handle input changes
  
    const submitHandler = async (e) => {
      e.preventDefault();
      // Assuming the token is stored in localStorage
      const token = localStorage.getItem("token");  // Adjust this according to where you store the token
    
      if (!token) {
        alert("You must be logged in to create a resume.");
        return;
      }
    
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/users/create/resume`, 
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,  // Add the token in the Authorization header
              "Content-Type": "application/json",  // Optional: Ensure Content-Type is set to JSON if needed
            }
          }
        );
    
        if (response.status === 200) {
          alert("Resume created successfully");
        }
    
      } catch (err) {
        console.log(err);
        alert("An error occurred while creating the resume. Please try again.");
      }
    };
    
    const renderTemplate = () => {
        switch (layoutId) {
            case '0':
                return <ResumeTemplate formData={formData} />; // Add your actual Template 1 content here
            case '1':
                return <ResumeTemplate4 formData={formData}/>; // Add your actual Template 2 content here
            case '2':
                return <ResumeTemplate3 formData={formData}/>; // Add your actual Template 3 content here
            case '3':
                return <ResumeTemplate2 formData={formData}/>; // Add your actual Template 4 content here
            case '4':
                return <ResumeTemplate5 formData={formData}/>; // Add your actual Template 5 content here
            default:
                return no;
        }
    };

    const LogoutHandler = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            });
            localStorage.removeItem('token');
            navigate('/');
            } catch (error) {
              console.error('Error logging out:', error);
            }
              
  
    }
  
  return (
    <div className="w-full h-screen bg-black text-white flex">
      {/* Resume input section */}
      <div className="h-screen w-[35vw] flex bg-black text-white">
        {isLoggedIn && (
          <div className="h-full bg-zinc-950 w-10 flex flex-col items-center pt-10 gap-5">
            <img
              onClick={() => {
                setProfilePanel(!profilePanel);
              }}
              className="w-[4vw] rounded-full cursor-pointer"
              src="https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg"
              alt="User"
            />
            <Link to="/">
              <i className="ri-home-line"></i>
            </Link>
            <Link to="/document">
              <i className="ri-file-line"></i>
            </Link>
            <Link to="/template-selection">
              <i className="ri-file-paper-2-line"></i>
            </Link>
            <button
              onClick={() => {
                setChatPannel(!chatpannel);
              }}
            >
              <i className="ri-chat-ai-line"></i>
            </button>

            <div className="ai-chat absolute w-[30vw] h-[90vh] left-10 bg-zinc-900 rounded-lg overflow-hidden flex flex-col justify-between shadow-lg border border-zinc-700">
              {/* Header */}
              <div className="bg-zinc-800 px-4 py-3 border-b border-zinc-700">
                <h1 className="font-semibold text-white">AI Chat Box</h1>
              </div>

              {/* Messages */}
              <div className="messege-box flex-grow w-full flex flex-col gap-3 p-4 overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-600 hover:scrollbar-thumb-zinc-500">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`w-full p-2 ${
                      msg.type === "outgoing" ? "flex justify-end" : ""
                    }`}
                  >
                    <p
                      className={`${
                        msg.type === "outgoing"
                          ? "bg-slate-950 text-white text-right shadow-md"
                          : "bg-slate-900 text-white text-left shadow-md"
                      } rounded-xl max-w-64 px-4 py-3`}
                    >
                      {msg.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Input Box */}
              <div className="flex items-center gap-2 p-3 bg-zinc-800 border-t border-zinc-700">
                <input
                  onChange={(e) => setPrompt(e.target.value)}
                  value={prompt}
                  type="text"
                  placeholder="Type a message..."
                  className="w-full px-4 h-10 bg-transparent text-white border border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400 placeholder-zinc-400"
                />
                <button
                  onClick={sendMessege}
                  className="bg-white text-black h-10 px-6 rounded-lg font-semibold hover:bg-gray-200 active:scale-95 transition-transform"
                >
                  Send
                </button>
              </div>
            </div>

            <div className="profileTogel h-0 overflow-hidden absolute w-[15vw] bg-zinc-800 rounded-md z-50 left-10 top-16">
              <h1 className="text-gray-400 ml-4">{userData.fullname}</h1>
              <h1 className="text-gray-400 ml-4">{userData.email}</h1>
              <button
                onClick={() => {
                  LogoutHandler();
                }}
                className="bg-white text-black ml-4 px-2 py-1 font-semibold mx-2 my-1  rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        )}
        <div className="w-[35vw] h-screen bg-black text-white p-6 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6">Resume Input Form</h1>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
            className="space-y-4"
          >
            {/* Basic Details */}
            <div>
              <label className="block font-semibold mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full bg-transparent border-[1px] outline-none border-white text-white p-2 rounded-md"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Software Engineer"
                className="w-full bg-transparent border-[1px] outline-none border-white text-white p-2 rounded-md"
              />
            </div>

            {/* Contact Section */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Contact</h2>
              <div className="space-y-2">
                <div>
                  <label className="block font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    name="contact.email"
                    value={formData.contact.email}
                    onChange={handleInputChange}
                    placeholder="john.doe@example.com"
                    className="w-full bg-transparent border-[1px] outline-none border-white text-white p-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Phone</label>
                  <input
                    type="tel"
                    name="contact.phone"
                    value={formData.contact.phone}
                    onChange={handleInputChange}
                    placeholder="123-456-7890"
                    className="w-full bg-transparent border-[1px] outline-none border-white text-white p-2 rounded-md"
                  />
                </div>
                <div>
                  <label className="block font-semibold outline-none mb-1">
                    Website
                  </label>
                  <input
                    type="url"
                    name="contact.website"
                    value={formData.contact.website}
                    onChange={handleInputChange}
                    placeholder="https://johndoe.com"
                    className="w-full bg-transparent outline-none border-[1px] border-white text-white p-2 rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Skills</h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill (e.g., React)"
                  className="flex-grow bg-transparent border-[1px] outline-none border-white text-white p-2 rounded-md"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="bg-white font-semibold  text-black px-4 py-2 rounded-md"
                >
                  Add
                </button>
              </div>
              <ul className="space-y-2">
                {formData.skills.map((skill, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-transparent outline-none border-[1px] border-white p-2 rounded-md"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Languages Section */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Languages</h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  placeholder="Add a language (e.g., English)"
                  className="flex-grow bg-transparent border-[1px] outline-none border-white text-white p-2 rounded-md"
                />
                <button
                  type="button"
                  onClick={handleAddLanguage}
                  className="bg-white font-semibold text-black px-4 py-2 rounded-md"
                >
                  Add
                </button>
              </div>
              <ul className="space-y-2">
                {formData.languages.map((language, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-transparent border-[1px] outline-none border-white p-2 rounded-md"
                  >
                    <span>{language}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveLanguage(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Summary section */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Summary</h2>
              <div>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleInputChange}
                  placeholder="Write a brief summary about yourself"
                  rows="4"
                  className="w-full bg-transparent border-[1px] outline-none border-white text-white p-2 rounded-md"
                />
              </div>
            </div>

            {/* Certifications Section */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Certifications</h2>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newCertification}
                  onChange={(e) => setNewCertification(e.target.value)}
                  placeholder="Add a certification (e.g., AWS Certified)"
                  className="flex-grow bg-transparent border-[1px] outline-none border-white text-white p-2 rounded-md"
                />
                <button
                  type="button"
                  onClick={handleAddCertification}
                  className="bg-white text-black font-semibold px-4 py-2 rounded-md"
                >
                  Add
                </button>
              </div>
              <ul className="space-y-2">
                {formData.certifications.map((certification, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-transparent border-[1px] border-white p-2 rounded-md"
                  >
                    <span>{certification}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCertification(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Work Experience Section */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Work Experience</h2>
              {formData.workExperience.map((work, index) => (
                <div key={index} className="space-y-4 mb-4">
                  <div>
                    <label className="block font-semibold mb-1">Title</label>
                    <input
                      type="text"
                      value={work.title}
                      onChange={(e) =>
                        handleWorkExperienceChange(
                          index,
                          "title",
                          e.target.value
                        )
                      }
                      className="w-full bg-transparent border-[1px] outline-none border-white text-white p-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Company</label>
                    <input
                      type="text"
                      value={work.company}
                      onChange={(e) =>
                        handleWorkExperienceChange(
                          index,
                          "company",
                          e.target.value
                        )
                      }
                      className="w-full bg-transparent border-[1px] outline-none border-white text-white p-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Duration</label>
                    <input
                      type="text"
                      value={work.duration}
                      onChange={(e) =>
                        handleWorkExperienceChange(
                          index,
                          "duration",
                          e.target.value
                        )
                      }
                      className="w-full bg-transparent border-[1px] border-white outline-none text-white p-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">
                      Responsibilities
                    </label>
                    <textarea
                      value={work.responsibilities}
                      onChange={(e) =>
                        handleWorkExperienceChange(
                          index,
                          "responsibilities",
                          e.target.value
                        )
                      }
                      rows="3"
                      className="w-full bg-transparent border-[1px] outline-none border-white text-white p-2 rounded-md"
                    ></textarea>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveWorkExperience(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Remove Experience
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddWorkExperience}
                className="bg-white font-semibold text-black px-4 py-2 rounded-md"
              >
                Add Work Experience
              </button>
            </div>

            {/* Education Section */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Education</h2>
              {formData.education.map((edu, index) => (
                <div key={index} className="space-y-4 mb-4">
                  <div>
                    <label className="block font-semibold mb-1">Degree</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          education: [
                            ...formData.education.slice(0, index),
                            { ...edu, degree: e.target.value },
                            ...formData.education.slice(index + 1),
                          ],
                        })
                      }
                      className="w-full bg-transparent border-[1px] outline-none border-white text-white p-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">
                      Institution
                    </label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          education: [
                            ...formData.education.slice(0, index),
                            { ...edu, institution: e.target.value },
                            ...formData.education.slice(index + 1),
                          ],
                        })
                      }
                      className="w-full bg-transparent outline-none border-[1px] border-white text-white p-2 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Year</label>
                    <input
                      type="text"
                      value={edu.year}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          education: [
                            ...formData.education.slice(0, index),
                            { ...edu, year: e.target.value },
                            ...formData.education.slice(index + 1),
                          ],
                        })
                      }
                      className="w-full bg-transparent outline-none border-[1px] border-white text-white p-2 rounded-md"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        education: [
                          ...formData.education.slice(0, index),
                          ...formData.education.slice(index + 1),
                        ],
                      })
                    }
                    className="text-red-500 hover:text-red-600"
                  >
                    Remove Education
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    education: [
                      ...formData.education,
                      { degree: "", institution: "", year: "" },
                    ],
                  })
                }
                className="bg-white font-semibold text-black px-4 py-2 rounded-md"
              >
                Add Education
              </button>
            </div>

            {/* Projects Section */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Projects</h2>
              <div className="space-y-4 mb-4">
                {/* Project Title */}
                <div>
                  <label className="block font-semibold mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) =>
                      setNewProject({ ...newProject, title: e.target.value })
                    }
                    placeholder="Project Title"
                    className="w-full bg-transparent border-[1px] outline-none border-white text-white p-2 rounded-md"
                  />
                </div>

                {/* Project Description */}
                <div>
                  <label className="block font-semibold mb-1">
                    Description
                  </label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        description: e.target.value,
                      })
                    }
                    rows="3"
                    placeholder="Project Description"
                    className="w-full bg-transparent border-[1px] outline-none border-white text-white p-2 rounded-md"
                  ></textarea>
                </div>

                {/* Project Link */}
                <div>
                  <label className="block font-semibold mb-1">
                    Project Link
                  </label>
                  <input
                    type="url"
                    value={newProject.link}
                    onChange={(e) =>
                      setNewProject({ ...newProject, link: e.target.value })
                    }
                    placeholder="https://your-project-link.com"
                    className="w-full bg-transparent border-[1px] outline-none border-white text-white p-2 rounded-md"
                  />
                </div>

                {/* Add Project Button */}
                <button
                  type="button"
                  onClick={handleAddProject}
                  className="bg-white text-black font-semibold px-4 py-2 rounded-md"
                >
                  Add Project
                </button>
              </div>

              {/* List of Projects */}
              {/* List of Projects */}
              <div>
                {formData.projects.map((project, index) => (
                  <div key={index} className="project">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Project Link
                      </a>
                    )}
                    <button
                      onClick={() => handleRemoveProject(index)}
                      className="remove-btn"
                    >
                      Remove Project
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            {isLoggedIn ? (
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="bg-white text-black font-semibold px-6 py-2 rounded-md"
                >
                  Submit Resume
                </button>
              </div>
            ) : (
              <h1 className="hover:text-blue-500 hover:underline">
                <Link to="/login">
                  If you want to save your Data then Login First
                </Link>
              </h1>
            )}
          </form>
        </div>
      </div>

      <div className="flex-grow overflow-auto">{renderTemplate()}</div>
    </div>
  );
}

export default CreateResume
