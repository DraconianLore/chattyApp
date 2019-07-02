import React, { Component } from 'react';
import Message from './Message.jsx';

function MessageList(props) {
        const posts = props.posts.map((post) => {
                return <Message key={post.id} type={post.type} content={post.content} username={post.username} />
        });    
        return (
            <main className="messages">
                    {posts}
                
            </main>
        );
    }


export default MessageList;