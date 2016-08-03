//Import mongoose module
var mongoose = require('mongoose');

//Define Model of Page
module.exports = mongoose.model('Page',{
	id:{type: Number, default: ''},
	title:{type: String,default:''},
	desc:{type: String,default:''},
	urgency:{type: String,default:'Stay Calm'},
	done:{type: String,default:'nope'}
})


// {"columns":[
// 	{"items":[

// 	{"id":0,"type":"image","image":{"src":"images/shipyard1.jpg","width":100,"height":100,"align":"center"}},
// 	{"id":1,"type":"text","headerStyle":"color:blue;margin-left:30px;","headerText":"Header","text":"Other Text text","size":12,"font":"Arial"}]}]}