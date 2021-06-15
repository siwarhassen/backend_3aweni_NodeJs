const mongoose = require('mongoose');
const User = require('./User');
const FollowuserSchema = new mongoose.Schema({
    UserId: {  //el user eli ta3malou el follow
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    FollowerId: { //el user eli 3mal el follow
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    date: {
        type: Date,
        default: new Date()
    },
});

const Followuser = mongoose.model("followusers",FollowuserSchema);

module.exports = Followuser;