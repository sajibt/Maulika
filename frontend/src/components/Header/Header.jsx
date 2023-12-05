import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./Header.scss";
import { useState } from "react";
import { RiMenu4Fill, RiCloseFill, RiLogoutCircleRLine } from "react-icons/ri";
import Logout from "../Auth/Logout/Logout";

const Header = ({ isLoggedIn }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className={`header ${isOpen ? "menu-open" : ""}`}>
            <div className="header__logo">
                <Link to="/" className="header__logo-link">
                    <img src="/logo.jpg" alt="Maulika" />
                </Link>
            </div>

            <div
                className={`header__nav-toggle ${isOpen ? "menu-open" : ""}`}
                onClick={toggleMenu}
            >
                {isOpen ? <RiCloseFill /> : <RiMenu4Fill />}
            </div>

            <nav className={`header__nav ${isOpen ? "menu-active" : ""}`}>
                <ul className="header__nav-list">
                    <li className="header__nav-item">
                        <Link to="/cart" className="header__nav-link">
                            <span>
                                <AiOutlineShoppingCart />
                            </span>
                            Cart
                        </Link>
                    </li>
                    <li className="header__nav-item">
                        {isLoggedIn ? (
                            <Logout />
                        ) : (
                            <>
                                <Link to="/login" className="header__nav-link">
                                    <span>
                                        <RiLogoutCircleRLine />
                                    </span>
                                    Login
                                </Link>
                                <Link to="/signup" className="header__nav-link">
                                    <span>
                                        <RiLogoutCircleRLine />
                                    </span>
                                    Signup
                                </Link>
                            </>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
