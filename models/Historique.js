const mongoose = require('mongoose');
const User = require('./User');
const HistoriqueSchema = new mongoose.Schema({
    User: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    Group:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
    },
    Information:String,
},	{
	timestamps: true,
});

const Historique = mongoose.model("historiques",HistoriqueSchema);

module.exports = Historique;