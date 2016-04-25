'use strict';

//Lets require/import the HTTP module
var http = require('http');
var url = require('url');
var autoComplete = require('./autocomplete');

//Lets define a port we want to listen to
const PORT= process.env.PORT || 9000; 

const opts = {
	dictionary: process.env.DICTIONARY
};

autoComplete(opts, function(err, dict) {
	if (err) throw err;
	//We need a function which handles requests and send response
	function handleRequest(request, response){
		var url_parts = url.parse(request.url, true);
		url_parts.pathname
		url_parts.query;
		switch (url_parts.pathname) {
			case '/autocomplete':
				response.setHeader('Access-Control-Allow-Origin', '*');
				response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
				response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
				response.setHeader('Access-Control-Allow-Credentials', true);
				response.setHeader('content-type', 'application/json');
				response.end(JSON.stringify(dict.getWords(url_parts.query.key, Number(url_parts.query.limit))));
			default:
				response.statusCode = 404;
				response.end("Not Found");
		}
	}

	//Create a server
	var server = http.createServer(handleRequest);

	//Lets start our server
	server.listen(PORT, function(){
	    //Callback triggered when server is successfully listening. Hurray!
	    console.log("Server listening on: http://localhost:%s", PORT);
	});
});