import React, { Component } from "react";
import { connect } from "react-redux";

// Style Imports
import "./NewBoard.css";

class NewBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board_name: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(board_name) {
    this.setState({ board_name: board_name });
  }

  render() {
    return (
      <div className="new-board">
        <p>Create New Board</p>
        <input
          onChange={e => this.handleChange(e.target.value)}
          type="text"
          placeholder="board title"
        />
        <button onClick={() => this.props.saveNewBoard(this.state.board_name, this.props.user_id)}>
          Create
        </button>
        <button onClick={() => this.props.cancelNewBoard()}>Cancel</button>
      </div >
    );
  }
}

function mapStateToProps(state) {
  let { user_id } = state;
  return {
    user_id
  };
}

export default connect(mapStateToProps)(NewBoard);
