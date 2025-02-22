const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    // Log the IP address of the user in the terminal
    const userIp = socket.handshake.address;
    console.log(`User connected with IP: ${userIp}`);

    socket.on('send name', (username) => {
        io.emit('send name', username);
    });

    socket.on('send message', (message) => {
        io.emit('send message', message);
    });
});

server.listen(5000, () => {
    console.log('listening on *:5000');
});
