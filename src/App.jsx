import React, { Component } from 'react';

import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

const animals = require('./animals.json');
const colours = require('./colours.json');
function randomizer(randomType) {
  return (randomType[Math.floor(Math.random() * randomType.length)]);
}
let chattyServer;

// set up notificatioins

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'Anonymous ' + randomizer(animals),
      userColour: randomizer(colours),
      messages: [],
      clients: 0
    }
    this.postNewMessage = this.postNewMessage.bind(this);
    this.updateMessages = this.updateMessages.bind(this);
    this.changeColour = this.changeColour.bind(this);
  }
  connectToServer() {
    chattyServer = new WebSocket('ws://localhost:3001/');
    chattyServer.onopen = (event) => {
      console.log('connected to server');
    }
    chattyServer.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      switch (msg.type) {
        case "incomingMessage":
          if (msg.username !== this.state.currentUser) {
            this.sendNotification(msg);
          }
        case "incomingNotification":
        case "incomingImage":
        case "incomingColourChange":
        case "incomingLink":
          this.updateMessages(msg);
          break;
        case "dataUpdate":
          this.setState({ clients: msg.clientNumber })
          break;
        default:
          break;
      }
    }
    chattyServer.onclose = () => {
      chattyServer.close();
      console.log("Server disconnected: attempting to reconnect")
      setTimeout(() => {
        console.log('Attempting to reconnect to server...');
        this.connectToServer();
      }, 5000);
    }

  }


  componentDidMount() {
    // connect to Chatty App Server
    this.connectToServer();
    setTimeout(() => {
      const newMessage = {
        type: "incomingNotification",
        content: `🔵 ${this.state.currentUser} joined the chat!`,
      }
      this.postNewMessage(newMessage)
    }, 1000);

    if (Notification.permission !== "granted") {
      Notification.requestPermission(function (permission) {
      })
      }

    window.addEventListener("beforeunload", () => {
      const newMessage = {
        type: "incomingNotification",
        content: `➖ ${this.state.currentUser} left the chat!`,
      }
      this.postNewMessage(newMessage);
    });

  }

  sendNotification(msg) {
    const img = "https://logopond.com/logos/b3a58f13a7a17005e7bd8e8785b2d2b3.png";
    const text = msg.username + ' posted a message';
    if (Notification.permission === "granted") {
      const notification = new Notification('Chatty App', { body: text, icon: img });
    }

  }


  changeColour(col) {
    this.setState({ userColour: col })
  }

  updateMessages(message) {
    const addMessage = this.state.messages.concat(message);
    this.setState({ messages: addMessage })
  }
  postNewMessage(message) {
    //send message to server
    message.colour = this.state.userColour;
    const messageJson = JSON.stringify(message);
    chattyServer.send(messageJson);
  }


  render() {
    return (
      <div>
        <NavBar clients={this.state.clients} />
        <MessageList posts={this.state.messages} />
        <ChatBar username={this.state.currentUser} postMessage={this.postNewMessage} colour={this.state.userColour} palet={colours} changeColour={this.changeColour} />
      </div >
    );
  }
}
export default App;
