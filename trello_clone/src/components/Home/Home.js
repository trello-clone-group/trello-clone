import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { connect } from 'react-redux';
import { initializeUser, getCards, getLists } from '../../ducks/reducer';
import './Home.css';
import { PersonIcon } from '../Icons/Icons';

class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      boardsData: []
    };

  }

  componentDidMount(){
    // when server is up:
    //  Axios request for the user's boards
    Axios.get('/profile')
      .then(response => {
        console.log(response.data);
        // initialize user here
        this.props.initializeUser(response.data);

        Axios.get(`/api/boards/${response.data.user_id}`)
          .then( response => {
            this.setState({ boardsData: response.data });
            
          })
          .catch( err => console.log(err.message));
      })
      .catch(err => console.log(err.message));

  }

   handleLinkClick = (id) => {
  
    this.props.getLists(id)
    this.props.getCards(id)
   }

  render() {
    let { boardsData } = this.state;
    //console.log('This is the board id')
  

    let boards = boardsData.map( (board, i) => {
      return (
        <Link key={i} to={{
          pathname: `board/${board.board_id}`,
          }} style={{textDecoration: 'none'}} onClick = {() => this.handleLinkClick(board.board_id)} >
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

function mapStateToProps(state){
  let { user_id, username, firstname, lastname, cards, lists, listsThunk, board_id } = state;
  return {
    user_id,
    username,
    firstname,
    lastname,
    cards,
    lists,
    listsThunk,
    board_id
  }
}

export default connect(mapStateToProps, { initializeUser, getCards, getLists })(Home);