const mongoose = require('mongoose')

function connectDB()
{
    mongoose.connect('mongodb+srv://Rithika:Vampire%4020@cluster0.ycao0.mongodb.net/Mini_project',{useUnifiedTopology: true, useNewUrlParser: true})

    const connection = mongoose.connection

    connection.on('connected', ()=>{
        console.log('Mongo DB Connection is Successfull')
    })

    connection.on('error', ()=> {
        console.log("Mongo DB connection error")
    })
}

connectDB()

module.exports = mongoose