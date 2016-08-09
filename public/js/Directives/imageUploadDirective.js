myApp.directive('uploadfile', function () {
    return {
      restrict: 'A',
      link: function(scope, element) {

        element.bind('click', function(e) {
            angular.element(e.target).nextSibling('#upload').trigger('click');
        });
      }
    };
});