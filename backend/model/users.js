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
    lastLogin: {
        type: String
    },
    friends: [{
        userId: String,
        followSent: Boolean,
        followAccepted: Boolean,
        followbackSent: Boolean,
        followbackAccepted: Boolean,
        inchats: Boolean
    }],
    notifications: [{
        notiType: String,
        fromId: String,
        time: String,
        seen: {
            type: Boolean, default: false
        }
    }]

})

module.exports = mongoose.model('users', usersSchema)