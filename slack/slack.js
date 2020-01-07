const express = require("express");
const app = express();
const socketio = require("socket.io");

let namespaces = require("./data/namespaces");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000);
const io = socketio(expressServer);

namespaces.forEach(namespace => {
    io.of(namespace.endpoint).on("connection", nsSocket => {
        const username = nsSocket.handshake.query.username;
        console.log(`${nsSocket.id} has join ${namespace.endpoint}`);
        nsSocket.emit("nsRoomLoad", namespace.rooms);


        nsSocket.on("joinToRoom", (roomToJoin, numberOfClientsCallback) => {

            const roomToLeave = Object.keys(nsSocket.rooms)[1];
            
            nsSocket.leave(roomToLeave);
            updateUsersInRoom(namespace, roomToLeave);
            nsSocket.join(roomToJoin);
            
            // io.of(namespace.endpoint).in(roomToJoin).clients((err, clients) => {
            //     numberOfClientsCallback(clients.length);
            // });

            const nsRoom = namespace.rooms.find(room => room.roomTitle === roomToJoin);
            const oldMessages = nsRoom.history;
            nsSocket.emit("history", oldMessages);
            updateUsersInRoom(namespace, roomToJoin);
        });

        nsSocket.on("newMessageToServer", msg => {
            const fullMsg = {
                avatar : "https://via.placeholder.com/30",
                text : msg.text,
                date : Date.now(),
                username
            }

            const rooms = nsSocket.rooms;
            const roomTitle = Object.keys(rooms)[1];

            const nsRoom = namespace.rooms.find(room => room.roomTitle === roomTitle);
            nsRoom.addMessage(fullMsg);
            io.of(namespace.endpoint).to(roomTitle).emit("messageToClients", fullMsg);
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

function updateUsersInRoom(namespace, roomToJoin){
    io.of(namespace.endpoint).in(roomToJoin).clients((err, clients) => {
        io.of(namespace.endpoint).in(roomToJoin).emit("updateMembers", clients.length);
    });
}
