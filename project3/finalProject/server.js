const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const cart = require('./cart');
const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json());


app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValidUsername(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  res.json({ username });
});

app.post('/api/session', (req, res) => {
    const { username } = req.body;
  
    if(!users.isValidUsername(username)) {
      res.status(400).json({ error: 'required-username' });
      return;
    }
  
    if(username === 'dog') {
      res.status(403).json({ error: 'auth-insufficient' });
      return;
    }
  
    const sid = sessions.addSession(username);

    // check whether the user is already in the userlist
    const existUser = users.getUserData(username);

    if(!existUser) {
      users.addUserData(username, cart.createCart());
    }

    res.cookie('sid', sid);
    res.json( users.getUserData(username).getCarts());
});

app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
  
    if(sid) {
      res.clearCookie('sid');
    }
  
    if(username) {
      sessions.deleteSession(sid);
    }

    res.json({ username });
});

app.get('/api/cart', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users.isValidUsername(username)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    res.json(users.getUserData(username).getCarts());
});

app.post('/api/cart', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users.isValidUsername(username)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }

    const { production } = req.body;
    if(!production) {
      res.status(400).json({ error: 'required-production' });
      return;
    }
    const cartList = users.getUserData(username);
    const productionName = cartList.addCart(production);
    res.json(cartList.getCart(productionName));
});


app.get('/api/cart/:productionName', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
  
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
  
    const cartList = users.getUserData(username);
    const {productionName} = req.params;
    if(!cartList.contains(productionName)) {
      res.status(404).json({ error: `noSuchProduction`, message: `No cart with this production ${productionName}` });
      return;
    }
  
    res.json(cartList.getCart(Pname));
});
  
app.put('/api/cart/:productionName', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    if(!users.isValidUsername(username)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
  
    const cartList = users.getUserData(username);
    const { productionName } = req.params;
    const { production } = req.body;
  
    if(!production) {
      res.status(400).json({ error: 'required-production' });
      return;
    }

    if(!cartList.contains(productionName)) {
      res.status(404).json({ error: `noSuchProduction`, message: `No cart with this production ${productionName}` });
      return;
    }
  
    cartList.updateCart(productionName, {production});
  
    res.json( cartList.getCart(productionName) );
});
  
app.patch('/api/cart/:productionName', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    if(!users.isValidUsername(username)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    
    const { productionName } = req.params;
    const { production } = req.body;
    const cartList = users.getUserData(username);
    // if(!cartList.contains(productionName)) {
    //   res.status(404).json({ error: `noSuchProductionName`, message: `No cart with productionName ${productionName}` });
    //   return;
    // }

    cartList.updateCart(productionName, {production});
  
    res.json( cartList.getCart(productionName) );
});

app.delete('/api/cart', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    if(!users.isValidUsername(username)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }

    const cartList = users.getUserData(username);
    cartList.clearCart();

    res.json({ message: `cart` ? `cart cleared` : `cart did not exist` })

})

app.get('*', (req, res) => { // Default to sending index.html
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));