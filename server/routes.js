/* Custom module to generate routes */
var job = require('./controllers/job.js');

module.exports = function(app) {

	app.post('/api/jobs', job.jobs); // retrieve jobs
};