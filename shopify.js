// Include required modules.
var smsified = require('smsified');
var http = require('http');
var sys = require('sys');

// Include config settings.
var config = require('./config');

// Function to format mobile number for SMSified.
function validateSenderAddress(number) {
	
	// If an extension exists, we assume this is not a mobile number.
	if(number.search('x') != -1) {
		return null;
	}
	else {
		return '1' + number.replace(/[\(\)-]/g, '');
	}
}

// Message to send to customers.
var messageToSend = process.ARGV[2];

//Set options for HTTP request to SHopify API.
var options = {
	host : config.shopify.host,
	port: 80,
	path : config.shopify.path,
	method : 'GET'
};

// Set authentication for HTTP request.
var auth = 'Basic ' + new Buffer(config.shopify.user + ':' + config.shopify.pass).toString('base64');
var headers = { 'Authorization' : auth };
options.headers = headers;

var apiCall = http.request(options, function(response) {
	
	var customersJSON = "";
	response.on('data', function(chunk) {
		customersJSON += chunk;
	});
	
	response.on('end', function() {
		
		// Parse JSON payload returned from Shopify API.
		var customerCollection = JSON.parse(customersJSON);
		var customers = customerCollection.customers;
		
		// Set up a new SMSified object to send messages.
		var sms = new SMSified(config.smsified.user, config.smsified.pass);
		var smsOptions = { senderAddress: config.smsified.senderAddress, message: messageToSend, notifyURL: 'http://web1.tunnlr.com:11465/' };
		
		for(var i=0; i<customers.length; i++) {
			
			var sendToAddress = validateSenderAddress(customers[i].addresses[0].phone);
			
			// If customer phone number is valid, send SMS message.
			if(sendToAddress) {
				smsOptions.address = sendToAddress;
				sms.sendMessage(smsOptions, function(data) {
					sys.puts(sys.inspect(data));
				});
			}			
		}
	});
			
});
apiCall.end();
