angular.module('app').controller('AppCtrl', function($scope, Utils, $http) {
	// array of jobs
	$scope.jobs = [];
	// array of google maps markers
	$scope.markers = [];

	// function to append jobs to our result list
	$scope.appendJobs = function() {
		if (!$scope.page) $scope.page = 0;
		else {
			$scope.page++;
		}
		
		$http.post('/api/jobs', {query: $scope.search, location: 'Toronto', start: $scope.page}).success(function(data) {
			angular.forEach(data.results, function(result) {
				$scope.jobs.push(result);
			})
		});
	}

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