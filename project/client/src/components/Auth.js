import { GoogleAuthProvider, signInWithRedirect } from '@firebase/auth';
import { auth } from '../config/firebase';

import google from '../assets/google.svg';
import bdcoe from '../assets/bdcoe.png';
import '../assets/Auth.css';

export default function Auth() {

    const signIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    }

    return (
        <div id="auth">
            <div className="box">
                <div className="auth-logo">
                    <img src={bdcoe} alt="logo" />
                    <h3>BDCoE Team-Chat</h3>
                </div>
                <button className="btn btn-signin" onClick={signIn}><img src={google} alt="google" /> Sign in with Google</button>
            </div>
        </div>
    );
}