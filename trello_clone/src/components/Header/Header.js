import React, { Component } from "react";
import Axios from 'axios';
import { Link } from "react-router-dom";
import HomeIcon from "./Home_Icon.svg";
import PlusIcon from "./Plus_Icon.svg";

import NewBoard from '../NewBoard/NewBoard';

// Import Styles
import "./Header.css";

class Header extends Component {
  constructor(props){
    super(props);

    this.state = {
      renderNewBoard: false
    }

    this.cancelNewBoard = this.cancelNewBoard.bind(this);
    this.saveNewBoard = this.saveNewBoard.bind(this);
  }

  // Add Create Board functionality
  createBoard(){
    this.setState({ renderNewBoard: true });
  }

  // Add Change Background Color Functionality
  changeBackground(){
    console.log('changing background');
  }

  cancelNewBoard(){
    this.setState({ renderNewBoard: false });
  }

  saveNewBoard(board_name, user_id){
    console.log('saving');
    Axios.post('/api/board/new', { board_name, user_id });
  }

  render() {
    let { renderNewBoard } = this.state;

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
        {
          (!renderNewBoard)
          ?
          <button className="header__create-board-btn">
            <a>
              <img className="header__plus-icon" alt="Plus Icon" src={PlusIcon} />
              <span className="header__create-board-text" onClick={ () => this.createBoard() }>
                Add New Board
              </span>
            </a>
          </button>
          :
          <NewBoard cancelNewBoard={this.cancelNewBoard} saveNewBoard={this.saveNewBoard}/>
        }
      </header>
    );
  }
}

export default Header;
