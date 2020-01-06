function joinRoom(roomName){
    nsSocket.emit("joinToRoom", roomName, numberOfClients => {
        console.log(numberOfClients)
        document.querySelector(".curr-room-num-users").innerHTML = `${numberOfClients} <span class="glyphicon glyphicon-user"></span>`;
    });
}