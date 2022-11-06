const express = require("express")
const app= express()
const port = process.env.PORT || 5000
const bodyParser = require('body-Parser');
const dbConnection = require('./db');
const nodemailer = require('nodemailer');
const cors = require("cors")
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(bodyParser.json());
app.use('/api/cars', require('./routes/carsRoute'))
app.use('/api/users', require('./routes/usersRoute'))
app.get('/', (req,res) => res.send('Hello World'))
app.listen(port, () => console.log('Node JS Server Started in port'))
app.use('/api/bookings/', require('./routes/bookingsRoute'))

const path = require('path')

if(process.env.NODE_ENV === 'production')
{
    app.use('/', express.static('client/build'))

    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'client/bluid/index.html'));
    })
}

app.use('/api/admin/', require('./routes/adminRoute'))
app.use(cors());

