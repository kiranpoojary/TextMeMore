const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
    userName: {
        type: String
    },
    userId: {
        type: String
    },
    password: {
        type: String
    }
})

module.exports = mongoose.model('users', usersSchema)