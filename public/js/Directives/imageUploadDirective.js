myApp.directive('uploadfile', function () {
    return {
      scope: {dropeventwatch: '='},
      link: function($scope, element, attrs) {
      		$scope.self = element;
      		$scope.$watch("dropeventwatch", function(s,element, attrs){
      			angular.element($scope.self).trigger('click');
      		})
      }
    };
});


myApp.directive('addImageTag', function(){
	return{
		require: '^^uploadfile',
		restrict: 'E',
		replace: true,
		scope:{
			imageSource: '='
		},
		template: "<img src='{{imageSource}}' height=100 width=100>",
		
		link: function($scope, element, attrs){

		}

	}
})