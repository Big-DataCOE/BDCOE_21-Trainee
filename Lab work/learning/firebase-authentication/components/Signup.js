import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function Signup() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');

    const signup = () => {
        createUserWithEmailAndPassword(auth, email, password)
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
            <h1 className="label">Signup</h1>
            <form className="signup" onSubmit={(e) => { e.preventDefault() }}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                <button onClick={signup}>Sign Up</button>
                <div className="message">{user}</div>
            </form>
        </div>
    )
}