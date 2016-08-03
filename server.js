var express = require('express');
var jsonfile = require('jsonfile');
var http = require('http');
var project = require('./routes/project');
var file = 'c:/xampp2/htdocs/nodeAngProj/projects/1.json';
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer = require('multer');
var logger = require('morgan');
var path = require('path');

// var db = require('./config/schema');

var app = express();
//var router = express.Router();

//Middleware
app.use(express.static(__dirname + '/public'));                                                        
//app.use(bodyParser.urlencoded({'extended':'true'}));            
app.use(bodyParser.json());                                     
//app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
//app.set('views', path.join(__dirname, 'views'));

//Routes
app.get('/projects', project.findAll);
app.get('/projects/:id', project.findById);
app.post('/projects', project.addproject);
app.put('/projects/:id', project.updateproject);
app.delete('/projects/:id', project.deleteproject);

//app.use('/api',router);

// var filej = jsonfile.readFile(file, function(err,obj){
// 		console.log(obj);
// 	});


//var obj = {name: 'JP'};
// var filek = jsonfile.writeFile(file, obj, {spaces:2}, function(err){
// 	//console.error(err);
// });

app.listen(8090);
console.log('App running and watching 8090');