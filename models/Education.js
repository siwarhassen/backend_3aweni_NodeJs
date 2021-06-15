const mongoose = require('mongoose');
const User = require('./User');
const EducationSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    school: {
        type: String,
        required: [true, "Please provide the school"]
    },
    fieldStudy: {
        type: String,
        required: [true, "Please provide the fieldStudy"] 
    },
    description: String,
    startYear:{
        type: Number,
        match: [/^\d{4}$/,"Please provide a valid year"]
    },
    endYear:{
        type: Number,
        match: [/^\d{4}$/,"Please provide a valid year"]
    },
    visible:{
        type: String
    },
    media: {
        type: String,
        default: '' 
    }
});

const Education = mongoose.model("educations",EducationSchema);

module.exports = Education;