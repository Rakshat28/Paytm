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

const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref :'User',
        required : true
    },
    balance : {
        type : Number,
        required : true
    }
});

const Account = mongoose.model('Account',accountSchema);

module.exports = {
    User,
    Account
};