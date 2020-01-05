const socket = io("http://localhost:9000");

socket.on("msgFromServer", msg => {
    console.log(msg);
    socket.emit("msgFromClient", {data: "Hello from the clien side!"});
});

document.querySelector("#message-form").addEventListener("submit", event => {
    event.preventDefault();
    const messageBox = document.querySelector("#user-message");
    const newMessage = messageBox.value;
    socket.emit("newMessageToServer", {text: newMessage});
    messageBox.value = "";
});

socket.on("messageToClients", msg => {
    document.querySelector("#messages").innerHTML += `<li> ${msg.text} </li>`;
});