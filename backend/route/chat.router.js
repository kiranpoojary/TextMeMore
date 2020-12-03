const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const router = express.Router()
let chatL = require('../model/chat.list.model')
const chatListModel = new mongoose.model('chatLists')
const listChat = new chatListModel()



router.get("/", (req, res) => {

    chatListModel.find((err, data) => {
        res.send(data)
    })
})

router.post("/", (req, res) => {
    const uid = "ki"
    const rcvId = "Ap"
    const lastmsg = "Hello"
    var arrayChats = []
    arrayChats.push({ rcvrID: rcvId, lastMsg: lastmsg })
    listChat.userChatList.userId = uid
    listChat.userChatList.chats = arrayChats
    listChat.chats = arrayChats

    // listChat.save((err, docs) => {
    //     if (!err) {
    //         res.status(200).json(docs)
    //     } else {
    //         res.status(500)
    //     }
    // })


})


module.exports = router