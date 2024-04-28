import { MESSAGES } from './constants';


const state = {
    userList: [],
    chatList: [],
    username: "",
    error: "",
    isLoggedIn: "",
};

export function addUserList(usernameList) {
    state.userList = usernameList;
};

export function addChatList(username, chat) {
    state.chatList.push(username + ": " + chat);
    state.error = "";
    state.isLoggedIn = true;
};

export function setChatList(username, chatList) {
    state.chatList = chatList;
    state.username = username;
    state.error = "";
    state.isLoggedIn = true;
}

export function login(username) {
    state.username = username;
    state.isLoggedIn = true;
    state.error = "";
};

export function logout() {
    state.isLoggedIn = false;
    state.username = '';
    state.error = '';
};

export function setError(error) {
    if(!error) {
        state.error = '';
        return;
    }
    state.error = MESSAGES[error] || MESSAGES.default;
};


export default state;

