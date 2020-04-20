var express = require('express')
var app = express();
var server = require('http').Server(app);

app.use('/static', express.static('static'));
app.use('/data', express.static('data'));


server.listen(process.env.PORT || 3000);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/main.html');
});
app.get('/add', function(req, res) {
    res.sendFile(__dirname + '/add.html');
});
app.get('/list', function(req, res) {
    res.sendFile(__dirname + '/list.html');
});
app.get('/card', function(req, res) {
    res.sendFile(__dirname + '/card.html');
});



// app.get('/game/:game_name', function(req, res) {
//     res.sendFile(__dirname + '/templates/game.html')
// })