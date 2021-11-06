import React, { useState, useEffect } from 'react';
import { auth } from '../config/firebase';

import '../assets/Greet.css';

export default function Greet() {

    const [wish, setWish] = useState("");
    const [time, setTime] = useState("");
    const [day, setDay] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const wish = ["Good Morning", "Good Morning", "Good Morning", "Good Morning", "Good Morning", "Good Morning", "Good Morning", "Good Morning", "Good Morning", "Good Morning", "Good Morning", "Good Morning", "Good Afternoon", "Good Afternoon", "Good Afternoon", "Good Afternoon", "Good Afternoon", "Good Evening", "Good Evening", "Good Evening", "Good Evening", "Good Evening", "Good Evening", "Good Evening", "Good Evening"];
        setInterval(() => {
            const date = new Date();
            setTime(`${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`);
            setDate(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
            setDay(`${day[date.getDay()]}`);
            setWish(`${wish[date.getHours()]}`);
        }, 1000);
    }, []);

    return (
        <div id="greet">
            <div className="wish-name">
                <div id="wish">{wish},</div>
                <div id="name">{auth.currentUser.displayName.replace(/ .*/, '')}</div>
            </div>
            <div id="time">{time}</div>
            <div className="day-date">
                <div id="date">{date}</div>
                <div id="day">{day}</div>
            </div>
        </div>
    )
}