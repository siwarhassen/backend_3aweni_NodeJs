const mongoose = require('mongoose');
const User = require('./User');
const BudgeSchema = new mongoose.Schema({
    UserId: {  //el user eli ta3malou el follow
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    skillname:{
        type: String,
        required: [true, "Please provide the name of the skill"] 
    },
    score:{
        type: Number,
        required: [true, "Please provide the score"] 
    },
    date: {
        type: Date,
        default: new Date()
    },
});

const Budge = mongoose.model("budges",BudgeSchema);

module.exports = Budge;