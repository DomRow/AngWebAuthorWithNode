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