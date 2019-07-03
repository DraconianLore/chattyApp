import React, { Component } from 'react';

class ChatBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: props.username,
            message: '',
            newUserName: props.username
        }
        this.changeUserName = this.changeUserName.bind(this);
        this.changeMessage = this.changeMessage.bind(this);
        this.checkKeypress = this.checkKeypress.bind(this);
        this.newUsername = this.newUsername.bind(this);
    }
    newUsername(event) {

        const newMessage = {
            id: Math.floor((Math.random() * 999999) + 1),
            type: "incomingNotification",
            content: `${this.state.userName} changed their name to ${this.state.newUserName}`,
        }
        this.setState({
            userName: event.target.value
        })
        this.props.postMessage(newMessage)
    }
    changeMessage(event) {
        this.setState({
            message: event.target.value
        })
    }
    changeUserName(event) {
        this.setState({
            newUserName: event.target.value
        })
    }
    checkKeypress(event) {
        if (event.key === 'Enter') {
            const newMessage = {
                id: Math.floor((Math.random() * 999999) + 1),
                type: "incomingMessage",
                content: this.state.message,
                username: this.state.userName
            }
            this.setState({
                message: ''
            })
            this.props.postMessage(newMessage)
        }
    }

    render() {
        return (
            <footer className="chatbar">
                <input className="chatbar-username" defaultValue={this.state.userName} onChange={this.changeUserName} onBlur={this.newUsername} />
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.message} onKeyPress={this.checkKeypress} onChange={this.changeMessage} />
            </footer>
        );

    }

}


export default ChatBar;