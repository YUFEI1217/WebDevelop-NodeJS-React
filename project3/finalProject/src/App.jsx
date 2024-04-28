import { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import About from './About';
import Footer from './Footer';
import Login from './Login';
import GameStore from './GameStore';
import GameDetail from './GameDetail';
import Loading from './Loading';

import { LOGIN_STATUS, CLIENT, SERVER, POLLING_DELAY } from './constants';
import { fetchLogin, fetchLogout, fetchSession, fetchAddCart, fetchUpdateCart, fetchClearCart, fetchCart } from './services';



function App() {
  
  const [page, setPage] = useState('');

  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING); 
  const [isCartPending, setIsCartPending] = useState(false);
  const [carts, setCarts] = useState({});
  const [lastAddCartName, setLastAddCartName] = useState();

  const pollingRef = useRef();


  function onLogin(username) {
    setIsCartPending(true);
    fetchLogin(username)
    .then ( data => {
      setError('');
      setUsername(username);
      setIsCartPending(false);
      setCarts(data);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
    })
    .catch( err => {
      setError(err?.error || 'ERROR');
    });
  };

  function onLogout() {
    setError('');
    setUsername('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setCarts({});
    setLastAddCartName('');
    fetchLogout()
    .catch( err => {
      setError(err?.error || 'ERROR');
    });
  };

  function onClearCart() {
    setError('');
    setIsCartPending(true);
    fetchClearCart()
      .then( () => {
        return fetchCart();
      })
      .then( () => {
        setCarts({});
        setIsCartPending(false);
      })
      .catch( err => {
        setError(err?.error || 'ERROR');
      });
  };

  function updateCart(productionName, production) {
    fetchUpdateCart(productionName, {production})
    .then(cart => {
      cart = production[productionName];
      setCarts({
        ...carts,
        [productionName]: cart,
      });
      setLastAddCartName('');
    })
    .catch( err => {
        setError(err?.error || 'ERROR');
    });
  }

  function addCart(productionName, production) {
    fetchAddCart(production)
    .then(cart => {
      const addCartObject = {[productionName]:cart};
      setCarts({
        ...carts,
        addCartObject,
      });
      setLastAddCartName(cart.Pname);
    })
    .catch( err => {
      setError(err?.error || 'ERROR');
    }) 
  }

  function checkForSession() {
    fetchSession()  
    .then( session => {
      setUsername(session.username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
      return fetchCart();
    })
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION }) // Expected, not a problem
      }
      return Promise.reject(err);
    })
    .then( carts => {
      setCarts(carts);
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) { // expected "error"
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        return;
      }
      setError(err?.error || 'ERROR');
    });
  }

  useEffect (
    () => {
      
      function handlePageLoad() {
        setPage(document.location.pathname);
      }

      handlePageLoad();
      window.addEventListener('popstate', handlePageLoad);
      setPage(document.location.pathname);

      checkForSession();
      
      return() => {
        window.removeEventListener('popstate', handlePageLoad);
      };
    },
    []
  );

  const pollingCarts = useCallback( () => {
    fetchCart()
    .then( carts => {
      setCarts(carts);
    })
    .then( () => {
      pollingRef.current = setTimeout(pollingCarts, POLLING_DELAY);
    })
    .catch( () => {
      pollingRef.current = setTimeout(pollingCarts, POLLING_DELAY);
    });
  }, []);

  useEffect( 
    () => {
      if(loginStatus === LOGIN_STATUS.IS_LOGGED_IN) {
        pollingRef.current = setTimeout( pollingCarts, POLLING_DELAY);
      }
      return () => {
        clearTimeout(pollingRef.current);
      };
    },
    [loginStatus, pollingCarts]
  );

  return (
    <>
      {loginStatus === LOGIN_STATUS.PENDING && <Loading/>}
      {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <Login onLogin={onLogin} error={error}/>}
      {loginStatus === LOGIN_STATUS.IS_LOGGED_IN &&  (
      <>
        <Header setPage={setPage} onLogout={onLogout}/>
        <main className='main_content'>
            {page === "/" && <Home setPage={setPage}/>}
            {page === "/GameStore" && <GameStore isCartPending={isCartPending} carts={carts} onClearCart={onClearCart} addCart={addCart} updateCart={updateCart} username={username}/>}
            {page === "/About" && <About setPage={setPage}/>}
            {page === "/GameDetail" && <GameDetail addCart={addCart} updateCart={updateCart} carts={carts}/> }
        </main>
        <Footer/>
      </>)}
    </>
  )
}

export default App;
