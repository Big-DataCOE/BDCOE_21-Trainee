import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from "../config/firebaseConfig";
import Chatroom from './Chatroom';
import Todolist from './Todolist';
import Navbar from './Navbar';

// const user = auth.currentUser;
export default function Dashboard( {authStatus} ) {

    function logout(){
        signOut(auth)
            .then(() => {
                authStatus(false);
                console.log('logged out');
            }).catch((error)=>{
                console.log(error);
            });
    }

    return (
        <>
            {/* <button onClick={logout}>sign out</button> */}
            {/* <h1>this is the Dashboard</h1> */}
            <Navbar />
            <Chatroom />
            <Todolist />
        </>
    );
}