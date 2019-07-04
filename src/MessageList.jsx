import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

        scrollToBottom() {
                this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        }
        componentDidUpdate() {
                this.scrollToBottom();
        }
        render() {
                const posts = this.props.posts.map((post) => {
                        return <Message key={post.id} type={post.type} content={post.content} username={post.username} userColour={post.colour} newColour={post.newColour}/>
                });

                return (
                        <main className="messages">
                                {posts}
                                <div ref={(el) => { this.messagesEnd = el; }}></div>
                        </main>
                );
        }
}


export default MessageList;