import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";
import { UserDataContext } from "../../context/UserContext";

const LoginPage = () => {

  const navigate = useNavigate();
  const {userData , setUserData} = useContext(UserDataContext)


  const [loginEmail ,  setLoginEmail] = useState('');
  const [loginPassword ,  setLoginPassword] = useState('');
  const [error, setError] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    const LoginData = {
      email: loginEmail,
      password: loginPassword
    }

    try {

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login` ,LoginData)
      
      if(response.status === 200){
        const data = response.data;
        setUserData(data.user)
        localStorage.setItem('token' , data.token)
        navigate('/document')
      }

    }catch(err){
      if (err.response) {
        if (err.response.status === 401) {
          setError('Incorrect email or password');
        } else if (err.response.status === 404) {
          setError('User not found');
        } else {
          setError('An error occurred. Please try again.');
        }
      } else {
        setError('Network error. Please check your connection.');
      }
      console.log(err);
    }
    
    setLoginEmail('');
    setLoginPassword('');
  }

  
  return (
    <div className="h-screen flex items-center justify-center bg-[#0a0a0a] text-gray-200">
      <div className="bg-[#1a1a1a] rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-100 mb-6">
        Sign in to your account
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-500 rounded-md text-sm">
            {error}
          </div>
        )}
        <form onSubmit={(e)=>{
          submitHandler(e)
        }} className="space-y-6">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-white font-semibold"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-[#2a2a2a] cursor-pointer text-gray-200 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white  sm:text-sm"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className="mt-1 block w-full cursor-pointer px-4 py-2 bg-[#2a2a2a] text-gray-200 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-white sm:text-sm"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-white text-black rounded-md shadow-md font-semibold cursor-pointer transition duration-300 ease-in-out"
            >
              Login
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-center">
             Dont have an account? <Link className="text-[#3b82f6] hover:underline hover:text-[#2563eb]" to="/register">Create one now</Link>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default LoginPage;
