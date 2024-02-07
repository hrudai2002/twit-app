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

const getUser = (userId) => {
    return onlineUsers.find((user) => user.onlineUserId.toString() === userId.toString());
}

io.on("connection", (socket) => {
    // when connected
    console.log("a user is connected");


    // take userId and socketId from the user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);  
        io.emit("getUsers", onlineUsers);
    })

    // send and get message 
    socket.on("sendMessage", ({senderId, receiverId, text}) => {
        const user = getUser(receiverId); 
        io.to(user.socketId).emit("getMessage", {
            senderId, 
            text
        })
    })

    // user disconnected
    socket.on("disconnect", () => {
        console.log("user disconnected");
        removeUser(socket.id); 
        io.emit("getUsers", onlineUsers);
    })
})
