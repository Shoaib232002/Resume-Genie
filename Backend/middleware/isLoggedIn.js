const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

module.exports.isLogIn = async (req , res , next ) => {
    const token =  req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({message:'Unauthorized - No Token'})
    }

    try{
        const decoded = jwt.verify(token , process.env.JWT_KEY);
        const user = await userModel.findOne({ email: decoded.email}).select("-password");

        if(!user){
            return res.status(401).json({message:'Unauthorized - User Not Found'})
        }
        req.user = user;
        next();
    }
    catch(err){
        return res.status(401).json({message:'Unauthorized'})
    }
}