internpin
=========

Interpin is an excercise into AngularJS, Node and Google Maps. In order to test it requires an Indeed API Key. By scraping the Indeed API servers it will return a list of intern jobs within the Toronto, Waterloo or Ottawa area (depending on location settings) and display them as either map markers on the Google Maps screen or as an infinite scrolling list which will populate with new results as you scroll farther down. It was a fun weekend webapp to build and really helped showcase how easy and fast it is to get an Angular-Node-Express webapp running. Would definitely reccomend this stack especially to people wanting to showcase a quick prototype.

![ScreenShot](media/preview1.png)
![ScreenShot](media/preview2.png)

## Getting Started

### Requirements 

Before getting started there are some things that you require: 

* Indeed.ca API key
* NodeJS installed

### Cloning and Dependencies

Start by cloning the repo.

	git clone https://github.com/karanbirrandhawa/interpin

Next install the npm modules

	npm install

Now go to the AngularJS app and get its frontend dependencies

	cd app
	bower install

### Run it!

	PUBLISHER=MY_INDEED_API_KEY_HERE node server.js

If you want to make these changes permanent you can to to server/controllers/job.js and edit the line that says "API_KEY_HERE" to include your key and remove the environment reference. Before:

	// Indeed api key
	var api_key = process.env.PUBLISHER || "YOUR_API_KEY_HERE"

After:

	// Indeed api key
	var api_key = "1234567890123" // example key #

### Check it out 

The application shoul now be running on localhost:3000.

### Bugs and Todo

* Fix error on job loading that prevents switching job queries from reloading map markers
* Add map marker preview description on map marker click
