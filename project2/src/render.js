function render({ state, appEl }) {
  const html = `
   <div class="main_div">
     ${generateStatusHtml( state )}
     ${ renderLoginForm( state ) }
     ${ renderContent( state ) }
   </div>
  `;
  appEl.innerHTML = html;
}

function generateStatusHtml( state ) {
  return `
      
  `;
}

function renderLoginForm(state) {
  if(state.isLoggedIn) {
    return ``;
  }
  return `
  <form class="login_form" id="login_form">
      <label class="login_label" for="username">Username:</label>
      <input class="input_username" type="text" id="username" name="username">
      <div class="err_status">${state.error}</div>
      <button class="login_btn" type="submit">Login</button>
  </form>
  `;
};

function renderContent(state) {
  if(!state.isLoggedIn) {
    return ``;
  }
  return `
  <div class="content">
      <button class="logout_btn" id="logout_btn">Logout</button>
      <h2 class="chat_h2">Welcome, ${state.username}!</h2>
      <div class="list_part">
        <div class="userlist_div">
          <h3 class="userlist_h3">User List:</h3>
          <ul class="user_list">${generateUserList(state)}</ul>
        </div>
        <div class="chatlist_div">
          <h3 class="chats_h3">Chats Message:</h3>
          <ul class="chats">${generateChatsHtml( state )}</ul>
        </div>
      </div>
      <form class="add_form" id="add_form">
          <label class="input_label" for="chat">Message:</label>
          <input class="input_chat" id="chat" name="chat">
          <div class="err_status">${state.error}</div>
          <button type="submit" class="send_btn">Send</button>
      </form>
  </div>
  `
};

function generateChatsHtml( state ) {
  const chatHtml = Object.values(state.chatList).map(chat => {
      return `
      <li class="chat_item">
          <span class="chat_message">${chat}</span>
      </li>
      `
  }).join('');
  return chatHtml;
};

function generateUserList(state) {
  const userHtml = Object.values(state.userList).map(user => {
      return `
      <li class="user_item">
          <span class="users_name">${user}</span>
      </li>
      `
  }).join('');
  return userHtml;
};

export default render;