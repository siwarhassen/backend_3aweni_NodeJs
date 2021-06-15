const mongoose = require('mongoose');
const User = require('./User');
const UserConnectedSchema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    
   
  
});

const UserConnected = mongoose.model("sessions",UserConnectedSchema);

module.exports = UserConnected;