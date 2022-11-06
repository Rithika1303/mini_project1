const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {type: String , required: true},
    password : {type: String, required: true},
    phoneno :  {type: Number, required: false},
    email : {type: String, required: false},
    license_no : {type: String, required: false},
    license_approved : {type: String, required : false}
    // license_pic : {type}
})

const userModel= mongoose.model('users', userSchema)

module.exports = userModel