import { SERVER, CLIENT } from './constants';
import state, {addUserList, addChatList, login, logout, setError, setChatList} from './state';
import {fetchLogin, fetchLogout, fetchStoredChats, fetchAddChat, pollChat, fetchSession} from './services';
import render from './render';
import {addAbilityToLogin, addAbilityToAddChat, handleLogoutButtonClick} from './listeners';

const appEl = document.querySelector('.main');
render({ state, appEl });
addAbilityToLogin({ state,  appEl });
handleLogoutButtonClick({ state, appEl });
addAbilityToAddChat({ state, appEl });
checkForSession();

function checkForSession() {
    fetchSession()
    .then(session => {
        login(session.username);
        render({ state, appEl });
        return pollChat(state, appEl);
    })
    .catch(err => {
        if (err?.error === SERVER.AUTH_MISSING) {
            logout(); // User not logged in, no need to report this error
            render({ state, appEl }); // Render without showing the login form
            return;
        }
        return Promise.reject(err); // Pass other errors through for reporting
    });
}