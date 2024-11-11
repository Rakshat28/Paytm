const mongoose = require('mongoose');

const url = "mongodb+srv://rakshat07ps:<db_password>@cluster0.ft5o0.mongodb.net/";
mongoose.connect(url);

const userSchema = mongoose.Schema({
    username : String,
    password : String,
    firstName : String,
    lastName :String
});

const User = mongoose.model('User',userSchema);


module.exports = User;