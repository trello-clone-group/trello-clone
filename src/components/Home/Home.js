import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Action Creator Imports
import { initializeUser, updateBoards } from "../../ducks/reducer";

// Style Imports
import "./Home.css";

// Asset Imports
import { PersonIcon } from "../Icons/Icons";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      boards: null
    }

    this.getBoards = this.getBoards.bind(this);
  }

  componentDidMount() {
    this.initUser();
    console.log("component mounted");
  }

  initUser() {
    Axios.get("/profile")
      .then(response => {
        this.props.initializeUser(response.data);
        this.getBoards(this.props.user_id);
      })
      .catch(err => console.log(err.message));
  }

  getBoards(user_id) {
    Axios.get(`/api/boards/${user_id}`)
      .then(response => {
        this.props.updateBoards(response.data);
        this.setState({ boards: response.data });
      })
      .catch(err => console.log(err.message));
  }

  render() {
    let boards = this.props.boards.map(board =>
      <Link
        key={board.board_id}
        to={{
          pathname: `board/${board.board_id}`
        }}
        style={{ textDecoration: "none" }}
      >
        <div
          className="board-preview"
          style={{ backgroundColor: board.color }}
        >
          <h3>{board.board_name}</h3>
        </div>
      </Link>
    );

    return (
      <div className="home">
        <div className="boards">
          <div className="boards-title">
            <div className="icon-box">
              <PersonIcon />
            </div>
            <h2>Personal Boards</h2>
          </div>
          <div className="boards-container">{boards}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user_id: state.user_id,
    boards: state.boards
  };
}

export default connect(mapStateToProps, { initializeUser, updateBoards })(Home);