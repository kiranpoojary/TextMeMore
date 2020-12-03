const mongoose = require('mongoose')

const chatListSchema = new mongoose.Schema({
    userChatList: {
        userId: String,
        chats: [{ rcvrID: String, lastMsg: String }]
    }
})


module.exports = mongoose.model("chatLists", chatListSchema)