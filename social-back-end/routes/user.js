const express = require('express')
const User = require('../models/user').userSchema

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
                    User.create(req.body) // Create the User
                    .then(results => {
                        res.status(200).send(results)
                    })
                }else res.status(301).send("email")
        })
        }else res.status(301).send("username")
    })
})

exports.userRouter = userRouter