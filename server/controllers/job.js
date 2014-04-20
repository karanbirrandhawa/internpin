/* Controller to handle job work */
var http = require('http'),
		url = require('url');

// Indeed api key
var api_key = process.env.PUBLISHER || "YOUR_API_KEY_HERE"


exports.jobs = function(req, res) {
	var query = req.body.query;
	var location = req.body.location; 
	var start = req.body.start;
	var limit = req.body.limit;
	var country = req.body.country;

	// our parameters for search
	var search = 'http://api.indeed.com/ads/apisearch?v=2&format=json&publisher=' + api_key;

	// add on more, optional parameters
	if (query) search += '&q=' + query;
	if (location) search += '&l=' + location;
	if (start) search += '&start=' + start;
	if (limit) search += '&limit=' + limit;
	if (country) search += '&co=' + country;

	var data;

	// send get request
	http.get(url.parse(search), function(response) {
		response.on('data', function(chunk) {
			if (!data) data = chunk;
			else data += chunk;
		}).on('end', function() {
			res.send(data);
		})
	});
};