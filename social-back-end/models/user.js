const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    username: String,
    email: String,
    name: String
})

exports.userSchema = mongoose.model("User", userSchema);