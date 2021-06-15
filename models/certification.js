var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var Certification = new Schema({
	
    Date:{ type: Date, default: Date.now },
   
    usercourse: {
       type: mongoose.Schema.Types.ObjectId,
        ref: "UserCourse",
      },
      Score:String
       
});

module.exports = 
			mongoose.model('certifications',Certification);