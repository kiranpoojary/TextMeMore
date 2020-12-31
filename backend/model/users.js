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
    },
    email: {
        type: String
    },
    mobile: {
        type: String
    },
    public: {
        type: Boolean
    },
    logedIn: {
        type: Boolean
    },
    friends: [{
        userId: String,
        followSent: Boolean,
        followAccepted: Boolean,
        followbackSent: Boolean,
        followbackAccepted: Boolean,
        inchats: Boolean
    }]

})

module.exports = mongoose.model('users', usersSchema)