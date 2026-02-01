const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: { origin: "*" } 
});

io.on('connection', (socket) => {
    console.log('System: A user connected');

    // When a user joins
    socket.on('add user', (username) => {
        socket.username = username;
        console.log(`${username} joined the chat`);
    });

    // When a message is sent
    socket.on('new message', (message) => {
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: message
        });
    });

    socket.on('disconnect', () => {
        if (socket.username) {
            console.log(`${socket.username} left the chat`);
        }
    });
});

const PORT = 3000;
http.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});