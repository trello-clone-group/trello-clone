import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import HomeIcon from "./Home_Icon.svg";
import PlusIcon from "./Plus_Icon.svg";

import NewBoard from "../NewBoard/NewBoard";

import { logout } from "./../../ducks/reducer";

// Import Styles
import "./Header.css";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderNewBoard: false
    };

    this.cancelNewBoard = this.cancelNewBoard.bind(this);
    this.saveNewBoard = this.saveNewBoard.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  // Add Create Board functionality
  createBoard() {
    this.setState({ renderNewBoard: true });
  }

  // Add Change Background Color Functionality
  changeBackground() {
    console.log("changing background");
  }

  cancelNewBoard() {
    this.setState({ renderNewBoard: false });
  }

  saveNewBoard(board_name, user_id) {
    console.log("saving");
    Axios.post("/api/board/new", { board_name, user_id });
    this.setState({ renderNewBoard: false });
  }

  logoutHandler() {
    Axios.post("/api/logout").then(() => this.props.logout());
  }

  render() {
    let { renderNewBoard } = this.state;

    return (
      <header className="header">
        <Link to="/dashboard" className="header__home-btn">
          <img className="header__home-icon" alt="Home Icon" src={HomeIcon} />
        </Link>
        <div className="header__logo">
          <img
            className="header__trello-logo"
            src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/trello-header-logos/af7af6ed478d3460709d715d9b3f74a4/trello-logo-white.svg"
          />
        </div>
        {!renderNewBoard ? (
          <button className="header__create-board-btn">
            <a onClick={() => this.createBoard()}>
              <img
                className="header__plus-icon"
                alt="Plus Icon"
                src={PlusIcon}
              />
              <span className="header__create-board-text">Add New Board</span>
            </a>
          </button>
        ) : (
          <NewBoard
            cancelNewBoard={this.cancelNewBoard}
            saveNewBoard={this.saveNewBoard}
          />
        )}
        <button className="header__logout-btn">
          <a href="/login" onClick={this.logoutHandler}>
            Logout
          </a>
        </button>
      </header>
    );
  }
}

export default Header;
