angular.module('app').controller('AppCtrl', function($scope, Utils, $http) {
	// array of jobs
	$scope.jobs = [];
	// array of google maps markers
	$scope.markers = [];
	$scope.markers.push({
		coords: {
			latitude: 43.653226,
			longitude: -79.38318429999998
		}
	});

	$scope.query = "";

	$scope.page = -1;

	// function to append jobs to our result list
	$scope.appendJobs = function() {
		$scope.page++;

		// Set current query 
		$scope.query = $scope.search;

		// make post request to get list of jobs
		$http.post('/api/jobs', {query: $scope.search, location: 'Toronto', start: $scope.page}).success(function(data) {
			angular.forEach(data.results, function(result) {
				$scope.jobs.push(result);
			})
		});
	}

	// if person changes query after submitting reset job list
	$scope.$watch('query', function(newVal, oldVal) {
		$scope.page = -1;
		$scope.jobs.length = 0;
		$scope.markers.length = 0;
	});

	$scope.map = {
	    center: {
	        latitude: 43.653226,
	        longitude: -79.38318429999998
	    },
	    zoom: 12,
			draggable: true
	};
	
	// switch to alternate between view
	$scope.mapView = true;

	// dropdown switch
	$scope.showDrop = false;

	$scope.options = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

	$scope.forward = function() {

	};
})