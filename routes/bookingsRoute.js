const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel")
const Car=require('../models/carModel')
router.post("/bookcar", async(req, res) =>{ 
    req.body.transactionId='1234'
    try {
        const newbooking = new Booking(req.body)
        await newbooking.save()
        const car=await Car.findOne({_id:req.body.car.toString()})
        console.log(req.body.car)
        car.bookedTimeSlots.push(req.body.bookedTimeSlots)
        await car.save()
        res.send('your booking is successful')
    } catch (error){
        return res.status(400).json(error);
    }
});
router.get("/getallbookings", async(req, res) => {

    try {

        const bookings = await Booking.find({}).populate('car').populate('host')
        res.send(bookings)
        
    } catch (error) {
        return res.status(400).json(error);
    }
  
});

router.get("/getallhostreq", async(req, res) => {
    try {
        const bookings= await Booking.find({}).populate('user').populate('car')
        res.send(bookings)
    }
    catch(error){
        res.status(400).json(error);
    }
});

router.post("/changerequest", async (req, res) => {
    try {
        const bookings = await Booking.updateOne({ _id: req.body._id }, {
            $set: {
                request: req.body.request
            }
        },{
            new: true,
        });
        res.send('approved')
    } catch (error) {
        return res.status(400).json(error);
    }
});
module.exports= router;