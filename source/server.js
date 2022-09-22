'use strict'

var http = require('http');
var https = require('https');
var fs = require('fs');

//socket.io
var socketIo = require('socket.io');

var express = require('express');
var serveIndex = require('serve-index');

var app = express();
app.use(express.static('../public'));
app.use(serveIndex('../public'));

//http server
var http_server = http.createServer(app);
http_server.listen(80, '0.0.0.0');

var options = {
    key:    fs.readFileSync('../cert/fbird.xyz.key'),
    cert:   fs.readFileSync('../cert/fbird.xyz.crt')
}

//https server
var https_server = https.createServer(options, app);

//bind socket.io with https_server
var io = socketIo(https_server, {});

//connection
io.sockets.on('connection', (socket)=>{
    // console.log('connected: ' + socket )
	socket.on('join', (room)=> {
		socket.join(room);
		var myRoom = io.sockets.adapter.rooms[room];
		var users = Object.keys(myRoom.sockets).length;
	 	socket.broadcast.emit('joined', room, socket.id);//除自己，全部站点	
	});

	socket.on('leave', (room)=> {
		var myRoom = io.sockets.adapter.rooms[room];
		var users = Object.keys(myRoom.sockets).length;
		//users - 1;


		socket.leave(room);
	 	socket.emit('leaved', room, socket.id);		
	});
});

https_server.listen(443, '0.0.0.0');
