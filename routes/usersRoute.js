const express = require("express");
const router = express.Router();
const server = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-Parser');
server.use(bodyParser.json());
const User = require("../models/userModel")
const Admin = require("../models/adminModel")
router.post("/login", async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.findOne({ username, password })
        console.log("user", user);
        if (user) {
            res.send(user)
        }
    } catch {
        return res.status(400).json(error);
    }
});
router.post("/register", async (req, res) => {
    const { username } = req.body
    try {
        const user = await Admin.findOne({ username })
        const user1 = await User.findOne({ username })
        if (user) {
            return res.send('taken');
        }

        else if (user1) {
            return res.send('taken');
        }
        else {
            const newuser = new User(req.body)
            await newuser.save()
            res.send('user registered successfully')
        }
    } catch {
        return res.status(400).json(error);
    }
});

router.post("/editProfile", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body._id })
        console.log(user);
        user.username = req.body.username
        user.password = req.body.password
        user.phoneno = req.body.phoneno
        user.license_no = req.body.license_no
        user.email = req.body.email
        user.license_approved = req.body.license_approved
        await user.save()
        res.send(user)
    }
    catch (error) {
        return res.status(400).json(error);
    }
});

router.get("/getallusers", async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.post("/licensedVerified", async (req, res) => {
    try {
        const user = await User.updateOne({ _id: req.body._id }, {
            $set: {
                license_approved: req.body.license_approved
            }
        }, {
            new: true,
        });
        res.send('approved')
    } catch (error) {
        return res.status(400).json(error);
    }
});

router.post("/sendemail", async (req, res) => {
    "use strict";
    const { email_id } = req.body
    // async..await is not allowed in global scope, must use a wrapper

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: "587",
        secure: false, // true for 465, false for other ports
        auth: {
            user: "FastandFuriousrides@outlook.com", // generated ethereal user
            pass: "TS34G5103@june2021", // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"FastandFurious" <FastandFuriousrides@outlook.com>', // sender address
        to: email_id,// list of receivers
        subject: "Hello", // Subject line
        html: "<h5>Hi, there.....</h5> <p> Your request for car got accecpted by the host</p>", // html body
    });
    if (info.messageId) {
        res.send("email sent");
    }
    else {
        res.send("Error with sending email");
    }
    // main().catch(console.error);

});

module.exports = router;