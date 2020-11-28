const path = require("path");
var ExpressPeerServer = require("peer").ExpressPeerServer;

const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
  make_ready,
  allready,
  check_room_avail,
} = require("./utils/users");

const http = require("http");
const host = "0.0.0.0";
const PORT = process.env.PORT || 3000;
const express = require("express");
const socketio = require("socket.io");

var { nanoid } = require("nanoid");
var ID = nanoid(4);

// console.log(ID);
const app = express();

const server = http.createServer(app);

const io = socketio(server);

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit("message", `${user.username} has left the chat`);
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });

  socket.on("make_ready", ({ username, room }) => {
    console.log(room);
    const user = make_ready(socket.id, username, room, 1);
    const users = getRoomUsers(room);
    console.log(users);
    if (allready(room)) {
      io.to(socket.id).emit("start_sudoku");
    }
  });

  socket.on("make_it_real", (data, room) => {
    console.log("yes");
    io.to(room).emit("start_game", data);
  });

  socket.on("join-room", (userId, roomId, username) => {
    const user = userJoin(socket.id, userId, roomId);
    // console.log(roomId,user.room);
    socket.join(roomId);
    // console.log("heel")
    socket.broadcast
      .to(user.room)
      .emit("message", `${username} has joined the room`);
    io.to(roomId).broadcast.emit("user-connected", userId);
  });

  socket.on("check_room_avail", (room) => {
	  console.log(check_room_avail(room))
    if (check_room_avail(room)) {
      io.to(socket.id).emit("reply_to_room", 1);
    } else {
      io.to(socket.id).emit("reply_to_room", 0);
    }
  });
  socket.on('req_id',()=>{
    console.log(ID)
    io.to(socket.id).emit('seek_id',ID);
  })
});

app.set("views", path.join(__dirname, "publicis"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(express.static(path.join(__dirname, "publicis")));
server.listen(PORT, host, function () {
  console.log("Server started.......");
});

var options = {
  debug: true,
  allow_discovery: true,
};
let peerServer = ExpressPeerServer(server, options);
app.use("/peerjs", peerServer);
