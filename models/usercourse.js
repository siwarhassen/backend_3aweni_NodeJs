var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserAnswer=new Schema({
  name:Number
});

var PassQuiz=new Schema({
Note:{type:Number,default:0},
Percentage:{type:Number,default:0},
State:String,
Index:Number,
UserAnswer:[UserAnswer]
});



var UserCourse = new Schema({
	
    DateInscription:{ type: Date, default: Date.now },
    Content:String,
    Terminated:Boolean,
    CourseId: {
       type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      PassQuiz:[PassQuiz],
      Grade:String
       
});

module.exports = 
			mongoose.model('usercourse',UserCourse);