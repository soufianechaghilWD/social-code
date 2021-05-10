const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    username: String,
    email: String,
    name: String,
    points: Number,
    level: String,
    challenge_comp: [{type: mongoose.Schema.Types.ObjectId, ref: "Challenge"}],
    challenges_by_time: [{chal: String, time: String}],
    chellenege_pub: [{type: mongoose.Schema.Types.ObjectId, ref: "Challenge"}]
})

exports.userSchema = mongoose.model("User", userSchema);