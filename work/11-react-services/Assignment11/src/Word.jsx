import { useState } from "react";
import Footer from "./Footer";
import './Word.css';
import Loading from "./Loading";

function Word({ username, word, error, isWordPending, onLogout}) {

    const SHOW = {  // a constant used only in this component
        PENDING: 'pending',
        WORD: 'word',
    };

    let show;

    if(isWordPending) {
        show = SHOW.PENDING;
    }
    else {
        show = SHOW.WORD;
    }
    

    const wordHtml = (
        <div className="word_div">
            {show === SHOW.PENDING && <Loading/>}
            {show === SHOW.WORD && (
                <>
                <button className="logout_btn" id="logout_btn" onClick={onLogout}>Logout</button>
                <h2 className="data_h2">Welcome, {username}!</h2>
                <p className="word_show">Your input word is:  <span className="guess_word">{word}</span> </p>
                </>
            )}
            
        </div>
    );

    return (
        <>
            {wordHtml}
        </>
    );
    
};

export default Word; 