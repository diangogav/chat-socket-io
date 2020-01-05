class Namespace{
    constructor(id,nsTitle, image, endpoint){
        this.id = id;
        this.nsTitle = nsTitle;
        this.image = image;
        this.endpoint = endpoint;
        this.rooms = [];
    }

    addRoom(room){
        this.rooms.push(room);
    }
}

module.exports = Namespace;

