
const path = require('path');

const http = require('http');
const host = '0.0.0.0';
const PORT = process.env.PORT || 3000;
const express = require('express');
const socketio = require('socket.io');

var { nanoid } = require("nanoid");
var ID = nanoid(4);


console.log(ID);
const app = express();

const server = http.createServer(app);

const io = socketio(server);


io.on('connection', (socket) => {
	console.log('new ws connection');
	socket.to(room).emit("le_id")

});

//django unchained

app.use(express.static(path.join(__dirname, 'publicis')));
server.listen(PORT, host, function () {
	console.log('Server started.......');
});
