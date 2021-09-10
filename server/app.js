/* 
 * Testing testing 111
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// @ts-check 
require("console-stamp")(console);

var app = require("./appconfig");
var http = require("http");
var net	= require("net");
var sticky = require("sticky-session");
var mongoose = require("mongoose");

var server = http.createServer(app);

if (!sticky.listen(server, app.get("port"))) {
	// Master code 
	server.once("listening", function () {
		console.info("server started on -  ", app.get("port"));
	});
} else {
	init();
}


function init() {
	var options = {
		socketTimeoutMS: 0,
		keepAlive: true,
		reconnectTries: 30,
		reconnectInterval: 5000,
		connectTimeoutMS: 30000
	};

	var mongoUrl = process.env.MONGODB_URI ? process.env.MONGODB_URI:"mongodb://localhost:27018/fp";
	
	mongoose.Promise = global.Promise;
	mongoose.connect(mongoUrl,options);

	mongoose.connection.once("open", function () {
		console.log("Connection Opened");
		
		
	});

	// When successfully connected
	mongoose.connection.on("connected", function () {
		console.log("Worker Mongo " + process.pid + " is alive!");
	});

	// If the connection throws an error
	mongoose.connection.on("error", function (err) {
		console.error(err);
		console.log("Mongoose default connection error: " + err);
		process.exit(0);
	});

	// When the connection is disconnected
	mongoose.connection.on("disconnected", function () {
		console.log("Mongoose default connection disconnected");
	});
}

