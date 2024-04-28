const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());

/////////method2
app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !username) {
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
    const existUser = users.getUsernameList();

    if(existUser.indexOf(username) === -1) {
      users.addNewUsernameChatList(username);
    }

    res.cookie('sid', sid);
  
    res.json({ username, existUser });
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
  
app.get('/api/chat', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
  
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
  
    const chat = users.getUsernameChat();
    const usernameList = users.getUsernameList();
  
    res.json({ username: username, chat: chat, userList: usernameList });
});
  
app.put('/api/chat', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
  
    const { chat } = req.body;
  
    if(!chat) {
      res.status(400).json({ error: 'required-chat' });
      return;
    }

    if(chat === '') {
      res.status(400).json({ error: 'required-chat' });
      return;
    }
  
    users.addUsernameChat(username, chat);
  
    res.json({ username: username, chat: chat });
});
  


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));