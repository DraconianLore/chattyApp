import React, { Component } from 'react';


function Message(props) {
    let colour = props.userColour;
    switch (props.type) {
        case "incomingMessage":
            return (
                <div className="message">
                    <span style={{ color: colour }} className="message-username" >{props.username}</span>
                    <span className="message-content">{props.content}</span>
                </div>
            );
        case "incomingNotification":
            return (
                <div style={{ color: colour }} className="message system">{props.content}</div>
            );
        case "incomingImage":
            return (
                <div style={{ color: colour }} className="message system">
                    <span style={{ color: colour }} className="message system" >{props.username} sent an image:</span>
                    
                    <img src={props.content} className="posted-image"/>
                </div>
            );
        default:
            break;
    }
}


export default Message;