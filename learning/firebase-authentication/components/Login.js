import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');

    const login = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                setUser(user.email);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + errorMessage);
            });
        setEmail('');
        setPassword('');
    }

    return (
        <div>
            <h1 className="label">Login</h1>
            <form className="login" onSubmit={(e) => { e.preventDefault() }}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                <button onClick={login}>Login</button>
                <div className="message">{user}</div>
                <button className="btn-signup">Do not have an account? Sign Up instead</button>
            </form>
        </div>
    )
}
