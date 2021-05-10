const express = require("express")
const Challenge = require("../models/challenge").challengeSchema

const challengeRouter = express.Router()
challengeRouter.use(express.json())

challengeRouter.route('/')
.get((req, res) => {
    Challenge.find({})
    .then(resu => {
        resu.forEach(r => {
            console.log(r.chellengeSkelet)
        })
        res.status(200).send(resu)
    })
})
.post((req, res) => {
    Challenge.create(req.body)
    .then((resu) => res.status(200).send(resu) )
})

exports.challengeRouter = challengeRouter