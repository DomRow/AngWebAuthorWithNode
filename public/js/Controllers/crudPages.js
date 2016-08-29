/*
	Global control makes the page objects returned from the DB accessible by the other controllers.
	Thus acting as a parent scope
	*/
	myApp.controller('GlobalCtrl', GlobalCtrl);

	function GlobalCtrl($scope, $window, PagesFactory, PageFactory){
		$scope.pages = PagesFactory.query(function(data){
			$scope.pages = data;
				//scope.pages is an array of Resource objects
			},function(err){
				console.log(err);
			})

		$scope.$on('eventSend', function(e, data){
			$scope.currentPage = data;
		})

		$scope.$on('cssEvent', function(e, css){
			$scope.layout = css;
		})
	};

	// myApp.controller('GlobalCtrl', ['$scope', '$window', 'PagesFactory','PageFactory',
	// 	function($scope, $window, PagesFactory, PageFactory){
	// 		$scope.pages = PagesFactory.query(function(data){
	// 			$scope.pages = data;
	// 			//scope.pages is an array of Resource objects
	// 		},function(err){
	// 			console.log(err);
	// 		})

	// 		$scope.$on('eventSend', function(e, data){
	// 			$scope.currentPage = data;
	// 		})

	// 		$scope.$on('cssEvent', function(e, css){
	// 			$scope.layout = css;
	// 		})
	// 	}
	// 	]);	

	myApp.controller('AddPageCtrl', AddPageCtrl);

	function AddPageCtrl($scope, $window, $routeParams, PagesFactory, BroadCastFactory, PageFactory){
		if($routeParams.pageId === undefined){
			$scope.page = new PagesFactory();
		}
		else{
			console.log("else");
			$scope.page = PagesFactory.get({
				pageId : $routeParams.pageId},
				function(page){
					console.log("Page Retrieved: " +$scope.page);
				})	
		}

		/*Reload list of page objects*/
		$scope.reloadPages = function(){
			PagesFactory.query(function(data){
				console.log("called");
				$scope.pages = data.page;
			})
		}	
		/*Create new page object using factory*/
		$scope.addPage = function () {
			console.log($scope.page.cssPage);
			console.log($scope.page)

			PagesFactory.save($scope.page, function(){
				console.log("Page save");
				$scope.reloadPages();
				$window.location.href = '#/projects';
			}, function(err){
				console.log(err);
				console.log($scope.page);
			});
		};

		$scope.$on('eventSend', function(e, data){
			$scope.pageId = data;
		})

		/*Delete page function*/
		$scope.deletePage = function(){
			alert("Are you sure you want to remove this page?");
			$scope.currentPage = $scope.$parent.$parent.currentPage;
			PageFactory.get({id: $scope.currentPage}, function(data){
				var deleteMe = data._id;
				console.log(data._id);
				PageFactory.delete({id: deleteMe}, function(){
					console.log("Done?");
				}, function(err){
					console.log("error");
					console.log(err);
				})
			});

			$scope.reloadPages();
		};

		/*Event handler for 'eventSend'*/
		$scope.$on('eventSend', function(event,data){
			$scope.pageNumber = data;
		});

		$scope.displayHtml = function(e, msg){
			$scope.event = e = 'eventSend';
			$scope.idVal = msg;
			BroadCastFactory.prepForBroadcast(e,msg);
		}

		$scope.cancelPage = function () {
			console.log("Cancel click");
			$window.location.href = '#/projects';
		};

		$scope.cssEvent = function(e,css){
			$scope.event = e = 'cssEvent';
			BroadCastFactory.prepForBroadcast(e,css);	
		}

		$scope.other = ['Option B', 'Option'];

		$scope.cssOptions = {
			availableOptions: [
			{'columns':[{'items':[{'id':0,'cssClass':'defaultClass1','type':'image','image':{'src':'images/construction1.jpg','width':'100','height':'100','align':'center'}},{'id':1,'cssClass':'defaultClass2','type':'text','headerStyle':'color:blue;margin-left:30px;','headerText':'Header','text':'Type Text Here','size':12,'font':'Arial'}]}]},
			{'columns':[{'items':[{'id':0,'cssClass':'defaultClass5','type':'image','image':{'src':'','width':'','height':'','align':'center'}},{'id':1,'cssClass':'defaultClass6','type':'text','headerStyle':'color:blue;margin-left:30px;','headerText':'Header','text':'Type Text Here','size':12,'font':'Arial'}]}]},
			{'columns':[{'items':[{'id':0,'cssClass':'defaultClass5','type':''},{'id':1,'cssClass':'defaultClass6','type':''}]}]}			
				//#1 With Image
				//#2 No Image
				//#3 two blank classes
				]
			};

	}	

	// myApp.controller('AddPageCtrl', ['$scope', '$window', '$routeParams', 'PagesFactory','BroadCastFactory', 'PageFactory',
	// 	function($scope, $window, $routeParams, PagesFactory, BroadCastFactory, PageFactory) {
	// 		if($routeParams.pageId === undefined){
	// 			$scope.page = new PagesFactory();
	// 		}
	// 		else{
	// 			console.log("else");
	// 			$scope.page = PagesFactory.get({
	// 				pageId : $routeParams.pageId},
	// 				function(page){
	// 					console.log("Page Retrieved: " +$scope.page);
	// 				})	
	// 		}

	// 		/*Reload list of page objects*/
	// 		$scope.reloadPages = function(){
	// 			PagesFactory.query(function(data){
	// 				console.log("called");
	// 				$scope.pages = data.page;
	// 			})
	// 		}	
	// 		/*Create new page object using factory*/
	// 		$scope.addPage = function () {
	// 			console.log($scope.page.cssPage);
	// 			console.log($scope.page)
				
	// 			PagesFactory.save($scope.page, function(){
	// 				console.log("Page save");
	// 				$scope.reloadPages();
	// 				$window.location.href = '#/projects';
	// 			}, function(err){
	// 				console.log(err);
	// 				console.log($scope.page);
	// 			});
	// 		};

	// 		$scope.$on('eventSend', function(e, data){
	// 			$scope.pageId = data;
	// 		})

	// 		/*Delete page function*/
	// 		$scope.deletePage = function(){
	// 				alert("Are you sure you want to remove this page?");
	// 				$scope.currentPage = $scope.$parent.$parent.currentPage;
	// 				PageFactory.get({id: $scope.currentPage}, function(data){
	// 					var deleteMe = data._id;
	// 					console.log(data._id);
	// 					PageFactory.delete({id: deleteMe}, function(){
	// 						console.log("Done?");
	// 					}, function(err){
	// 						console.log("error");
	// 						console.log(err);
	// 					})
	// 				});
								
	// 			$scope.reloadPages();
	// 		};

	// 		/*Event handler for 'eventSend'*/
	// 		$scope.$on('eventSend', function(event,data){
	// 			$scope.pageNumber = data;
	// 		});



	// 		$scope.displayHtml = function(e, msg){
	// 			$scope.event = e = 'eventSend';
	// 			$scope.idVal = msg;
	// 			BroadCastFactory.prepForBroadcast(e,msg);
				
	// 		}


	// 		$scope.cancelPage = function () {
	// 			console.log("Cancel click");
	// 			$window.location.href = '#/projects';
	// 		};

	// 		$scope.cssEvent = function(e,css){
	// 			$scope.event = e = 'cssEvent';
	// 			BroadCastFactory.prepForBroadcast(e,css);	
	// 		}

	// 		$scope.other = ['Option B', 'Option'];

	// 		$scope.cssOptions = {
	// 			availableOptions: [
	// 			{'columns':[{'items':[{'id':0,'cssClass':'defaultClass1','type':'image','image':{'src':'images/construction1.jpg','width':'100','height':'100','align':'center'}},{'id':1,'cssClass':'defaultClass2','type':'text','headerStyle':'color:blue;margin-left:30px;','headerText':'Header','text':'Type Text Here','size':12,'font':'Arial'}]}]},
	// 			{'columns':[{'items':[{'id':0,'cssClass':'defaultClass5','type':'image','image':{'src':'','width':'','height':'','align':'center'}},{'id':1,'cssClass':'defaultClass6','type':'text','headerStyle':'color:blue;margin-left:30px;','headerText':'Header','text':'Type Text Here','size':12,'font':'Arial'}]}]},
	// 			{'columns':[{'items':[{'id':0,'cssClass':'defaultClass5','type':''},{'id':1,'cssClass':'defaultClass6','type':''}]}]}			
	// 			//#1 With Image
	// 			//#2 No Image
	// 			//#3 two blank classes
	// 			]
	// 		};



	// 	}]);

	

	myApp.controller('GetListCtrl', GetListCtrl);

	function GetListCtrl($scope, $window, PagesFactory, PageFactory){

		$scope.newPage = function (e,ele) {
			$window.location.href = ('#/projects/new');
			$scope.showNewPage = {boolean:true};
		}

			/*This query (GET) is called twice, add 
		console.log(data);
		To print see*/
		$scope.pages = PagesFactory.query(function(data){
			$scope.pages = data;
		});

	}
	

	// myApp.controller('GetListCtrl', ['$scope', '$window', 'PagesFactory','PageFactory',
	// 	function($scope, $window, PagesFactory, PageFactory){
	// 		// $scope.editPage = function (pageId){
	// 		// 	$window.location.href = '#/page-detail/' + pageId;
	// 		// };

	// 		// $scope.deletePage = function (pageId){
	// 		// 	console.log("Delete Page " +padeId);
	// 		// }

	// 		$scope.newPage = function (e,ele) {
	// 			$window.location.href = ('#/projects/new');
	// 			$scope.showNewPage = {boolean:true};
	// 		}

	// /*This query (GET) is called twice, add 
	// 	console.log(data);
	// 	To print see*/
	// 	$scope.pages = PagesFactory.query(function(data){
	// 		$scope.pages = data;
	// 	});
	// }]);

myApp.controller('ContentCtrl', ContentCtrl);

function ContentCtrl($scope, PagesFactory, BroadCastFactory, PageFactory){
	$scope.pagesContent = PagesFactory.query(function(data){
		$scope.pages = data.page;

		$scope.popHtml = function(pageNum){
			var pages = $scope.pages;
			for(i =0; i < pages.length; i++){
				if(pages[i].id == pageNum){
					var matched = $scope.matched = pages[i];
					$scope.match = matched.innerHTML;
				};
			}
		}

		$scope.$on('eventSend', function(event, data){
			var pageNum = $scope.pageNum = data;
			$scope.popHtml(pageNum);
		})

		$scope.$on('elementSend', function(event,data){
			var pop = $scope.popElement = data;
			$scope.match = $scope.match + $scope.popElement;

		})

		$scope.classesCss = ["default2","default3"];

		$scope.toggleClass1 = function(){
			$scope.cssEvent1 = e = 'cssToggle1';
			var classSend = $scope.classesCss[0]; 
			BroadCastFactory.prepForBroadcast(e, classSend);
			console.log(BroadCastFactory);
		}

		$scope.toggleClass2 = function(){
			$scope.cssEvent2 = e = 'cssToggle2';
			var classSend = $scope.classesCss[1]; 
			BroadCastFactory.prepForBroadcast(e, classSend);
			console.log(BroadCastFactory);
		}

	})	

}

// myApp.controller('ContentCtrl', ['$scope', 'PagesFactory','BroadCastFactory','PageFactory',
// 	function($scope, PagesFactory, BroadCastFactory, PageFactory){
// 		$scope.pagesContent = PagesFactory.query(function(data){
// 			$scope.pages = data.page;

// 			$scope.popHtml = function(pageNum){
// 				var pages = $scope.pages;
// 				for(i =0; i < pages.length; i++){
// 					if(pages[i].id == pageNum){
// 						var matched = $scope.matched = pages[i];
// 						$scope.match = matched.innerHTML;
// 					};
// 				}
// 			}

// 			$scope.$on('eventSend', function(event, data){
// 				var pageNum = $scope.pageNum = data;
// 				$scope.popHtml(pageNum);
// 			})

// 			$scope.$on('elementSend', function(event,data){
// 				var pop = $scope.popElement = data;
// 				$scope.match = $scope.match + $scope.popElement;

// 			})

// 			$scope.classesCss = ["default2","default3"];

// 			$scope.toggleClass1 = function(){
// 				$scope.cssEvent1 = e = 'cssToggle1';
// 				var classSend = $scope.classesCss[0]; 
// 				BroadCastFactory.prepForBroadcast(e, classSend);
// 				console.log(BroadCastFactory);
// 			}

// 			$scope.toggleClass2 = function(){
// 				$scope.cssEvent2 = e = 'cssToggle2';
// 				var classSend = $scope.classesCss[1]; 
// 				BroadCastFactory.prepForBroadcast(e, classSend);
// 				console.log(BroadCastFactory);
// 			}

// 		})
// }])

