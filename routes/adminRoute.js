const express = require("express");
const router = express.Router();
const Admin = require("../models/adminModel")
router.post("/admincheck", async (req, res) => {
    const { username, password } = req.body
    try {
        const admin_details = await Admin.findOne({ username, password })
        console.log("check admin", admin_details)
        if (admin_details) {
            res.send(admin_details)
        }
    }
    catch {
        return res.status(400).json(error);
    }
});
module.exports = router;