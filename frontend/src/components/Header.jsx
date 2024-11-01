import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../redux/store';
import toast from 'react-hot-toast';

const Header = () => {
    // Accessing global state for login status
    let isLogin = useSelector((state) => state.isLogin);
    isLogin = isLogin || localStorage.getItem("userId");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuActive, setMenuActive] = useState(false); // State for mobile menu

    // Logout function
    const handleLogout = () => {
        try {
            dispatch(authActions.logout());
            localStorage.clear();
            toast.success('Logout successful!');
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    // Toggle menu for mobile view
    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    return (
        <header className="header">
            <nav className="navbar">
                <div className="navbar-logo">
                    <Link to="/">Blog APP</Link>
                </div>
                <ul className={`nav-links ${menuActive ? 'active' : ''}`}>
                    {isLogin && (
                        <>
                            <li><Link to="/my-blogs">My Blogs</Link></li>
                            <li><Link to="/create-blog">Create Blog</Link></li>
                        </>
                    )}
                    {!isLogin && (
                        <>
                            <li><Link to="/register">Register</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </>
                    )}
                    {isLogin && (
                        <li>
                            <button onClick={handleLogout} className="logout-button">Logout</button>
                        </li>
                    )}
                </ul>
                <div className="menu-toggle" onClick={toggleMenu}>
                    <i className="fas fa-bars"></i>
                </div>
            </nav>
        </header>
    );
};

export default Header;
