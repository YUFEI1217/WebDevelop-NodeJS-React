const cookieParser = require('cookie-parser');
const express = require('express');
const uuidv4 = require('uuid').v4;

const PORT = 3000;
const app = express();
app.use(express.static('./public'));

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

const Login_data = {

};

const name_To_word = {};

app.get('/', (req,res) => {
    const sid = req.cookies.sid;
    if(!sid || !Login_data[sid]) {
      res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
          <meta charset="UTF-8">
          <title>Login in page</title>
          <link rel="stylesheet" href="styles.css">
      </head>
      <body>
          <h1 class="login_h1">Login page</h1>
          <form class="login_form" action="/Login" method="POST">
              <label class="login_label">
                  <span class="label_span">Username</span>
                  <input class="input_username" name="username">
              </label>
              <button class="login_btn" type="submit">Login</button>
          </form>
      </body>
    </html>
    `);
    return;
    }
    else{
        const new_sid = req.cookies.sid;
        const usernamed = Login_data[new_sid].username;
        const storeWord = name_To_word[usernamed];
        const newWord = req.query.newWord;
        if(newWord){
            res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Data page</title>
                    <link rel="stylesheet" href="styles.css">
                </head>
                <body>
                    <h1 class="data_h1">Welcome, ${usernamed}!</h1>
                    <p class="word_show">Store Word: ${newWord}</p>
                    <form class="logout_form" action="/logout" method="POST">
                        <button class="logout_btn" type="submit">Logout</button>
                    </form>
                    <form class="store_form" action="/" method="GET">
                        <label class="store_label">
                            <span class="store_span">Input the store word: </span>
                            <input class="store_input" name="newWord">
                        </label>
                        <button class="store_btn" type="submit">Submit</button>
                    </form>
                </body>
                </html>
            `);
        }
        else{
            res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Data page</title>
                    <link rel="stylesheet" href="styles.css">
                </head>
                <body>
                    <h1 class="data_h1">Welcome, ${usernamed}!</h1>
                    <p class="word_show">Stored Word:  ${storeWord}</p>
                    <form class="logout_form" action="/logout" method="POST">
                        <button class="logout_btn" type="submit">Logout</button>
                    </form>
                    <form class="store_form" action="/" method="GET">
                        <label class="store_label">
                            <span class="store_span">Input the store word: </span>
                            <input class="store_input" name="newWord">
                        </label>
                        <button class="store_btn" type="submit">Submit</button>
                    </form>
                </body>
                </html>
            `);
        }
        Login_data[sid].storedWord = storeWord;
        if(newWord){
            name_To_word[usernamed] = newWord;
        }//check the result
    }
});

app.post('/Login', (req, res) => {
    const username = req.body.username.trim();
    console.log(username);
    if(!username) {
      res.status(400);
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Login Error</title>
        </head>
        <body>
            <h1>Login Error</h1>
            <p>
                Please input the username! Click here back 
                <a href="http://localhost:3000">Home</a>
            </p>
        </body>
        </html>
      `);
      return;
    }
    else if(!/^[0-9a-zA-Z]*$/.test(username)){  //!username.match(/[a-zA-Z0-9]/g)  //This method does't work for !!!111 
        res.status(400);
        res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Login Error</title>
        </head>
        <body>
            <h1>Login Error</h1>
            <p>
                Username that is not made up of letters or numbers only. Click here back 
                <a href="http://localhost:3000">Home</a>
            </p>
        </body>
        </html>
      `);
        return;
    }
    else if(username.toLowerCase() === "dog") { // Simulating a bad password
      res.status(403);
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Login Error</title>
        </head>
        <body>
            <h1>Login Error</h1>
            <p>
                You are human, not dog! Click here back 
                <a href="http://localhost:3000">Home</a>
            </p>
        </body>
        </html>
      `);
      return;
    }
    else{
        const sid = uuidv4();
        Login_data[sid] = { username, storedWord:""};
        res.cookie('sid', sid);  //, {maxAge: 10*60*2000}
        res.redirect('/');
    }
});

// Logout
app.post('/logout', (req, res) => {
    const sid = req.cookies.sid;
    delete Login_data[sid]; // Remove session ID from server-side data
    res.clearCookie('sid');  // Clear session ID cookie
    res.redirect('/');
});

  
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));