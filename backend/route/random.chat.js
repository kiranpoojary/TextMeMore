const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
app.use(cors());
const router = express.Router()
const randomChat = require('../model/randomChat.model')
var jdata = []

router.get("/", (req, res) => {

    randomChat.find((err, data) => {
        if (!err) {

            jdata = []
            jdata.push({ "msg": data[7].msg, "sender": data[7].sender, "textTiming": data[7].textTime })
            jdata.push({ "msg": data[6].msg, "sender": data[6].sender, "textTiming": data[6].textTime })
            jdata.push({ "msg": data[5].msg, "sender": data[5].sender, "textTiming": data[5].textTime })
            jdata.push({ "msg": data[4].msg, "sender": data[4].sender, "textTiming": data[4].textTime })
            jdata.push({ "msg": data[3].msg, "sender": data[3].sender, "textTiming": data[3].textTime })
            jdata.push({ "msg": data[2].msg, "sender": data[2].sender, "textTiming": data[2].textTime })
            jdata.push({ "msg": data[1].msg, "sender": data[1].sender, "textTiming": data[1].textTime })
            jdata.push({ "msg": data[0].msg, "sender": data[0].sender, "textTiming": data[0].textTime })

            res.status(200).json(jdata)
        } else {
            res.status(500).json({ "msg": err })
        }
    }).limit(8).sort({
        _id: -1
    })
})

router.post("/", (req, res) => {

    var d = new Date();
    var dateString = d.toISOString()
    const userText = {
        msg: req.body.msg,
        sender: req.body.sender,
        textTime: dateString
    }
    let rchats = new randomChat(userText)
    rchats.save((err, data) => {
        if (!err) {
            randomChat.find((err, data) => {
                let dltID = data[0]._id
                randomChat.deleteOne({ _id: dltID }, (err, doc) => {
                    if (!err) {
                        res.status(200).json({ "sent": true })
                    } else {
                        res.status(200).json({ "sent": true })
                    }
                })
            })

        } else {
            res.status(200).json({ "sent": false })
        }
    })
})

module.exports = router