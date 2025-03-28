import React, { useEffect } from 'react'
import { UserDataContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom';
import { useContext } from "react";

const UserProtectedWraper = ({children}) => {

    const navigate = useNavigate();
    const {userData} = useContext(UserDataContext);
    const token = localStorage.getItem('token');

    useEffect(()=> {

        if(!token){
            navigate('/login')
        }

        if(!userData){ 
            navigate('/login')
        }
    },[])

  return (
    <>
    {children}
    </>
  )
}

export default UserProtectedWraper
