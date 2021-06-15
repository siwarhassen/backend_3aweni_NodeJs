const mongoose = require('mongoose')
const User = require('./User');


const user_acceptedSchema = new mongoose.Schema({

 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
      },
      societe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
      },
      Job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "job",
      },
    Lien_meet: {
        type: String,
        default:"https://meet.google.com/uny-csii-awa"
        
    },
    note_cv: {
        type: Number,
        default: 0 
    },
    note_technique: {
        type: Number,
        default: 0 
    },
    note_final: {
        type: Number,
        default: 0 
    },
    date_interview: {
        type: Date 
        },
    etat_interview: {
            type: String,
            default: "pas encore" 
            
        },

}, {
    timestamps: true
})

module.exports = mongoose.model('Users_accepted',user_acceptedSchema)