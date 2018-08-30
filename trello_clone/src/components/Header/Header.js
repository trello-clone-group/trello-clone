import React, { Component } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "./Home_Icon.svg";
import PlusIcon from "./Plus_Icon.svg";

// Import Styles
import "./Header.css";

class Header extends Component {

  // Add Create Board functionality
  createBoard(){
    console.log('creating board');
  }

  // Add Change Background Color Functionality
  changeBackground(){
    console.log('changing background');
  }

  render() {
    return (
      <header className="header">
        <Link to="/dashboard" className="header__home-btn">
          <img className="header__home-icon" alt="Home Icon" src={HomeIcon} />
        </Link>
        <button className="header__boards-btn">
          <a>Boards</a>
        </button>
        <div className="header__logo">
          <a>TrelloClone</a>
        </div>
        <button className="header__create-board-btn">
          <a>
            <img className="header__plus-icon" alt="Plus Icon" src={PlusIcon} />
            <span className="header__create-board-text" onClick={ () => this.createBoard() }>
              Add New Board
            </span>
          </a>
        </button>
      </header>
    );
  }
}

export default Header;
