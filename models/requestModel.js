const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    carid : {type: String , required: true},
    userid : {type: String, required: true},
    request:{type: String, reuired: true},
})

const requestModel= mongoose.model('request', requestSchema)

module.exports = requestModel