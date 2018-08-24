import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { PersonIcon } from '../Icons/Icons';

const dummyBoardsData = [
  {
    name: 'Welcome Board',
    color: 'green',
    id: 1
  },
  {
    name: 'My Board',
    color: 'red',
    id: 3
  },
  {
    name: 'Trello Clone',
    color: 'royalblue',
    id: 6
  },
  {
    name: 'Starter Board',
    color: 'orangered',
    id: 17
  },
  {
    name: 'The longest name for a board that you have ever seen yet to become the secon longset',
    color: 'blueviolet',
    id: 2
  },
];

export default class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      boardsData: []
    };

  }

  componentDidMount(){
    // when server is up:
    //  Axios request for the user's boards
    this.setState({ boardsData: dummyBoardsData }); // dummy data for now
  }

  render() {

    let { boardsData } = this.state;

    let boards = boardsData.map( (board, i) => {
      return (
        <Link to={{
          pathname: `board/${board.id}`,
          }} style={{textDecoration: 'none'}} >
          <div className="board-preview" key={i} style={{backgroundColor: board.color}}>
            <h3>{board.name}</h3>
          </div>
        </Link>
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

}