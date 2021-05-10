const express = require('express')
const User = require('../models/user').userSchema
const Challenge = require("../models/challenge").challengeSchema

const userRouter = express.Router()

userRouter.use(express.json())


userRouter.route('/')
.post((req, res) => {
    // Create a user if the user types his info
    User.find({'username': req.body.username}) // Check if the username already exists
    .then(resu => {
        if(resu.length === 0){
            User.find({'email': req.body.email}) // Check if the email already exists
            .then(resss => {
                if(resss.length === 0){
                    User.create({
                        username: req.body.username,
                        name: req.body.name,
                        email: req.body.email,
                        points: req.body.points || 0,
                        level : req.body.level || "beginner"
                    }) // Create the User
                    .then(results => {
                        res.status(200).send(results)
                    })
                }else res.status(301).send("email")
        })
        }else res.status(301).send("username")
    })
})
.put((req, res) => {
    Challenge.find({_id: req.body.id})
    .then(resu => {
        User.updateOne(
            {"_id": req.body.user},
            {$addToSet: {challenge_comp: [req.body.id]}},
            (err, result) => {
                if(err) {
                    res.status(400).send(err)
                }
                else {
                    User.updateOne(
                        {"_id": req.body.user},
                        {$addToSet: {challenges_by_time: [{chal : req.body.id, time: req.body.time}]}},
                        (erro, results) => {
                            if(erro) {
                                res.status(400).send(erro)
                            }else{
                                res.status(200).send(results)
                            }
                        }
                    )
                }
            }
        )
    })
})

userRouter.route('/user/:id')
.get((req, res) => {
    // Find one user by its Id
    User.findById(req.params.id)
    .then((resu, err) => {
        if(err) {
            res.status(400).send(err)
        }
        else res.status(200).send(resu)
    })
})

exports.userRouter = userRouter