var express = require('express'),
		bodyParser = require('body-parser'),
		serveStatic = require('serve-static'),
		http = require('http'),
		routes = require('./server/routes.js');

// bootstrap express application instance
var app = express();

// replace with specific cases later 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// serve our website's static files
app.use(serveStatic('app', {'index': 'index.html'}));

// crate a server 
var server = http.createServer(app);
var port = 3000; // we run on port 3000

// use our custom routes module to set up routes
routes(app);

// bind the server to a port
server.listen(port, function() {
	console.log("Server is running on port " + port);
});