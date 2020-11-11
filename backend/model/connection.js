const mongoose = require('mongoose')


mongoose.connect("mongodb://localhost:27017/textmemore", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) {
        console.log("Mongodb Connection Established");
    } else {
        console.log("MongoDB connection failed");
    }
})

const connection = mongoose.connection