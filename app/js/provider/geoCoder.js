angular.module('app').factory('geoCoder',function() {
	var geo = new google.maps.Geocoder;

	var getLocation = function(address, callback) {
		geo.geocode({'address': address}, function(data) {
			callback(data);
		});
	}

	return {
		getLocation: getLocation
	}
});