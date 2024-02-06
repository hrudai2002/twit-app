const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:5173" // frontend running server port
    }
}); 

let onlineUsers = [];

const addUser = (onlineUserId, socketId) => {
    !onlineUsers.some((user) => user.onlineUserId === onlineUserId) && 
       onlineUsers.push({ onlineUserId, socketId });
}

const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId.toString() !== socketId.toString());
}

io.on("connection", (socket) => {
    console.log("a user is connected");
    // get the userId 
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);  
        io.emit("getUsers", onlineUsers);
    })

    // user disconnected
    socket.on("disconnect", () => {
        console.log("user disconnected");
        removeUser(socket.id); 
        io.emit("getUsers", onlineUsers);
    })
})
