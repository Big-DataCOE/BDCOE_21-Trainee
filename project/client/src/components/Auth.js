import { GoogleAuthProvider, signInWithRedirect, onAuthStateChanged } from "firebase/auth";
import React from "react";
import { auth } from "../config/firebaseConfig";

const provider = new GoogleAuthProvider();

export default function Auth({ authStatus }) {
  
    onAuthStateChanged(auth, (user) => {
        if (user) {
            authStatus(true);
        } else {
            authStatus(false);
        }
    });
    
    function signIn() {
        signInWithRedirect(auth, provider);
    }

    return (
        <div>
            <button onClick={signIn}>Sign in with google</button>
        </div>
    )
}
