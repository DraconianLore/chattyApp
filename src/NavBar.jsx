import React, { Component } from 'react';


class NavBar extends Component {
    render() {
        return (
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty</a>
                <span className="client-count">Users connected: <strong>{this.props.clients}</strong></span>
            </nav>

        );
    }
}

export default NavBar;