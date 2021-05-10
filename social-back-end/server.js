const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRouter = require('./routes/user').userRouter
const challengeRouter = require("./routes/challenge").challengeRouter

const app = express()
const port = process.env.PORT || 7000

const connection_url = 'mongodb://localhost:27017/social'

const db = mongoose.connection


db.once('open', () => {
    console.log('DB is connected')
})

app.use(express.json())
app.use(cors())
app.use('/user', userRouter)
app.use('/challenge', challengeRouter)

app.get('/', (req, res) => {
    res.status(200).send("It's working loky")
})



mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})



app.listen(port, () => console.log(`listening on localhost:${port}`))