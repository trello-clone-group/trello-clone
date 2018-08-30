import React, { Component } from "react";

// Component Styles
import "./Auth.css";

class Auth extends Component {
  render() {
    return (
      <div className="auth__container">
        <button className="auth__button">
          <a className="auth__button-link" href="http://localhost:4000/login">
            Login
          </a>
        </button>
      </div>
    );
  }
}

export default Auth;
