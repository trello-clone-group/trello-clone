import React, { Component } from "react";

// Component Styles
import "./Auth.css";

class Auth extends Component {
  render() {
    return (
      <div className="auth__container">
        <div class="auth__header">
          <div class="auth__header-left">
            <a class="auth__header-logo-link">
              <img
                alt="header logo"
                class="auth__header-logo"
                src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/trello-header-logos/af7af6ed478d3460709d715d9b3f74a4/trello-logo-white.svg"
              />
            </a>
          </div>
          <div class="auth__header-right">
            <a
              href="http://localhost:4000/login"
              class="auth__header-login-btn"
            >
              Log In
            </a>
          </div>
        </div>
        <h1>Trello lets you work more collaboratively and get more done.</h1>
        <p>
          Trello’s boards, lists, and cards enable you to organize and
          prioritize your projects in a fun, flexible and rewarding way.
        </p>
        <button className="auth__signin-btn">
          <a className="auth__button-link" href="http://localhost:4000/login">
            Login
          </a>
        </button>
      </div>
    );
  }
}

export default Auth;
