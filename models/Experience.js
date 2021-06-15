const mongoose = require('mongoose');
const User = require('./User');
const ExperienceSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    title: {
        type: String,
        required: [true, "Please provide a title"]
    },
    employementType: {
        type: String,
        required: [true, "Please provide the employementType"] 
    },
    company: {
        type: String,
        required: [true, "Please provide the campany"] 
    },
    location: {
        type: String,
        required: [true, "Please provide the location of the company"] 
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
    visible:{
        type: String
    },
    media: {
        type: String,
        default: '' 
    },
});

const Experience = mongoose.model("experiences",ExperienceSchema);

module.exports = Experience;