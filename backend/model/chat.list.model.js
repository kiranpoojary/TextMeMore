const mongoose = require('mongoose')

const chatListSchema = new mongoose.Schema({
    chatMember1: String,
    chatMember2: String,
    chats: [{ message: String, sender: String, textTime: String, seen: Boolean }]
})



module.exports = mongoose.model("chatLists", chatListSchema)
