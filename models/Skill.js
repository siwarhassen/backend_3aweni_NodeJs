const mongoose = require('mongoose');
const User = require('./User');
const SkillSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    name: {
        type: String,
        required: [true, "Please provide the name of the skill"]
    },
    visible:{
        type: Boolean,
        default: true 
    },
    valid: {
        type: Boolean,
        default: false 
    }
});

const Skill = mongoose.model("skills",SkillSchema);

module.exports = Skill;