const uuidv4 = require('uuid').v4;
const loginController = require('./loginController');

const gameDataController = {

    storeWord: { },

    guessSuccess: " ",
    guessError: " ",
    completeGuess: "",

    existUserLogin: function(sid, previousWordList, matchNum) {

        const loginUsername = loginController.getUsername(sid);
        this.storeWord[loginUsername] = previousWordList;

        return`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Data page</title>
                <link rel="stylesheet" href="game_styles.css">
            </head>
            <body>
                <form class="logout_form" action="/logout" method="POST">
                    <button class="logout_btn" type="submit">Logout</button>
                </form>
                <h1 class="data_h1">Welcome, ${loginUsername}!</h1>
                <div class="main_data">
                    <form class="newGame_form" action="/new-game" method="POST">
                        <button class="newGame_btn" type="submit">New Game</button>
                    </form>
                    <p class="word_show">Guess Word:  ${previousWordList}</p>
                    <p class="match_letter">Match Letter: ${matchNum}</p>
                    <form class="guess_form" action="/guess" method="POST">
                        <label class="guess_label" for="guessWord">
                            <span class="guess_span">Input the guess word: </span>
                        </label>
                        <input class="guess_input" name="guessWord" id="guessWord">
                        <span class="guess_error">${this.guessError}</span>
                        <span class="guess_success">${this.guessSuccess}</span> 
                        <button class="guess_btn" type="submit" ${this.completeGuess}>Guess</button>
                    </form>
                </div>
            </body>
            </html>
        `;
    },

    setCompleteGuess: function(complete){
        this.completeGuess = complete;
    },

    setStoreWord: function(username, previousWordList) {
        this.storeWord[username] = previousWordList;
    },

    getStoreWord: function(username) {
        return this.storeWord[username];
    },

    setGuessSuccess: function(successWord) {
        this.guessSuccess = successWord;
    },

    setGuessError: function(errorText) {
        this.guessError = errorText;
    }
};

module.exports = gameDataController;