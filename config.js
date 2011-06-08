// Shopify account credentials and settings.
var shopify = {
		host : '',
		path : '/admin/customers.json',
		user : '',
		pass : ''
};

// SMSified credentials.
var smsified = {
		user : '',
		pass : '',
		senderAddress : ''
};

// General settings go here.
var general = {
		server_port : 8000,
		couch_address: 'http://127.0.0.1',
		couch_port : 5984,
		couch_database : 'smsrecords'
};

// Add config settings to export object.
exports.shopify = shopify;
exports.smsified = smsified;
exports.general = general;
