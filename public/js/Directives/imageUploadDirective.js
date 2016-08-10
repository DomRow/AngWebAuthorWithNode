myApp.directive('uploadfile', function () {
    return {
      restrict: 'A',
      scope: {dropEventWatch: '@'},
      link: function(scope, element) {
      	//when dropEventWatch changes, trigger clcik
        element.bind('click', function(e) {
            angular.element(e.target).trigger('click');
        });
      }
    };
});