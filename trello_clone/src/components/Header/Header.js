import React, { Component } from "react";
import { connect } from "react-redux";
import Axios from "axios";
import { Link } from "react-router-dom";

// Action Creator Imports
import { createBoard, logout } from "../../ducks/reducer";

// Component Imports
import NewBoard from "../NewBoard/NewBoard";

// Style Imports
import "./Header.css";

// Asset Imports
import HomeIcon from "./Home_Icon.svg";
import PlusIcon from "./Plus_Icon.svg";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleNewBoardForm: false
    };

    this.toggleNewBoardForm = this.toggleNewBoardForm.bind(this);
    this.cancelNewBoard = this.cancelNewBoard.bind(this);
    this.saveNewBoard = this.saveNewBoard.bind(this);
  }

  toggleNewBoardForm() {
    this.setState({ toggleNewBoardForm: !this.state.toggleNewBoardForm });
  }

  cancelNewBoard() {
    this.toggleNewBoardForm();
  }

  saveNewBoard(board_name, user_id) {
    this.toggleNewBoardForm();
    Axios.post("/api/board/new", { board_name, user_id }).then(response => {
      console.log(response);
      this.props.history.push('/dashboard');
    });
  }

  logoutHandler() {
    this.props.logout();
    Axios.post("/api/logout");
  }

  render() {
    return (
      <header className="header">
        <Link to="/dashboard" className="header__home-btn">
          <img className="header__home-icon" alt="Home Icon" src={HomeIcon} />
        </Link>
        <div className="header__logo">
          <img
            alt="trello logo"
            className="header__trello-logo"
            src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/trello-header-logos/af7af6ed478d3460709d715d9b3f74a4/trello-logo-white.svg"
          />
        </div>
        {!this.state.toggleNewBoardForm ? (
          <button className="header__create-board-btn">
            <a onClick={() => this.toggleNewBoardForm()}>
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
              saveNewBoard={this.saveNewBoard}
              cancelNewBoard={this.cancelNewBoard}
            />
          )}
        <button className="header__logout-btn">
          <Link to="/" onClick={() => this.logoutHandler()}>Logout</Link>
        </button>
      </header>
    );
  }
}

export default connect(null, { createBoard, logout })(Header);
