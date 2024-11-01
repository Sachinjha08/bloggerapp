import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-columns">
                    <div className="footer-column">
                        <h4>About Us</h4>
                        <p>Sharing the best content for our readers. Stay connected with our blog!</p>
                    </div>
                    <div className="footer-column">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/login">login</a></li>
                            <li><a href="/register">Regiter</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>Follow Us</h4>
                        <div className="social-icons">
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon">
                                <FaFacebookF />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon">
                                <FaTwitter />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon">
                                <FaInstagram />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>2024 BlogApp.<span> &copy; All Rights Reserved.</span></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
