
const path = require('path');
var ExpressPeerServer = require('peer').ExpressPeerServer;

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
	socket.on('join-room',(roomId,userId)=>{
		socket.join(roomId)
		console.log("heel")
		socket.to(roomId).broadcast.emit('user-connected',userId)
	})

});
app.get('/', (req, res) => {
	console.log("helklo")
	res.redirect(`${ID}`);
}); 
//django unchained

app.get('/:index', (req, res) => {
	
	res.render('index', { roomId: req.params.room });
});

app.set('views', path.join(__dirname, 'publicis'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'publicis')));
server.listen(PORT, host, function () {
	console.log('Server started.......');
});

var options = {
    debug: true,
    allow_discovery: true
}
let peerServer = ExpressPeerServer(server, options)
app.use('/peerjs', peerServer);
