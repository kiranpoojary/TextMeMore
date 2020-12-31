const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
app.use(cors());
const router = express.Router()
let userModel = require('../model/users')



router.post("/friendRequest/follow", (req, res) => {

            // userModel.countDocuments({ $and: [{ userId: "ki" }, { "friends.userId": "anu123" }] }, (err, docs) => {
            //             console.log(docs);
            //             res.status(200).json({ "done": docs })
            // })

            const updateSender = { $push: { friends: { userId: req.body.requestedTo, followSent: true, followAccepted: false, followbackSent: false, followbackAccepted: false, inchats: false } } }
            userModel.findOneAndUpdate({ userId: req.body.userId }, updateSender, { useFindAndModify: false, upsert: true, new: true }, (err, docs) => {
                        if (!err) {
                                    const updateReciever = { $push: { friends: { userId: req.body.userId, followSent: false, followAccepted: false, followbackSent: false, followbackAccepted: false, inchats: false } } }
                                    userModel.findOneAndUpdate({ userId: req.body.requestedTo }, updateReciever, { useFindAndModify: false, upsert: true, new: true }, (err, docs) => {
                                                if (!err) {
                                                            res.status(200).json({ "sent": true })
                                                } else {
                                                            res.status(200).json({ "sent": false })
                                                }
                                    })
                        } else {
                                    res.status(200).json({ "sent": false })
                        }
            })
})

router.get("/friendRequest/accept", (req, res) => {

            // userModel.countDocuments({ $and: [{ userId: "ki" }, { "friends.userId": "anu123" }] }, (err, docs) => {
            //             //res.send("lol")
            //             res.status(200).json({ "done": docs })
            // })


            userModel.updateOne({ $and: [{ userId: "ki" }, { "friends.userId": "anu123" }] }, {
                        $set: {
                                    'friends.$.userId': 'updated item2'
                        }
            }, { useFindAndModify: false }, (err, docs) => {
                        //res.send("lol")
                        console.log(docs);
                        res.status(200).json({ "done": docs })
            })
})

module.exports = router