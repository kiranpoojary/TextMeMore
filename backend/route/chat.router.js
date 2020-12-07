const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const router = express.Router()
let chatListModel = require('../model/chat.list.model')

router.get("/", (req, res) => {
    const myName = "ki"

    chatListModel.find({ $or: [{ chatMember1: myName }, { chatMember2: myName }] }, (err, data) => {
        if (!err) {

            res.status(200).json(data)
        } else {
            res.status(500).json({ "error": err })
        }
    })
})

router.post("/", (req, res) => {
    const member1 = "appiee"
    const member2 = "ki"
    const msg = "wt bro"
    const sender = "appiee"
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
                        res.status(200).json(docs)
                    } else {
                        res.status(500).json({ "error": err })
                    }
                })

            } else {
                const updateChatArray = { $push: { chats: { message: msg, sender: sender, textTime: textTime, seen: seen } } }

                chatListModel.findOneAndUpdate({ $or: [{ chatMember1: member1, chatMember2: member2 }, { chatMember1: member2, chatMember2: member1 }] }, updateChatArray, { useFindAndModify: false, upsert: true, new: true }, function (err, doc) {
                    if (!err) {
                        res.status(200).json(doc)
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
    // chatListModel.findOneAndUpdate({ userId: uid, chats: { $elemMatch: { rcvrID: rcvId } } }, updateChatArray, { useFindAndModify: false, upsert: true, new: true }, function (err, doc) {
    //     if (!err) {
    //         res.status(200).json(doc)
    //     }
    //     else {
    //         res.status(200).json({ "error": err })
    //     }
    // });
})



router.get("/privateChat", (req, res) => {

    let myName = "ki"

    chatListModel.find({ $or: [{ chatMember1: myName }, { chatMember2: myName }] }, (err, data) => {
        if (!err) {
            //res.send(data)
            res.status(200).json(data)
        } else {
            res.status(500).json({ "error": err })
        }
    })


})

module.exports = router