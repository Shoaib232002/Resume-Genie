const userModel = require('../models/user.model');
const resumeModel = require('../models/resume.model')
const { validationResult } = require('express-validator');
const { createUser } = require('../services/user.service');
const { bcryptPassword } = require('../utils/bcryptPassword');
const { generateToken } = require('../utils/generateToken');
const bcrypt = require('bcrypt');
const { model } = require('mongoose');

module.exports.registerUser = async (req , res , next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    const {fullname , email , password} = req.body;

   try{

        if(!fullname || !email || !password){
            throw new Error('Please fill all the fields');
        }

        const existingUser = await userModel.findOne({email});

        if(existingUser){
            return res.status(400).json({error: "Email already exists"})
        }
        const hashedPassword = await bcryptPassword(password);
        const user = await createUser({
            fullname ,
            email ,
            password : hashedPassword
        });

        const token = generateToken(user);
        res.cookie('token' , token)
        res.status(200).json({message: "User created successfully" , user , token})
    }
    catch(err){
        res.status(500).send(err.message)
    }

}

module.exports.loginUser = async (req , res , next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    const {email , password} = req.body;

    if(!email){
        return res.status(400).json({error: "Email is required"})
    }

    if(!password){
        return res.status(400).json({error: "Password is required"})
    }

    try{

        const user = await userModel.findOne({email}).select('+password');

        if(!user){
            return res.status(400).json({error: "Invalid email or password"})
        }

        bcrypt.compare(password , user.password , function(err , result){
            if(result){
                const token = generateToken(user);
                res.cookie('token' , token)
                delete user._doc.password
                res.status(200).json({message: "User logged in successfully" , user , token})
            }
            else{
                return res.status(400).json({error: "invalid email or password"})
            }
        })
    }
    catch(err){
        res.status(500).send(err.message)
    }    
}

module.exports.logoutUser = async (req , res , next) => {
    res.cookie('token' , "");
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out' });
}

module.exports.createResume = async (req , res , next) => {
    try {
        const { name, title, contact, skills, languages, certifications, summary, workExperience, education, projects, layout} = req.body;
    
        const loggedInUser = await userModel.findOne({email:req.user.email});

        if(!loggedInUser){
            return res.status(400).json({error: "User not found"})
        }
        const userId = loggedInUser._id;
        
        const resumeCreated = await resumeModel.create({
            name,
            title,
            contact,
            skills,
            languages,
            certifications,
            summary,
            workExperience,
            education,
            projects,
            layout,
            userId
        })
       
        res.status(200).json({ message: 'Resume created successfully!', resume: resumeCreated });
      } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.deleteResume = async (req , res , next ) => {
    try{
        const resumeId = req.params.id;
        
        const deletedResume = await resumeModel.findByIdAndDelete(resumeId);

        if (!deletedResume) {
        return res.status(404).json({ message: 'Resume not found!' });
        }

        res.status(200).json({ message: 'Resume deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.getProfile = async (req , res , next) => {
    const user = req.user;
    if(!user){
        return res.status(401).json({error: "Unauthorized"})
    }
    const userId = user._id;
    if(!userId){
        return res.status(401).json({error: "Unauthorized"})
    }
    try{

        const allResume = await resumeModel.find({userId:userId})

        res.status(200).json({
            message: "Resume found",
            allResume: allResume,
            userDetails: user
        });
    }catch(err){
        res.status(500).json({error: err.message})
    }

}