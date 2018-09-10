import React, { Component } from 'react';
import List from '../List/List'
import Axios from 'axios';
import './Board.css';
import '../Modal/Modal.css';
import { CancelIcon } from '../Icons/Icons';
import { connect } from 'react-redux';
import { updateBoardId, updateBoardName, updateLists, updateCards, getCards } from '../../ducks/reducer';
//import { Link } from 'react-router-dom';


class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addNewList: false,
      newListTitle: '',
      editingBoardName: false,
      color: '',
      previousName: ''
    }
  }

  componentDidMount() {
    let { id } = this.props.match.params;

    // get boardData
    Axios.get(`/api/board/${id}`)
      .then(response => {
        let { color, board_id, board_name } = response.data[0];
        this.setState({ color: color });
        this.props.updateBoardId(board_id);
        this.props.updateBoardName(board_name);
      })
      .catch(err => err.message);

    // get listData
    this.getLists();
    this.getCards();
    // this.props.getCards(id);
  }

  getLists() {
    let { id } = this.props.match.params;
    Axios.get(`/api/lists/byBoard/${id}`)
      .then(response => {
        this.props.updateLists(response.data);
      })
      .catch(err => err.message);
  }

  getCards() {
    let { id } = this.props.match.params;
    Axios.get(`/api/cardbyboard/${id}`)
      .then(response => {
        this.props.updateCards(response.data);
      })
      .catch(err => err.message);
  }

  addList(title) {
    Axios.post('/api/lists', { list_name: title, board_id: this.props.board_id })
      .then(response => {
        this.getLists();
      })
      .catch(err => console.log(err.message));
    this.setState({ newListTitle: '', addNewList: false });
  }

  editBoardName() {
    this.setState({ editingBoardName: true, previousName: this.props.board_name });
  }

  saveBoardName() {
    let { board_id, board_name } = this.props;
    Axios.put(`/api/board/${board_id}`, { board_name })
      .then(response => console.log(response.data))
      .catch(err => console.log(err.message));
    this.setState({ editingBoardName: false });
  }

  cancelEdit() {
    this.setState({ editingBoardName: false, previousName: '' });
    this.props.updateBoardName(this.state.previousName);
  }

  deleteBoard() {
    let { id } = this.props.match.params;
    console.log(`deleting board ${id}`);
    Axios.delete(`/api/board/${id}`)
      .then(res => this.props.history.push('/dashboard'))
      .catch(err => console.log(err.message));
  }

  cancelNewList(){
    this.setState({ addNewList: false });
  }
  
  render() {
    let { board_name, lists } = this.props;
    let { color, addNewList, editingBoardName } = this.state;

    let listComponents = lists.map((list, i) => {
      return <List key={i} listId={list.list_id} />
    })

    return (
      <div className='boardBackground' style={{ backgroundColor: color }}>
        <div className='boardSubHeader' style={{ backgroundColor: color }}>
          {
            (!editingBoardName)
              ?
              <h2 className='boardTitle' onClick={() => this.editBoardName()} >{board_name}</h2>
              :
              <div className="edit-board-name">
                <input type="text" value={board_name} onChange={e => this.props.updateBoardName(e.target.value)} />
                <button onClick={() => this.saveBoardName()}>Save</button>
                <div onClick={() => this.cancelEdit()}>
                  <CancelIcon />
                </div>
              </div>
          }
          <button onClick={() => this.deleteBoard()}>Delete Board</button>
        </div>
        <div className='listsContainer'>
          {listComponents}
          {
            (!addNewList)
              ?
              <div onClick={() => this.setState({ addNewList: true })} className='listBody newList'>
                + Add Another List
              </div>
              :
              <div className="new-list-modal">
                <input onChange={e => this.setState({ newListTitle: e.target.value })} type="text" placeholder="list title" />
                <button className="btn-save" onClick={() => this.addList(this.state.newListTitle)} >Add List</button>
                <div onClick={() => {this.cancelNewList()}}>
                    <CancelIcon />
                </div>
              </div>
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  let { board_id, board_name, user_id, cards, lists } = state;
  return {
    board_id,
    board_name,
    cards,
    lists,
    user_id
  }
}

export default connect(mapStateToProps, { updateBoardId, updateBoardName, updateLists, updateCards, getCards })(Board);