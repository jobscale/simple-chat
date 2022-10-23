const socket = io();
const messages = document.getElementById('messages');

(function () {
  $('form').submit((e) => {
    const li = document.createElement('li');
    e.preventDefault(); // prevents page reloading
    socket.emit('chat message', $('#message').val());

    messages.appendChild(li).append($('#message').val());
    const span = document.createElement('span');
    messages.appendChild(span).append('by ' + 'Anonymous' + ': ' + 'just now');

    $('#message').val('');

    return false;
  });

  socket.on('received', data => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const messages = document.getElementById('messages');
    messages.appendChild(li).append(data.message);
    messages.appendChild(span).append('by ' + 'anonymous' + ': ' + 'just now');
    console.log('Hello bingo!');
  });
}());

// fetching initial chat messages from the database
(function () {
  fetch('/chats')
  .then(data => data.json())
  .then(json => {
    json.map(data => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      messages.appendChild(li).append(data.message);
      messages
      .appendChild(span)
      .append(`by ${data.sender}: ${formatTimeAgo(data.createdAt)}`);
    });
  });
}());

// is typing...

const messageInput = document.getElementById('message');
const typing = document.getElementById('typing');

// isTyping event
messageInput.addEventListener('keypress', () => {
  socket.emit('typing', { user: 'Someone', message: 'is typing...' });
});

socket.on('notifyTyping', data => {
  typing.innerText = `${data.user} ${data.message}`;
  console.log(data.user + data.message);
});

// stop typing
messageInput.addEventListener('keyup', () => {
  setTimeout(() => socket.emit('stopTyping', ''), 2000);
});

socket.on('notifyStopTyping', () => {
  typing.innerText = '';
});
