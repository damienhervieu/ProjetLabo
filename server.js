var io = require('socket.io');
var express = require('express');
var path = require('path');

var routes = require('./routes/routes');

var app = express();
app.use('/js',express.static(__dirname + '/js'));

app.use(express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', routes);

app.set('port', (process.env.PORT || 8080));

app.listen(app.get('port'), function(){
	console.log('Serveur démarré sur le port ' + app.get('port'));
});