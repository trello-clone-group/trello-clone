import React,  { Component } from 'react';
import List from '../List/List'
import Axios from 'axios';
import './Board.css';
import '../Modal/Modal.css';
import { CancelIcon } from '../Icons/Icons';
import { connect } from 'react-redux';
import { setBoardId, updateBoardName } from '../../ducks/reducer';
//import { Link } from 'react-router-dom';


class Board extends Component {
    constructor(props){
        super(props);

        this.state = {
            addNewList: false,
            newListTitle: '',
            listsData: [],
            editingBoardName: false,
            color: '',
            previousName: ''
        }
    }
    
    componentDidMount(){
        let { id } = this.props.match.params;

        // get boardData
        Axios.get(`/api/board/${ id }`)
            .then( response => {
                let { color, board_id, board_name } = response.data[0];
                this.setState({ color: color });
                this.props.setBoardId(board_id);
                this.props.updateBoardName(board_name);
            })
            .catch( err => err.message );
        
        // get listData
        this.getListData();
    }

    getListData(){
        let { id } = this.props.match.params;
        Axios.get(`/api/lists/`)
            .then( response => {
                let lists = response.data.filter(list => list.board_id === parseInt(id));
                this.setState({ listsData: lists });
            })
            .catch( err => err.message );
    }

    addList(title){
        console.log(title);
        Axios.post('/api/lists', { list_name: title, board_id: this.props.board_id })
            .then(response => {
                console.log(response.data);
                this.getListData();
            })
            .catch(err => console.log(err.message));
        this.setState({ newListTitle: '', addNewList: false });
    }

    editBoardName(){
        this.setState({ editingBoardName: true, previousName: this.props.board_name });
    }

    saveBoardName(){
        let { board_id, board_name } = this.props;
        Axios.put(`/api/board/${board_id}`, { board_name })
            .then(response => console.log(response.data))
            .catch(err => console.log(err.message));
        this.setState({ editingBoardName: false });
    }

    cancelEdit(){
        this.setState({ editingBoardName: false, previousName: '' });
        this.props.updateBoardName(this.state.previousName);
    }

    render(){
        let { board_name } = this.props;
        let { listsData, color, addNewList, editingBoardName } = this.state;

        let lists = listsData.map((list, i) => {
            return <List key={i} listId={list.list_id} />
        })
        
        return(
             
            <div className='boardBackground' style={{backgroundColor: color}}>
                <div className='boardSubHeader' style={{backgroundColor: color}}>
                {
                    (!editingBoardName)
                    ?
                    <h2 className='boardTitle' onClick={() => this.editBoardName()} >{board_name}</h2>
                    :
                    <div className="edit-board-name">
                        <input type="text" value={board_name} onChange={e => this.props.updateBoardName(e.target.value)} />
                        <button onClick={() => this.saveBoardName()}>Save</button>
                        <div  onClick={() => this.cancelEdit()}>
                            <CancelIcon/>
                        </div>
                    </div>

                }
                </div>
                <div className='listsContainer'>
                     { lists }
                {
                    (!addNewList)
                    ?
                    <div onClick={ () => this.setState({ addNewList: true }) } className = 'listBody newList'>
                        + Add Another List 
                    </div>
                    :
                    <div>
                        <input onChange={ e => this.setState({ newListTitle: e.target.value }) } type="text" placeholder="list title"/>
                        <button onClick={() => this.addList(this.state.newListTitle)} >Add List</button>
                    </div>
                }
                
                </div>
                    
            </div>
        )
    }
}

function mapStateToProps(state){
    let { board_id, board_name, user_id } = state;
    return {
        board_id,
        board_name
    }
}

export default connect(mapStateToProps, { setBoardId, updateBoardName })(Board);