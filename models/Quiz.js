const mongoose = require('mongoose');

const QuestionShema = new mongoose.Schema({
    questionText:{
        type: String,
        required: [true, "Please provide the questiontext"]
    },
    answer:{
        type: Number,
        required: [true, "Please provide the answer number"]
    },
    answerOptions:[String]
});

const QuizSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    name: {
        type: String,
        required: [true, "Please provide the name of the skill"]
    },
    skillname:{
        type: String,
        required: [true, "Please provide the name of the skill"] 
    },
    questions: [QuestionShema]
});

const Quiz = mongoose.model("quizs",QuizSchema);

module.exports = Quiz;