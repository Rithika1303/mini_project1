const express = require("express");
const router = express.Router();
const Car = require("../models/carModel")

router.get("/getallcars", async (req, res) => {
    try {
        const cars = await Car.find()
        res.send(cars)
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.post("/HostCar", async (req, res) => {
    try {
        const newcar = new Car(req.body)
        await newcar.save()
        res.send('Car Addes Successfully')
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.post("/editCar", async (req, res) => {
    try {
        const car = await Car.findOne({ _id: req.body._id })
        car.name = req.body.name
        car.image = req.body.image
        car.fuelType = req.body.fuelType
        car.rentPerHour = req.body.rentPerHour
        car.capacity = req.body.capacity
        await car.save()
        res.send('Car details updated Successfully')
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.post("/rcVerified", async (req, res) => {
    try {
        const car = await Car.updateOne({ _id: req.body._id }, {
            $set: {
                rcVerify: req.body.rcVerify
            }
        },{
            new: true,
        });
        res.send('approved')
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.post("/deleteCar", async (req, res) => {
    try {
        await Car.findOneAndDelete({ _id: req.body.carid })

        res.send('Car details deleted Successfully')
    } catch (error) {
        return res.status(400).json(error);
    }
});
module.exports = router;