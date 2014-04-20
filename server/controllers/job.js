/* Controller to handle job work */
var http = require('http');

// Indeed api key
var api_key = process.env.PUBLISHER || "YOUR_API_KEY_HERE"

// Function to search through indeed API
function jobRetrieval(query, location, start, limit) {
	// our parameters for search
	var search = 'http://api.indeed.com/ads/apisearch?v=2&format=json&publisher=' + api_key;

	// add on more, optional parameters
	if (query) search += '&q=' + query;
	if (location) search += '&l=' + location;
	if (start) search += '&start=' + start;
	if (limit) search += '&limit=' + limit;

	// send get request
	http.get(search, function(res) {
		res.on('data', function(chunk) {
			return chunk;
		})
	})
}

exports.jobs = function(req, res) {
	var query = req.body.query;
	var location = req.body.location; 
	var start = req.body.start;
	var limit = req.body.limit;

	// get a list of jobs from indeed
	var jobs = jobRetrieval(query, location, start, limit);

	res.send(jobs);
};