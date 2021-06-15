var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const User = require('./User');



const Questions=new Schema({
    QuestionText:String,
    Explantation:String,
    Answer:Number,
    AnswerOptions:[String]
});
const Section=new Schema({
    Name:String,
  Type:String,
  Description:String,
   ContentInformation:String,
   Duration:{ type: Number, default:0 }
                   
                    
});
const Module = new Schema({
	
   
    Name: String,
    Description:String,
    Section:[ Section ],
    Quiz:{
        Name:String,
        Questions:[Questions],
        Duration:{ type: Number, default:0 }
  
         }    
  
});

const Course = new Schema({

    Name: String,
    ShortDescription: String,
    Level:String,
    Language:String,
    Skills:[String],
    Photo:String,
    Category:String,
    MetaDescription:String,
    DateCreation:{ type: Date, default: Date.now },
    Module :[Module],
    UserId: { type: Schema.Types.ObjectId, ref: User }
});

module.exports = mongoose.model('courses',Course);
      
