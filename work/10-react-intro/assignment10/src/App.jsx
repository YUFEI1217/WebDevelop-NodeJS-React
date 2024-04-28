import { useState } from 'react';
import Login from './Login';
import Game from './Game';
import Footer from './Footer';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  return (
    <>
      {isLoggedIn ?
      <Game username={username} setIsLoggedIn={setIsLoggedIn}/>:
      <Login username={username} setUsername={setUsername} setIsLoggedIn={setIsLoggedIn}/>
      }
    </>
  )
}

export default App;
