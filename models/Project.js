const mongoose = require('mongoose');
const User = require('./User');
const ProjectSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    name: {
        type: String,
        required: [true, "Please provide a name"]
    },
    description: String,
    startDate:{
        type: Date,
        required: [true, "Please provide the date"]
    },
    endDate:{
        type: Date,
        required: [true, "Please provide the date"]
    },
    urlProject: String,
    media: {
        type: String,
        default: '' 
    },
    visible:{
        type: String
    }
});

const Project = mongoose.model("projects",ProjectSchema);

module.exports = Project;