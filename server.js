const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// I thotë serverit të përdorë skedarët në këtë folder
app.use(express.static(__dirname));

// Rregullon gabimin "Cannot GET /"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('Një përdorues u lidh');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Dërgon mesazhin te të gjithë
  });

  socket.on('disconnect', () => {
    console.log('Përdoruesi u shkëput');
  });
});

// Render përdor porta dinamike
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Serveri po punon në portën ${PORT}`);
});
