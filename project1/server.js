const cookieParser = require('cookie-parser');
const express = require('express');
const uuidv4 = require('uuid').v4;
const wordList = require('./words');
const loginController = require('./loginController');
const gameDataController = require('./gameDataController');
const guessController = require('./guessController');

const PORT = 3000;
const app = express();

app.use(express.static('./public'));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const userToWord = {};

app.get('/', (req, res) => {
    const sid = req.cookies.sid;
    if(!sid) {
        res.send(loginController.newUserLogin());
    }
    else{
        res.send(gameDataController.existUserLogin(sid, userToWord[loginController.getUsername(sid)]["previousWord"], userToWord[loginController.getUsername(sid)]["matchLetter"]));
    }

});

app.post('/login', (req,res) => {
    const username = req.body.username.trim();
    const pickWord = wordList[Math.floor(Math.random() * wordList.length)];
    if(!username){
        res.status(400);
        loginController.setLoginErrorMsg("Please enter your username!");
    }
    else if(!/^[0-9a-zA-Z]*$/.test(username)) {
        res.status(400);
        loginController.setLoginErrorMsg("Username that is not made up of letters or numbers only!");
    }
    else if(username.toLowerCase() === "dog") {
        res.status(403);
        loginController.setLoginErrorMsg("You are human, not a dog!!");
    }
    else{
        const sid = uuidv4;
        loginController.setUsername(sid, username);
        if(!userToWord[loginController.getUsername(sid)]){
            userToWord[loginController.getUsername(sid)] = {};
            userToWord[loginController.getUsername(sid)].pickWord = pickWord;
            userToWord[loginController.getUsername(sid)].previousWord = [];
            userToWord[loginController.getUsername(sid)].matchLetter = 0;
            userToWord[loginController.getUsername(sid)].completeGuess = "";
            gameDataController.setGuessSuccess("");
            gameDataController.setGuessError("");
            gameDataController.setCompleteGuess(userToWord[loginController.getUsername(sid)]['completeGuess']);
            console.log("username: " + loginController.getUsername(sid) + " Word: " + pickWord); // console.log() the username and the chosen secret word whenever a new game is started for a player
        }
        res.cookie('sid',sid);
    }
    res.redirect('/');
});

app.post('/guess', (req,res) => {
    const sid = req.cookies.sid;
    const guessWord = req.body.guessWord;
    const newUsername = loginController.getUsername(sid);
    const pickedWord = userToWord[newUsername].pickWord;
    if(!sid) {
        res.send(loginController.newUserLogin());
    }
    else{
        if(!guessWord) {
            res.status(400);
            gameDataController.setGuessError("Please input the guess word!");
        }
        else if(!/^[a-zA-Z]*$/.test(guessWord)){
            res.status(400);
            gameDataController.setGuessError("Please input letter, not number or symbol!");
        }
        else {
            gameDataController.setGuessError("");
            userToWord[newUsername]["previousWord"].push(" " + guessWord + " ");
            userToWord[loginController.getUsername(sid)].matchLetter = guessController.gameCompare(pickedWord, guessWord);
            if(guessController.exactMatch(pickedWord, guessWord)){
                gameDataController.setGuessSuccess(`You matched -${pickedWord}- out of ${userToWord[newUsername]["previousWord"].length} times!`);
                userToWord[newUsername].completeGuess = "disabled";
                gameDataController.setCompleteGuess(userToWord[newUsername].completeGuess);
            }
        }
    }
    res.cookie('sid',sid);
    res.redirect('/');
});

app.post('/new-game', (req,res) => {
    const sid = req.cookies.sid;
    if(!sid){
        res.status(400);
        loginController.setLoginErrorMsg("Invalid session ID, please check again!");
    }
    else {
        const username = loginController.getUsername(sid);
        const newPickWord = wordList[Math.floor(Math.random() * wordList.length)];
        userToWord[username] = {};
        userToWord[username].pickWord = newPickWord;
        userToWord[username].previousWord = [];
        userToWord[username].matchLetter = 0;
        userToWord[username].completeGuess = "";
        gameDataController.setGuessSuccess("");
        gameDataController.setGuessError("");
        gameDataController.setCompleteGuess(userToWord[username].completeGuess);
        console.log("username: " + username + " Word: " + newPickWord); // console.log() the username and the chosen secret word whenever a new game is started for a player
    }
    res.cookie('sid',sid);
    res.redirect('/');
});

app.post('/logout', (req,res) => {
    const sid = req.cookies.sid;
    loginController.setLoginErrorMsg("");
    loginController.deleteUsername(sid);
    res.clearCookie('sid');
    res.redirect('/');
});


app.listen(PORT,() => console.log(`Working on http://localhost:${PORT}`));