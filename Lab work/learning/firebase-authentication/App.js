import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Status from './components/Status';
import Logout from './components/Logout';

function App() {
  return (
    <div className="container">
      <Signup />
      <Login />
      <Status />
      <Logout />
    </div>
  );
}

export default App;