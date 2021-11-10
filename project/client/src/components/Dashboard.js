import Navbar from './Navbar';
import Chatroom from './Chatroom';
import Pinup from './Pinup';

import '../assets/Dashboard.css';

export default function Dashboard() {

    return (
        <div id="dashboard">
            <Navbar />
            <Chatroom />
            <Pinup />
        </div>
    )
}