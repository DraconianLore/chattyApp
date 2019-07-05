import React, { Component } from 'react';


function Message(props) {
    let colour = props.userColour;
    switch (props.type) {
        case "incomingMessage":
            return (
                <div className="message" style={{ borderColor: colour }}>
                    <span style={{ color: colour }} className="message-username" >{props.username}</span>
                    <span className="message-content">{props.content}</span>
                </div>
            );
        case "incomingLink":
            return (
                <div className="message" style={{ borderColor: colour }}>
                    <span style={{ color: colour }} className="message-username" >{props.username}</span>
                    <span className="message-content">Shared a link: <a href={props.content}>{props.content}</a></span>
                </div>
            );
        case "incomingNotification":
            return (
                <div style={{ color: colour }} className="message system">{props.content}</div>
            );
        case "incomingImage":
            return (
                <div style={{ backgroundColor: colour }} className="message meme">
                    <span style={{ color: 'white', backgroundColor: colour, borderColor: colour }} className="message meme" >{props.username} sent an image:</span>

                    <img src={props.content} className="posted-image" />
                </div>
            );
        case "incomingColourChange":
            return (
                <div style={{ color: props.newColour }} className="message system">
                    <span style={{ color: colour }}>🌈 {props.username} &nbsp;</span>
                    {props.content}</div>
            );
        default:
            break;
    }
}


export default Message;