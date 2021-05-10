const mongoose = require("mongoose")

const challengeSchema = mongoose.Schema({
    name: String,
    level: String,
    averageSolvingTime: String,
    challengeText: String,
    chellengeSkelet: String,
    tag: String,
    challengeTests: Array,
    publisher: mongoose.Schema.Types.ObjectId
})
exports.challengeSchema = mongoose.model("Challenge", challengeSchema)