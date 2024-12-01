import React, { useState } from "react";
import axios from "axios";
import "./LoginPopup.css";

const LoginPopup = ({ setShowLogin, setUser }) => {
  const [currentState, setCurrentState] = useState("Sign up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    const endpoint = currentState === "Sign up" ? "/signup" : "/signin";
    const data = currentState === "Sign up" ? { name, email, password } : { email, password };

    try {
      const response = await axios.post(`http://localhost:5000${endpoint}`, data, {
        headers: { "Content-Type": "application/json" },
      });

      if (currentState === "Sign up") {
        setCurrentState("Login");
      } else {
        setWelcomeMessage(`Welcome, ${response.data.user.name}!`);
        setUser(response.data.user);
        setShowLogin(false);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-popup">
      {welcomeMessage ? (
        <div className="welcome-message">
          <h2>{welcomeMessage}</h2>
        </div>
      ) : (
        <form className="login-popup-container" onSubmit={handleSubmit}>
          <div className="login-popup-title">
            <h2>{currentState}</h2>
            <button type="button" onClick={() => setShowLogin(false)}>
              &times;
            </button>
          </div>
          <div className="login-popup-inputs">
            {currentState === "Sign up" && (
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">{currentState === "Sign up" ? "Create Account" : "Login"}</button>
          {currentState === "Sign up" && (
            <div className="terms">
              <input type="checkbox" required />
              <p>By continuing, I agree to the terms of use & privacy policy</p>
            </div>
          )}
          <p>
            {currentState === "Login" ? "Create a new account?" : "Already have an account?"}
            <span onClick={() => setCurrentState(currentState === "Sign up" ? "Login" : "Sign up")}>
              {currentState === "Sign up" ? "Login here" : "Sign up here"}
            </span>
          </p>
        </form>
      )}
    </div>
  );
};

export default LoginPopup;
