const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        unique:true,
        minlength:[3,'Fullname must be at least 3 character long']
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[10,'Email must be at least 5 character long'],
    },
    password:{
        type:String,
        required:true,
        unique:true,
        select:false,
        minlength:[8,'Password must be at least 8 character long'],
    }

});

const userModel = mongoose.model('user' , userSchema)

module.exports = userModel;