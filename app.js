var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
	fs.readFile('views/index.html', 'utf-8', function(error, content){
		res.writeHead(200, {"Content-Type": "text/html"});
		res.end(content);
	});
});

var io = require('socket.io').listen(server);
var ent = require('ent');

io.sockets.on('connection', function (socket){
		socket.emit('message', 'Bienvenue sur Tron.io !!!');

	socket.on('new_user', function(pseudo){
		pseudo = ent.encode(pseudo);
		socket.pseudo = pseudo;
		socket.broadcast.emit('new_user', pseudo);
	});

	socket.on('message', function(message){
		message = ent.encode(message);
		socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
	});
});

server.listen(8080);