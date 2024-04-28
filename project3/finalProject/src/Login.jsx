import { useState} from 'react';
import './Login.css';
import { MESSAGES } from "./constants";

function Login({onLogin, error}) {

    const [username, setUsername] = useState('');
    const message = MESSAGES[error] || MESSAGES.default;
    
    const loginForm = (
        <div className="login_div">
            <form className="login_form" onSubmit={ (e) => {
                e.preventDefault();
                if(username) {
                    onLogin(username);
                }
            }}>
                <label className="login_label" htmlFor="username">Username:</label>
                <input className="input_username" type="text" id="username" value={username} onInput={(e) =>{
                    setUsername(e.target.value);
                }}/>
                <div className="error_message">{error && message}</div>
                <button className="login_btn" type="submit">Login</button> 
            </form>
        </div>
    );

    return (
        <>  
            <header className="login_header">
                <h2 className="login_head_h2">
                    Login
                </h2>
            </header>
            {loginForm}
        </>
        
        
    );
}

export default Login;