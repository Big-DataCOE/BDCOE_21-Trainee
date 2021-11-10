const express = require("express");
const http = require("http");
const router = require("./router");
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "https://teamchat-server.herokuapp.com/",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT;

let users = [];

app.use(express.static(path.resolve(__dirname, './build')));
app.use(cors());
app.use(router);

// socket.io handling
io.on("connection", (socket)=>{

    // new user joined
    socket.on("new_user_joined", (user)=>{
        users[socket.id] = user;
        socket.broadcast.emit("user_joined", user);
    });

    // message sent
    socket.on("send", (msg)=>{
        const date = new Date();
        const dnt = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear() + '@' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        socket.broadcast.emit("recieve", {
            class: "msg",
            message: msg,
            user: users[socket.id].name,
            email: users[socket.id].email,
            timestamp: dnt
        });
    });

    // user disconnected
    socket.on("disconnect", ()=>{
        socket.broadcast.emit("user_disconnected", users[socket.id]);
        delete users[socket.id];
    });

});

server.listen(PORT, ()=>{
    console.log(`server running at port ${PORT}`);
});