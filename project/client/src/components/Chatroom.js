import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { auth } from '../config/firebase';

import Message from './Message';
import Alert from './Alert';

import notification from '../assets/notification.mp3';
import '../assets/Chatroom.css';

const ROUTE = process.env.SERVER_ROUTE;
let socket;

export default function Chatroom() {

    const user = auth.currentUser;
    const audio = new Audio(notification);
    const bottomRef = useRef(null);
    const [msgTxt, setMsgTxt] = useState('');
    const [msgList, setMsgList] = useState([]);

    useEffect(() => {
        socket = io(ROUTE);
        socket.emit("new_user_joined", {name: user.displayName, email: user.email});

        return () => {
            socket.disconnect();
        }
    }, [ROUTE]);

    useEffect(() => {
        socket.on("user_joined", (user) => {
            const date = new Date();
            const dnt = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + '@' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            setMsgList(msgList => [...msgList, { class: "alert", message: "joined", user: user.name, email: user.email, timestamp: dnt }]);
            audio.play();
        });

        socket.on("user_disconnected", (user) => {
            const date = new Date();
            const dnt = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + '@' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            setMsgList(msgList => [...msgList, { class: "alert", message: "left", user: user.name, email: user.email, timestamp: dnt }]);
            audio.play();
        });

        socket.on("recieve", (data) => {
            setMsgList(msgList => [...msgList, data]);
            audio.play();
        });
    }, []);


    function sendMsg() {
        socket.emit("send", msgTxt);
        const date = new Date();
        const dnt = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + '@' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        setMsgList(msgList => [...msgList, { class: "msg", message: msgTxt, user: user.displayName, email: user.email, timestamp: dnt }]);
        setMsgTxt('');
    }


    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [msgList]);
       

    return (
        <div id="chatroom">
            <div className="messages">
                {msgList.map((m, i) => {
                    return (
                        (m.class==="msg")?
                        <Message content={m.message} userName={m.user} timestamp={m.timestamp} pos={(m.email === user.email) ? "right" : "left"} key={i} />
                        :
                        <Alert userName={m.user} message={m.message} key={i} />
                    )
                })}
                <div ref={bottomRef} />
            </div>
            <form id="chat" onSubmit={(e) => { e.preventDefault() }}>
                <input className="inp inp-send" type="text" placeholder="Message" value={msgTxt} onChange={(e) => { setMsgTxt(e.target.value) }} />
                <button className="btn btn-send" onClick={sendMsg}><span className="material-icons-round">send</span></button>
            </form>
        </div>
    )
}