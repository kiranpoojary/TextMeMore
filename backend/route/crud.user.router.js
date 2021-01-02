const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
app.use(cors());
const router = express.Router()
let userModel = require('../model/users')



router.post("/followRequest/send/follow", (req, res) => {
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

router.post("/followRequest/accept/follow", (req, res) => {
            userModel.updateOne({ userId: req.body.userId, "friends.userId": req.body.requestedTo }, {
                        $set: { "friends.$.followAccepted": true }
            }, (err, docs) => {
                        if (!err) {
                                    userModel.updateOne({ userId: req.body.requestedTo, "friends.userId": req.body.userId }, {
                                                $set: { "friends.$.followAccepted": true }
                                    }, (err, docs) => {
                                                if (!err) {
                                                            res.status(200).json({ "accepted": docs })
                                                } else {
                                                            res.status(200).json({ "accepted": false, "error": err })
                                                }
                                    })
                        } else {
                                    res.status(200).json({ "accepted": false, "error": err })
                        }
            })
})




router.post("/followRequest/send/followback", (req, res) => {
            userModel.updateOne({ userId: req.body.userId, "friends.userId": req.body.requestedTo }, {
                        $set: { "friends.$.followbackSent": true }
            }, (err, docs) => {
                        if (!err) {
                                    userModel.updateOne({ userId: req.body.requestedTo, "friends.userId": req.body.userId }, {
                                                $set: { "friends.$.followbackSent": true }
                                    }, (err, docs) => {
                                                if (!err) {
                                                            res.status(200).json({ "sent": docs })
                                                } else {
                                                            res.status(200).json({ "sent": false, "error": err })
                                                }
                                    })
                        } else {
                                    res.status(200).json({ "sent": false, "error": err })
                        }
            })
})



router.post("/followRequest/accept/followback", (req, res) => {
            userModel.updateOne({ userId: req.body.userId, "friends.userId": req.body.requestedTo }, {
                        $set: { "friends.$.followbackAccepted": true }
            }, (err, docs) => {
                        if (!err) {
                                    userModel.updateOne({ userId: req.body.requestedTo, "friends.userId": req.body.userId }, {
                                                $set: { "friends.$.followbackAccepted": true }
                                    }, (err, docs) => {
                                                if (!err) {
                                                            res.status(200).json({ "accepted": docs })
                                                } else {
                                                            res.status(200).json({ "accepted": false, "error": err })
                                                }
                                    })
                        } else {
                                    res.status(200).json({ "accepted": false, "error": err })
                        }
            })
})


router.post("/followRequest/cancel-request", (req, res) => {
            res.status(200).json({ "cancel-request": true })

})

router.post("/followRequest/cancelfollowback", (req, res) => {
            userModel.updateOne({ userId: req.body.userId, "friends.userId": req.body.requestedTo }, {
                        $set: { "friends.$.followbackSent": false }
            }, (err, docs) => {
                        if (!err) {
                                    userModel.updateOne({ userId: req.body.requestedTo, "friends.userId": req.body.userId }, {
                                                $set: { "friends.$.followbackSent": false }
                                    }, (err, docs) => {
                                                if (!err) {
                                                            res.status(200).json({ "cancelfollowback": true })
                                                } else {
                                                            res.status(200).json({ "cancelfollowback": false, "error": err })
                                                }
                                    })
                        } else {
                                    res.status(200).json({ "accepted": false, "error": err })
                        }
            })

})




router.post("/followRequest/unfollow", (req, res) => {

            userModel.updateMany({ $or: [{ userId: req.body.userId }, { userId: req.body.requestedTo }] }, { $pull: { friends: { userId: { $in: [req.body.userId, req.body.requestedTo] } } } }, (err, docs) => {
                        if (!err) {
                                    res.status(200).json({ "unfollowed": true })
                        } else {
                                    res.status(200).json({ "unfollowed": false })
                        }
            })
})

module.exports = router