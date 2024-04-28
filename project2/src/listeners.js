import {addUserList, addChatList, login, logout, setError} from './state';
import {fetchLogin, fetchLogout, fetchStoredChats, fetchAddChat, pollChat} from './services';
import render from './render';


export function addAbilityToLogin({ state,  appEl }) {
  appEl.addEventListener('submit', (e) => {
    if(!e.target.classList.contains('login_form')) {
      return;
    }
    e.preventDefault();
    const username = document.querySelector('.input_username').value;
    fetchLogin(username)
        .then(data => {
            login(data.username);
            addUserList(data.existUser);
            fetchStoredChats(state, appEl);
        })
        .catch(err =>{
            setError(err?.error || 'ERROR');
            render({state, appEl});
        });
  });
};

export function addAbilityToAddChat({ state,  appEl }) {
  appEl.addEventListener('submit', (e) => {
    if(!e.target.classList.contains('add_form')) {
      return;
    }
    e.preventDefault();
    const newChat = document.querySelector('.input_chat').value;
    fetchAddChat(newChat)
        .then(data => {
            addChatList(data.username, data.chat);
            fetchStoredChats(state, appEl);
        })
        .catch(err => {
            setError(err?.error || 'ERROR');
            render({state, appEl});
        })
    });
};

export function handleLogoutButtonClick({ state,  appEl }) {
  appEl.addEventListener('click', (e) => {
    if(!e.target.classList.contains('logout_btn')) {
      return;
    }
    logout();
    render({ state, appEl });
    fetchLogout() // We don't really care about results
    .catch( err => {
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
      render({ state, appEl });
    });
  });
};