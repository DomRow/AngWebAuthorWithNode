
myApp.directive("goFor", function(){
  return function($scope, element, attrs){
    element.bind("click", function(){
      console.log("directive call");
      $scope.$apply('fun.start()')
    })
  }    
})


myApp.directive('classRem', function(){
 return function(scope, element, attrs) {
  
  scope.$watch(attrs.classRem, function(newVal) {
    if (newVal) {
      element.removeClass(element[0].className);
      
      //element.addClass("defaultClass2")
    } else {
      //console.log("Nothing perfomred");
    }
  })
}
})

/*--------Directives-----------------------*/

myApp.directive("addPage", ['Page', function(popupService){
  return{
    restrict: "A",
    link: function (scope, element, attrs){
      element.bind("click", function() {
        console.log("addPage")
        //popupService.addPage;
        //ADD NEW <li> to page list
      });
    }
  }
}]);

/*----------------------------------------------*/