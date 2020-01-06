function joinNs(endpoint){
    nsSocket = io(`http://localhost:9000${endpoint}`);

    nsSocket.on("nsRoomLoad", rooms => {
        const roomListDiv = document.querySelector(".room-list");
        roomListDiv.innerHTML = "";

        rooms.forEach(room => {
            let glyph = (!room.privateRoom) ? "globe" : "lock";
            roomListDiv.innerHTML += `<li class=room><span class="glyphicon glyphicon-${glyph}"></span>${room.roomTitle}</li>`
        });

        Array.from(document.getElementsByClassName("room")).forEach(elem => {
            elem.addEventListener("click", e => {
                console.log(`Someone click on ${e.target.innerText}`);
            });
        });

        const topRoom = document.querySelector(".room");
        topRoomName = topRoom.innerText;
        joinRoom(topRoomName);
    });

    nsSocket.on("messageToClients", msg => {
        console.log(msg);
        document.querySelector("#messages").innerHTML += `<li>${msg.text}</li>`;
    });

    document.querySelector(".message-form").addEventListener("submit", event => {
        event.preventDefault();
        const newMessage = document.querySelector("#user-message").value;
        nsSocket.emit("newMessageToServer", {text: newMessage});
    });
}