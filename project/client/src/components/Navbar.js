import { auth } from '../config/firebase';
import { signOut } from '@firebase/auth';

import Greet from './Greet';

import bdcoe from '../assets/bdcoe.jfif';
import '../assets/Navbar.css';

export default function Navbar() {

    return (
        <div id="navbar">
            <div className="navbar-logo">
                <img src={bdcoe} alt="logo" />
                <h3>Team-Chat</h3>
            </div>
            <div className="navbar-signout">
                <Greet />
                <button className="btn btn-signout" onClick={() => { signOut(auth) }}>Sign out</button>
            </div>
        </div>
    )
}