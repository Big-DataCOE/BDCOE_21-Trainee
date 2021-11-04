import { auth } from '../config/firebase';
import { signOut } from '@firebase/auth';

export default function Navbar() {

    return (
        <div id="navbar">
            Navbar
            <button className="btn btn-signout" onClick={()=>{signOut(auth)}}>Sign Out</button>
        </div>
    )
}