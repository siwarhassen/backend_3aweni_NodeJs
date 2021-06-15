const mongoose = require('mongoose');
const User = require('./User');
const FollowpageSchema = new mongoose.Schema({
    UserId: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    PageId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "pages",
    },
    date: {
        type: Date,
        default: new Date()
    },
});

const Followpage = mongoose.model("followpages",FollowpageSchema);

module.exports = Followpage;