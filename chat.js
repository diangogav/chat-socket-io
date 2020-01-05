const express = require("express");
const app = express();
const socketio = require("socket.io");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000);
const io = socketio(expressServer);

io.on("connection", (socket) => {
    socket.emit("msgFromServer", "Welcome to my socket io server");
    socket.on("msgFromClient", msg => console.log(msg));
    socket.on("newMessageToServer", msg => {
        io.emit("messageToClients", {text: msg.text});
    });
});

io.of("/admin").on("connection", socket => {
    io.of("/admin").emit("welcome", "Welcome to admin namespace!");
});