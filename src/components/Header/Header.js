import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'
const Header = () => {
    return (
        <header className="header sticky">
            <nav className="navbar" id="nav-bar">
                <Link to="/" className="nav-logo">MovieFlix</Link>
            </nav>
        </header>
    )
}

export default Header
