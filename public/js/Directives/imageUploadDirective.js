myApp.directive('uploadfile', function () {
    return {
      scope: {dropeventwatch: '='},
      link: function($scope, element, attrs) {
      		$scope.self = element;
      		console.log($scope.self);
      		$scope.$watch("dropeventwatch", function(s,element, attrs){
      			console.log("called");
      			angular.element($scope.self).trigger('click');
      		})
      }
    };
});


// myApp.directive('addImageTag', function(){
// 	return{
// 		require: '^^uploadfile',
// 		restrict: 'E',
// 		replace: true,
// 		scope:{
// 			imageSource: '=',
// 			imageName: '='
// 		},
// 		template: "<img src='{{imageSource}} + {{imageName}} ' height=100 width=100>",

// 		link: function($scope, element, attrs){

// 		}

// 	};
// });

