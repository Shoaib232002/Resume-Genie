import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { UserDataContext } from '../../context/UserContext';
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  
  const navigate = useNavigate();
  const {userData , setUserData} = useContext(UserDataContext)

  const [fullname , setFullName] = useState('');
  const [email ,  setEmail] = useState('');
  const [password ,  setPassword] = useState('');
  const [error, setError] = useState('');

  const validateForm = () => {
    if (fullname.length < 3) {
      setError('Full name must be at least 3 characters long');
      return false;
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    setError('');
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const registerData = {
      fullname: fullname,
      email: email,
      password: password
    }

    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register` ,registerData)
      
      if(response.status === 200){
        const data = response.data;
        setUserData(data.user)
        localStorage.setItem('token' , data.token)
        navigate('/document')
      }
      setFullName('');
      setEmail('');
      setPassword('');
    }
    catch(err){
      console.log(err);
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Registration failed. Please try again.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-gray-200">
      <div className="bg-[#1a1a1a] rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-100 mb-6">
          Create an Account
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-500 rounded-md text-sm">
            {error}
          </div>
        )}
        <form onSubmit={(e)=>{
          submitHandler(e)
        }} className="space-y-6">
          {/* Full Name Input */}
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-semibold text-white"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              onChange={(e)=>{setFullName(e.target.value)}}
              value={fullname}
              className="mt-1 block w-full px-4 py-2 bg-[#2a2a2a] text-gray-200 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:border-white sm:text-sm"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-white"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              onChange={(e)=>{setEmail(e.target.value)}}
              value={email}
              className="mt-1 block w-full px-4 py-2 bg-[#2a2a2a] text-gray-200 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:border-white sm:text-sm"
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
              onChange={(e)=>{setPassword(e.target.value)}}
              value={password}
              className="mt-1 block w-full px-4 py-2 bg-[#2a2a2a] text-gray-200 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:border-white sm:text-sm"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Register Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-white text-black cursor-pointer rounded-md shadow-md  transition duration-300 ease-in-out"
            >
              Register
            </button>
          </div>
        </form>

        {/* Already Have an Account */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#3b82f6] hover:underline hover:text-[#2563eb]"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
