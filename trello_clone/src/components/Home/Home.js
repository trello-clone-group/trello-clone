import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import './Home.css';
import { PersonIcon } from '../Icons/Icons';

const DUMMY_USER_ID = 1;

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
    Axios.get(`/api/boards/${DUMMY_USER_ID}`)
      .then( response => {
        this.setState({ boardsData: response.data });
      })
      .catch( err => console.log(err.message));
  }

  render() {

    let { boardsData } = this.state;

    let boards = boardsData.map( (board, i) => {
      return (
        <Link key={i} to={{
          pathname: `board/${board.board_id}`,
          }} style={{textDecoration: 'none'}} >
          <div className="board-preview" style={{backgroundColor: board.color}}>
            <h3>{board.board_name}</h3>
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