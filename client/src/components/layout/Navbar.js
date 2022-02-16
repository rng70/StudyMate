import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">StudyMate</Link>
            </h1>
            <ul>
                <li>
                    <Link to="#">Channel</Link></li>
                <li>
                    <Link to="profiles.html">Forum</Link>
                </li>
                <li>
                    <Link to="/register">Register (Conditional)</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>
    )
}
