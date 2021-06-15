const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const message = new mongoose.Schema({
 	sender : { type: Schema.Types.ObjectId, ref: 'user' },
 	receiver : { type: Schema.Types.ObjectId, ref: 'user' },
  message: String,
  type: String,
  hideforreceiver:Number,
  hideforsender:Number,
  hideforboth:Number,
  createdAt:Date
  
},{timestamps:true})
const Message = mongoose.model('messages', message);
module.exports = Message

