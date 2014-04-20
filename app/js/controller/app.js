angular.module('app').controller('AppCtrl', function($scope, Utils, $http, $sce, geoCoder) {
	// initial map object
	$scope.map = {
	    center: {
	        latitude: 43.653226,
	        longitude: -79.38318429999998
	    },
	    zoom: 12,
			draggable: true,
			refresh: $scope.triggerRefresh
	};

	// array of jobs
	$scope.jobs = [];
	// array of google maps markers
	$scope.markers = [];

	// page/search handling
	$scope.query = "";
	$scope.page = -1;

	// trigger map refresh when this is true
	$scope.triggerRefresh = false;

	// function to append jobs to our result list
	$scope.appendJobs = function() {
		$scope.page++;

		// Set current query 
		$scope.query = $scope.search;

		// make post request to get list of jobs
		$http.post('/api/jobs', {query: $scope.search, location: 'Toronto', start: $scope.page, country: 'ca'}).success(function(data) {
			angular.forEach(data.results, function(result) {
				console.log(result);
				// support html binding for snippet
				result.snippet =  $sce.trustAsHtml(result.snippet);

				// use geocoder to get address for map marker
				geoCoder.getLocation(result.company + ' ' + result.formattedLocation, function(loc) {

					// create map marker obj from info
					var marker = {
						coords: {
							latitude: loc[0].geometry.location.d,
							longitude: loc[0].geometry.location.e
						}
					}

					// push resultant job to job array
					$scope.jobs.push(result);
					// push resultant map marker to map marker array
					$scope.markers.push(marker);

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

	$scope.options = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

	$scope.forward = function() {

	};
});