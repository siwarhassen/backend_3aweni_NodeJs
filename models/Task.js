var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Task = new Schema({
	Group: { type: Schema.Types.ObjectId, ref: 'Group' },
	Description: String,
	State: String,
	Member : { type: Schema.Types.ObjectId, ref: 'User' },

},	{
	timestamps: true,
});

module.exports = 
			mongoose.model('tasks',Task);