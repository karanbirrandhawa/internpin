/* Non-specific utility services */
angular.module('app').factory('Utils',function($location, $rootScope) {
	
	// Route checker
	var routeCheck = function(locArray) {
		for(var i = 0; i < locArray.length; i++) {
			if($location.path() === locArray[i]) {
				return true;
			}
		}
		return false;
	}

	// Route changer 
	var routeChange = function(loc) {
		$location.path(loc);
	}
	
	// Final object with all relevant utility functions
	return {
		isRoute: routeCheck,
		changeRoute: routeChange
	};
	
});