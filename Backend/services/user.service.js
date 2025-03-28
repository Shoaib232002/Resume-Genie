const userModel = require('../models/user.model');

module.exports.createUser = async ({ fullname , email , password }) => {
    try {
        const user = await userModel.create({ fullname , email , password });
        delete user._doc.password
        return user;
    } catch (error) {
        throw new Error('Error creating user');
    }
}