/*
	Global control makes the page objects returned from the DB accessible by the other controllers.
	Thus acting as a parent scope
	*/
	myApp.controller('GlobalCtrl', ['$scope', '$window', 'PagesFactory','PageFactory',
		function($scope, $window, PagesFactory, PageFactory){
			$scope.pages = PagesFactory.query(function(data){
				
				$scope.pages = data;
				//scope.pages is an array of Resource objects
				console.log($scope.pages);
			},function(err){
				console.log(err);
			})

			$scope.$on('eventSend', function(e, data){
				$scope.currentPage = data;
			})

			$scope.$on('cssEvent', function(e, css){
				$scope.layout = css;
				console.log($scope.layout);
			})
		}
		]);		

	myApp.controller('GetListCtrl', ['$scope', '$window', 'PagesFactory','PageFactory',
		function($scope, $window, PagesFactory, PageFactory){

			// $scope.editPage = function (pageId){
			// 	$window.location.href = '#/page-detail/' + pageId;
			// };

			$scope.deletePage = function (pageId){
				console.log("Delete Page " +padeId);
			}

			$scope.newPage = function (e,ele) {
				$window.location.href = ('#/projects/new');
				$scope.showNewPage = {boolean:true};
				console.log($scope.showNewPage.boolean);
			}

	/*This query (GET) is called twice, add 
		console.log(data);
		To print see*/
		$scope.pages = PagesFactory.query(function(data){
			$scope.pages = data;
		});
	}]);

	myApp.controller('AddPageCtrl', ['$scope', '$window', '$routeParams', 'PagesFactory','BroadCastFactory', 'PageFactory',
		function($scope, $window, $routeParams, PagesFactory, BroadCastFactory, PageFactory) {

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

			$scope.reloadPages = function(){
				PagesFactory.query(function(data){
					console.log("called");
					$scope.pages = data.page;
				})
			}	

			$scope.addPage = function () {
				console.log($scope.page.cssPage);
				console.log($scope.page)
				
				PagesFactory.save($scope.page, function(){
					console.log($scope.page);
					console.log("Page save");
					$scope.reloadPages();
					$window.location.href = '#/projects';
			}, function(err){
				console.log(err);
				console.log($scope.page);
			});
			};

			$scope.$on('eventSend', function(event,data){
				$scope.pageNumber = data;	
				console.log($scope.pageNumber);
			});

			

			$scope.deletePage = function(){
				console.log("delete page clicked");
				//currentPage = ?
				//id = ?
				//factory.delete(id)
				//reloadPages()
			};

			$scope.displayHtml = function(e, msg){
				$scope.event = e = 'eventSend';
				BroadCastFactory.prepForBroadcast(e,msg);
				console.log(BroadCastFactory);
			}


			$scope.cancelPage = function () {
				console.log("Cancel click");
				$window.location.href = '#/projects';
			};

			$scope.cssEvent = function(e,css){
				$scope.event = e = 'cssEvent';
				BroadCastFactory.prepForBroadcast(e,css);	
			}

			$scope.other = ['Option B', 'Option C'];

			$scope.data = {
				availableOptions: [
				{value: {'columns':[{'items':[{'id':0,'cssClass':'defaultClass1','type':'image','image':{'src':'images/construction1.jpg','width':'100','height':'100','align':'center'}},{'id':1,'cssClass':'defaultClass2','type':'text','headerStyle':'color:blue;margin-left:30px;','headerText':'Header','text':'Type Text Here','size':12,'font':'Arial'}]}]}},
				{value: $scope.other[0]},
				{value: $scope.other[1]}
				]
			};



		}]);

// myApp.controller('PageDetailCtrl', ['$scope','$routeParams','PageFactory','$window',
// 	function($scope, $routeParams, PageFactory, $window){

// 		$scope.updatePage = function () {
// 			PageFactory.update($scope.page);
// 			$window.location.href = '#/pages';
// 		};

// 		$scope.page = PageFactory.show({id: $routeParams.id});

// 	}]);


myApp.controller('ContentCtrl', ['$scope', 'PagesFactory','BroadCastFactory','PageFactory',
	function($scope, PagesFactory, BroadCastFactory, PageFactory){
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
}])

