const express = require("express");
const app = express();
const socketio = require("socket.io");

let namespaces = require("./data/namespaces");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000);
const io = socketio(expressServer);

namespaces.forEach(namespace => {
    io.of(namespace.endpoint).on("connection", nsSocket => {
        console.log(`${nsSocket.id} has join ${namespace.endpoint}`);
        nsSocket.emit("nsRoomLoad", namespaces[0].rooms);


        nsSocket.on("joinToRoom", (roomName, numberOfClientsCallback) => {
            nsSocket.join(roomName);
            io.of("/wiki").in(roomName).clients((err, clients) => {
                numberOfClientsCallback(clients.length);
            });

            const nsRoom = namespaces[0].rooms.find(room => room.roomTitle === roomName);
            const oldMessages = nsRoom.history;
            nsSocket.emit("history", oldMessages);
        });

        nsSocket.on("newMessageToServer", msg => {
            const fullMsg = {
                avatar : "https://via.placeholder.com/30",
                text : msg.text,
                date : Date.now(),
                username : "DiangoGav"
            }

            const rooms = nsSocket.rooms;
            const roomTitle = Object.keys(rooms)[1];

            const nsRoom = namespace.rooms.find(room => room.roomTitle === roomTitle);
            nsRoom.addMessage(fullMsg);
            io.of("/wiki").to(roomTitle).emit("messageToClients", fullMsg);
        });

    });
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
