const mongoose = require("mongoose");

const carSchema= new mongoose.Schema({
    username: {type : String , required : true} ,
    userid: {type: String, required:true},
    name: {type : String , required : true} ,
    image: {type : String , required : true} ,
    rentPerHour: {type : Number , required : true},   
    fuelType: {type : String , required : true} ,
    bookedTimeSlots:[
         {
            from : {type: String , required : true} ,
            to : {type: String, required: true}
         }
    ],
    carrc : {type: String, required: false},
    rcVerify: {type : String , required : false} ,
    status: {type : String , required : false} ,
    capacity: {type : Number , required : true} 
}, {timestamps: true}

)

const carModel = mongoose.model('cars', carSchema)
module.exports= carModel