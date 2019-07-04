import React, { Component } from 'react';

import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
let chattyServer;

const animals = require('./animals.json');
const colours = require('./colours.json');
function randomizer(randomType) {
  return (randomType[Math.floor(Math.random() * randomType.length)]);
}

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
    chattyServer = new WebSocket('ws://192.168.88.215:3001/');
    chattyServer.onopen = (event) => {
      console.log('connected to server');
    }
    chattyServer.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      switch (msg.type) {
        case "incomingMessage":
          this.updateMessages(msg);
          break;
        case "incomingNotification":
          this.updateMessages(msg);
          break;
        case "dataUpdate":
          this.setState({ clients: msg.clientNumber })
          break;
        case "incomingImage":
          this.updateMessages(msg);
          break;
        case "incomingColourChange":
          this.updateMessages(msg);
          break;
        default:
          break;
      }
    }
    chattyServer.onclose = () => {
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

    window.addEventListener("beforeunload", () => {
      const newMessage = {
        type: "incomingNotification",
        content: `➖ ${this.state.currentUser} left the chat!`,
      }
      this.postNewMessage(newMessage);
    });

  }
  componentWillUnmount() {
    
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
      </div>
    );
  }
}
export default App;
