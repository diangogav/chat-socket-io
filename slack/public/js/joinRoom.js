function joinRoom(roomName){
    nsSocket.emit("joinToRoom", roomName, numberOfClients => {
        console.log(numberOfClients)
        document.querySelector(".curr-room-num-users").innerHTML = `${numberOfClients} <span class="glyphicon glyphicon-user"></span>`;
    });

    nsSocket.on("history", oldMessages => {
        const messagesDiv = document.querySelector("#messages");
        messagesDiv.innerHTML = "";

        oldMessages.forEach(msg => {
            const newMsg = buildHTML(msg);
            const currentMessages = messagesDiv.innerHTML;
            messagesDiv.innerHTML = currentMessages + newMsg;
        });       
    });
}