import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function Logout() {

    const logout = () => {
        signOut(auth).then(() => {
            console.log('logged out');
        }).catch((error)=>{
            console.log(error);
        })
    }

    return (
        <div>
            <button className="logout" onClick={logout}>Log Out</button>
        </div>
    )
}
