var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Group = new Schema({
	Name: String,
	Description:String,
	Type:String,
	Professionnal:Number,
	photo:{
		type:String,
		default:"https://res.cloudinary.com/espritnn/image/upload/v1619272672/samples/3aweni/arton104603_epsopx.jpg"
	   },
	Owner : { type: Schema.Types.ObjectId, ref: 'User' },
},	{
	timestamps: true,
});

module.exports = 
			mongoose.model('groups',Group);