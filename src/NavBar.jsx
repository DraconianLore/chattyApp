import React, { Component } from 'react';


class NavBar extends Component {
    render() {
        return (
            <nav className="navbar">
                <a href="/" className="navbar-brand">Chatty</a>
                <span className="client-count">{this.props.clients} users connected</span>
            </nav>

        );
    }
}

export default NavBar;