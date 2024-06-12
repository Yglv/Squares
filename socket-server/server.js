require('dotenv').config();
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const cors = require('cors');


const users = {};

const socketToRoom = {};

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', socket => {
    socket.on("join room", roomID => {
        console.log('join room');
        console.log(roomID);
        if (users[roomID]) {
            const length = users[roomID].length;
            if (length === 4) {
                socket.emit("room full");
                return;
            }
            users[roomID].push(socket.id);
           
        } else {
            users[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);
        console.log(socket.id);
        console.log(usersInThisRoom)
        socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", payload => {
        console.log(`sending signal from ${payload.callerID} to ${payload.userToSignal} that user joined`);
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID })
    });

    socket.on("returning signal", payload => {
        console.log(`returning signal to ${payload.callerID}`);
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id })
    });


    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }
    });

    socket.on('hide remote cam', targetId => {
      console.log(targetId);
      io.to(targetId).emit('hide cam');
    });

    socket.on('show remote cam', targetId => {
      console.log(targetId);
        io.to(targetId).emit('show cam');
    });

    socket.on('hide remote audio', targetId => {
      console.log(targetId);
      io.to(targetId).emit('hide audio');
    });

    socket.on('show remote audio', targetId => {
      console.log(targetId);
        io.to(targetId).emit('show audio');
    });

    socket.on('disconnect', () => {
      console.log('disconnect')
      const roomId = socketToRoom[socket.id];
      let room = users[roomId];
      if (room) {
        room = room.filter(id => id !== socket.id);
        users[roomId] = room;
      }
      socket.broadcast.emit('user left', socket.id);
    });

    socket.on('exit', () => {
      console.log('disconnect')
      const roomId = socketToRoom[socket.id];
      let room = users[roomId];
      if (room) {
        room = room.filter(id => id !== socket.id);
        users[roomId] = room;
      }
      socket.broadcast.emit('user left', socket.id);
    });

    socket.on('start canvas', () => {
      console.log('canvas');
      socket.broadcast.emit('canvas');
    })

    socket.on('canvasImage', data => {
      socket.broadcast.emit('canvasImage', data)
    });

});

server.listen(8000, () => console.log('server is running on port 8000'));


