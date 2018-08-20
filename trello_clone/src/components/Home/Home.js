import React from 'react';
import './Home.css';
import { PersonIcon } from '../Icons/Icons';

const boardsData = [
  {
    name: 'Welcome Board',
    color: 'green',
  },
  {
    name: 'My Board',
    color: 'red',
  },
  {
    name: 'Trello Clone',
    color: 'royalblue',
  },
  {
    name: 'Starter Board',
    color: 'orangered',
  },
  {
    name: 'The longest name for a board that you have ever seen yet to become the secon longset',
    color: 'blueviolet',
  },
];

export default function Home() {

  let boards = boardsData.map( (board, i) => {
    return (
      <div className="board-preview" key={i} style={{backgroundColor: board.color}}>
        <h3>{board.name}</h3>
      </div>
    );
  })

  return (
    <div className="home">
      <div className="boards">
        <div className="boards-title">
          <div className="icon-box" >
            <PersonIcon />
          </div>
          <h2>Personal Boards</h2>
        </div>
        <div className="boards-container">
          { boards }
        </div>
      </div>
    </div>
  );
}