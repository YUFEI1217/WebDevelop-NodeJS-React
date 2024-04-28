import { useState } from "react";
import Compare from "./Compare";
import Footer from "./Footer";
import './Game.css';

function Game({username, setIsLoggedIn}) {

    const [word, setWord] = useState('');
    const [isInvalidWord, setIsInvalidWord] = useState(false);
    const [isCorrectWord, setIsCorrectWord] = useState(false);
    const [matchLetter, setMatchLetter] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const secretWord = "RECAT";
    

    const validateWord = () => {
        
        const InvalidWord = word.length !== 5;
        const CorrectWord = Compare.exactMatch(secretWord, word);;
        const match = Compare.gameCompare(secretWord, word);

        setIsInvalidWord(InvalidWord);
        setIsCorrectWord(CorrectWord);
        setMatchLetter(match);

        console.log("match::" + match);

        if(InvalidWord) {
            setErrorMessage(word + '  was not a valid word ');
        }
        else if(CorrectWord) {
            setErrorMessage(word + ' is the secret word!');
        }
        else if(!InvalidWord && !CorrectWord) {
            setErrorMessage(word + ' had ' + matchLetter + ' letters in common');
        }
    };
    

    const wordHtml = (
        <div className="word_div">
            <button className="logout_btn" id="logout_btn" onClick={() => setIsLoggedIn(false)}>Logout</button>
            <h2 className="data_h2">Welcome, {username}!</h2>
            <p className="word_show">Your input word is:  <span className="guess_word">{word}</span> </p>
            <form className="word_form" id="word_form">
                <label className="word_label" htmlFor="word">Word:</label>
                <input className="word_input" id="word" name="word" value={word} onInput={(e) => {
                    setWord(e.target.value);
                }}/>
                <span className="word_error">{errorMessage}</span>
                {/* {isCorrectWord && <span className="word__error">{word} is the secret word!</span>}
                {!isInvalidWord && !isCorrectWord && <span className="word__error">{word} had {matchLetter} letters in common</span>}
                {isInvalidWord && <span className="word_error">{word} was not a valid word</span>} */}
                <button type="button" className="word_btn" onClick={validateWord}>Send</button>
            </form>
        </div>
    );

    return (
        <>
            {wordHtml}
            <Footer/>
        </>
    );
    
};

export default Game;