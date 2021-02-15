const { Socket } = require('dgram');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log("A user connected.");
    socket.broadcast.emit("User has Connected.", '')
    socket.on('disconnect', () => {
        console.log('User Disconnected');
        socket.broadcast.emit("User has disconnected.", '')
    }).on('Chat Message', (msg) => {
        socket.broadcast.emit('Chat Message', msg);
    });
})

http.listen(3000, () => {
    console.log("Listening on port 3000.")
})