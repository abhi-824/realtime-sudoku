const path = require('path');


const http = require('http');
const host = '0.0.0.0';
const PORT = process.env.PORT || 3000;
const express = require('express');

const socketio = require('socket.io');


const app = express();

const server = http.createServer(app);

const io = socketio(server);

//django unchained

app.use(express.static(path.join(__dirname, 'publicis')));
server.listen(PORT, host, function () {
	console.log('Server started.......');
});
