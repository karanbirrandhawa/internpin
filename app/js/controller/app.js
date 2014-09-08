angular.module('app').controller('AppCtrl', function($scope, Utils, $http, $sce, geoCoder) {

	// default location is Toronto
	$scope.location = 'Toronto';
	$scope.lat = 43.653226;
	$scope.lon = -79.38318429999998;
	
	// trigger map refresh when this is true
	$scope.triggerRefresh = false;
	
	// initial map object
	$scope.map = {
	    center: {
	        latitude: $scope.lat,
	        longitude: $scope.lon
	    },
	    zoom: 12,
		draggable: true,
		refresh: $scope.triggerRefresh,
		control: {}
	};
	
	// array of jobs
	$scope.jobs = [];
	// array of google maps markers
	$scope.markers = [];

	// page/search handling
	$scope.query = "";
	$scope.page = -1;
	
	// function to append jobs to our result list
	$scope.appendJobs = function() {
		$scope.page++;

		// Set current query 
		$scope.query = $scope.search;

		// make post request to get list of jobs
		$http.post('/api/jobs', {query: $scope.search, location: $scope.location, start: $scope.page, country: 'ca'}).success(function(data) {
			angular.forEach(data.results, function(result) {
				
				// support html binding for snippet
				result.snippet =  $sce.trustAsHtml(result.snippet);

				// use geocoder to get address for map marker
				geoCoder.getLocation(result.company + ' ' + result.formattedLocation, function(loc) {
					// create map marker obj from info
					
					if (loc != null) {
					
						var marker = {
							coords: {
								latitude: loc[0].geometry.location.k,
								longitude: loc[0].geometry.location.A
							}
						};
						
						// push resultant map marker to map marker array
						$scope.markers.push(marker);
					}
					
					// push resultant job to job array
					$scope.jobs.push(result);

					// if this is the last result to push, refresh map
					if (data.results.indexOf(result) === data.results.length - 1) {
						$scope.triggerRefresh = true;
					}
					$scope.triggerRefresh = false;
				});
			})
		});
	}

	// if person changes query after submitting reset job list
	$scope.$watch('query', function(newVal, oldVal) {
		$scope.page = -1;
		$scope.jobs.length = 0;
		$scope.markers.length = 0;
	});
	
	// switch to alternate between view
	$scope.mapView = true;

	// dropdown switch
	$scope.showDrop = false;

	$scope.options = ['engineering', 'software', 'developer', 'java', 'nodejs', 'ruby', 'angularjs'];

	$scope.forward = function() {

	};
	
	// supported locations
	$scope.locationArray = [{ name: 'Toronto, ON', lat: 43.653226, lon: -79.38318429999998 },
							{ name: 'Waterloo, ON', lat: 43.4667, lon: -80.5167 },
							{ name: 'Ottawa, ON', lat: 45.4214, lon: -75.6919}];
	
	// switch location method
	$scope.switchLocation = function(index) {
		var loc = $scope.locationArray[index];
		$scope.locationArray[index] = $scope.locationArray[0];
		$scope.locationArray[0] = loc;
		$scope.location = loc.name.split(',')[0];
		$scope.map.control.refresh({latitude: loc.lat, longitude: loc.lon});
	}
});