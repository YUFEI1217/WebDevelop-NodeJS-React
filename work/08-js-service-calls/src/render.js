// Function to render the login form
export function renderLoginForm() {
    return `
      <form id="login-form">
          <label class="login_label" for="username">Username:</label>
          <input class="input_username" type="text" id="username" name="username">
          <button class="login_btn" type="submit">Login</button>
      </form>
    `;
};
  
// Function to render the word view
export function renderWordView(state) {
    return `
        <div class="word_view">
            <button class="logout_form" id="logout-btn">Logout</button>
            <h1 class="data_h1">Welcome, ${state.username}!</h1>
            <p>Your stored word is: ${state.storedWord}</p>
            <form class="word_form" id="word_form">
                <label class="word_label" for="newWord">Input the new word: </label>
                <input class="word_input" name="newWord" id="newWord">
                <button class="word_btn" type="submit">Update</button> 
            </form> 
        </div>
    `;
};