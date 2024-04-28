import Footer from "./Footer";
import { useState} from 'react';
import './Login.css';

function Login({username, setUsername, setIsLoggedIn}) {

    const [usernameIsMissing, setUsernameIsMissing] = useState(false);
    const [usernameIsDog, setUsernameIsDog] = useState(false);
    const [invalidUsername, setInvalidUsername] = useState(false);

    

    const validateUsername = () => {
        
        const isUsernameMissing = username.length === 0;
        const isUsernameDog = username.toLowerCase() === "dog";
        const isInvalidUsername = !/^[0-9a-zA-Z]*$/.test(username);

        setUsernameIsMissing(isUsernameMissing);
        setUsernameIsDog(isUsernameDog);
        setInvalidUsername(isInvalidUsername);

        if(isUsernameMissing === false && isUsernameDog === false && isInvalidUsername === false) {
            setIsLoggedIn(true);
        }
        else {
            setIsLoggedIn(false);
        }
    };
    




    const loginForm = (
        <div className="login_div">
            <form className="login_form">
                <label className="login_label" htmlFor="username">Username:</label>
                <input className="input_username" type="text" id="username" value={username} onInput={(e) =>{
                    setUsername(e.target.value);
                }}/>
                {usernameIsMissing && <span className="login__error">Username is required</span>}
                {usernameIsDog && <span className="login__error">That is not a valid username</span>}
                {invalidUsername && <span className="login__error">Please enter a valid (letters and/or numbers) username</span>}
                <button className="login_btn" type="button" onClick={validateUsername}>Login</button>
            </form>
        </div>
    );

    const footerHtml = (
        <footer className="footer">
            <p className='privacy'>Privacy Police</p>
        </footer>
    );

    return (
        <>  
            <header className="header">
                <h2 className="head_h2">
                    Login
                </h2>
            </header>
            {loginForm}
            <Footer/>
        </>
        
        
    );
}

export default Login;

    // function validateUsername(username) {
        // setInvalidUsername(!/^[0-9a-zA-Z]*$/.test(username));
        // setUsernameIsDog((username.toLowerCase() === "dog"));
        // setUsernameIsMissing(username.length === 0);
        // console.log(usernameIsMissing);
        // console.log(usernameIsDog);
        // console.log(invalidUsername);
    // };

    // if(username.toLowerCase() === "dog") {
        //     setUsernameIsDog(true);
        // }
        // if(!/^[0-9a-zA-Z]*$/.test(username)) {
        //     setInvalidUsername(true);
        // }
        // if(username.length === 0) {
        //     setUsernameIsMissing(true);
        // }