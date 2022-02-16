import React from 'react'

export const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
            <h1>
                <a href="index.html">StudyMate</a>
            </h1>
            <ul>
                <li>
                    <a href="profiles.html">Channel</a></li>
                <li>
                    <a href="profiles.html">Forum</a></li>
                <li>
                    <a href="register.html">Register (Conditional)</a></li>
                <li>
                    <a href="login.html">Login</a></li>
            </ul>
        </nav>
    )
}
