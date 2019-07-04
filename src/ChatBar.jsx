import React, { Component } from 'react';
const emojiJson = require ('./emojis.json');

class ChatBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: props.username,
            message: '',
            newUserName: props.username,
            colour: props.colour,
            colourPalet: false,
            imageUrlBar: false,
            emojiList: false
        }
        this.changeUserName = this.changeUserName.bind(this);
        this.changeMessage = this.changeMessage.bind(this);
        this.checkKeypress = this.checkKeypress.bind(this);
        this.newUsername = this.newUsername.bind(this);
        this.colourPalet = this.colourPalet.bind(this);
        this.changeColour = this.changeColour.bind(this);
        this.addImage = this.addImage.bind(this);
        this.addEmoji = this.addEmoji.bind(this);
        this.emojiPicker = this.emojiPicker.bind(this);
        this.closeAll = this.closeAll.bind(this);
        this.postImage = this.postImage.bind(this);
    }
    closeAll() {
        this.setState({
            colourPalet: false,
            imageUrlBar: false,
            emojiList: false
        })
    }
    colourPalet(event) {
        event.preventDefault();
        if (this.state.colourPalet) {
            this.closeAll();
        } else {
            this.setState({ 
                colourPalet: true,
                imageUrlBar: false,
                emojiList: false
            
            })
        }
    }
    changeColour(event) {
        let col = event.target.style.backgroundColor
        event.preventDefault();
        this.props.changeColour(col);
        this.setState({
            colour: col,
            colourPalet: false
        })
        const newMessage = {
            type: "incomingColourChange",
            content: ` changed their colour!`,
            newColour: col,
            username: this.state.userName
        }
        this.props.postMessage(newMessage)
    }
    addImage(event) {
        event.preventDefault();
        if (this.state.imageUrlBar) {
            this.closeAll();
        } else {
            this.setState({ 
                imageUrlBar: true,
                colourPalet: false,
                emojiList: false
            })
        }
    }
    postImage(event) {
        event.preventDefault();
        const newMessage = {
            type: "incomingImage",
            content: event.target.imageURL.value,
            username: this.state.userName
        }
        this.props.postMessage(newMessage)
        this.setState({imageUrlBar: false})
    }
    newUsername(event) {
        let newName = event.target.value;
        if (newName === '') {
            event.target.value = 'Anonymous';
            this.setState({ userName: 'Anonymous' });
            newName = 'Anonymous';
        }
        if (this.state.userName === newName) {
            return;
        }
        const newMessage = {
            type: "incomingNotification",
            content: `👀 ${this.state.userName} changed their name to ${newName}`,
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
    emojiPicker(event) {
        if(this.state.emojiList) {
            this.closeAll();
        } else {
            this.setState({
                emojiList: true,
                colourPalet: false,
                imageUrlBar: false
            })
        }
    }
    addEmoji(event) {
        event.preventDefault();
        let emoji = event.target.text;
        this.setState((state, props) => {
            let addedEmoji = state.message + ' ' + emoji;
            return {
            message: addedEmoji,
            emojiList: false
            }
        })
        this.chatInput.focus();
    }
    checkKeypress(event) {
        if (event.key === 'Enter') {
            let newMessage;
            if (this.state.message.length < 1) {
                return;
            }
            if(this.state.message.slice(0,3) === '/me') {
                newMessage = {
                    "type": "incomingNotification",
                    "content": this.state.userName + ' ' + this.state.message.slice(4)
                }
            } else {
                newMessage = {
                    "type": "incomingMessage",
                    "content": this.state.message,
                    "username": this.state.userName
                }
            }
            this.setState({
                message: ''
            })
            this.props.postMessage(newMessage)
        }
    }
    
    render() {
        const rainbow = this.props.palet.map((col) => {
            return <button key={col} type="button" style={{ backgroundColor: col }} className="colour-button" onClick={this.changeColour}></button>
        })
        const emojiBar = emojiJson.map((emo) => {
            return <a href={emo} key={emo} onClick={this.addEmoji}>{emo}</a>
        });
        const addImageInput = (
            <form onSubmit={this.postImage}>
                <h1>Send a Meme</h1>
                <input type="text" name="imageURL" placeholder="Enter image URL"></input>
                <button type="submit" className="btn-new-image">POST</button>    
            </form>
        )
       
        return (
            <footer className="chatbar">
                {this.state.colourPalet && <div className="colour-palet">{rainbow}</div>}
                <button type="button" style={{ backgroundColor: this.state.colour }} className="colour-button" onClick={this.colourPalet}></button>
                <input className="chatbar-username" defaultValue={this.state.userName} onChange={this.changeUserName} onBlur={this.newUsername} onFocus={this.closeAll} />
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" ref={(el) => { this.chatInput = el; }} value={this.state.message} onFocus={this.closeAll} onKeyPress={this.checkKeypress} onChange={this.changeMessage} />
                <button className="colour-button emoji-button" onClick={this.emojiPicker}>😀</button>
                <button className="colour-button"><i className="far fa-image" onClick={this.addImage}></i></button>
                {this.state.imageUrlBar && <div className="image-input">{addImageInput}</div>}
                {this.state.emojiList && <div className="emoji-bar">{emojiBar}</div>}
                
            </footer>
        );

    }

}


export default ChatBar;