// const socket = io("http://localhost:9000");
const username = prompt("What is your username?");
const socket = io("http://localhost:9000", {
    query : {
        username
    }
});
let nsSocket = null;

socket.on("nsList", namespaces => {
    const nsDiv = document.querySelector(".namespaces");
    nsDiv.innerHTML = "";
    namespaces.forEach(ns => {
        nsDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}"></div>`;
    });

    Array.from(document.getElementsByClassName("namespace")).forEach(elem => {
        elem.addEventListener("click", e => {
            const nsEndpoint = elem.getAttribute("ns");
            joinNs(nsEndpoint);
        });
    });

    joinNs("/wiki");
});
