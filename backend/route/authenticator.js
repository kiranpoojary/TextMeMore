const express = require('express')
const app = express()
const cors = require('cors')
const router = express.Router()
let userModel = require('../model/users')
app.use(cors());

router.get("/", (req, res) => {
    res.send("Okay Ji")
})

router.post("/auth", (req, res) => {

    var userID = req.body.userId;
    var password = req.body.password;
    userModel.countDocuments({ userId: userID, password: password }, function (err, userCount) {
        if (!err) {
            if (userCount == 1) {
                res.status(200).json({ 'valid': true })
            } else {
                res.status(200).json({ 'valid': false })
            }
        } else {
            res.status(400).json({ 'valid': false })
        }
    })

})

module.exports = router