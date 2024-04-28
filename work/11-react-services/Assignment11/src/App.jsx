import { useState, useEffect } from 'react';
import Login from './Login';
import Word from './Word';
import { LOGIN_STATUS, CLIENT, SERVER } from './constants';
import Loading from './Loading';
import WordUpdate from './WordUpdate';

import './App.css';
import { fetchLogin, fetchLogout, fetchSession,  fetchWord } from './services';
import Footer from './Footer';

function App() {

  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.NOT_LOGGED_IN); 
  const [isWordPending, setIsWordPending] = useState(false);
  const [word, setWord] = useState('');

  function onLogin(username) {
    setIsWordPending(true);
    fetchLogin(username)
    .then (data => {
      setError('');
      setIsWordPending(false);
      setUsername(data.username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
      fetchStoredWord();
    })
    .catch( err => {
      setError(err?.error || 'ERROR');
    });
  };

  function onLogout() {
    setError('');
    setUsername('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setWord('');
    fetchLogout()
    .catch( err => {
      setError(err?.error || 'ERROR');
    });
  };

  function updateWord(word) {
    fetchWord(word)
    .then(newWord => {
      setWord(newWord.storedWord);
      setError('');
    })
    .catch( err => {
      setError(err?.error || 'ERROR');
    });
  };

  function fetchStoredWord() {
    return fetch('/api/word')
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(data => {
      setWord(data.storedWord);
    })
    .catch(err => {
        setError(err?.error || 'ERROR');
    });
  };

  function checkForSession() {
    fetchSession()
    .then( session => {
      setUsername(session.username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
      return fetchStoredWord();
    })
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION }) // Expected, not a problem
      }
      return Promise.reject(err);
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) { // expected "error"
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        return;
      }
      setError(err?.error || 'ERROR');
    });
  }

  useEffect(
    () => {
      checkForSession();
    },
    []
  );

  return (
    <>
      {loginStatus === LOGIN_STATUS.PENDING && <Loading/>}
      {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <Login onLogin={onLogin} error={error}/>}
      {loginStatus === LOGIN_STATUS.IS_LOGGED_IN &&  (
      <>
        <div className='allword_part'>
          <Word word={word} onLogout={onLogout} error={error} username={username} isWordPending={isWordPending} />
          <WordUpdate updateWord={updateWord} error={error}/>
        </div>
        <Footer/>
      </>)}
    </>
  )
}

export default App;
