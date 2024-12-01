import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {
  const { getTotalQuantity } = useContext(StoreContext);
  const totalQuantity = getTotalQuantity();

  const [menu, setMenu] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // Simulated login success handler (Replace with actual login logic)
  const handleLoginSuccess = (name) => {
    setUserName(name);
    setIsLoggedIn(true);
  };

  // Handle logout
  const handleLogout = () => {
    setUserName("");
    setIsLoggedIn(false);
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <Link
          to="/menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </Link>
        <Link
          to="/mobile-app"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Mobile App
        </Link>
        <Link
          to="/contact-us"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </Link>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search_icon" />
        <div className="navbar-basket-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="basket_icon" />
          </Link>
          <div className={totalQuantity > 0 ? "dot" : "dotHidden"}>
            <p>{totalQuantity}</p>
          </div>
        </div>
        {!isLoggedIn ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className="user-info">
            <span>Welcome, {userName}</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
