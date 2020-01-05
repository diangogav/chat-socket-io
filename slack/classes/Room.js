class Room{
    constructor(rommId, roomTitle, namespace, privateRoom = false){
        this.rommId = rommId;
        this.roomTitle = roomTitle;
        this.namespace = namespace;
        this.privateRoom = privateRoom;
        this.history = [];
    }

    addMessage(msg){
        this.history.push(msg);
    }

    clearHistory(){
        this.history = [];
    }
}

module.exports = Room;