const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: { origin: "*" } });

let onlineUsers = 0;

io.on('connection', (socket) => {
    onlineUsers++;
    io.emit('user count', onlineUsers);

    socket.on('add user', (username) => {
        socket.username = username;
    });

    // Ky kanal dërgon ÇDO GJË: tekst, audio-file, ose sinjale WebRTC
    socket.on('new message', (data) => {
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data
        });
    });

    socket.on('disconnect', () => {
        onlineUsers--;
        io.emit('user count', onlineUsers);
    });
});

http.listen(3000, () => console.log('Server running on http://localhost:3000'));