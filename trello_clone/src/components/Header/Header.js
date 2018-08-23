import React, { Component } from "react";
import HomeIcon from "./Home_Icon.svg";
import PlusIcon from "./Plus_Icon.svg";

// Import Styles
import "./Header.css";

class Header extends Component {
  // Add Change Background Color Functionality

  render() {
    return (
      <header className="header">
        <a className="header__home-btn">
          <img className="header__home-icon" alt="Home Icon" src={HomeIcon} />
        </a>
        <div className="header__logo">
          <a>TrelloClone</a>
        </div>
        <button className="header__create-board-btn">
          <a>
            <img className="header__plus-icon" alt="Plus Icon" src={PlusIcon} />{" "}
            <span className="header__create-board-text" onClick="">
              Add New Board
            </span>
          </a>
        </button>
      </header>
    );
  }
}

export default Header;
