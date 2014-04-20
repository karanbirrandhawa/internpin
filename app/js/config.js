angular.module('app', ['ngRoute', 'ngResource', 'google-maps', 'ui.bootstrap', 'infinite-scroll']);

angular.module('app').config(function($routeProvider, $locationProvider) {
	
	$routeProvider.
		when('/',{templateUrl: 'view/app.html'}).
		otherwise({redirectTo: '/'});
		
		$locationProvider.html5Mode(true);
		$locationProvider.hashPrefix = "!";
});
