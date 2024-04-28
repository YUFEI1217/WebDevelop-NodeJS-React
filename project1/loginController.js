const uuidv4 = require('uuid').v4;

const loginController = {
    
    loginUserData : {},

    loginErrorMsg: "",

    // loginUser_nameToword: {},

    newUserLogin: function() {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Login in page</title>
            <link rel="stylesheet" href="login_styles.css">
        </head>
        <body>
            <h1 class="login_h1">Login page</h1>
            <form class="login_form" action="/login" method="POST">
                <label class="login_label" for="username">
                    <span class="label_span">Username</span>
                </label>
                <input class="input_username" id="username" type="text" name="username">
                <span class="login_error">${this.loginErrorMsg}</span>
                <button class="login_btn" type="submit">Login</button>
            </form>
        </body>
        </html>
        `;
    },

    setLoginErrorMsg: function(errorReport) {
        this.loginErrorMsg = errorReport;
    },

    setUsername: function(sid, username) {
        this.loginUserData[sid] = username;
    },

    getUsername: function(sid) {
        return this.loginUserData[sid];
    },

    deleteUsername: function(sid) {
        delete this.loginUserData[sid];
    }
};

module.exports = loginController;