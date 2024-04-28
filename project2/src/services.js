import { setError } from "./state";
import render from "./render";
import { addChatList, setChatList, addUserList } from "./state";

export function fetchLogin(username) {
  return fetch('/api/session/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify( { username } ),
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if(!response.ok) {
          return response.json().then( err => Promise.reject(err) );
      }
      return response.json(); 
    });
};

export function fetchLogout() {
  return fetch('/api/session', {
    method: 'DELETE',
  })
  .catch( () => Promise.reject({ error: 'networkError' }) )
  .then( response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }) )
    .then( err => Promise.reject(err) );
  });
};

export function fetchStoredChats(state, appEl) {
  fetch('/api/chat/')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch chat');
    }
    return response.json();
  })
  .then(data => {
    setChatList(data.username, data.chat);
    addUserList(data.userList);
    render({state, appEl});
  })
  .catch(err => {
    setError(err?.error || 'ERROR');
    render({state, appEl});
  });
};

//polling part
// export function pollChat(state, appEl) {
//   fetchStoredChats(state,appEl);
//   setTimeout(pollChat, 5000);
// };

export function pollChat(state, appEl) {
  setInterval(() => {
    fetchStoredChats(state, appEl);
  }, 5000); 
}

export function fetchAddChat(chat) {
  return fetch('/api/chat/', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify( { chat } ),
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if(!response.ok) {  
        return response.json().then( err => Promise.reject(err) );
      }
      return response.json(); // happy status code means resolve with data from service
    });
};

export function fetchSession() {
  return fetch('/api/session', {
    method: 'GET',
  })
  .catch( () => Promise.reject({ error: 'networkError' }) )
  .then( response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }) )
    .then( err => Promise.reject(err) );
  });
}