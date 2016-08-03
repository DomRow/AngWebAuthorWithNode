/*THis factory is used to load resources in the app*/
myApp.factory("PagesFactory", function($resource){
	return $resource("/projects", {},{
		query:{ method:'GET', isArray: false },
		create:{ method: "POST" }
	})
});

myApp.factory("PageFactory", function($resource){
	return $resource("/projects/:id", {},{
		get: { method: 'GET' },
		update: { method: 'PUT', params:{ id: '@_id' } },
		delete: { method: 'DELETE', params: {id:'@id'} }
	})

})


myApp.factory("BroadCastFactory", function($rootScope){
	var sharedEvent = {};

	sharedEvent.prepForBroadcast = function(e,msg){
		this.event = e;
		this.message = msg;
		this.broadcastItem(e, msg);
	};

	sharedEvent.broadcastItem = function(e,msg){
		$rootScope.$broadcast(e, msg);
	};

	return sharedEvent;
});