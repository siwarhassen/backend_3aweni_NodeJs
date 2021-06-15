const mongoose = require('mongoose');
const NotificationSchema = new mongoose.Schema({
    SenderId: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    ReceiverId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    date: {
        type: Date,
        default: new Date()
    },
    body: String,
    title:String
});

const notification = mongoose.model("notifications",NotificationSchema);

module.exports = notification;