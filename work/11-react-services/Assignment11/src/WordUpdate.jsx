import { useState } from "react";
import { MESSAGES } from "./constants";
import './WordUpdate.css';

function WordUpdate({updateWord, error}) {

    const [word, setWord] = useState('');
    const message = MESSAGES[error] || MESSAGES.default;

    const updateWordHTML = (
        <form className="word_form" id="word_form" onSubmit={ (e) => {
            e.preventDefault();
            setWord('');
            updateWord(word);
        }}>
            <label className="word_label" htmlFor="word">Word:</label>
            <input className="word_input" id="word" name="word" value={word} onChange={(e) => {
                setWord(e.target.value);
            }}/>
            <div className="error_message">{error && message}</div>
            <button type="submit" className="word_btn">Send</button>
        </form>
    );

    
return (
    <>
        {updateWordHTML}
    </>
)

}

export default WordUpdate;