const mongoose = require('mongoose')

const randomChatSchema = new mongoose.Schema({
	msg: String,
	sender: String,
	textTime: String
})


module.exports = mongoose.model("random_chats", randomChatSchema)
