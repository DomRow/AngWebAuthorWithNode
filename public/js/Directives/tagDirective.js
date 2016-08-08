myApp.directive('imageDrop', function(){
	return{
		template: "<a href='#' style='display:block;position:absolute;left:{{imgX}}px;top:{{imgY}}px;'><img src='images/'{{imageName}}'.jpg' height='{{height}}' width='{{width}}' ></a>",
		replace: true,

		link: function($scope, element, attrs){
			attrs.$observe('height', function(value){
				element.find('figcaption').text(value)
			})

			attrs.$observe('src', function(value){
				element.find('img').attr('src', value)
			})
		}
	}
})