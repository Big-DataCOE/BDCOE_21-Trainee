const express = require("express");
const http = require("http");
const router = require("./router");

const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
});
const PORT = process.env.PORT || 9000;

app.use(router);

const users = [];

io.on("connection", (socket) => {
    console.log(`message from server: new connection socket id: ${socket.id}`);

    socket.on("new_user_joined", (userName)=>{
        users[socket.id] = userName;
        socket.broadcast.emit("user_joined", userName);
        console.log(`message from server: ${userName} joined the chat`);
    });

    socket.on("send", (msg)=>{
        console.log(`${users[socket.id]} sent ${msg}`);
        socket.emit("recieve", {message: msg, name: users[socket.id]});
    });
    
    socket.on("disconnect", () => {
        console.log(`message from server: ${users[socket.id]} has diconnected`);
        socket.broadcast.emit("user_disconnected", users[socket.id]);
        delete users[socket.id];
    });
});

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});