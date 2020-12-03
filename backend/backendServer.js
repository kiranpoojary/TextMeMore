const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const AuthRoute = require('./route/authenticator')
const ChatList = require('./route/chat.router')
const Random = require('./route/random.chat')
require('./model/connection')


app.use(cors())
app.use(bodyParser.json())

app.use("/", AuthRoute)
app.use("/auth", AuthRoute)
app.use("/chatList", ChatList)
app.use("/random", Random)

app.listen("4000", (err) => {
    if (!err) {
        console.log("Backend Connected at port: 4000");
    } else {
        console.log(err);
    }
})