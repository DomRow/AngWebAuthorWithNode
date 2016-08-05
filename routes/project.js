var mongo = require('mongodb');
var bson = require('bson');

var Server = mongo.Server,
Db = mongo.Db,
BSON = bson.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect:true});
db = new Db('projectdb', server);

db.open(function(err,db){
	if(!err){
		console.log("Connected to db");
		db.collection('project', {strict:true}, function(err, collection){
			if(err){
				console.log("No data, creating new with test data");
				populateDB();
			}
		});

	}
});

exports.findAll = function(req,res){
	db.collection('project', function(err, collection){
		collection.find().toArray(function(err, items){
			res.send(items);
			
		});
	});
};



exports.findById = function(req,res){
	var id = req.params.id;
	console.log('Getting project: ' +id);
	db.collection('project', function(err, collection){
		console.log("ERROR =");
		console.log(err);
		collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item){
			res.send(item);
		});
	});
};

exports.addproject = function(req,res){
	var project = req.body;
	console.log('Adding project:' + JSON.stringify(project));

	db.collection('project', function(err, collection){

		collection.insert(project, {safe:true}, function(err, result){
			if(err){
				res.send({'error': 'An error has occurred'});
			}else{
				console.log('Success', + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
}

exports.updateproject = function(req,res){
	var id = req.params.id;
	if(!req.body){
		return res.sendStatus(400);
	}

		//console.log(project.body.columns[0].items);
		db.collection('project', function(err, collection){
			collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item){
				if(err){return err;}
				var update = req.body;
				console.log(req.body.columns[0].items);
				var collection = db.collection('project');
			//collection.update({'_id':id},{$set :{'body':req.body}}, {safe:true}, function(err, result){
				collection.update({'_id': new BSON.ObjectID(id)},{$set:{'body':update}},{safe:true}, function(error, result){	
					if(err) {
						console.log('Error updating item: ' + err);
						res.send({'error':'An error occurred'});
					}else{
						console.log("ELSE LOG STARTED ----------");
						console.log('', + result+ ' documents(s) updated');
						console.log(update);
						res.send(update);
					}
				});
			});
		});
}

exports.deleteproject = function(req,res){
	var id = req.params.id;
	console.log('Deleteing item: ' + id);
	db.collection('project', function(err, collection){
		collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result){
			if(err){
				res.send({'error':'An error has occurred as so: ' + err});
			}else{
				console.log('' + result + ' documents deleted');
				res.send(req.body);			
			}
		});
	});
}

var populateDB = function(){
	var projects = [
	{"columns":[{"items":[{"id":0,"type":"image","image":{"src":"images/shipyard1.jpg","width":100,"height":100,"align":"center"}},{"id":1,"type":"text","headerStyle":"color:blue;margin-left:30px;","headerText":"Header","text":"Other Text text","size":12,"font":"Arial"}]}]},
	{"columns":[{"items":[{"id":0,"type":"image","image":{"src":"images/construction1.jpg","width":100,"height":100,"align":"center"}},{"id":1,"type":"text","headerStyle":"color:red;margin-left:30px;","headerText":"Header 2","text":"New separate page","size":12,"font":"Arial"}]}]}

	]

	db.collection('project', function(err, collection){
		collection.insert(projects, {safe:true}, function(err, result) {console.log("collection pop")});
	});
};