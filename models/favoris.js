var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const User = require('./User');
const Courses=require('./course');


const favorisSchema = mongoose.Schema({
    course : { type: Schema.Types.ObjectId, ref: 'Course' },
       user : { type: Schema.Types.ObjectId, ref: 'user' }
  
  });


module.exports = mongoose.model('Favori', favorisSchema);
      