angular.module('app').controller('AppCtrl', function($scope, Utils) {
	$scope.map = {
	    center: {
	        latitude: 43.653226,
	        longitude: -79.38318429999998
	    },
	    zoom: 12,
			draggable: true
	};
})