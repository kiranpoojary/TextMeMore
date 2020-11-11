const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const AuthRoute = require('./route/authenticator')
require('./model/connection')


app.use(cors())
app.use(bodyParser.json())

app.use("/", AuthRoute)
app.use("/auth", AuthRoute)

app.listen("4000", (err) => {
    if (!err) {
        console.log("Backend Connected at port: 4000");
    } else {
        console.log(err);
    }
})