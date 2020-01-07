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
            messagesDiv.innerHTML += newMsg;
        });

        messagesDiv.scrollTo(0, messagesDiv.scrollHeight);
    });

    nsSocket.on("updateMembers", membersCount => {
        document.querySelector(".curr-room-num-users").innerHTML = `${membersCount} <span class="glyphicon glyphicon-user"></span>`;
        document.querySelector(".curr-room-text").innerHTML = `${roomName}`;
    });

    let searchBox = document.querySelector("#search-box");
    searchBox.addEventListener("input", (e) => {
        console.log(e.target.value )
        const messages = Array.from(document.getElementsByClassName("message-text"));
        messages.forEach(msg => {
            if(msg.innerText.toLowerCase().indexOf(e.target.value.toLowerCase()) === -1){
                msg.style.display = "none";
            }else{
                msg.style.display = "block";
            }
        });
    });
}