import React, { useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function Status() {
    const [status, setStatus] = useState('');

    onAuthStateChanged(auth, (user)=>{
        if(user){
            // logged in
            // setName(user.displayName);
            setStatus("Logged In");
        }else{
            // logged out
            setStatus("Logged Out");
        }
    })
    return (
        <div>
            <h1>{status}</h1>
        </div>
    )
}
