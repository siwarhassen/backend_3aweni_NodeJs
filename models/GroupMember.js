var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GroupMember = new Schema({
	Group: { type: Schema.Types.ObjectId, ref: 'Group' },
	Role:String,
	Member : { type: Schema.Types.ObjectId, ref: 'User' },

},	{
	timestamps: true,
});

module.exports = 
			mongoose.model('members',GroupMember);