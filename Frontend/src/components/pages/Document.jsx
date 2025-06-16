import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../Home.css';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css';
import gsap from 'gsap';
import ResumeTemplate from '../template/ResumeTemplate';
import ResumeTemplate4 from '../template/ResumeTemplate4';
import ResumeTemplate5 from '../template/ResumeTemplate5';
import ResumeTemplate3 from '../template/ResumeTemplate3';
import ResumeTemplate2 from '../template/ResumeTemplate2';

const Document = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null); // Store profile data
  const [formData, setFormData] = useState([]); // Store resume data'
  const [profilePanel , setProfilePanel] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Adjust if you're storing it differently
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`, // Assuming Bearer token format
        },
      })
      .then((res) => {
        setProfileData(res.data.userDetails); // Store user details
        setFormData(res.data.allResume); // Store all resume data
      })
      .catch((err) => {
        console.error('Error fetching profile data:', err);
      });
  }, []);
  
  useEffect(()=> {
    if(profilePanel){
      gsap.to('.profileTogel',{
        duration: 0.5,
        height:'150px'
      })
    }
    if(!profilePanel){
      gsap.to('.profileTogel',{
        duration: 0.5,
        height:'0px'
        })
    }
  }, [profilePanel])

  const LogoutHandler = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          });
          localStorage.removeItem('token');
          navigate('/login');
          } catch (error) {
            console.error('Error logging out:', error);
          }
            

  }

  return (
    <div className="min-h-screen w-full text-white bg-black relative overflow-hidden ">
      <nav className="py-[1] px-[2vw] mb-5 flex items-center justify-between z-10">
        <div className="logo flex gap-3 items-center ">
          <div className="bg-white w-4 h-4 rounded-full"></div>
          <h1 className="font-semibold"></h1>
        </div>
        <div className="nav-link font-semibold flex gap-5 z-40">
          <Link to="/">Home</Link>
          <Link to="/document">Dashboard</Link>
          <Link to="/template-selection">Resume</Link>
          
        </div>
        <div className='z-20'>
          <img
            onClick={()=> {
              setProfilePanel(!profilePanel);
            }}
            className="w-[4vw] rounded-full cursor-pointer"
            src="https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg"
            alt=""
          />
        </div>
      </nav>

      <div className='profileTogel h-0 overflow-hidden absolute w-[15vw] bg-zinc-800 rounded-md z-50 right-3 top-16'>
          <h1 className='text-gray-100 ml-4'>{profileData ? profileData.fullname : 'Loading...'}</h1>
          <h1 className='text-gray-400 ml-4 mt-4'>{profileData ? profileData.email : 'Loading..'}</h1>
          <h1 className='text-gray-400 ml-4 mb-4'>Total Resume : <span>{formData.length}</span></h1>
          <button onClick={()=>{
            LogoutHandler();
          }} className='bg-white text-black ml-4 px-2 py-1 font-semibold  rounded-md'>Logout</button>
      </div>

      <h1 className="text-[3vw] font-semibold px-[4vw]">Your Documents</h1>
      <div className="w-full px-[4vw] py-[4vw]">
        <div className="mt-6 w-[20vw] h-[60vh] border-[1px] border-gray-600 flex items-center justify-center mb-5">
          <Link to="/template-selection">
            <i className="text-[4vw] font-normal text-gray-600 ri-add-line"></i>
          </Link>
        </div>
        </div>
        {/* Templates grid */}
        <div className="absolute flex flex-col h-screen flex-nowrap overflow-y-auto top-0 right-0">
          {formData?.map((resume, index) => (
            <div key={index}>
              <div key={index} className="scale-[0.4] -mt-[40vh] -mb-[70vh] mr-10">
                {(() => {
                  switch (resume.layout) {
                    case '0':
                      return <ResumeTemplate formData={resume}/>;
                    case '1':
                      return <ResumeTemplate4 formData={resume}/>;
                    case '2':
                      return <ResumeTemplate3 formData={resume}/>;
                    case '3':
                      return <ResumeTemplate2 formData={resume}/>;
                    case '4':
                      return <ResumeTemplate5 formData={resume}/>;
                    default:
                      return null;
                  }
                })()}
              </div>
            </div>
          ))}
        </div>
    </div>
    
  );
};

export default Document;
