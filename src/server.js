'use strict'

var http = require('http');
var https = require('https');
var fs = require('fs');

//socket.io

var express = require('express');
var serveIndex = require('serve-index');

var app = express();
app.use(express.static('../public'));
app.use(serveIndex('../public'));

//http server
var http_server = http.createServer(app);
http_server.listen(80, '0.0.0.0');

var options = {
    key:    fs.readFileSync('../resource/cert/fbird.xyz.key'),
    cert:   fs.readFileSync('../resource/cert/fbird.xyz.crt')
}

//https server
var https_server = https.createServer(options, app);
https_server.listen(443, '0.0.0.0');
