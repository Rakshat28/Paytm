const mongoose = require('mongoose');
require('dotenv').config;

mongoose.connect(process.env.MONGO_URI);

const userSchema = mongoose.Schema({
    username : String,
    firstName : String,
    lastName : String,
    password : String
})

const User = mongoose.model('User',userSchema);

module.exports = {
    User
};