// This object has methods that produce HTML
// - These methods are passed data used to produce the HTML
// - In this case, they are passed the model

const chatWeb = {
  // chatPage() returns the HTML for the page
  // it calls the other methods to generate the HTML for different sections
  chatPage: function(chat) {
    // Fill in/modify anything below!
    return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
          <link rel="stylesheet" href="styles.css">
        </head>
        <body>
          <div id="chat-app">
            ${chatWeb.getUserList(chat)}
            ${chatWeb.getMessageList(chat)}
            ${chatWeb.getOutgoingSection(chat)}
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function(chat) {
    return `<ol class="messages">` +
      // Fill in
      // Generate the HTML for the list of messages
      Object.values(chat.messages).map( (message, addMessage) =>`
      <li>
        <div class="message">
          <div class="sender-info">
            <span class="username">${message.sender}</span>
          </div>
          <p class="message-text">${message.text}</p>
        </div>
      </li>
      `).join('') +
      `</ol>`;
  },
  getUserList: function(chat) {
    // This is a bit of a complex structure
    // Lookup Object.values() in MDN
    // .map() generates a new array based on calling the callback
    // on each element of the array
    // So this .map() converts the user names to an array of HTML
    // and .join() converts the array of HTML into a single HTML string
    return `<ul class="users">` +
    Object.values(chat.users).map( user => `
      <li>
        <div class="user">
          <span class="username">${user}</span>
        </div>
      </li>
    `).join('') +
    `</ul>`;
  },
  getOutgoingSection: function() {
    // Fill in
    // Generate the HTML for a form to send a message
    return `
    <div class="outgoing">
      <form class="outgoing__form" action="/chat" method="POST">
        <input type="hidden" name="username" value="Amit"/>
        <label for="text">Message(Amit):</label>
        <input class="to-send" id="text" name="text" placeholder="Enter message to send"/>
        <button type="submit">Send</button>
      </form>
      <form action="/chat" method="POST">
        <input class="outgoing__form" type="hidden" name="username" value="Bao"/>
        <label for="text">Message(Bao):</label>
        <input class="to-send" id="text" name="text" placeholder="Enter message to send"/>
        <button type="submit">Send</button>
      </form>
    </div>
    `
  }
};
module.exports = chatWeb;
