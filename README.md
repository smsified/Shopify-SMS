Shopify SMS
==========

A Node.js + CouchDB application that demonstrates how to query the [Shopify API](http://api.shopify.com/) and return a list of customers, and then send SMS messages (with delivery information) to all customers with a mobile number.

Dependencies
===========

Requires both the SMSified Node.js Module and the cradle module for CouchDB.

	npm install smsified
	npm install cradle

Usage
====

* Set up your Shopify storefront.
* Create customers.
* Generate Shopify API credentials.
* Create a CouchDB database to store delivery inforamtion.
* Populate config.js with Shopify credentials, SMSified credentials, and CouchDB details.

Note, your CouchDB instance may be local or hosted.
