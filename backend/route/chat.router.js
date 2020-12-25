const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
app.use(cors());
const router = express.Router()
let chatListModel = require('../model/chat.list.model')

router.get("/", (req, res) => {
    const myName = req.query.logedUserId
    const searchId = req.query.searchId
    chatListModel.find({ $and: [{ $or: [{ chatMember1: myName }, { chatMember2: myName }], chatMember1: { $regex: '^' + searchId, $options: 'i' } }] }, (err, data) => {
        if (!err) {
            res.status(200).json(data)
        } else {
            res.status(500).json({ "error": err })
        }
    }).sort({ 'chats._id': -1 }).slice('chats', -7)



    // const myName = req.query.logedUserId
    // chatListModel.find({ $or: [{ chatMember1: myName }, { chatMember2: myName }] }, (err, data) => {
    //     if (!err) {
    //         res.status(200).json(data)
    //     } else {
    //         res.status(500).json({ "error": err })
    //     }
    // }).sort({ 'chats._id': -1 }).slice('chats', -7)


})




router.post("/", (req, res) => {
    const member1 = req.body.member1
    const member2 = req.body.member2
    const msg = req.body.msg
    const sender = req.body.sender
    var time = new Date();
    const textTime = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const seen = false


    chatListModel.countDocuments({ $or: [{ chatMember1: member1, chatMember2: member2 }, { chatMember1: member2, chatMember2: member1 }] }, (err, count) => {
        if (!err) {
            if (count == 0) {
                const firstChat = {
                    chatMember1: member1,
                    chatMember2: member2,
                    chats: [{
                        message: msg,
                        sender: sender,
                        textTime: textTime,
                        seen: seen
                    }]
                }

                const newChat = new chatListModel(firstChat)
                newChat.save((err, docs) => {
                    if (!err) {
                        res.status(200).json({ "sent": true })
                    } else {
                        res.status(500).json({ "sent": false, "error": err })
                    }
                })
            } else {
                const updateChatArray = { $push: { chats: { message: msg, sender: sender, textTime: textTime, seen: seen } } }
                chatListModel.findOneAndUpdate({ $or: [{ chatMember1: member1, chatMember2: member2 }, { chatMember1: member2, chatMember2: member1 }] }, updateChatArray, { useFindAndModify: false, upsert: true, new: true }, function (err, doc) {
                    if (!err) {
                        res.status(200).json({ "sent": true })
                    }
                    else {
                        res.status(200).json({ "error": err })
                    }
                });
            }
        } else {
            res.status(500).json({ "error": err })
        }
    })
})



module.exports = router