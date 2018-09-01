import React,  { Component } from 'react';
import List from '../List/List'
import Axios from 'axios';
import './Board.css'
//import { Link } from 'react-router-dom';

//import { connect } from 'react-redux'


export default class Board extends Component {
    constructor(props){
        super(props);

        this.state = {
            addNewList: false,
            newListTitle: '',
            listsData: [],
            boardData: {
                board_id: null,
                board_name: '',
                user_id: null,
                color: ''
            }
        }
    }
    
    componentDidMount(){
        let { id } = this.props.match.params;

        // get boardData
        Axios.get(`/api/board/${ id }`)
            .then( response => {
                this.setState({ boardData: response.data[0] });
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
        Axios.post('/api/lists', { list_name: title, board_id: this.state.boardData.board_id })
            .then(response => {
                console.log(response.data);
                this.getListData();
            })
            .catch(err => console.log(err.message));
        this.setState({ newListTitle: '', addNewList: false });
    }

    render(){

        let { listsData, boardData, addNewList } = this.state;
        let { board_name, color, board_id } = boardData;

        let lists = listsData.map((list, i) => {
            return <List key={i} listId={list.list_id} />
        })
        
        return(
             
            <div className='boardBackground' style={{backgroundColor: color}}>
                <div className='boardSubHeader' style={{backgroundColor: color}}>
                <h2 className='boardTitle'>{board_name}</h2>
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


 