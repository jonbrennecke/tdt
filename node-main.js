// var tank = 'C:\\TDT\\OpenEx\\MyProjects\\OptoTaggingTest_6-05\\DataTanks\\Demotank2',
// 	block = '6_13_14_10Min_stim2';


// var tdt = require( __dirname + "/tdt" );



// tdt
// .open( tank, block, function ( err, data ) {
// 	// body...
// });
// .done( function () {
// 	console.log('here')
// })


// var express = require('express'),
// 	app = express(),
// 	http = require('http'),
// 	server = http.createServer(app)
// 	io = require('socket.io').listen(server);

// io.sockets.on('connection', function ( socket ) {

// 	console.log(socket)

// });

// app.listen(8888)

// var io = require('socket.io').listen(3000)

var io = require('socket.io-client');

var socket = io.connect('http://localhost:8888')

socket.on('message', function ( data ) {
	console.log(data)
});

socket.on('connect', function ( data ) {
	console.log(data)
})