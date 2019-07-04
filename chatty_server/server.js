const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Chatty App server listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

let connectedClients = 0;



wss.broadcast = (message) => {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  })
}

function sendClients() {
  checkConnections();
  const dataPush = {
    type: "dataUpdate",
    clientNumber: connectedClients
  }
  wss.broadcast(dataPush);
}
function checkConnections() {
  let count = 0;
  wss.clients.forEach(function each(client) {
    count++;
    // clear disconnected clients
    if (client.readyState !== WebSocket.OPEN) {
      connectedClients--;
      console.log('Client terminated')
      client.terminate;
    }
  });
  connectedClients = count;
}
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  sendClients();
  console.log('Connected clients:', connectedClients)
  ws.on('message', function incoming(data) {
    const message = JSON.parse(data);
    message.id = uuidv4();
    wss.broadcast(message);
  })
    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => {
    sendClients();
  });
})

