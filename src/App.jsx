import React, { Component } from 'react';

import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'Anonymous',
      messages: [
        {
          id: 1,
          type: "incomingMessage",
          content: "I won't be impressed with technology until I can download food.",
          username: "Anonymous1"
        },
        {
          id: 2,
          type: "incomingNotification",
          content: "Anonymous1 changed their name to nomnom",
        },
        {
          id: 3,
          type: "incomingMessage",
          content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
          username: "Anonymous2"
        },
        {
          id: 4,
          type: "incomingMessage",
          content: "...",
          username: "nomnom"
        },
        {
          id: 5,
          type: "incomingMessage",
          content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
          username: "Anonymous2"
        },
        {
          id: 6,
          type: "incomingMessage",
          content: "This isn't funny. You're not funny",
          username: "nomnom"
        },
        {
          id: 7,
          type: "incomingNotification",
          content: "Anonymous2 changed their name to NotFunny",
        },
      ]

    }
    this.postNewMessage = this.postNewMessage.bind(this);
    this.getNextID = this.getNextID.bind(this);
  }
  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = { id: 999999913, username: "Nima", content: "I'm in love with Kanye 😍", type: "incomingMessage" };
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages: messages })
    }, 6000);
  }
  getNextID() {
    return (this.state.messages.length + 1)
  }
  postNewMessage(message) {
    const addMessage = this.state.messages.concat(message);
    this.setState({ messages: addMessage })
  }

  render() {
    return (
      <div>
        <NavBar />
        <MessageList posts={this.state.messages} />
        <ChatBar username={this.state.currentUser} postMessage={this.postNewMessage} nextID={this.getNextID} />
      </div>
    );
  }
}
export default App;
