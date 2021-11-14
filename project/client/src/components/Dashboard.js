import React, { useState } from 'react';
import Navbar from './Navbar';
import Chatroom from './Chatroom';
import Pinup from './Pinup';

import '../assets/Dashboard.css';

export default function Dashboard() {

    const [pinDisplay, setPinDisplay] = useState("grid");
    const [icon, setIcon] = useState("cancel");

    function togglePinup() {
        if (pinDisplay === "grid") {
            setPinDisplay("none");
            setIcon("fact_check");
        } else {
            setPinDisplay("grid");
            setIcon("cancel");
        }
    }

    return (
        <div id="dashboard">
            <Navbar />
            <Chatroom />
            <Pinup pinDisplay={pinDisplay} />
            <button className="btn" id="btn-show-pinup" onClick={togglePinup}><span className="material-icons-round">{icon}</span></button>
        </div>
    )
}