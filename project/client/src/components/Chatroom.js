import React, {useState, useEffect} from 'react';
import { io } from "socket.io-client";
import { auth } from "../config/firebaseConfig";
import Message from "./Message";

import "./Chatroom.css";

const ROUTE = "http://localhost:9000";
let socket;

export default function Chatroom() {
    
    const user = auth.currentUser;
    const [msgText, setMsgText] = useState();
    const [msgList, setMsgList] = useState([]);
    // const [counter, setCounter] = useState(true);
    // const counter = true;
    const [alert, setAlert] = useState({});


    useEffect(()=>{
        socket = io(ROUTE);
        socket.emit("new_user_joined", user.displayName);

        socket.on("user_disconnected", (userName)=>{
            console.log(`${userName} left the chat`);
            setAlert({user: userName, action: "left the chat"});
        });

        return()=>{
            socket.emit("disconnect");
            socket.off();
        }
    }, [ROUTE, user.displayName]);

    useEffect(()=>{
        socket.on("recieve", (data)=>{
            console.log(`recieved from server: message: ${data.message} name: ${data.name}`);
            setMsgList([...msgList, {message: data.message, name: data.name}]);
            console.log(msgList);
        });
    }, []);

    // client emit events

    function handleExit(){
        socket.off();
    }
    
    function sendMsg(){
        socket.emit("send", msgText);
        setMsgText(' ');
    }

    return (
        <div id="chatroom">
            <h1>Chatroom Name</h1>

            <button onClick={handleExit}>Exit chat room</button>

            <div className="texts">
                {msgList.map((msg, i) => {
                    let position;
                    (msg.name === user.displayName) ? position = "right" : position = "left";
                    return (
                        <Message key={i} userName={msg.name} content={msg.message} pos={position} timestamp={"11:20"} />
                    );
                })}
            </div>

            <form id="message-box" onSubmit={(e)=>{e.preventDefault()}}>
                <input className="input-message" type="text" placeholder="Message" value={msgText} onChange={(e)=>{setMsgText(e.target.value)}}/>
                <button className="btn-send" onClick={sendMsg}><span className="material-icons-round">send</span></button>
            </form>

        </div>
    );
}