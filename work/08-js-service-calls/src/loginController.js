import { fetchLogin, fetchWord } from "./services";
import state from "./state";
// import { renderLoginForm, renderLoginForm } from "./render";

const rootEl = document.querySelector('.main');
// Function to render the login form
function renderLoginForm() {
  return `
    <form class="login_form" id="login-form">
        <label class="login_label" for="username">Username:</label>
        <input class="input_username" type="text" id="username" name="username">
        <button class="login_btn" type="submit">Login</button>
    </form>
  `;
}

// Function to render the word view
function renderWordView() {
  return `
    <div class="main_data">
        <button class="logout_form" id="logout-btn">Logout</button>
        <h2 class="data_h2">Welcome, ${state.username}!</h2>
        <p class="word_show">Your stored word is: ${state.storedWord}</p>
        <form class="word_form" id="word_form">
            <label class="word_label" for="newWord">Input the new word: </label>
            <input class="word_input" name="newWord" id="newWord">
            <button class="word_btn" type="submit">Update</button> 
        </form> 
    </div>
  `;
}

// Function to handle login form submission
function handleLoginFormSubmit(event) {
  event.preventDefault();
  const username = document.querySelector('.input_username').value;
  fetchLogin(username)
    .then(data => {
      state.username = data.username;
      state.error = '';
      fetchStoredWord();
    })
    .catch(error => {
      state.error = error.error || 'An error occurred';
      rootEl.innerHTML = renderLoginForm();
    //   renderLoginForm();
    });
}

// Function to handle update word submission
function handleUpdateWord(event) {
    event.preventDefault();
    const newWord = document.querySelector('.word_input').value;
    console.log('word:' + newWord);
    fetchWord(newWord)
        .then(data => {
            state.storedWord = data.newWord;
            state.error = '';
            fetchStoredWord();
        })
        .catch(error => {
            state.error = error.error || 'An errir occurred';
            rootEl.innerHTML = renderWordView(state);
            // renderWordView();
        });
}

// Function to fetch the stored word for the logged-in user
function fetchStoredWord() {
  fetch('/api/word')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch stored word');
      }
      return response.json();
    })
    .then(data => {
      state.storedWord = data.storedWord;
      rootEl.innerHTML = renderWordView(state);
    })
    .catch(error => {
      state.error = error.message || 'An error occurred';
      rootEl.innerHTML = renderWordView();
    });
}

// Function to handle logout button click
function handleLogoutButtonClick() {
  fetch('/api/session', {
    method: 'DELETE',
  })
    .then(() => {
      state.username = '';
      state.storedWord = '';
      state.error = '';
      rootEl.innerHTML = renderLoginForm();
    //   renderLoginForm();
    })
    .catch(error => {
      state.error = error.message || 'An error occurred';
      rootEl.innerHTML = renderWordView(state);
    });
}

// Add event listeners
document.addEventListener('submit', event => {
  if (event.target.id === 'login-form') {
        handleLoginFormSubmit(event);
  }
});

document.addEventListener('click', event => {
  if (event.target.id === 'logout-btn') {
        handleLogoutButtonClick();
  }
});

document.addEventListener('submit', e => {
    if(e.target.id === 'word_form'){
        handleUpdateWord(e);
    }
});

// Initial page load logic
fetch('/api/session')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else if (response.status === 401) {
      throw new Error('User not logged in');
    } else {
      throw new Error('Failed to check session');
    }
  })
  .then(data => {
    state.username = data.username;
    fetchStoredWord();
  })
  .catch(error => {
    state.error = error.message || 'An error occurred';
    rootEl.innerHTML = renderLoginForm();
  });





