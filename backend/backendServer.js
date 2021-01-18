const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const AuthRoute = require('./route/authenticator')
const ChatList = require('./route/chat.router')
const Random = require('./route/random.chat')
const Search = require('./route/search.router')
const CrudUser = require('./route/crud.user.router')
require('./model/connection')


app.use(cors())
app.use(bodyParser.json())

app.use("/", AuthRoute)
//app.use("/auth", AuthRoute)
//app.use("/register", AuthRoute)
app.use("/chatList", ChatList)
app.use("/random", Random)
app.use("/searchUser", Search)
app.use("/crud", CrudUser)

app.listen("4000", (err) => {
    if (!err) {
        console.log("Backend Connected at port: 4000");
    } else {
        console.log(err);
    }
})