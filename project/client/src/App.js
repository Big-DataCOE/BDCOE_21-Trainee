import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from './config/firebase';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import './assets/App.css';

function App() {

  const [user, setUser] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        console.log(`username: ${u.displayName} email: ${u.email} signed in`);
        setUser(true);
      } else {
        setUser(false);
        console.log("user signed out");
      }
    });
  }, [setUser]);

  return (
    <div id="app">
      {user ? <Dashboard /> : <Auth />}
    </div>
  );
}

export default App;