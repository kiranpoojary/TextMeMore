const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
app.use(cors());
const { response } = require('express')
const router = express.Router()
const randomChat = require('../model/randomchat.model')
const randomModel = new mongoose.model('random_chats')
var jdata = []

router.get("/", (req, res) => {
    randomChat.find((err, data) => {
        if (!err) {
            jdata = []
            jdata.push({ "msg": data[7].msg, "sender": data[7].sender, "color": "chartreuse" })
            jdata.push({ "msg": data[6].msg, "sender": data[6].sender, "color": "lightseagreen" })
            jdata.push({ "msg": data[5].msg, "sender": data[5].sender, "color": "white" })
            jdata.push({ "msg": data[4].msg, "sender": data[4].sender, "color": "pink" })
            jdata.push({ "msg": data[3].msg, "sender": data[3].sender, "color": "black" })
            jdata.push({ "msg": data[2].msg, "sender": data[2].sender, "color": "orange" })
            jdata.push({ "msg": data[1].msg, "sender": data[1].sender, "color": "cyan" })
            jdata.push({ "msg": data[0].msg, "sender": data[0].sender, "color": "gold" })

            res.status(200).json(jdata)
        } else {
            res.status(500).json({ "msg": err })
        }
    }).limit(8).sort({
        _id: -1
    })


    // .sort({
    //     _id: -1
    // }).limit(5)

})

router.post("/", (req, res) => {
    const userText = {
        msg: req.body.msg,
        sender: req.body.sender
    }
    let rchats = new randomChat(userText)


    rchats.save((err, data) => {
        if (!err) {
            res.status(200).json({ "sent": true })
        } else {
            res.status(200).json({ "sent": false })
        }
    })

    //res.status(200).json([{ "sent": true, "msg": userText }])

})

module.exports = router