/*
Import mongoose module
Define a model of a page
*/
var mongoose = require('mongoose');

module.exports = mongoose.model('PageA',{
	title:{type: String,default:''},
	cssStyle:{type: String, default:'cols2'},
	number:{type: Number, default:'null'},
	body:[
		{"columns":[
		{"items":[
		{"id":0,"cssClass":"defaultClass1","type":"image","image":{"src":"","width":"","height":"","align":"center"}},
		{"id":1,"cssClass":"defaultClass2","type":"text","headerStyle":"color:blue;margin-left:30px;","headerText":"Header","text":"Type Text Here","size":12,"font":"Arial"}]}]}		
	]
});

// module.exports = mongoose.model('PageB',{
// 	title:{type: String,default:''},
// 	cssStyle:{type: String, default:'cols2'},
// 	number:{type: Number, default:'null'},
// 	body:[
// 		{"columns":[
// 		{"items":[
// 		{"id":0,"type":"image","image":{"src":"","width":"","height":"","align":"center"}},
// 		{"id":1,"type":"text","headerStyle":"color:blue;margin-left:30px;","headerText":"Header","text":"Type Text Here","size":12,"font":"Arial"}]}]}		
// 	]
// });
