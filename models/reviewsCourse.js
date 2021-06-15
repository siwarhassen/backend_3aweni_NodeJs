var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const User = require('./User');
var ReviewsCourse = new Schema({
	
    DateCreation:{ type: Date, default: Date.now },
    Content:String,
    Rating:Number,
    CourseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      UserId: { type: Schema.Types.ObjectId, ref: User },
       
});

module.exports = 
			mongoose.model('reviewsCourse',ReviewsCourse);