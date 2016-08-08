var myApp = angular.module('dropTests',['ngRoute','ngDragDrop','ngSanitize', 'ngResource','ui.tinymce','dndLists','angularModalService','ui.bootstrap', 'textAngular','angularFileUpload']);

myApp.config(['$routeProvider',
  function($routeProvider) {
  $routeProvider.
  when('/projects',{
    templateUrl: 'templates/pageList.html',
    controller: 'GetListCtrl'
  }).
  when('/projects/new', {
  	templateUrl: 'templates/new-page.html',
  	controller: 'AddPageCtrl'
  }).
  when('/projects/view', {
    templateUrl: 'templates/view.html',
    controller: 'AddPageCtrl'
  }).
  when('/projects/:id', {
    templateUrl: 'templates/page-detail.html',
    controller: 'PageDetailCtrl'
  }).
  otherwise({
  	redirectTo: '/projects'
  });
}]);





