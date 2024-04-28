const users = {};
const userChatList = [];
const usernameList = [];

function isValidUsername(username) {
    let isValid = true;
    isValid = isValid && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
}

function addNewUsernameChatList(username) {
    usernameList.push(username);
}

function addUsernameChat(username, chat){
    userChatList.push(username + ": " + chat);
}

function getUsernameList() {
    return usernameList;
}

function getUsernameChat() {
    return userChatList;
}

function getUsername(username) {
    return users[username];
}

module.exports = {
    isValidUsername,
    addNewUsernameChatList,
    addUsernameChat,
    getUsernameChat,
    getUsernameList,
    getUsername,
    users,
};