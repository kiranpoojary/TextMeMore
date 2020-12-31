const express = require('express')
const app = express()
const cors = require('cors')
const router = express.Router()
let userModel = require('../model/users')
app.use(cors());


router.get("/", (req, res) => {
            const searchQ = req.query.searchQry
            const lim = Number(req.query.searchLimit)
            const user = req.query.user
            userModel.find({ $and: [{ $or: [{ userName: { $regex: '^' + searchQ, $options: 'i' } }, { userId: { $regex: '^' + searchQ, $options: 'i' } }] }, { userId: { $ne: user } }] }, (err, data) => {
                        if (!err) {
                                    res.status(200).json(data)
                        } else {
                                    res.status(500).json({ "error": err })
                        }
            }).limit(lim)
})




module.exports = router