// Include required modules.
var sys = require('sys');
var http = require('http');
var cradle = require('cradle');

// Include config settings.
var config = require('./config');

// Set up connection to CouchDB instance.
var db = new (cradle.Connection)(config.general.couch_address, config.general.couch_port).database(config.general.couch_database);

// Create HTTP server where SMSified delivery notices are sent via callback setting.
var server = http.createServer(function(req, res) {
	
	// Store delivery record in CouchDB.
	req.addListener('data', function(data) {
		db.save(JSON.parse(data), function(err, res) {
			if (err) {
				sys.puts('Could not save delivery record.');
			} else {
				sys.puts('delivery record saved ' + res.id);
			}
		});
	});

	res.writeHead(200);
	res.end();

}).listen(config.general.server_port);
sys.puts('Server listening on port ' + config.general.server_port);