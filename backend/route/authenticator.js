const express = require('express')
const app = express()
const cors = require('cors')
const router = express.Router()
let userModel = require('../model/users')
app.use(cors());
const GridFsStorage = require('multer-gridfs-storage');

router.get("/", (req, res) => {
    res.send("Mongoose Database server running.....")
})

router.get('/image', (req, res, next) => {
    res.status(200).json({ msg: "fine" })
})

router.post('/image', (req, res) => {
    console.log(req.body.a + " " + req.body.b);
    res.status(200).json({ num1: req.body.a })

})

router.post("/register", (req, res) => {
    let userName = req.body.inputName
    let userID = req.body.inputUserId
    let password = req.body.inputPassword
    let email = req.body.inputEmail
    let mob = req.body.inputMobile
    let loged = false

    let userInfo = {
        userName: userName,
        userId: userID,
        password: password,
        email: email,
        mobile: mob,
        public: true,
        logedIn: loged,
        lastLogin: "NA"
    }

    var userObj = new userModel(userInfo)

    userObj.save((err, data) => {
        if (!err) {
            res.status(200).json({ registered: true })
        } else {
            res.status(500).json({ registered: false })
        }
    })
})


router.post("/auth", (req, res) => {
    var userID = req.body.userId;
    var password = req.body.password;
    userModel.countDocuments({ userId: userID, password: password }, function (err, userCount) {
        if (!err) {
            if (userCount == 1) {
                res.status(200).json({ 'valid': true })
            } else {
                res.status(200).json({ 'valid': false, })
            }
        } else {
            res.status(400).json({ 'valid': false, "error": err })
        }
    })
})

module.exports = router