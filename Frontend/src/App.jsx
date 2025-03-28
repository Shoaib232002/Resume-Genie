import React from "react";
import { Route, Routes } from 'react-router-dom'
import Home from "./components/Home";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import TemplateSelection from "./components/pages/TemplateSelection";
import CreateResume from "./components/pages/CreateResume";
import Document from "./components/pages/Document";
import UserProtectedWraper from "./components/pages/UserProtectedWraper";




const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/template-selection" element={<TemplateSelection/>}/>
      <Route path="/create-resume/:layoutId" element={<CreateResume/>}/>
      <Route path="/document" element={
        <UserProtectedWraper>
          <Document/>
        </UserProtectedWraper>
      }/>
    </Routes>
    
    </>
  );
};

export default App;