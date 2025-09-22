import React, { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profilePanel , setProfilePanel] = useState(false);

    useEffect(()=>{

        gsap.registerPlugin(ScrollTrigger);

        
        const checkLoginStatus = () => {
            const token = localStorage.getItem('token'); // Example of checking user data in local storage
            if (token) {
              setIsLoggedIn(true);
            }
          };
      
        checkLoginStatus();

    },[])

    useEffect(()=> {
        if(profilePanel){
          gsap.to('.profileTogel',{
            duration: 0.5,
            height:'80px'
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
              navigate('/');
              window.location.reload()
              } catch (error) {
                console.error('Error logging out:', error);
              }
      }

  return (
       <>
       <div className='overflow-x-hidden'>
       <div className='hero-section'>
            <nav>
                <div className="logo flex gap-3 items-center">
                    <div className='bg-white w-4 h-4 rounded-full'></div>
                    <h1>ResumeGenie</h1>
                </div>
                <div className="nav-link">
                    <Link to="/"><h2>Home</h2></Link>
                    <Link to='/document'>Dashboard</Link>
                    <Link to="/template-selection"><h2>Resume</h2></Link>
                    
                </div>
                {isLoggedIn ? (
              <img
              onClick={()=> {
                setProfilePanel(!profilePanel);
              }}
                className="w-[4vw] rounded-full cursor-pointer"
                src="https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg"
                alt="User"
              />
            ) : (
              <div>
                <Link
                  to="/login"
                  className="sign-in-btn font-semibold text-black bg-white px-4 py-2 rounded-md"
                >
                  Sign In
                </Link>
              </div>
            )}
            </nav>
            <div className='profileTogel h-0 overflow-hidden absolute w-[15vw] bg-zinc-800 rounded-md z-50 right-20 top-16'>
          <button onClick={()=>{
            LogoutHandler();
          }} className='bg-white text-black ml-4 px-2 py-1 font-semibold mx-5 my-5  rounded-md'>Logout</button>
          </div>
            <div className='Hero-Content'>
                <h1 className=' font-medium'> Create a professional resume in minutes with the <span className='text-[#483ed6]'> power of AI.</span></h1>
            </div>
            <div className='w-full flex justify-center'>
                <p className='w-[40vw] text-center'>Say goodbye to boring resumes! AI Resume Maker generates professional resumes in minutes.. improve your writing & highlight your strengths.</p>
            </div>

            <div className='w-full flex justify-center pt-10'>
                <Link to='/template-selection'><button className='sign-in-btn font-semibold text-black bg-white px-4 py-2 rounded-md'>Get Started</button></Link>
            </div>

        </div>

       </div>
       </>
  )
}

export default Home
