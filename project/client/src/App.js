import React, { useState } from "react";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import './App.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return(
    isLoggedIn ? <Dashboard authStatus={setIsLoggedIn}/> : <Auth authStatus={setIsLoggedIn}/>
  );
}

export default App;