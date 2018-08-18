import React, { Component } from 'react';
import HomeIcon from './Home_Icon.svg';
import PlusIcon from './Plus_Icon.svg';

// Import Styles
import './Header.css';

class Header extends Component {

  render() {
    return (
      <header className='header'>
        <a className='header__home-btn'>
          <img className='header__home-icon' alt='Home Icon' src={HomeIcon} />
        </a>
        <button className='header__boards-btn'>
          <a>Boards</a>
        </button>
        <div className='header__logo'>
          <a>TrelloClone</a>
        </div>
        <button className='header__create-board-btn'>
          <a><img className='header__plus-icon' alt='Plus Icon' src={PlusIcon} /></a>
        </button>
        <div className='header__current-user'>
          <a>PS</a>
        </div>
      </header>
    )
  }
};

export default Header;