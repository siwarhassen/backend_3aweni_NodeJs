const mongoose = require('mongoose');
const User = require('./User');
const PageSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    name: {
        type: String,
        required: [true, "Please provide a name"]
    },
    description: String,
    type: {
        type: String,
        required: [true, "Please provide a type"]
    },
    profilePicture: {
        type: String,
        default: "https://res.cloudinary.com/sabrine/image/upload/v1616409420/images/images_y2zqeh.png"  
    },
    coverPicture: {
        type: String,
        default: "https://res.cloudinary.com/dp2vr0kfb/image/upload/v1613503766/avatars/clerk-with-tie_btmt2q.png"  
    },
    numTel: Number,
    country: String,
    address: String
});

const Page = mongoose.model("pages",PageSchema);

module.exports = Page;