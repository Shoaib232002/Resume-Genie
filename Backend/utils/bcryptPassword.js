const bcrypt = require('bcrypt');

module.exports.bcryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10); // Generate salt
    return bcrypt.hashSync(password, salt); // Hash the password and return
};
