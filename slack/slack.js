const express = require("express");
const app = express();
const socketio = require("socket.io");

let namespaces = require("./data/namespaces");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000);
const io = socketio(expressServer);

namespaces.forEach(namespace => {
    io.of(namespace.endpoint).on("connection", socket => {
        console.log(`${socket.id} has join ${namespace.endpoint}`);
    })
});

io.on("connection", (socket) => {
    const nsList = namespaces.map(namespace => {
        return {
            endpoint: namespace.endpoint,
            image: namespace.image
        }
    });
    socket.emit("nsList", nsList);
});
